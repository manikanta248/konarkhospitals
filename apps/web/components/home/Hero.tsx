import Image from "next/image";
import { ArrowRight, PhoneCall, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HOSPITAL } from "@konark/shared";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/70 via-white to-white">
      <Container className="grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <ShieldCheck size={13} />
            Multispeciality Hospital · Jeedimetla, Hyderabad
          </span>

          <h1 className="mt-5 font-display text-[2.1rem] font-bold leading-[1.12] tracking-tight text-ink-950 sm:text-[2.6rem] lg:text-[3rem]">
            Passion meets compassion — care built around every patient.
          </h1>

          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink-600">
            From high-risk deliveries and advanced fertility treatment to cardiac care, trauma
            surgery and paediatrics — Konark Hospitals brings specialist expertise, modern
            infrastructure and 24/7 emergency response under one roof.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/book-appointment" size="lg" className="w-full sm:w-auto" icon={<ArrowRight size={17} />}>
              Book an Appointment
            </ButtonLink>
            <ButtonLink href="/emergency-care" size="lg" variant="outline" className="w-full sm:w-auto" icon={<PhoneCall size={17} />}>
              Emergency Care
            </ButtonLink>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ink-100 pt-6">
            <div>
              <dt className="sr-only">Specialities</dt>
              <dd className="font-display text-2xl font-bold text-ink-950">12+</dd>
              <dd className="text-xs text-ink-500">Specialities</dd>
            </div>
            <div>
              <dt className="sr-only">Consultants</dt>
              <dd className="font-display text-2xl font-bold text-ink-950">13+</dd>
              <dd className="text-xs text-ink-500">Consultants</dd>
            </div>
            <div>
              <dt className="sr-only">Emergency care</dt>
              <dd className="font-display text-2xl font-bold text-ink-950">24/7</dd>
              <dd className="text-xs text-ink-500">Emergency Care</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-xl2 shadow-floating sm:aspect-[5/4] lg:mx-auto lg:aspect-[4/5]">
            <Image
              src="/images/facilities/patient-ward.jpg"
              alt="Patient ward at Konark Hospitals"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 420px, 90vw"
            />
          </div>

          <div className="absolute -bottom-5 left-1/2 w-[86%] max-w-[calc(100%-2rem)] -translate-x-1/2 rounded-xl border border-ink-100 bg-white/95 p-4 shadow-floating backdrop-blur sm:left-4 sm:w-auto sm:max-w-none sm:translate-x-0">
            <p className="text-xs font-medium text-ink-500">OPD Timings</p>
            <p className="mt-1 text-sm font-semibold text-ink-900">{HOSPITAL.opdHours}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
