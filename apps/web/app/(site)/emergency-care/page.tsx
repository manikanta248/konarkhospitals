import type { Metadata } from "next";
import { Ambulance, Clock, Navigation, PhoneCall, ShieldAlert, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Emergency Care",
  description: "24/7 emergency care at Konark Hospitals, Jeedimetla, Hyderabad.",
};

const points = [
  { icon: Clock, title: "Open 24/7", description: "Our emergency department is staffed around the clock, every day of the year." },
  { icon: Stethoscope, title: "Rapid Triage", description: "Patients are assessed immediately on arrival and prioritised by medical urgency." },
  { icon: Ambulance, title: "Critical Care Ready", description: "Direct coordination with our ICU and specialist teams for critical cases." },
];

export default function EmergencyCarePage() {
  return (
    <>
      <div className="bg-red-600 py-14 text-center text-white sm:py-16">
        <Container>
          <ShieldAlert size={40} className="mx-auto" />
          <h1 className="mt-4 font-display text-2xl font-bold sm:text-3xl">24/7 Emergency Care</h1>
          <p className="mx-auto mt-3 max-w-lg text-[15px] text-red-50">
            If this is a medical emergency, call us immediately or head straight to our emergency department.
          </p>
          <a href={`tel:${HOSPITAL.emergency.replace(/\s/g, "")}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-xl font-bold text-red-600">
            <PhoneCall size={22} />
            {HOSPITAL.emergency}
          </a>
        </Container>
      </div>

      <Container className="py-10 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-3">
          {points.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl2 border border-ink-100 p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <Icon size={18} />
              </span>
              <h3 className="mt-3 text-[14.5px] font-semibold text-ink-900">{title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-500">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl2 border border-ink-100 bg-ink-50/60 p-6 sm:p-8">
          <h2 className="text-[15px] font-semibold text-ink-900">In a medical emergency:</h2>
          <ol className="mt-4 flex flex-col gap-3">
            <li className="flex gap-3 text-[14px] text-ink-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">1</span>
              Call {HOSPITAL.emergency} immediately, or head directly to our emergency entrance at {HOSPITAL.address}.
            </li>
            <li className="flex gap-3 text-[14px] text-ink-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">2</span>
              If possible, have someone call ahead so our team can prepare for your arrival.
            </li>
            <li className="flex gap-3 text-[14px] text-ink-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">3</span>
              Bring along any current medications, medical records, or insurance/TPA details if readily available — but never delay coming in to gather them.
            </li>
          </ol>

          <div className="mt-6">
            <ButtonLink href={HOSPITAL.mapsUrl} external icon={<Navigation size={16} />}>
              Get Directions to Konark Hospitals
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
