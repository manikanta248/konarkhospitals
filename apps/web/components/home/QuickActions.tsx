import Link from "next/link";
import { CalendarClock, HeartPulse, Search, Siren } from "lucide-react";
import { Container } from "@/components/ui/Container";

const actions = [
  { label: "Book Appointment", href: "/book-appointment", icon: CalendarClock, tone: "bg-brand-600" },
  { label: "Emergency Care", href: "/emergency-care", icon: Siren, tone: "bg-red-500" },
  { label: "Find a Doctor", href: "/doctors", icon: Search, tone: "bg-accent-600" },
  { label: "Health Packages", href: "/health-packages", icon: HeartPulse, tone: "bg-brand-700" },
];

export function QuickActions() {
  return (
    <div className="relative z-10 -mt-1 lg:-mt-8">
      <Container>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5 lg:rounded-xl2 lg:border lg:border-ink-100 lg:bg-white lg:p-3 lg:shadow-card">
          {actions.map(({ label, href, icon: Icon, tone }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-3.5 shadow-card transition-shadow hover:shadow-floating sm:gap-3.5 sm:p-4 lg:border-none lg:p-3.5 lg:shadow-none lg:hover:bg-ink-50"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone} text-white sm:h-12 sm:w-12`}>
                <Icon size={18} className="sm:hidden" />
                <Icon size={21} className="hidden sm:block" />
              </span>
              <span className="text-[13px] font-semibold leading-tight text-ink-800 sm:text-[15px]">{label}</span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
