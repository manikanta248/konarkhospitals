import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { DepartmentImage } from "@/components/ui/DepartmentImage";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getDepartment, getDepartments, getDoctors } from "@/lib/content";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const department = await getDepartment(params.slug);
  if (!department) return {};
  return { title: department.name, description: department.shortDescription };
}

export async function generateStaticParams() {
  const departments = await getDepartments();
  return departments.map((d) => ({ slug: d.slug }));
}

export default async function DepartmentPage({ params }: { params: { slug: string } }) {
  const [department, allDoctors] = await Promise.all([getDepartment(params.slug), getDoctors()]);
  if (!department) notFound();

  const doctors = allDoctors.filter((d) => d.departmentSlug === department.slug);

  return (
    <>
      <div className="border-b border-ink-100 bg-gradient-to-b from-brand-50/60 to-white py-10 sm:py-12">
        <Container className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
          <div>
            <nav className="mb-4 text-xs text-ink-500">
              <span>Home / Medical Services / </span>
              <span className="font-medium text-ink-700">{department.name}</span>
            </nav>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-[1.75rem] font-bold leading-tight text-ink-950 sm:text-3xl">
                {department.name}
              </h1>
              {department.opdOnly && (
                <span className="shrink-0 whitespace-nowrap rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-600">
                  OPD Only
                </span>
              )}
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{department.description || department.shortDescription}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/book-appointment?department=${department.slug}`} className="w-full sm:w-auto">
                Book Appointment
              </ButtonLink>
              <ButtonLink href={`/doctors?department=${department.slug}`} variant="outline" className="w-full sm:w-auto">
                View Specialists
              </ButtonLink>
            </div>
          </div>

          <DepartmentImage
            src={department.heroImage}
            alt={department.name}
            sizes="(min-width: 1024px) 480px, 90vw"
            className="aspect-[4/3] w-full rounded-xl2 shadow-card"
          />
        </Container>
      </div>

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-3">
        {department.services.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-bold text-ink-950">Services</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {department.services.map((s) => (
                <li key={s} className="flex items-start gap-2 text-[14px] text-ink-700">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {department.conditionsTreated.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-bold text-ink-950">Conditions Treated</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {department.conditionsTreated.map((c) => (
                <span key={c} className="rounded-full bg-ink-50 px-3 py-1.5 text-[13px] font-medium text-ink-700">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {department.procedures.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-bold text-ink-950">Procedures</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {department.procedures.map((p) => (
                <span key={p} className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[13px] font-medium text-brand-700">
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>

      {doctors.length > 0 && (
        <Container className="pb-4 sm:pb-6">
          <h2 className="font-display text-lg font-bold text-ink-950">Specialists in {department.name}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {doctors.map((d) => (
              <DoctorCard key={d.slug} doctor={d} />
            ))}
          </div>
        </Container>
      )}

      {department.faqs.length > 0 && (
        <Container className="py-10 sm:py-12">
          <h2 className="font-display text-lg font-bold text-ink-950">Frequently Asked Questions</h2>
          <div className="mt-5 max-w-2xl">
            <FaqAccordion faqs={department.faqs} />
          </div>
        </Container>
      )}

      <CtaBanner />
    </>
  );
}
