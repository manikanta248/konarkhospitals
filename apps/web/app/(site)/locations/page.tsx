import type { Metadata } from "next";
import { Car, Clock, MapPin, Navigation, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find Konark Hospitals in Jeedimetla, Hyderabad — address, directions and parking information.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Visit Us"
        title="Our Location"
        description="Konark Hospitals is located on Pipeline Road, Jeedimetla — easily accessible from Kompally and surrounding areas of Hyderabad."
        breadcrumbs={[{ label: "Locations" }]}
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_1fr]">
        <div className="h-80 overflow-hidden rounded-xl2 sm:h-full">
          <iframe
            title="Konark Hospitals map"
            src={HOSPITAL.mapsEmbedUrl}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>

        <div>
          <h2 className="font-display text-lg font-bold text-ink-950">Konark Hospitals — Jeedimetla</h2>

          <div className="mt-5 flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Address</p>
              <p className="mt-1 text-[14px] leading-relaxed text-ink-600">{HOSPITAL.address}</p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <Phone size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Phone</p>
              <p className="mt-1 text-[14px] text-ink-600">{HOSPITAL.phone} · Emergency: {HOSPITAL.emergency}</p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <Clock size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Timings</p>
              <p className="mt-1 text-[14px] text-ink-600">OPD: {HOSPITAL.opdHours}</p>
              <p className="text-[14px] text-ink-600">Emergency: {HOSPITAL.emergencyHours}</p>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <Car size={18} className="mt-0.5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Parking</p>
              <p className="mt-1 text-[14px] text-ink-600">On-site parking available for patients and visitors.</p>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={HOSPITAL.mapsUrl} external icon={<Navigation size={16} />}>
              Get Directions
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
