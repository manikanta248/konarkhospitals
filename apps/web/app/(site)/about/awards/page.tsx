import type { Metadata } from "next";
import { Award, Building2, HeartHandshake, Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ABOUT, HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Awards & Recognition",
  description: "Milestones and recognition in Konark Hospitals' journey as a multispeciality hospital in Hyderabad.",
};

const milestones = [
  { icon: HeartHandshake, title: "Founded on a Trust's Legacy", description: `Konark Hospitals operates under the guiding principles of the ${ABOUT.trustName}, carrying forward a mission of accessible, compassionate care.` },
  { icon: Stethoscope, title: "Recognised Fertility Expertise", description: `Founded by ${ABOUT.founder.name}, one of the leading names in fertility medicine in South India, with close to three decades of clinical experience.` },
  { icon: Building2, title: `${ABOUT.bedCount} Multispeciality Facility`, description: "A full-scale hospital in Jeedimetla offering 12+ specialities, modern diagnostics and 24/7 emergency care under one roof." },
  { icon: Award, title: "Positioned Among Hyderabad's Leading Hospitals", description: `${HOSPITAL.name} is recognised as a leading multispeciality and fertility care provider serving Jeedimetla, Kompally and surrounding Hyderabad.` },
];

export default function AwardsPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Konark"
        title="Awards & Recognition"
        description="Milestones in our journey toward becoming one of Hyderabad's trusted multispeciality hospitals."
        breadcrumbs={[{ label: "About Konark", href: "/about" }, { label: "Awards & Recognition" }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-2">
          {milestones.map(({ icon: Icon, title, description }) => (
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

        <p className="mt-8 text-sm text-ink-400">
          Formal accreditations and awards will be added here as they are received.
        </p>
      </Container>
    </>
  );
}
