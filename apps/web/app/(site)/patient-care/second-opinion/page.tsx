import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessSteps } from "@/components/patient-care/ProcessSteps";
import { ChecklistCard } from "@/components/patient-care/ChecklistCard";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Second Opinion",
  description: "Get a specialist second opinion on your diagnosis or treatment plan from Konark Hospitals.",
};

const steps = [
  { title: "Share your reports", description: "Submit your existing diagnosis, test reports, scans and treatment history to our team." },
  { title: "Specialist review", description: "A relevant consultant at Konark Hospitals reviews your case in detail." },
  { title: "Consultation", description: "We schedule a consultation — in person or over a call — to discuss the findings with you." },
  { title: "Recommendation", description: "You receive a clear, independent opinion on diagnosis and treatment options to help you decide with confidence." },
];

export default function SecondOpinionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Care"
        title="Get a Second Opinion"
        description="Facing a major diagnosis or a recommended surgery? Our specialists can review your case and offer an independent opinion to help you make an informed decision."
        breadcrumbs={[{ label: "Patient Care", href: "/patient-care" }, { label: "Second Opinion" }]}
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display text-lg font-bold text-ink-950">How It Works</h2>
          <div className="mt-6">
            <ProcessSteps steps={steps} />
          </div>
          <div className="mt-8">
            <ButtonLink href="/book-appointment?type=second-opinion">Request a Second Opinion</ButtonLink>
          </div>
        </div>

        <aside>
          <ChecklistCard
            icon={FileText}
            title="What to Share"
            items={["Current diagnosis or suspected condition", "Recent test reports, scans or biopsy results", "Details of any treatment already suggested", "A brief note on your symptoms and history"]}
          />
        </aside>
      </Container>
    </>
  );
}
