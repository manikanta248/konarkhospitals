# Konark Hospitals — AI Chatbot: Production Plan

Scope: a site-wide chat widget that (1) answers FAQs grounded in real hospital data, and
(2) collects appointment requests through conversation, backed by OpenAI's API, integrated
into the existing Next.js + Express + Firestore stack — no new infrastructure required.

## 1. Model choice

**Recommendation: `gpt-5.6-luna`** (verified against OpenAI's live pricing page, Aug 2026).

| Model | Input $/1M | Output $/1M | Notes |
|---|---|---|---|
| **gpt-5.6-luna** ✅ | $0.20 | $1.20 | Current-gen small model, full tool-calling & structured outputs support, cheapest capable option |
| gpt-5.4-nano | $0.20 | $1.25 | Older generation, similar price — luna supersedes it |
| gpt-4o-mini | $0.15 | $0.60 | Slightly cheaper but previous-gen reasoning/instruction-following — only fall back to this if luna underperforms in testing |

All current GPT-5.x models support function/tool calling and structured outputs, which this
use case depends on (appointment booking = structured data extraction, not free text).

**Action at build time:** re-verify pricing/model name at `platform.openai.com/docs/pricing`
before wiring the SDK — model names and prices shift every few months; treat the name above
as "best available small model in the GPT-5.x family," not a permanent constant.

Estimated cost: a typical 6-turn conversation (~1,200 input + ~250 output tokens per turn)
costs well under $0.01. Real risk is abuse volume, not per-conversation cost — see §5.

## 2. Architecture

```
Browser (ChatWidget, client component)
   │  POST /api/chat/message  (streamed, SSE)
   ▼
Express API (apps/api) — the ONLY place holding OPENAI_API_KEY
   │
   ├─ Safety-net regex filter (emergency / self-harm keywords) ──► short-circuit, no LLM call
   │
   ├─ System prompt = static hospital facts (@konark/shared) + cached department/doctor
   │  summaries (Firestore, 5-min in-memory TTL cache — same data admins already edit,
   │  so chatbot answers update automatically, no redeploy, no separate content source)
   │
   ├─ OpenAI Chat Completions (streaming) with tool definitions:
   │     find_department, find_doctors, submit_appointment, get_emergency_info
   │
   └─ submit_appointment tool → same validation + same Firestore write as the existing
      POST /api/appointments route (express-validator, 10-digit phone regex) — reused,
      not duplicated. Appointments made via chat show up in the same /admin/appointments
      screen as ones made via the form.
```

Nothing about this requires a new database, a vector DB, or a separate service — it's one
new Express route plus one new frontend widget, reusing everything else already built.

## 3. Edge cases (this is the bulk of "production-ready")

**Safety / medical**
- Any message matching emergency-indicator keywords (chest pain, unconscious, heavy
  bleeding, suicide, overdose, "can't breathe," etc.) bypasses the LLM entirely and
  immediately returns the emergency number + address. Don't trust the model alone for
  this — a deterministic regex pre-filter is faster and more reliable than hoping the
  model always catches it.
- System prompt hard-refuses diagnosis, prescription, or dosage questions; always
  redirects to "Book a Consultation" / "Second Opinion" flow with a disclaimer.

**Abuse / cost control**
- Rate limit per IP on `/api/chat/message` (reuse `express-rate-limit`, tighter than the
  existing form limiter — e.g. 20 messages / 10 min).
- Separate, stricter limit specifically on `submit_appointment` calls, to stop bot-driven
  fake-appointment floods independent of general chat rate limits.
- Cap `max_tokens` per response and the conversation history window sent to the model
  (sliding window, e.g. last 8 turns) — bounds cost per session regardless of how long a
  user drags the conversation out.
- A Firestore-backed kill switch (`config/chatbot.enabled`) checked per-request, so the
  bot can be disabled instantly without a redeploy if spend spikes or OpenAI has an
  incident — widget falls back to a static "Call us" card.

**Input handling**
- Empty / whitespace-only messages rejected client-side and server-side.
- Message length capped (e.g. 1,000 chars) before it ever reaches the model.
- Prompt-injection attempts ("ignore previous instructions," role-play jailbreaks) —
  system prompt hardening + treating all user content as untrusted data, never as
  instructions to the assistant about its own behavior.
- Non-English input (Telugu/Hindi, per the doctors' listed languages) — GPT-5.x handles
  this natively; explicitly allow it in the system prompt rather than forcing English.

**Reliability**
- OpenAI request timeout + exponential-backoff retry (1 retry, short timeout — a hospital
  visitor won't wait 30s for a chat reply).
- On repeated failure, graceful degradation: "I'm having trouble right now — call us at
  {phone} or use the appointment form" rather than a spinner that never resolves.
- Stream abort handling if the user closes the widget or navigates mid-response.

**Data integrity**
- The model never writes to Firestore directly from free text. After it collects booking
  details via the `submit_appointment` tool call, the widget shows a structured
  confirmation card (name / phone / department / preferred time) with an explicit
  "Confirm & Submit" button before anything is written — this catches
  misheard/hallucinated fields before they become a bad appointment record, and matches
  how the rest of the site already treats form submission as an explicit user action.
- All tool-call arguments re-validated server-side with the same rules as the existing
  form (never trust model output blindly for a write).

**Accessibility / UX**
- ARIA live region for new messages, keyboard-navigable, focus trap on mobile when open.
- Widget positioned so it never collides with the existing mobile bottom action bar
  (Call / WhatsApp / Book Now) — floats above it, standard bottom-right chat-bubble
  pattern on desktop.
- Typing indicator during streaming; quick-reply chips for the top FAQs (OPD hours,
  insurance, book appointment, emergency) so most visitors never need to type at all.

## 4. New surface area

**Backend** (`apps/api`)
- `src/routes/chat.ts` — POST `/api/chat/message` (SSE streaming)
- `src/lib/chatContext.ts` — cached department/doctor/FAQ summary builder (5-min TTL)
- `src/lib/emergencyFilter.ts` — deterministic keyword safety net
- `src/lib/openai.ts` — SDK client init (mirrors the existing `firebase.ts` pattern)
- Firestore collections: `chatLogs` (audit trail, redacted in any aggregate view),
  `config` (kill switch + daily spend counter)
- `src/routes/admin/chatLogs.ts` — protected GET endpoints (list + single conversation),
  same Firebase ID-token verification middleware as every other admin route

**Frontend** (`apps/web`)
- `components/chat/ChatWidget.tsx` + `ChatBubble.tsx`, `ChatMessage.tsx`,
  `AppointmentConfirmCard.tsx` — mounted once in `(site)/layout.tsx`
- `lib/chat-api.ts` — streaming fetch helper (SSE reader)

## 5. Admin panel — chat log visibility

The admin must be able to see every conversation, not just the appointments that resulted
from them (a visitor who asks 5 questions and leaves without booking is still something
staff should be able to review — e.g. to catch wrong answers or spot recurring questions
the FAQ content should cover).

- **New sidebar item**: `/admin/chat-logs`, added to `AdminSidebar.tsx`'s `NAV` array
  (icon: `MessageCircle` from lucide-react), positioned near Appointments/Contact Messages
  since it's the same "inbound activity" category.
- **List view** (`ResourceListPage`/`SubmissionsListPage` pattern, same as Appointments):
  one row per conversation — start time, visitor's first message (preview), message count,
  outcome badge (`Booked` / `Answered` / `Abandoned` / `Escalated to emergency`), and
  whether it converted to a real appointment (with a link to that appointment record if so).
- **Detail view** (`/admin/chat-logs/[id]`): full transcript rendered as chat bubbles
  (reusing `ChatMessage.tsx` styling in read-only mode), plus metadata — timestamp, IP
  (for abuse investigation), whether the emergency filter fired, token/cost estimate for
  that conversation, and a direct link to the resulting appointment if one exists.
- **Data model**: each `chatLogs` document stores the full message array
  (`role`/`content`/`timestamp`), a denormalized `outcome` field (set server-side when the
  conversation ends or a tool call fires, not computed client-side), `appointmentId` (set
  when `submit_appointment` succeeds, linking the two collections), and `emergencyTriggered`
  boolean. Messages are appended to the same document as the conversation progresses
  (upsert on each turn), not written as separate documents per message — keeps the list
  view a single cheap query.
- **Access control**: identical to every other admin screen — Firebase ID-token verified
  server-side against the `admins` collection, no new auth pattern introduced.
- **Dashboard tie-in**: add a "Chat Conversations (7d)" stat card to `/admin` alongside the
  existing Appointments/Messages counts, since this is now a third inbound-lead channel
  staff should monitor daily.

## 6. Deployment-specific risk: Vercel serverless + streaming

`apps/api` already runs as a Vercel serverless function (`apps/api/api/index.ts`), not a
long-lived server. This matters specifically for streaming:

- **Function duration limit.** Vercel Hobby/free tier caps a serverless function at 10s by
  default (extendable to 60s via `maxDuration` in `vercel.json`, still capped well below
  what a slow multi-tool-call conversation turn could take). A long OpenAI stream (tool
  call → tool result → second model call → stream response) can realistically exceed 10s.
  **Action:** set `export const config = { maxDuration: 60 }` (or the route-level
  equivalent) on the chat function specifically, and design tool-calling turns to resolve
  in one round-trip where possible rather than chaining multiple sequential tool calls.
- **Cold starts stack with model latency.** The nav-performance fix already identified
  Vercel cold starts as a real, unavoidable floor. The first chat message after idle time
  pays a cold start *and* first-token latency together — show the typing indicator the
  instant the request is sent (not after first byte) so the wait reads as "thinking," not
  "broken."
- **SSE through Vercel's edge/proxy layer**: verify in staging that streamed chunks
  actually arrive incrementally and aren't buffered into one final response by an
  intermediate layer — test this explicitly before assuming the streaming UX works in
  production, since it behaves differently than local `npm run dev`.

## 7. Privacy, consent & data retention (India DPDP Act)

Chat messages will contain names, phone numbers, and sometimes health context — this is
personal (and potentially sensitive health) data under India's Digital Personal Data
Protection Act, and needs the same care as the existing appointment/contact forms, not less:

- A brief, non-blocking consent notice on first widget open ("Chats may be reviewed by
  hospital staff to improve service. Don't share medical details you're not comfortable
  recording.") — not a hard gate, just visible disclosure.
- Link to a privacy policy page (add one if the site doesn't already have one — check
  before assuming).
- **Retention policy**: define and enforce a deletion window for `chatLogs` (e.g. 12
  months), matching whatever policy exists for `appointments`/`contactSubmissions` — a
  scheduled cleanup, not indefinite storage by default.
- Admin should be able to manually delete a specific conversation from `/admin/chat-logs`
  (a visitor may ask for their data to be removed) — add a delete action to the detail view.

## 8. Answer-accuracy guardrail for doctor scheduling

The `Doctor` type doesn't currently store day-by-day availability — only general OPD hours
exist in `HOSPITAL.opdHours`. Without an explicit guardrail, the model can plausibly
*invent* a specific doctor's specific day/time availability, which is worse than not
answering. System prompt must explicitly instruct: give only the hospital's general OPD
hours for department/doctor availability questions, and never state that a specific doctor
is "available Tuesday" or similar unless that data actually exists in Firestore — always
route specific-availability questions to "call to confirm" or the booking flow.

## 9. Human handoff & quality feedback

- After 2 consecutive turns where the model can't resolve the visitor's question (or if the
  visitor types something like "talk to a person"), the bot should proactively offer the
  existing WhatsApp deep link and phone number rather than looping — this reuses a channel
  that already exists in the sitemap instead of leaving the visitor stuck in chat.
- A lightweight thumbs-up/thumbs-down on each bot response, stored on the message in
  `chatLogs` — gives staff a fast way to spot bad answers in `/admin/chat-logs` without
  reading every transcript, and doubles as a signal for which FAQ content needs fixing.

## 10. Rendering safety & performance

- Bot responses must be rendered as plain text / minimal safe markdown (bold, links,
  line breaks via a small allow-listed renderer) — **never** `dangerouslySetInnerHTML` on
  raw model output, since a prompt-injection response could otherwise land as executable
  HTML/script in the visitor's own browser (self-XSS via the bot).
- The widget script/bundle should lazy-load (mount after initial page interactive, not
  block first paint) — this is a hospital site where LCP/page-load speed already mattered
  enough to warrant a dedicated performance fix earlier; the chat widget shouldn't regress it.

## 11. Rollout plan

1. Build backend route + safety net + tool calling against a couple of representative
   test conversations (FAQ question, full booking flow, emergency keyword, jailbreak
   attempt, doctor-availability question) — verify each before touching the frontend.
2. Confirm streaming actually streams end-to-end on a real Vercel deployment (staging),
   not just local dev — see §6.
3. Build the widget behind a feature flag (env var or the same Firestore kill-switch),
   enabled only for you/internal testing first.
4. Manual QA pass through every edge case in §3, §8, §9.
5. Enable for all traffic; watch `chatLogs`, thumbs-down responses, and OpenAI's usage
   dashboard for the first few days before considering it "done."

## 12. Explicitly out of scope for v1 (call these out, don't silently build them)

- Real-time slot/calendar availability (the site currently does *appointment requests*
  that staff confirm by phone — the chatbot should match that, not invent live booking
  that doesn't exist elsewhere on the site).
- Voice input/output.
- Cross-session memory (conversation persists only for the browser tab via
  `sessionStorage`, resets on close) — simpler and better for privacy; revisit only if
  there's a real need.
