import Link from "next/link";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import type { CareerPosting } from "@konark/shared";

export function CareerCard({ job }: { job: CareerPosting }) {
  return (
    <Link
      href={`/careers/${job.slug}`}
      className="group flex flex-col justify-between rounded-xl2 border border-ink-100 bg-white p-5 shadow-card transition-shadow hover:shadow-floating sm:flex-row sm:items-center"
    >
      <div>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700">{job.department}</span>
        <h3 className="mt-2.5 text-[15px] font-semibold text-ink-900">{job.title}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-ink-500">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase size={13} />
            {job.type} · {job.experience}
          </span>
        </div>
      </div>
      <span className="mt-4 flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-600 sm:mt-0">
        View & Apply
        <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
