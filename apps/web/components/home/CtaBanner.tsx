import { ArrowRight, PhoneCall } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HOSPITAL } from "@konark/shared";

export function CtaBanner() {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-xl2 bg-brand-600 px-6 py-10 sm:px-12 sm:py-14">
          <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Need to see a specialist?
              </h2>
              <p className="mt-2 text-[14.5px] text-brand-50">
                Book an appointment online or call us directly — our care coordinators will
                help you find the right doctor.
              </p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/book-appointment" size="lg" variant="inverse" icon={<ArrowRight size={17} />}>
                Book Appointment
              </ButtonLink>
              <a
                href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-7 text-base font-medium text-white hover:bg-white/10"
              >
                <PhoneCall size={17} />
                {HOSPITAL.phone}
              </a>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-black/10" />
        </div>
      </Container>
    </section>
  );
}
