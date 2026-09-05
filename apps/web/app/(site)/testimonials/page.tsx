import type { Metadata } from "next";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { getTestimonials } from "@/lib/content";
import { initialsOf, gradientFor } from "@/lib/avatar";

export const metadata: Metadata = {
  title: "Patient Testimonials",
  description: "Read what patients say about their experience at Konark Hospitals.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHeader
        eyebrow="About Konark"
        title="What Our Patients Say"
        description="Real experiences shared by patients and families who have been cared for at Konark Hospitals."
        breadcrumbs={[{ label: "Patient Testimonials" }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="flex flex-col rounded-xl2 border border-ink-100 bg-white p-6 shadow-card">
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                  style={{ background: `linear-gradient(150deg, ${gradientFor(t.patientName)[0]}, ${gradientFor(t.patientName)[1]})` }}
                >
                  {initialsOf(t.patientName)}
                </div>
                <span className="text-sm font-semibold text-ink-900">{t.patientName}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </>
  );
}
