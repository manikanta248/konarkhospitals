import type { Metadata } from "next";
import { FileCheck2, IdCard, Phone, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessSteps } from "@/components/patient-care/ProcessSteps";
import { ChecklistCard } from "@/components/patient-care/ChecklistCard";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Insurance & TPA",
  description: "Cashless treatment support and insurance/TPA coordination at Konark Hospitals.",
};

const steps = [
  { title: "Verify your coverage", description: "Share your insurance/TPA card and policy details with our billing desk at admission — we'll confirm what's covered before treatment begins." },
  { title: "Pre-authorization", description: "For planned admissions, our insurance desk submits the pre-authorization request to your insurer or TPA in advance to avoid delays." },
  { title: "Treatment", description: "You receive treatment as advised by your consultant, with our team tracking the approval status alongside your care." },
  { title: "Cashless settlement or reimbursement", description: "Where cashless approval comes through, your insurer settles the bill directly. If not, we provide complete documentation for reimbursement claims." },
];

export default function InsuranceTpaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Care"
        title="Insurance & TPA Support"
        description="Our billing and insurance desk coordinates with insurance providers and third-party administrators (TPAs) to make cashless treatment as smooth as possible."
        breadcrumbs={[{ label: "Patient Care", href: "/patient-care" }, { label: "Insurance & TPA" }]}
      />
      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display text-lg font-bold text-ink-950">How Cashless Treatment Works</h2>
          <div className="mt-6">
            <ProcessSteps steps={steps} />
          </div>
        </div>

        <aside className="flex flex-col gap-5">
          <ChecklistCard
            icon={IdCard}
            title="Documents to Carry"
            items={["Insurance/TPA card", "Photo ID proof", "Policy number & insurer details", "Doctor's referral or admission advice, if planned"]}
          />
          <div className="rounded-xl2 border border-brand-100 bg-brand-50/60 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand-800">
              <Phone size={15} />
              Talk to our billing desk
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
              Have questions about your specific policy or coverage? Call us and we'll help you understand what's covered.
            </p>
            <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="mt-3 inline-block text-sm font-semibold text-brand-700">
              {HOSPITAL.phone}
            </a>
          </div>
        </aside>
      </Container>

      <Container className="pb-14 sm:pb-16">
        <div className="grid gap-4 rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:grid-cols-3 sm:p-8">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Coverage verification</p>
              <p className="mt-1 text-[13px] text-ink-500">Confirmed before treatment wherever possible.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <FileCheck2 size={20} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Full documentation</p>
              <p className="mt-1 text-[13px] text-ink-500">Complete paperwork support for approvals and claims.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={20} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Dedicated desk</p>
              <p className="mt-1 text-[13px] text-ink-500">A billing coordinator available for queries during your stay.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-xl2 bg-ink-950 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-base font-semibold text-white">Planning an admission?</p>
            <p className="mt-1 text-sm text-ink-400">Reach out early so we can start your pre-authorization in advance.</p>
          </div>
          <ButtonLink href="/contact" variant="inverse">
            Contact Billing Desk
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
