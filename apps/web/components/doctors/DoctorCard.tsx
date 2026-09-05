import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { Doctor } from "@konark/shared";
import { DoctorImage } from "@/components/ui/DoctorImage";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <Link
      href={`/doctors/${doctor.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-floating"
    >
      <DoctorImage
        slug={doctor.slug}
        name={doctor.name}
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
        className="aspect-[4/5] transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[15px] font-semibold leading-snug text-ink-900">{doctor.name}</p>
        <p className="mt-0.5 text-xs font-medium text-brand-600">{doctor.designation}</p>

        <div className="mt-2.5 flex items-center gap-1.5 text-[12.5px] text-ink-500">
          <GraduationCap size={13} className="shrink-0 text-ink-400" />
          <span className="line-clamp-1">{doctor.qualifications}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700">
            {doctor.departmentName}
          </span>
          <span className="text-[12.5px] font-medium text-ink-500">{doctor.experienceYears}+ yrs</span>
        </div>
      </div>
    </Link>
  );
}
