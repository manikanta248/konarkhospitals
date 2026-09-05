import type { Metadata } from "next";
import { FileText, Globe, Languages, PlaneLanding } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ChecklistCard } from "@/components/patient-care/ChecklistCard";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "International Patients",
  description: "Support for international patients travelling to Konark Hospitals, Hyderabad for treatment.",
};

const services = [
  { icon: FileText, title: "Treatment Planning", description: "Share your medical reports in advance and receive a treatment plan and cost estimate before you travel." },
  { icon: PlaneLanding, title: "Visit Coordination", description: "Our team helps coordinate your appointment schedule so your visit is as efficient as possible." },
  { icon: Languages, title: "Language Support", description: "Our team communicates in English and Hindi, with additional regional languages available among our staff." },
  { icon: Globe, title: "Ongoing Communication", description: "Stay in touch with your care team remotely for follow-up questions after you return home." },
];

export default function InternationalPatientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Acquisition"
        title="Care for International Patients"
        description="Travelling to Hyderabad for treatment? Our team helps coordinate your visit, from your first enquiry to follow-up care after you return home."
        breadcrumbs={[{ label: "International Patients" }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4 rounded-xl2 border border-ink-100 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon size={20} />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-ink-900">{title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-display text-lg font-bold text-ink-950">How to Get Started</h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">
              Email us your medical reports and a brief description of your condition at{" "}
              <a href={`mailto:${HOSPITAL.email}`} className="font-medium text-brand-600">{HOSPITAL.email}</a>, or
              submit a request through our appointment form. A member of our team will respond with next steps,
              including an estimated cost and timeline, typically within 2–3 business days.
            </p>
            <div className="mt-6">
              <ButtonLink href="/book-appointment?type=international">Submit an Enquiry</ButtonLink>
            </div>
          </div>

          <ChecklistCard
            icon={FileText}
            title="What to Share With Us"
            items={["Recent medical reports, scans or test results", "A brief description of your condition and any prior treatment", "Your preferred travel dates, if known", "Any specific doctor or department you'd like to consult"]}
          />
        </div>
      </Container>
    </>
  );
}
