import type { Metadata } from "next";
import { HeartHandshake, TrendingUp, Users } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { CareerCard } from "@/components/careers/CareerCard";
import { getCareers } from "@/lib/content";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Careers",
  description: "Explore current job openings at Konark Hospitals, Jeedimetla, Hyderabad.",
};

const perks = [
  { icon: HeartHandshake, title: "Purpose-driven work", description: "Be part of a team guided by a genuine mission to serve the community." },
  { icon: TrendingUp, title: "Room to grow", description: "Hands-on clinical and administrative experience across a multispeciality environment." },
  { icon: Users, title: "Collaborative teams", description: "Work alongside experienced consultants and a supportive nursing and admin staff." },
];

export default async function CareersPage() {
  const jobs = await getCareers();

  return (
    <>
      <PageHeader
        eyebrow="Join Us"
        title="Careers at Konark Hospitals"
        description="We're always looking for compassionate, skilled people to join our clinical and administrative teams in Jeedimetla, Hyderabad."
        breadcrumbs={[{ label: "Careers" }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl2 border border-ink-100 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Icon size={18} />
              </span>
              <h3 className="mt-3 text-[14.5px] font-semibold text-ink-900">{title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{description}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-display text-lg font-bold text-ink-950">Current Openings</h2>
        <div className="mt-5 flex flex-col gap-3">
          {jobs.length > 0 ? (
            jobs.map((job) => <CareerCard key={job.slug} job={job} />)
          ) : (
            <p className="text-sm text-ink-500">
              No open positions right now — check back soon, or send your resume to{" "}
              <a href={`mailto:${HOSPITAL.email}`} className="font-medium text-brand-600">
                {HOSPITAL.email}
              </a>
              .
            </p>
          )}
        </div>
      </Container>
    </>
  );
}
