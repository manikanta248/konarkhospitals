import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Department } from "@konark/shared";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function DepartmentsGrid({ departments, total }: { departments: Department[]; total: number }) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Specialities</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink-950 sm:text-3xl">Medical Services We Offer</h2>
          </div>
          <p className="max-w-sm text-sm text-ink-500">
            {total}+ specialities backed by dedicated consultants, diagnostics and dedicated care.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {departments.map((dept) => (
            <Link
              key={dept.slug}
              href={`/services/${dept.slug}`}
              className="group flex flex-col justify-between rounded-xl border border-ink-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card sm:p-5"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[15px] font-semibold leading-snug text-ink-900">{dept.name}</h3>
                  {dept.opdOnly && (
                    <span className="shrink-0 whitespace-nowrap rounded-full bg-ink-50 px-2 py-0.5 text-[10px] font-medium text-ink-500">
                      OPD Only
                    </span>
                  )}
                </div>
                <p className="mt-1.5 hidden text-[13px] leading-relaxed text-ink-500 sm:line-clamp-2 sm:block">
                  {dept.shortDescription}
                </p>
              </div>
              <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600">
                Learn more
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>

        {total > departments.length && (
          <div className="mt-6 flex justify-center">
            <ButtonLink href="/services" variant="outline" size="sm">
              View All Specialities
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
