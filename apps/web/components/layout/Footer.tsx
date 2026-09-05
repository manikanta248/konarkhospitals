import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { HOSPITAL } from "@konark/shared";
import { NAV, UTILITY_LINKS } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

const columns = NAV.slice(0, 4);

export function Footer() {
  return (
    <footer className="bg-ink-950 pb-24 pt-16 text-ink-300 lg:pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-6">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-400">{HOSPITAL.tagline}</p>
            <div className="mt-5 flex items-start gap-2 text-sm text-ink-400">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-400" />
              {HOSPITAL.address}
            </div>
            <div className="mt-3 flex flex-col gap-2 text-sm text-ink-400">
              <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white">
                <Phone size={15} className="text-brand-400" /> {HOSPITAL.phone}
              </a>
              <a href={`tel:${HOSPITAL.mobile.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-white">
                <Phone size={15} className="text-brand-400" /> {HOSPITAL.mobile}
              </a>
              <a href={`mailto:${HOSPITAL.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail size={15} className="text-brand-400" /> {HOSPITAL.email}
              </a>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={HOSPITAL.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Konark Hospitals on Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-ink-300 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>

          {columns.map((group) => (
            <div key={group.label}>
              <h4 className="text-sm font-semibold text-white">{group.label}</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-ink-400 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {UTILITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-400 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/resources/article" className="text-sm text-ink-400 hover:text-white">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/health-packages" className="text-sm text-ink-400 hover:text-white">
                  Health Packages
                </Link>
              </li>
              <li>
                <Link href="/international-patients" className="text-sm text-ink-400 hover:text-white">
                  International Patients
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Konark Hospitals. All rights reserved.</p>
          <p>Multispeciality Hospital · Jeedimetla, Hyderabad</p>
        </div>
      </Container>
    </footer>
  );
}
