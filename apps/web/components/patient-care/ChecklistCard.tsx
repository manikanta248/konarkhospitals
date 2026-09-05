import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

export function ChecklistCard({
  icon: Icon,
  title,
  items,
}: {
  icon?: LucideIcon;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl2 border border-ink-100 bg-ink-50/60 p-5">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-ink-900">
        {Icon && <Icon size={16} className="text-brand-600" />}
        {title}
      </h3>
      <ul className="mt-3.5 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink-600">
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-brand-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
