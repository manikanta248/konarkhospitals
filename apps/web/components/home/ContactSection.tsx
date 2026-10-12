import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { HOSPITAL } from "@konark/shared";

export function ContactSection() {
  return (
    <section className="border-t border-ink-100 bg-ink-50/40 py-16 lg:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Get in Touch</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink-950 sm:text-3xl">
            Have a question? Send us a message.
          </h2>
          <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-ink-600">
            Our team typically responds within a few hours. For anything urgent, call us or visit our Locations page
            for directions.
          </p>

          <div className="mt-7 flex flex-col gap-3.5">
            <div className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-brand-600" />
              <p className="text-[13.5px] leading-relaxed text-ink-600">{HOSPITAL.address}</p>
            </div>
            <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-[13.5px] text-ink-600 hover:text-brand-700">
              <Phone size={17} className="shrink-0 text-brand-600" />
              {HOSPITAL.phone}
            </a>
            <a href={`mailto:${HOSPITAL.email}`} className="flex items-center gap-3 text-[13.5px] text-ink-600 hover:text-brand-700">
              <Mail size={17} className="shrink-0 text-brand-600" />
              {HOSPITAL.email}
            </a>
          </div>
        </div>

        <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
