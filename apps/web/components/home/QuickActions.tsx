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
        <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:rounded-xl2 lg:border lg:border-ink-100 lg:bg-white lg:p-2 lg:shadow-card">
          {actions.map(({ label, href, icon: Icon, tone }) => (
            <Link
              key={href}
              href={href}
              className="flex min-w-[150px] shrink-0 items-center gap-3 rounded-xl border border-ink-100 bg-white p-3.5 shadow-card transition-shadow hover:shadow-floating lg:min-w-0 lg:border-none lg:shadow-none lg:hover:bg-ink-50"
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tone} text-white`}>
                <Icon size={18} />
              </span>
              <span className="text-[13.5px] font-semibold leading-tight text-ink-800">{label}</span>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
