import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, Siren } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Konark Hospitals, Jeedimetla, Hyderabad — phone, email, address and directions.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Have a question or need help planning a visit? Reach out — our team typically responds within a few hours."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_360px]">
        <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-lg font-bold text-ink-950">Send Us a Message</h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <a
            href={`tel:${HOSPITAL.emergency.replace(/\s/g, "")}`}
            className="flex items-center gap-3 rounded-xl2 bg-red-500 p-5 text-white"
          >
            <Siren size={22} className="shrink-0" />
            <div>
              <p className="text-xs font-medium text-red-100">24/7 Emergency</p>
              <p className="text-base font-bold">{HOSPITAL.emergency}</p>
            </div>
          </a>

          <div className="rounded-xl2 border border-ink-100 p-5">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Address</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-600">{HOSPITAL.address}</p>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Phone</p>
                <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="mt-1 block text-[13.5px] text-ink-600 hover:text-brand-700">
                  {HOSPITAL.phone}
                </a>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink-900">Email</p>
                <a href={`mailto:${HOSPITAL.email}`} className="mt-1 block text-[13.5px] text-ink-600 hover:text-brand-700">
                  {HOSPITAL.email}
                </a>
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-brand-600" />
              <div>
                <p className="text-sm font-semibold text-ink-900">OPD Hours</p>
                <p className="mt-1 text-[13.5px] text-ink-600">{HOSPITAL.opdHours}</p>
              </div>
            </div>
            <a
              href={`https://wa.me/${HOSPITAL.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-emerald-50 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </aside>
      </Container>

      <div className="h-80 w-full sm:h-96">
        <iframe
          title="Konark Hospitals location"
          src={HOSPITAL.mapsEmbedUrl}
          className="h-full w-full border-0"
          loading="lazy"
        />
      </div>
    </>
  );
}
