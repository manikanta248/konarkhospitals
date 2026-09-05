import type { Metadata } from "next";
import { Clock, IdCard, Mail } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessSteps } from "@/components/patient-care/ProcessSteps";
import { ChecklistCard } from "@/components/patient-care/ChecklistCard";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Medical Records",
  description: "Request copies of your medical records, discharge summaries and reports from Konark Hospitals.",
};

const steps = [
  { title: "Submit a request", description: "Visit the medical records desk in person, or email us your request with your UHID (unique hospital ID) and the records you need." },
  { title: "Identity & authorization check", description: "We verify your identity, or the authorization letter if someone is collecting records on your behalf." },
  { title: "Processing", description: "Routine requests are typically ready within 2–3 working days; older or archived records may take a little longer." },
  { title: "Collection or delivery", description: "Collect your records in person, or ask about digital/email delivery for select document types." },
];

export default function MedicalRecordsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Care"
        title="Request Your Medical Records"
        description="Discharge summaries, lab reports, imaging reports and prescriptions — request certified copies of your records anytime."
        breadcrumbs={[{ label: "Patient Care", href: "/patient-care" }, { label: "Medical Records" }]}
      />
      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display text-lg font-bold text-ink-950">How to Request Records</h2>
          <div className="mt-6">
            <ProcessSteps steps={steps} />
          </div>
        </div>

        <aside className="flex flex-col gap-5">
          <ChecklistCard
            icon={IdCard}
            title="What You'll Need"
            items={["Photo ID proof", "UHID / patient registration number (if known)", "Approximate date of treatment", "Authorization letter, if requesting on behalf of another patient"]}
          />
          <div className="rounded-xl2 border border-ink-100 bg-ink-50/60 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink-900">
              <Clock size={15} className="text-brand-600" />
              Records Desk Hours
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-600">{HOSPITAL.opdHours}</p>
          </div>
        </aside>
      </Container>

      <Container className="pb-14 sm:pb-16">
        <div className="flex flex-col items-start gap-4 rounded-xl2 bg-ink-950 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-base font-semibold text-white">Need help with a records request?</p>
            <p className="mt-1 flex items-center gap-2 text-sm text-ink-400">
              <Mail size={14} />
              {HOSPITAL.email}
            </p>
          </div>
          <ButtonLink href="/contact" variant="inverse">
            Contact Us
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
