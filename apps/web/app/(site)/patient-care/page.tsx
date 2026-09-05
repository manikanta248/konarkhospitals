import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, FileText, Landmark, LogIn, Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Patient Care",
  description: "Everything you need for your visit — insurance, medical records, admission, discharge, and second opinions.",
};

const links = [
  { href: "/patient-care/insurance-tpa", icon: Landmark, title: "Insurance & TPA", description: "Cashless treatment coordination with your insurance provider or TPA." },
  { href: "/patient-care/medical-records", icon: FileText, title: "Medical Records", description: "Request copies of your reports, discharge summaries and prescriptions." },
  { href: "/patient-care/patient-guide", icon: ClipboardList, title: "Patient Guide", description: "What to expect and what to bring for your OPD visit or inpatient stay." },
  { href: "/patient-care/admission-discharge", icon: LogIn, title: "Admission & Discharge", description: "Step-by-step process for planned admissions and discharge." },
  { href: "/patient-care/second-opinion", icon: Stethoscope, title: "Second Opinion", description: "Get a specialist review of your diagnosis or treatment plan." },
];

export default function PatientCarePage() {
  return (
    <>
      <PageHeader
        eyebrow="Patient Care"
        title="Support for Every Step of Your Visit"
        description="From insurance coordination to admission and discharge — here's how we make your time at Konark Hospitals easier."
        breadcrumbs={[{ label: "Patient Care" }]}
      />
      <Container className="py-10 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map(({ href, icon: Icon, title, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col rounded-xl2 border border-ink-100 bg-white p-5 shadow-card transition-shadow hover:shadow-floating"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon size={19} />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-ink-900">{title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-500">{description}</p>
              <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600">
                Learn more
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
