import Link from "next/link";
import { ArrowRight, Clock, MessageCircle, PhoneCall, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroContactForm } from "@/components/home/HeroContactForm";
import { HOSPITAL } from "@konark/shared";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 py-10 sm:py-16 lg:py-24">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/facilities/hero-video-poster-portrait.jpg"
        className="absolute inset-0 block h-full w-full object-cover sm:hidden"
      >
        <source src="/videos/hero-bg-portrait.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/facilities/hero-video-poster.jpg"
        className="absolute inset-0 hidden h-full w-full object-cover sm:block"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/60 to-ink-950/40 sm:bg-gradient-to-r sm:from-ink-950/90 sm:via-ink-950/70 sm:to-ink-950/40" />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur sm:gap-2 sm:px-3 sm:text-xs">
            <ShieldCheck size={12} className="shrink-0 sm:hidden" />
            <ShieldCheck size={13} className="hidden shrink-0 sm:block" />
            Multispeciality Hospital · Jeedimetla, Hyderabad
          </span>

          <h1 className="mt-4 font-display text-[1.65rem] font-bold leading-[1.18] tracking-tight text-white sm:mt-5 sm:text-[2.6rem] sm:leading-[1.12] lg:text-[3rem]">
            Passion meets compassion. Care built around every patient.
          </h1>

          <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-ink-100 sm:mt-5 sm:text-[15.5px]">
            From high-risk deliveries and advanced fertility treatment to cardiac care, trauma
            surgery and paediatrics, Konark Hospitals brings specialist expertise, modern
            infrastructure and 24/7 emergency response under one roof.
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-3">
            <ButtonLink href="/book-appointment" size="lg" className="w-full sm:w-auto" icon={<ArrowRight size={17} />}>
              Book an Appointment
            </ButtonLink>
            <div className="grid grid-cols-2 gap-2.5 sm:contents">
              <Link
                href="/emergency-care"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/30 px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10 sm:h-12 sm:w-auto sm:gap-2 sm:px-7 sm:text-base"
              >
                <PhoneCall size={15} className="shrink-0 sm:hidden" />
                <PhoneCall size={17} className="hidden shrink-0 sm:block" />
                Emergency Care
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/30 px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/10 sm:h-12 sm:w-auto sm:gap-2 sm:px-7 sm:text-base"
              >
                <MessageCircle size={15} className="shrink-0 sm:hidden" />
                <MessageCircle size={17} className="hidden shrink-0 sm:block" />
                Contact Us
              </Link>
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 text-[12px] text-ink-200 sm:mt-5 sm:text-[13px]">
            <Clock size={13} className="shrink-0 text-brand-300 sm:size-[14px]" />
            OPD Timings: {HOSPITAL.opdHours}
          </p>

          <dl className="mt-6 hidden max-w-md grid-cols-3 gap-4 border-t border-white/20 pt-6 sm:grid">
            <div>
              <dt className="sr-only">Specialities</dt>
              <dd className="font-display text-2xl font-bold text-white">12+</dd>
              <dd className="text-xs text-ink-200">Specialities</dd>
            </div>
            <div>
              <dt className="sr-only">Decades of fertility expertise</dt>
              <dd className="font-display text-2xl font-bold text-white">3+</dd>
              <dd className="text-xs text-ink-200">Decades of Fertility Expertise</dd>
            </div>
            <div>
              <dt className="sr-only">Emergency care</dt>
              <dd className="font-display text-2xl font-bold text-white">24/7</dd>
              <dd className="text-xs text-ink-200">Emergency Care</dd>
            </div>
          </dl>
        </div>

        <div className="mt-6 w-full max-w-xs sm:mt-8 lg:absolute lg:bottom-8 lg:right-6 lg:mt-0 lg:w-[270px] xl:right-8">
          <HeroContactForm />
        </div>
      </Container>
    </section>
  );
}
