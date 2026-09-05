import { Star } from "lucide-react";
import type { Testimonial } from "@konark/shared";
import { Container } from "@/components/ui/Container";
import { initialsOf, gradientFor } from "@/lib/avatar";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-brand-50/60 py-16 lg:py-20">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Patient Stories</p>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink-950 sm:text-3xl">What Our Patients Say</h2>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
          {testimonials.slice(0, 3).map((t) => (
            <figure
              key={t.id}
              className="flex w-[82%] shrink-0 flex-col rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:w-auto sm:shrink"
            >
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
    </section>
  );
}
