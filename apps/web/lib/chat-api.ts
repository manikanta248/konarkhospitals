const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface StreamHandlers {
  onToken: (text: string) => void;
  onConfirmAppointment: (args: Record<string, string>) => void;
  onDone: () => void;
  onError: (message: string) => void;
}

// Some browsers — most notably in-app WebViews (WhatsApp, Instagram, etc.) — don't reliably
// deliver fetch() streaming chunks, or can stall a ReadableStream read indefinitely without
// ever erroring. Without a watchdog, that leaves the widget stuck on the typing indicator
// forever with no way to recover. This timer aborts and surfaces an error if no new chunk
// (including the very first byte) arrives within IDLE_TIMEOUT_MS.
const IDLE_TIMEOUT_MS = 20000;

export async function streamChatMessage(sessionId: string, message: string, handlers: StreamHandlers, externalSignal?: AbortSignal) {
  const controller = new AbortController();
  externalSignal?.addEventListener("abort", () => controller.abort());

  let idleTimer: ReturnType<typeof setTimeout> | undefined;
  const resetIdleTimer = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => controller.abort(), IDLE_TIMEOUT_MS);
  };

  let res: Response;
  resetIdleTimer();
  try {
    res = await fetch(`${API_BASE}/api/chat/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, message }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(idleTimer);
    handlers.onError(
      (err as any)?.name === "AbortError"
        ? "That's taking too long to respond — please try again or call us."
        : "I'm having trouble right now — please call us or use the appointment form."
    );
    return;
  }

  if (!res.ok || !res.body) {
    clearTimeout(idleTimer);
    const body = await res.json().catch(() => ({}));
    handlers.onError(body.error ?? "I'm having trouble right now — please call us or use the appointment form.");
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let sawDone = false;

  try {
    while (true) {
      const { value, done } = await reader.read();
      resetIdleTimer();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const events = buffer.split("\n\n");
      buffer = events.pop() ?? "";

      for (const raw of events) {
        if (!raw.trim()) continue;
        const lines = raw.split("\n");
        const eventLine = lines.find((l) => l.startsWith("event:"));
        const dataLine = lines.find((l) => l.startsWith("data:"));
        if (!eventLine || !dataLine) continue;

        const event = eventLine.replace("event:", "").trim();
        let data: any = {};
        try {
          data = JSON.parse(dataLine.replace("data:", "").trim());
        } catch {
          continue;
        }

        if (event === "token") handlers.onToken(data.text);
        else if (event === "confirm_appointment") handlers.onConfirmAppointment(data.args);
        else if (event === "done") {
          sawDone = true;
          handlers.onDone();
        } else if (event === "error") {
          sawDone = true;
          handlers.onError(data.message);
        }
      }
    }
  } catch {
    // Aborted (idle timeout / navigation) or the connection dropped mid-stream — handled below.
  } finally {
    clearTimeout(idleTimer);
  }

  if (!sawDone) {
    // The connection ended (or was aborted) without ever sending our SSE "done"/"error" event
    // — don't leave the widget stuck showing "Typing…" with no way out.
    handlers.onError("I didn't get a full response — please try again or call us.");
  }
}

export async function confirmChatAppointment(payload: {
  sessionId: string;
  patientName: string;
  phone: string;
  email?: string;
  departmentSlug?: string;
  doctorSlug?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  type?: string;
}) {
  // Built manually rather than via AbortSignal.timeout() — that API is missing on older
  // WebView engines (exactly the kind in-app browsers like WhatsApp's often ship), and on an
  // unsupported browser it fails silently to "no timeout at all," which is precisely the
  // stuck-forever failure mode this exists to prevent.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), IDLE_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/chat/confirm-appointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } catch (err) {
    throw new Error(
      (err as any)?.name === "AbortError" ? "That's taking too long — please try again or call us." : "Failed to submit appointment"
    );
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to submit appointment");
  }
  return res.json();
}

export async function sendChatFeedback(sessionId: string, timestamp: string, feedback: "up" | "down") {
  try {
    await fetch(`${API_BASE}/api/chat/${sessionId}/feedback`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp, feedback }),
    });
  } catch {
    // Best-effort — a failed feedback ping shouldn't disrupt the conversation.
  }
}
