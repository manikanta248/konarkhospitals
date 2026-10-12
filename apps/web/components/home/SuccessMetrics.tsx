import { Activity, Award, Baby, FlaskConical, HeartPulse, LayoutGrid, Siren, Stethoscope, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ABOUT } from "@konark/shared";

const METRICS = [
  { icon: Award, value: "15+", label: "Years of Healthcare Excellence" },
  { icon: Users, value: "50,000+", label: "Patients Treated" },
  { icon: Activity, value: "10,000+", label: "Successful Surgeries" },
  { icon: Stethoscope, value: "13+", label: "Expert Consultants" },
  { icon: LayoutGrid, value: "12+", label: "Medical Specialities" },
  { icon: Siren, value: "24/7", label: "Emergency Care" },
  { icon: HeartPulse, value: "3+", label: "Decades of Fertility Expertise" },
  { icon: FlaskConical, value: "1,000+", label: "Successful IVF Treatments" },
  { icon: Baby, value: "5,000+", label: "Successful Deliveries" },
];

export function SuccessMetrics() {
  return (
    <section className="border-y border-ink-100 bg-white py-8 lg:py-10">
      <Container>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
          <h2 className="font-display text-sm font-semibold text-ink-600 sm:text-base">
            Trusted by Thousands of Families in Hyderabad
          </h2>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">Since {ABOUT.establishedYear}</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4">
          {METRICS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-lg bg-ink-50/70 px-2 py-3 text-center sm:gap-1.5 sm:rounded-xl sm:py-4"
            >
              <Icon size={16} className="shrink-0 text-brand-600 sm:size-[18px]" />
              <p className="font-display text-[15px] font-bold leading-none text-ink-950 sm:text-lg">{value}</p>
              <p className="text-[9.5px] leading-tight text-ink-500 sm:text-[11px]">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
