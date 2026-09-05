import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Phone, Siren } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getDepartments, getDoctors } from "@/lib/content";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book an appointment or consultation at Konark Hospitals, Jeedimetla, Hyderabad.",
};

export default async function BookAppointmentPage() {
  const [departments, doctors] = await Promise.all([getDepartments(), getDoctors()]);

  return (
    <>
      <PageHeader
        eyebrow="Patient Acquisition"
        title="Book an Appointment"
        description="Fill in a few details and our care coordinators will call you back to confirm your appointment."
        breadcrumbs={[{ label: "Book Appointment" }]}
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_320px]">
        <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <Suspense fallback={null}>
            <AppointmentForm departments={departments} doctors={doctors} />
          </Suspense>
        </div>

        <aside className="flex flex-col gap-4">
          <a href={`tel:${HOSPITAL.emergency.replace(/\s/g, "")}`} className="flex items-center gap-3 rounded-xl2 bg-red-500 p-5 text-white">
            <Siren size={22} className="shrink-0" />
            <div>
              <p className="text-xs font-medium text-red-100">Medical emergency?</p>
              <p className="text-base font-bold">{HOSPITAL.emergency}</p>
            </div>
          </a>

          <div className="rounded-xl2 border border-ink-100 p-5">
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink-900">OPD Hours</p>
                <p className="mt-1 text-[13.5px] text-ink-600">{HOSPITAL.opdHours}</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Prefer to call?</p>
                <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="mt-1 block text-[13.5px] text-brand-700">
                  {HOSPITAL.phone}
                </a>
              </div>
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
