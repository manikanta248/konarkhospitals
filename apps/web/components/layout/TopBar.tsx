import Link from "next/link";
import { Mail, Clock } from "lucide-react";
import { HOSPITAL } from "@konark/shared";
import { UTILITY_LINKS } from "@/lib/navigation";

export function TopBar() {
  return (
    <div className="hidden lg:block bg-brand-950 text-brand-100">
      <div className="mx-auto flex w-full max-w-container items-center justify-between px-8 py-2 text-xs">
        <div className="flex items-center gap-5 whitespace-nowrap">
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="shrink-0 text-brand-300" />
            OPD: {HOSPITAL.opdHours}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail size={13} className="shrink-0 text-brand-300" />
            {HOSPITAL.email}
          </span>
        </div>
        <div className="flex items-center gap-5 whitespace-nowrap">
          <nav className="flex items-center gap-4 border-r border-white/10 pr-5">
            {UTILITY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-brand-200 transition-colors hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={`tel:${HOSPITAL.emergency.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 rounded-full bg-red-500/90 px-3 py-1 font-semibold text-white hover:bg-red-500"
          >
            Emergency: {HOSPITAL.emergency}
          </a>
        </div>
      </div>
    </div>
  );
}
