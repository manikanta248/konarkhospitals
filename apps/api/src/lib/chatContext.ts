import { db } from "../firebase";

// Duplicated (rather than imported from @konark/shared) deliberately — apps/api is deployed
// as a standalone Vercel project and pulling in the workspace package previously broke that
// build (see docs/CHATBOT_PLAN.md history). This is the small, stable subset the bot needs.
const HOSPITAL_FACTS = `
Hospital: Konark Hospitals — Best Multispeciality Hospital in Hyderabad | Fertility, IVF & IUI Specialists
Address: #13 & 14, Pipeline Road, Behind Deevan Dhaba, Petbasheerabad, Jeedimetla, Hyderabad – 500 055
Phone: +91 40 3526 1515 | Mobile: +91 98496 61515 | Emergency (24/7): +91 98496 61515
Email: konark.reception@gmail.com
OPD Hours: 10:00 AM - 3:00 PM & 6:00 PM - 8:00 PM (Emergency department is open 24/7)
WhatsApp: https://wa.me/919849661515
`.trim();

let cache: { text: string; expiresAt: number } | null = null;
const TTL_MS = 5 * 60 * 1000;

/**
 * Builds the system-prompt context block from live Firestore data (the same collections
 * admins edit via /admin), cached briefly so a chat message doesn't cost two extra reads.
 */
export async function getChatContext(): Promise<string> {
  if (cache && cache.expiresAt > Date.now()) return cache.text;

  const [deptSnap, doctorSnap, knowledgeSnap] = await Promise.all([
    db.collection("departments").orderBy("order").get(),
    db.collection("doctors").orderBy("order").get(),
    db.collection("chatKnowledge").orderBy("order").get(),
  ]);

  const departments = deptSnap.docs
    .map((d) => d.data() as any)
    .map(
      (d) =>
        `- ${d.name} (slug: ${d.slug})${d.opdOnly ? " [OPD consultation only, no inpatient/surgical admission]" : ""}: ${d.shortDescription ?? ""}`
    )
    .join("\n");

  const doctors = doctorSnap.docs
    .map((d) => d.data() as any)
    .map((d) => {
      const availability =
        Array.isArray(d.availability) && d.availability.length > 0
          ? d.availability.map((a: any) => `${a.day}: ${a.slots}`).join(", ")
          : "not listed in our records — tell the visitor to call and confirm the exact day/time";
      return `- ${d.name} (slug: ${d.slug}), ${d.designation ?? ""}, ${d.departmentName ?? ""} - ${d.qualifications ?? ""}, ${
        d.experienceYears ?? "unknown"
      } yrs experience. Languages: ${(d.languages ?? []).join(", ") || "not listed"}. Availability: ${availability}`;
    })
    .join("\n");

  const knowledge = knowledgeSnap.docs
    .map((d) => d.data() as any)
    .map((k) => `Q: ${k.question}\nA: ${k.answer}`)
    .join("\n\n");

  const text = [
    HOSPITAL_FACTS,
    `\n\nDEPARTMENTS:\n${departments}`,
    `\n\nDOCTORS:\n${doctors}`,
    // Admin-authored entries from /admin/chatbot/knowledge — takes priority for anything not
    // already covered by the structured department/doctor data above (policies, parking,
    // insurance specifics, one-off questions staff want a canned answer for, etc.).
    knowledge ? `\n\nADDITIONAL KNOWLEDGE (admin-provided, prefer this for anything it covers):\n${knowledge}` : "",
  ].join("");

  cache = { text, expiresAt: Date.now() + TTL_MS };
  return text;
}

/** Lets the admin settings save immediately override the 5-minute cache instead of waiting it out. */
export function invalidateChatContextCache() {
  cache = null;
}
