"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, X } from "lucide-react";
import { HOSPITAL } from "@konark/shared";
import { ChatBubble } from "./ChatBubble";
import { FaqCallout } from "./FaqCallout";
import { ChatMessage, type ChatMessageData } from "./ChatMessage";
import { AppointmentConfirmCard } from "./AppointmentConfirmCard";
import { streamChatMessage } from "@/lib/chat-api";
import { api } from "@/lib/api";
import type { ChatbotSettings } from "@konark/shared";

const DEFAULT_QUICK_REPLIES = ["OPD timings?", "Book an appointment", "Insurance accepted?", "This is an emergency"];
const MOBILE_QUERY = "(max-width: 639px)";

// Deliberately NOT persisted (e.g. via sessionStorage) across a reload. The visible message
// list already resets to empty on reload since it's only ever in React state — persisting the
// session id here would silently keep it tied to the OLD conversation's Firestore history, so
// the bot would keep "remembering" a conversation the visitor can no longer see on screen.
// A fresh page load should mean a genuinely fresh conversation on both sides.
function createSessionId() {
  if (typeof window === "undefined") return "";
  return crypto.randomUUID();
}

export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [awaitingFirstChunk, setAwaitingFirstChunk] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState<Record<string, string> | null>(null);
  const [errorBanner, setErrorBanner] = useState("");
  const [settings, setSettings] = useState<ChatbotSettings>({ enabled: true, quickReplies: DEFAULT_QUICK_REPLIES });
  const sessionIdRef = useRef("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Lazy-mount after the page settles so the widget never competes with initial paint/LCP.
    const win = window as any;
    let idleId: number | ReturnType<typeof setTimeout>;
    if (win.requestIdleCallback) {
      idleId = win.requestIdleCallback(() => setMounted(true));
    } else {
      idleId = setTimeout(() => setMounted(true), 1500);
    }
    sessionIdRef.current = createSessionId();

    // Admin-configured (kill switch + suggested questions) — fail open with the defaults
    // above if this doesn't load, rather than blocking the widget on it.
    api
      .get<ChatbotSettings>("/api/chat/settings")
      .then((data) => setSettings(data))
      .catch(() => {});

    return () => {
      if (win.cancelIdleCallback && typeof idleId === "number") win.cancelIdleCallback(idleId);
      else clearTimeout(idleId as ReturnType<typeof setTimeout>);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Lock background scroll while the full-screen mobile sheet is open so the page behind it
  // doesn't drift and peek through at the edges.
  useEffect(() => {
    if (open && typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    setErrorBanner("");
    setPendingConfirm(null);
    const userMessage: ChatMessageData = { role: "user", content: trimmed, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStreaming(true);
    setAwaitingFirstChunk(true);

    let assistantText = "";
    let assistantAdded = false;
    const assistantTimestamp = new Date().toISOString();

    const controller = new AbortController();
    abortRef.current = controller;

    await streamChatMessage(
      sessionIdRef.current,
      trimmed,
      {
        onToken: (chunk) => {
          assistantText += chunk;
          setAwaitingFirstChunk(false);
          setMessages((prev) => {
            if (!assistantAdded) {
              assistantAdded = true;
              return [...prev, { role: "assistant", content: assistantText, timestamp: assistantTimestamp }];
            }
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: assistantText, timestamp: assistantTimestamp };
            return next;
          });
        },
        onConfirmAppointment: (args) => {
          setAwaitingFirstChunk(false);
          setPendingConfirm(args);
        },
        onDone: () => setStreaming(false),
        onError: (msg) => {
          setAwaitingFirstChunk(false);
          setErrorBanner(msg);
          setStreaming(false);
        },
      },
      controller.signal
    );
    setStreaming(false);
    setAwaitingFirstChunk(false);
  }

  if (!mounted) return null;

  return (
    <>
      <FaqCallout hidden={open} />
      <ChatBubble open={open} onClick={() => setOpen((v) => !v)} />

      {open && (
        <div
          role="dialog"
          aria-label="Chat with Konark Hospitals"
          // Full-screen on phones, sized with the dynamic-viewport unit (100dvh) rather than a
          // JS-computed keyboard offset — dvh tracks the actual visible viewport on its own in
          // modern browsers/WebViews, which turned out to be far more reliable than manually
          // reading visualViewport (that approach broke badly in at least one in-app browser).
          className="fixed inset-0 z-50 flex h-[100dvh] flex-col overflow-hidden bg-white shadow-floating sm:inset-auto sm:bottom-24 sm:right-6 sm:h-auto sm:max-h-[70vh] sm:w-[380px] sm:rounded-2xl sm:border sm:border-ink-100 lg:bottom-24"
        >
          <div className="flex items-center justify-between border-b border-ink-100 bg-brand-600 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Konark Hospitals</p>
              <p className="text-[11px] text-brand-100">Usually replies in a few seconds</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/90 hover:bg-white/10 sm:hidden"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-3.5 py-4">
            {!settings.enabled ? (
              <div className="rounded-xl border border-ink-100 bg-ink-50 px-4 py-4 text-center">
                <p className="text-[13.5px] text-ink-700">Chat isn't available right now. Please call us or use the appointment form instead.</p>
                <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="mt-2 inline-block text-sm font-semibold text-brand-600 underline">
                  {HOSPITAL.phone}
                </a>
              </div>
            ) : (
              <>
                {messages.length === 0 && (
                  <div className="space-y-2">
                    <div className="rounded-2xl bg-ink-50 px-3.5 py-2.5 text-[13.5px] text-ink-700">
                      Hi! I can answer questions about departments, doctors, OPD timings, or help you book an appointment. How can I help?
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {settings.quickReplies.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => sendMessage(q)}
                          className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[12px] font-medium text-brand-700 hover:bg-brand-100"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m, i) => (
                  <ChatMessage key={i} message={m} sessionId={sessionIdRef.current} />
                ))}

                {streaming && awaitingFirstChunk && (
                  <div className="flex items-center gap-1.5 px-1 text-ink-400">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-xs">Typing…</span>
                  </div>
                )}

                {pendingConfirm && (
                  <AppointmentConfirmCard
                    sessionId={sessionIdRef.current}
                    args={pendingConfirm}
                    onConfirmed={() => {
                      setPendingConfirm(null);
                      setMessages((prev) => [
                        ...prev,
                        {
                          role: "assistant",
                          content: "Request received — our team will call you shortly to confirm.",
                          timestamp: new Date().toISOString(),
                        },
                      ]);
                    }}
                  />
                )}

                {errorBanner && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-3.5 py-2.5 text-[12.5px] text-red-700">
                    {errorBanner} Call us at{" "}
                    <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="font-semibold underline">
                      {HOSPITAL.phone}
                    </a>
                    .
                  </div>
                )}
              </>
            )}
          </div>

          {settings.enabled && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-ink-100 p-2.5"
              style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 1000))}
                placeholder="Type a message…"
                disabled={streaming}
                aria-label="Message"
                className="h-10 flex-1 rounded-full border border-ink-200 px-4 text-[13.5px] focus:border-brand-400 focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
