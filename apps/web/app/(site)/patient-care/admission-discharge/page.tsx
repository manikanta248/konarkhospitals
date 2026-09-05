import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ProcessSteps } from "@/components/patient-care/ProcessSteps";
import { ChecklistCard } from "@/components/patient-care/ChecklistCard";
import { IdCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Admission & Discharge",
  description: "What to expect during admission and discharge at Konark Hospitals.",
};

const admissionSteps = [
  { title: "Doctor's advice", description: "Your consultant recommends admission based on your diagnosis and treatment plan." },
  { title: "Registration & documentation", description: "Complete admission paperwork at the front desk, including insurance/TPA verification if applicable." },
  { title: "Room allotment", description: "You're assigned a room or ward bed based on availability and your treatment requirement." },
  { title: "Treatment begins", description: "Nursing and medical teams take over your care as per your consultant's treatment plan." },
];

const dischargeSteps = [
  { title: "Discharge advised", description: "Your consultant clears you for discharge once your condition is stable for home care." },
  { title: "Final billing", description: "Our billing desk prepares your final bill, coordinating with insurance/TPA if your treatment was cashless." },
  { title: "Discharge summary", description: "You receive a discharge summary with diagnosis, treatment given, and follow-up instructions." },
  { title: "Take-home medication & follow-up", description: "Medicines and clear instructions for follow-up visits or home care are provided before you leave." },
];

export default function AdmissionDischargePage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Care"
        title="Admission & Discharge Process"
        description="A clear step-by-step walkthrough of what happens when you're admitted to Konark Hospitals, and what to expect at discharge."
        breadcrumbs={[{ label: "Patient Care", href: "/patient-care" }, { label: "Admission & Discharge" }]}
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-lg font-bold text-ink-950">Admission</h2>
          <div className="mt-6">
            <ProcessSteps steps={admissionSteps} />
          </div>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-ink-950">Discharge</h2>
          <div className="mt-6">
            <ProcessSteps steps={dischargeSteps} />
          </div>
        </div>
      </Container>

      <Container className="pb-14 sm:pb-16">
        <ChecklistCard
          icon={IdCard}
          title="Documents to Carry at Admission"
          items={["Photo ID proof", "Insurance/TPA card and policy details, if applicable", "Doctor's admission advice or referral letter", "Previous medical records related to your condition"]}
        />
      </Container>
    </>
  );
}
