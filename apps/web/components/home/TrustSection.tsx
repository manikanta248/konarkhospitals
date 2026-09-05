import Image from "next/image";
import { BadgeCheck, Building2, HandHeart, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/Container";

const points = [
  { icon: Stethoscope, title: "Unmatched Expertise", copy: "Carefully selected specialists across 12+ disciplines, from fertility to trauma surgery." },
  { icon: Building2, title: "Complete Infrastructure", copy: "Modern diagnostics, operation theatres and inpatient facilities under one roof." },
  { icon: HandHeart, title: "360° Patient-Centric Care", copy: "Coordinated care across consultation, admission, treatment and follow-up." },
  { icon: BadgeCheck, title: "Easy Affordability", copy: "Transparent pricing and insurance/TPA support to keep quality care within reach." },
];

export function TrustSection() {
  return (
    <section className="bg-ink-950 py-16 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-xl2 lg:order-1">
          <Image
            src="/images/facilities/operation-theatre.jpg"
            alt="Operation theatre at Konark Hospitals"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 520px, 90vw"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Why Konark</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
            World-class healthcare, within reach of all.
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, copy }) => (
              <div key={title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
                  <Icon size={18} />
                </span>
                <h3 className="mt-3 text-[15px] font-semibold text-white">{title}</h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-400">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
