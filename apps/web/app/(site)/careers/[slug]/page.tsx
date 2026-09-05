import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Briefcase, CheckCircle2, MapPin, Timer } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getCareer } from "@/lib/content";
import { HOSPITAL } from "@konark/shared";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const job = await getCareer(params.slug);
  if (!job) return {};
  return { title: job.title, description: job.description };
}

export default async function CareerDetailPage({ params }: { params: { slug: string } }) {
  const job = await getCareer(params.slug);
  if (!job) notFound();

  const mailtoHref = `mailto:${HOSPITAL.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}&body=${encodeURIComponent("Hi Konark Hospitals HR team,\n\nI would like to apply for this position. Please find my resume attached.\n\n")}`;

  return (
    <>
      <PageHeader
        eyebrow={job.department}
        title={job.title}
        breadcrumbs={[{ label: "Careers", href: "/careers" }, { label: job.title }]}
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-[13px] font-medium text-ink-600">
              <MapPin size={14} />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-[13px] font-medium text-ink-600">
              <Briefcase size={14} />
              {job.type}
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-ink-50 px-3 py-1.5 text-[13px] font-medium text-ink-600">
              <Timer size={14} />
              {job.experience}
            </span>
          </div>

          <h2 className="mt-8 text-[15px] font-semibold text-ink-900">About the Role</h2>
          <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">{job.description}</p>

          {job.responsibilities.length > 0 && (
            <>
              <h2 className="mt-8 text-[15px] font-semibold text-ink-900">Responsibilities</h2>
              <ul className="mt-3 flex flex-col gap-2.5">
                {job.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[14px] text-ink-700">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </>
          )}

          {job.requirements.length > 0 && (
            <>
              <h2 className="mt-8 text-[15px] font-semibold text-ink-900">Requirements</h2>
              <ul className="mt-3 flex flex-col gap-2.5">
                {job.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-[14px] text-ink-700">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <aside className="h-fit rounded-xl2 border border-ink-100 bg-ink-50/60 p-5">
          <p className="text-sm font-semibold text-ink-900">Ready to apply?</p>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
            Email your resume and a short note about yourself — our HR team reviews every application.
          </p>
          <ButtonLink href={mailtoHref} external className="mt-4 w-full">
            Apply via Email
          </ButtonLink>
        </aside>
      </Container>
    </>
  );
}
