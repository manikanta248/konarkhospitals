import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Department } from "@konark/shared";
import { DepartmentImage } from "@/components/ui/DepartmentImage";

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <Link
      href={`/services/${department.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-floating"
    >
      <DepartmentImage
        src={department.heroImage}
        alt={department.name}
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
        className="aspect-[16/10] transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold leading-snug text-ink-900">{department.name}</h3>
          {department.opdOnly && (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-ink-50 px-2 py-0.5 text-[10px] font-medium text-ink-500">
              OPD Only
            </span>
          )}
        </div>
        <p className="mt-1.5 hidden text-[13px] leading-relaxed text-ink-500 sm:line-clamp-2 sm:block">
          {department.shortDescription}
        </p>
        <span className="mt-auto flex items-center gap-1 pt-4 text-xs font-semibold text-brand-600">
          Explore department
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
