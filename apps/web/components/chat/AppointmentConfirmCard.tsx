"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { confirmChatAppointment } from "@/lib/chat-api";

interface ConfirmArgs {
  patientName?: string;
  phone?: string;
  email?: string;
  departmentSlug?: string;
  doctorSlug?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  type?: string;
}

const PHONE_REGEX = /^[6-9]\d{9}$/;

const TYPE_LABELS: Record<string, string> = {
  appointment: "General Appointment",
  consultation: "Doctor Consultation",
  "second-opinion": "Second Opinion",
  international: "International Patient Appointment",
};

export function AppointmentConfirmCard({
  sessionId,
  args,
  onConfirmed,
}: {
  sessionId: string;
  args: ConfirmArgs;
  onConfirmed: () => void;
}) {
  const [name, setName] = useState(args.patientName ?? "");
  const [phone, setPhone] = useState((args.phone ?? "").replace(/\D/g, "").slice(-10));
  const [email, setEmail] = useState(args.email ?? "");
  const [type, setType] = useState(args.type && TYPE_LABELS[args.type] ? args.type : "appointment");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const phoneValid = PHONE_REGEX.test(phone);

  async function handleConfirm() {
    if (!name.trim() || !phoneValid) {
      setError("Enter your name and a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await confirmChatAppointment({
        sessionId,
        patientName: name.trim(),
        phone,
        email: email.trim() || undefined,
        departmentSlug: args.departmentSlug,
        doctorSlug: args.doctorSlug,
        preferredDate: args.preferredDate,
        preferredTime: args.preferredTime,
        message: args.message,
        type,
      });
      // Success feedback is handled by the parent (a message appended to the chat transcript)
      // rather than an internal "submitted" view here — this card is removed from the tree
      // the instant the parent's state updates, so anything rendered only inside this
      // component after that point would never actually be seen.
      onConfirmed();
    } catch {
      setError("Couldn't submit — please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3">
      <p className="text-[12.5px] font-semibold text-ink-700">Confirm your appointment request</p>
      <div className="mt-2.5 flex flex-col gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="h-9 rounded-lg border border-ink-200 bg-white px-3 text-[13px] focus:border-brand-400 focus:outline-none"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="10-digit mobile number"
          inputMode="numeric"
          className="h-9 rounded-lg border border-ink-200 bg-white px-3 text-[13px] focus:border-brand-400 focus:outline-none"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          type="email"
          className="h-9 rounded-lg border border-ink-200 bg-white px-3 text-[13px] focus:border-brand-400 focus:outline-none"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-9 rounded-lg border border-ink-200 bg-white px-3 text-[13px] focus:border-brand-400 focus:outline-none"
        >
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {(args.departmentSlug || args.doctorSlug || args.preferredDate) && (
          <p className="text-[11.5px] text-ink-500">
            {args.departmentSlug && <>Department: {args.departmentSlug} · </>}
            {args.doctorSlug && <>Doctor: {args.doctorSlug} · </>}
            {[args.preferredDate, args.preferredTime].filter(Boolean).join(" ")}
          </p>
        )}
        {error && <p className="text-[11.5px] text-red-600">{error}</p>}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={submitting}
          className="mt-1 flex h-9 items-center justify-center gap-2 rounded-lg bg-brand-600 text-[13px] font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {submitting && <Loader2 size={14} className="animate-spin" />}
          Confirm & Submit
        </button>
      </div>
    </div>
  );
}
