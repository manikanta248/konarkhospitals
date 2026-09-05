"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { HOSPITAL } from "@konark/shared";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "h-11 w-full rounded-lg border border-ink-200 bg-white px-3.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await api.post("/api/contact", {
        name: data.get("name"),
        phone: data.get("phone"),
        email: data.get("email"),
        subject: data.get("subject"),
        message: data.get("message"),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl2 border border-brand-100 bg-brand-50/60 py-12 text-center">
        <CheckCircle2 size={32} className="text-brand-600" />
        <p className="text-[15px] font-semibold text-ink-900">Message sent</p>
        <p className="max-w-xs text-sm text-ink-600">
          Thank you for reaching out — our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-600">Full Name *</label>
          <input name="name" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-600">Phone Number *</label>
          <PhoneInput className={inputClass} />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink-600">Email</label>
        <input name="email" type="email" className={inputClass} placeholder="you@example.com" />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink-600">Subject</label>
        <input name="subject" className={inputClass} placeholder="What is this regarding?" />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink-600">Message *</label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full resize-none rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder="How can we help?"
        />
      </div>

      {status === "error" && (
        <p className="text-[13px] text-red-600">
          Something went wrong sending your message. Please call us directly at {HOSPITAL.phone} instead.
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="mt-1 w-full sm:w-auto">
        {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
