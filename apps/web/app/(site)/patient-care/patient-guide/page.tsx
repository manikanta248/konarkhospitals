import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ChecklistCard } from "@/components/patient-care/ChecklistCard";
import { CalendarCheck, Home, IdCard, Users } from "lucide-react";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Patient Guide",
  description: "What to expect and what to bring for your visit to Konark Hospitals — for OPD consultations and inpatient stays.",
};

export default function PatientGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Care"
        title="Your Guide to Visiting Konark Hospitals"
        description="A quick reference for what to expect and what to bring — whether you're here for an OPD consultation or an inpatient stay."
        breadcrumbs={[{ label: "Patient Care", href: "/patient-care" }, { label: "Patient Guide" }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          <ChecklistCard
            icon={CalendarCheck}
            title="Before Your OPD Visit"
            items={[
              `Book your appointment in advance — OPD hours are ${HOSPITAL.opdHours}`,
              "Carry any previous prescriptions, reports or scans related to your condition",
              "Arrive 15 minutes early for registration",
              "Carry a valid photo ID for registration",
            ]}
          />
          <ChecklistCard
            icon={IdCard}
            title="At Registration"
            items={[
              "New patients: registration takes a few minutes with basic details and ID proof",
              "Returning patients: quote your UHID for faster check-in",
              "Insurance/TPA patients should inform the desk at registration",
            ]}
          />
          <ChecklistCard
            icon={Home}
            title="During an Inpatient Stay"
            items={[
              "Private and shared rooms available depending on your treatment plan",
              "One attendant permitted to stay with the patient in most wards",
            ]}
          />
          <ChecklistCard
            icon={Users}
            title="For Attendants & Visitors"
            items={[
              "Attendants and visitors are welcome to visit anytime",
              "Only one visitor at a time is encouraged in ICU/critical care areas",
              "Please maintain silence in patient care areas",
            ]}
          />
        </div>
      </Container>
    </>
  );
}
