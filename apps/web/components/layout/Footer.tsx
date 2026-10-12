import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { HOSPITAL } from "@konark/shared";
import { NAV } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const QUICK_LINKS = [
  { label: "Medical Services", href: "/services" },
  { label: "Find a Doctor", href: "/doctors" },
  { label: "Patient Care", href: "/patient-care" },
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-ink-950 pb-24 pt-12 text-ink-300 lg:pb-8">
      <Container>
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-400">{HOSPITAL.tagline}</p>
            <a
              href={HOSPITAL.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Konark Hospitals on Instagram"
              className="mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-ink-300 transition-colors hover:bg-brand-600 hover:text-white"
            >
              <Instagram size={15} />
            </a>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 grid grid-cols-2 gap-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-ink-500">{NAV.length}+ specialities · full sitemap in the menu above</p>
          </div>

          <div className="lg:col-span-6">
            <h4 className="text-sm font-semibold text-white">Get in Touch</h4>

            {/* Row 1: Address text (left) & Map (right) */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 items-center">
              <a
                href={HOSPITAL.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1.5 text-xs sm:text-sm text-ink-400 hover:text-white"
              >
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-400" />
                <span>{HOSPITAL.address}</span>
              </a>

              <a
                href={HOSPITAL.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-28 sm:h-32 overflow-hidden rounded-xl border border-white/10"
                aria-label="Open Konark Hospitals location in Google Maps"
              >
                <iframe
                  src={HOSPITAL.mapsEmbedUrl}
                  title="Konark Hospitals location"
                  loading="lazy"
                  className="pointer-events-none h-full w-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
            </div>

            {/* Row 2: Phone & Email in a separate row below */}
            <div className="mt-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-6 text-xs sm:text-sm text-ink-400">
              <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-white">
                <Phone size={15} className="shrink-0 text-brand-400" />
                <span>{HOSPITAL.phone}</span>
              </a>
              <a href={`mailto:${HOSPITAL.email}`} className="flex items-center gap-1.5 hover:text-white">
                <Mail size={15} className="shrink-0 text-brand-400" />
                <span>{HOSPITAL.email}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Konark Hospitals. All rights reserved.</p>
          <p>Multispeciality Hospital · Jeedimetla, Hyderabad</p>
        </div>
      </Container>
    </footer>
  );
}
