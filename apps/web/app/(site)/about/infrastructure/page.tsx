import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { DepartmentImage } from "@/components/ui/DepartmentImage";

export const metadata: Metadata = {
  title: "Infrastructure",
  description: "Modern diagnostics, operation theatres and inpatient facilities at Konark Hospitals.",
};

const facilities = [
  { src: "/images/facilities/operation-theatre.jpg", title: "State-of-the-art Operation Theatres", description: "Fully equipped OTs with advanced imaging and monitoring systems for surgical procedures across specialities." },
  { src: "/images/facilities/icu.jpg", title: "Well-equipped Intensive Care Unit (ICU)", description: "Round-the-clock critical care monitoring staffed by experienced intensivists and nursing teams." },
  { src: "/images/facilities/nicu.png", title: "Advanced Neonatal Intensive Care Unit (NICU)", description: "Specialised care for newborns requiring extra monitoring, including premature and high-risk infants." },
  { src: "/images/facilities/private-rooms.png", title: "Private Rooms", description: "Private rooms with modern facilities for the comfort of patients and their attendants." },
  { src: "/images/facilities/general-wards.png", title: "General Wards", description: "Comfortable, well-monitored ward accommodation for inpatient recovery and care." },
  { src: "", title: "Sharing Rooms", description: "Shared room accommodation offering quality care at a more affordable cost for inpatients." },
  { src: "/images/facilities/post-op-care.png", title: "Post-Operative Care Unit", description: "Dedicated recovery monitoring immediately following surgical procedures." },
  { src: "", title: "Casualty Ward", description: "A dedicated casualty ward for immediate assessment and stabilisation of emergency cases." },
];

export default function InfrastructurePage() {
  return (
    <>
      <PageHeader
        eyebrow="About Konark"
        title="Infrastructure"
        description="A 100-bed multispeciality facility built for complete, dignified patient care — from operation theatres to recovery."
        breadcrumbs={[{ label: "About Konark", href: "/about" }, { label: "Infrastructure" }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility) => (
            <div key={facility.title} className="overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card">
              <DepartmentImage src={facility.src} alt={facility.title} sizes="(min-width: 1024px) 380px, 90vw" className="aspect-[4/3]" />
              <div className="p-4">
                <h3 className="text-[14.5px] font-semibold text-ink-900">{facility.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
