import type { Metadata } from "next";
import { CheckCircle2, MessageCircle, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Thank you for contacting Konark Hospitals — our team will get back to you shortly.",
};

export default function ThankYouPage() {
  return (
    <Container className="flex flex-col items-center py-20 text-center sm:py-28">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <CheckCircle2 size={32} />
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold text-ink-950 sm:text-3xl">Message Received</h1>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
        Thank you for reaching out to Konark Hospitals. Our team typically responds within a few hours — if your
        query is urgent, please call us or reach out on WhatsApp directly.
      </p>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <ButtonLink href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} icon={<PhoneCall size={17} />} className="w-full sm:w-auto">
          Call Us
        </ButtonLink>
        <a
          href={`https://wa.me/${HOSPITAL.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-ink-200 px-5 text-[15px] font-medium text-ink-800 hover:border-emerald-300 hover:text-emerald-700 sm:w-auto"
        >
          <MessageCircle size={17} />
          WhatsApp Us
        </a>
      </div>

      <ButtonLink href="/" variant="ghost" className="mt-6">
        Back to Home
      </ButtonLink>
    </Container>
  );
}
