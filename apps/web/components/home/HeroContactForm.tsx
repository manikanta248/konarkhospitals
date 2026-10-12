"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { HOSPITAL } from "@konark/shared";

type Status = "idle" | "submitting" | "error";

const inputClass =
  "h-9 w-full rounded-lg border border-ink-200 bg-white px-3 text-[13px] text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export function HeroContactForm() {
  const router = useRouter();
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
        message: data.get("message"),
        subject: "Hero quick contact form",
      });
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full rounded-xl2 border border-white/15 bg-white/95 p-4 shadow-floating backdrop-blur">
      <h2 className="font-display text-[13.5px] font-bold text-ink-950">Request a Call Back</h2>
      <p className="mt-0.5 text-[11px] leading-snug text-ink-500">We&apos;ll get back to you shortly.</p>

      <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
        <input name="name" required placeholder="Your name" className={inputClass} />
        <PhoneInput className={inputClass} />
        <textarea
          name="message"
          required
          rows={1}
          placeholder="How can we help?"
          className="w-full resize-none rounded-lg border border-ink-200 bg-white px-3 py-2 text-[13px] text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />

        {status === "error" && (
          <p className="text-[11px] text-red-600">Something went wrong. Please call us at {HOSPITAL.phone} instead.</p>
        )}

        <Button type="submit" size="sm" disabled={status === "submitting"} className="mt-0.5 w-full justify-center">
          {status === "submitting" ? <Loader2 size={14} className="animate-spin" /> : <Send size={13} />}
          {status === "submitting" ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
}
