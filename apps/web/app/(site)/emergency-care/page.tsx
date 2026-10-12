import type { Metadata } from "next";
import { Ambulance, Baby, Brain, Clock, HeartPulse, Navigation, PhoneCall, ShieldAlert, ShieldPlus, Stethoscope, Users, Wind } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ProcessSteps } from "@/components/patient-care/ProcessSteps";
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

const emergencyProcess = [
  {
    title: "Arrival at Emergency",
    description: "Patient is received immediately by the emergency team. Rapid assessment begins based on the patient's condition.",
  },
  {
    title: "Initial Assessment",
    description: "Vital signs and immediate symptoms are assessed. The emergency team determines the urgency and required treatment.",
  },
  {
    title: "Stabilisation & Treatment",
    description: "Immediate medical care is provided to stabilise the patient. Necessary investigations and emergency procedures are initiated.",
  },
  {
    title: "Specialist Consultation",
    description: "Relevant specialists are involved based on the patient's condition. Multispeciality support is available when required.",
  },
  {
    title: "Further Care",
    description: "After stabilisation, the patient may be shifted to the ward, ICU or referred for specialised treatment as required.",
  },
];

const emergencyServices = [
  { icon: Ambulance, label: "Accident & Trauma Care" },
  { icon: HeartPulse, label: "Cardiac Emergencies" },
  { icon: Brain, label: "Stroke & Neurological Emergencies" },
  { icon: Wind, label: "Respiratory Emergencies" },
  { icon: Baby, label: "Obstetric & Gynaecological Emergencies" },
  { icon: Users, label: "Paediatric Emergencies" },
  { icon: ShieldPlus, label: "Critical Care & Stabilisation" },
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

        <div className="mt-12">
          <h2 className="font-display text-lg font-bold text-ink-950">Emergency Process</h2>
          <div className="mt-6 max-w-2xl">
            <ProcessSteps steps={emergencyProcess} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-lg font-bold text-ink-950">Emergency Services</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {emergencyServices.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl2 border border-ink-100 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                  <Icon size={18} />
                </span>
                <p className="text-[14px] font-medium text-ink-800">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
