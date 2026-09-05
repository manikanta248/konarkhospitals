import { MapPin } from "lucide-react";
import type { HospitalEvent } from "@konark/shared";
import { DepartmentImage } from "@/components/ui/DepartmentImage";

export function EventCard({ event }: { event: HospitalEvent }) {
  const date = new Date(event.date);
  const day = date.toLocaleDateString("en-IN", { day: "2-digit" });
  const month = date.toLocaleDateString("en-IN", { month: "short" });

  return (
    <div className="flex overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card">
      <div className="relative hidden w-36 shrink-0 sm:block">
        <DepartmentImage src={event.coverImage} alt={event.title} sizes="144px" className="h-full" />
      </div>
      <div className="flex flex-1 gap-4 p-4 sm:p-5">
        <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <span className="text-lg font-bold leading-none">{day}</span>
          <span className="text-[11px] font-medium uppercase leading-none">{month}</span>
        </div>
        <div>
          <h3 className="text-[15px] font-semibold text-ink-900">{event.title}</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{event.summary}</p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-400">
            <MapPin size={12} />
            {event.location}
          </p>
        </div>
      </div>
    </div>
  );
}
