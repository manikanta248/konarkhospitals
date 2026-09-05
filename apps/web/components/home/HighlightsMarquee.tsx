import { Clock, HeartPulse, MapPin, ShieldCheck, Siren, Stethoscope, Users } from "lucide-react";
import { HOSPITAL } from "@konark/shared";

const items = [
  { icon: Siren, text: "24/7 Emergency Care" },
  { icon: Stethoscope, text: "12+ Medical Specialities" },
  { icon: Users, text: "13+ Expert Consultants" },
  { icon: HeartPulse, text: "Advanced Fertility & IVF Care" },
  { icon: ShieldCheck, text: "Insurance & TPA Cashless Support" },
  { icon: Clock, text: `OPD: ${HOSPITAL.opdHours}` },
  { icon: MapPin, text: "Jeedimetla, Hyderabad" },
];

function Track() {
  return (
    <>
      {items.map(({ icon: Icon, text }, i) => (
        <span key={i} className="flex shrink-0 items-center gap-2.5 px-6 text-[13.5px] font-medium text-white/90 sm:px-8">
          <Icon size={15} className="shrink-0 text-brand-300" />
          {text}
          <span className="ml-6 h-1 w-1 shrink-0 rounded-full bg-white/25 sm:ml-8" aria-hidden />
        </span>
      ))}
    </>
  );
}

export function HighlightsMarquee() {
  return (
    <div className="group overflow-hidden bg-brand-900 py-3">
      <div className="flex w-max animate-marquee">
        <div className="flex shrink-0">
          <Track />
        </div>
        <div className="flex shrink-0" aria-hidden>
          <Track />
        </div>
      </div>
    </div>
  );
}
