import type { Metadata } from "next";
import { Quote } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { DoctorImage } from "@/components/ui/DoctorImage";
import { ABOUT } from "@konark/shared";

export const metadata: Metadata = {
  title: "Leadership",
  description: "A message from the Chairperson of Konark Hospitals.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Konark"
        title="Leadership"
        description="Meet the founder whose vision continues to guide how care is delivered at Konark Hospitals."
        breadcrumbs={[{ label: "About Konark", href: "/about" }, { label: "Leadership" }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
          <div>
            <DoctorImage
              slug={ABOUT.founder.slug}
              name={ABOUT.founder.name}
              sizes="280px"
              className="aspect-[4/5] w-full max-w-[280px] rounded-xl2 shadow-card"
            />
            <p className="mt-4 text-[15px] font-semibold text-ink-900">{ABOUT.founder.name}</p>
            <p className="text-sm text-brand-600">{ABOUT.founder.title}</p>
            <div className="mt-4">
              <ButtonLink href={`/doctors/${ABOUT.founder.slug}`} variant="outline" size="sm">
                View Doctor Profile
              </ButtonLink>
            </div>
          </div>

          <div className="relative rounded-xl2 border border-ink-100 bg-brand-50/40 p-6 sm:p-8">
            <Quote size={32} className="text-brand-200" />
            <div className="mt-2 flex flex-col gap-4">
              {ABOUT.chairpersonMessage.map((para, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-ink-700">
                  {para}
                </p>
              ))}
            </div>
            <p className="mt-6 text-sm font-semibold text-ink-900">— {ABOUT.founder.name}, {ABOUT.founder.title}</p>
          </div>
        </div>
      </Container>
    </>
  );
}
