import { FileText, Globe2, Languages, PlaneLanding } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const points = [
  { icon: FileText, text: "Treatment plan & cost estimate before you travel" },
  { icon: PlaneLanding, text: "Coordinated appointment scheduling" },
  { icon: Languages, text: "English & Hindi language support" },
];

export function InternationalPatientsBanner() {
  return (
    <section className="py-4 sm:py-6">
      <Container>
        <div className="flex flex-col gap-6 rounded-xl2 border border-brand-100 bg-brand-50/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Globe2 size={22} />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-ink-950">Travelling to Hyderabad for Treatment?</h2>
              <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-ink-600">
                We help international patients plan their visit end-to-end — from your first enquiry to
                follow-up care after you return home.
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                {points.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-1.5 text-xs font-medium text-brand-700">
                    <Icon size={13} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ButtonLink href="/international-patients" variant="outline" className="w-full shrink-0 sm:w-auto">
            Learn More
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
