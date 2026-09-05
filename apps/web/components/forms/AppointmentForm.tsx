"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { Department, Doctor } from "@konark/shared";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { HOSPITAL } from "@konark/shared";

type Status = "idle" | "submitting" | "success" | "error";

const TYPE_LABELS: Record<string, string> = {
  appointment: "General Appointment",
  consultation: "Doctor Consultation",
  "second-opinion": "Second Opinion",
  international: "International Patient Appointment",
};

const inputClass =
  "h-11 w-full rounded-lg border border-ink-200 bg-white px-3.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export function AppointmentForm({ departments, doctors }: { departments: Department[]; doctors: Doctor[] }) {
  const searchParams = useSearchParams();
  const initialDept = searchParams.get("department") ?? "";
  const initialDoctor = searchParams.get("doctor") ?? "";
  const initialType = searchParams.get("type") ?? (initialDoctor ? "consultation" : "appointment");

  const [status, setStatus] = useState<Status>("idle");
  const [departmentSlug, setDepartmentSlug] = useState(initialDept || (doctors.find((d) => d.slug === initialDoctor)?.departmentSlug ?? ""));
  const [doctorSlug, setDoctorSlug] = useState(initialDoctor);

  const filteredDoctors = useMemo(
    () => (departmentSlug ? doctors.filter((d) => d.departmentSlug === departmentSlug) : doctors),
    [doctors, departmentSlug]
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await api.post("/api/appointments", {
        patientName: data.get("patientName"),
        phone: data.get("phone"),
        email: data.get("email"),
        departmentSlug: data.get("departmentSlug") || undefined,
        doctorSlug: data.get("doctorSlug") || undefined,
        preferredDate: data.get("preferredDate"),
        preferredTime: data.get("preferredTime"),
        message: data.get("message"),
        type: data.get("type"),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl2 border border-brand-100 bg-brand-50/60 py-14 text-center">
        <CheckCircle2 size={36} className="text-brand-600" />
        <p className="text-[16px] font-semibold text-ink-900">Request received</p>
        <p className="max-w-xs text-sm text-ink-600">
          Our care coordinators will call you shortly to confirm your appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="hidden" name="type" value={initialType} />

      <div className="rounded-lg bg-brand-50 px-3.5 py-2.5 text-[13px] font-medium text-brand-700">
        {TYPE_LABELS[initialType] ?? "General Appointment"}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-600">Full Name *</label>
          <input name="patientName" required className={inputClass} placeholder="Patient's name" />
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-600">Department</label>
          <select
            name="departmentSlug"
            value={departmentSlug}
            onChange={(e) => {
              setDepartmentSlug(e.target.value);
              setDoctorSlug("");
            }}
            className={inputClass}
          >
            <option value="">Select a department</option>
            {departments.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-600">Preferred Doctor</label>
          <select name="doctorSlug" value={doctorSlug} onChange={(e) => setDoctorSlug(e.target.value)} className={inputClass}>
            <option value="">No preference</option>
            {filteredDoctors.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-600">Preferred Date</label>
          <input name="preferredDate" type="date" className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-ink-600">Preferred Time</label>
          <select name="preferredTime" className={inputClass} defaultValue="">
            <option value="">Any time</option>
            <option value="Morning (11 AM - 3 PM)">Morning (11 AM – 3 PM)</option>
            <option value="Evening (6 PM - 9 PM)">Evening (6 PM – 9 PM)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink-600">Message</label>
        <textarea
          name="message"
          rows={3}
          className="w-full resize-none rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
          placeholder="Briefly describe your symptoms or reason for visit (optional)"
        />
      </div>

      {status === "error" && (
        <p className="text-[13px] text-red-600">
          Something went wrong submitting your request. Please call us directly at {HOSPITAL.phone} instead.
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="mt-1 w-full">
        {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
        {status === "submitting" ? "Submitting..." : "Request Appointment"}
      </Button>
    </form>
  );
}
