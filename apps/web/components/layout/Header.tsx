"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { NAV } from "@/lib/navigation";
import { Logo } from "./Logo";
import { TopBar } from "./TopBar";
import { MobileNav } from "./MobileNav";
import { ButtonLink } from "@/components/ui/Button";
import { HOSPITAL } from "@konark/shared";

export function Header() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <TopBar />
      <div
        className={`bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_1px_0_0_rgba(16,24,32,0.08),0_4px_16px_-4px_rgba(16,24,32,0.08)]" : "border-b border-ink-100"}`}
      >
        <div className="mx-auto flex h-20 w-full max-w-container items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav className="hidden items-center lg:flex" onMouseLeave={() => setOpenGroup(null)}>
            {NAV.map((group) => (
              <div key={group.label} className="relative shrink-0" onMouseEnter={() => setOpenGroup(group.label)}>
                <Link
                  href={group.href}
                  className="flex items-center gap-1 whitespace-nowrap px-3.5 py-6 text-[14.5px] font-medium text-ink-700 transition-colors hover:text-brand-700 xl:px-4"
                >
                  {group.label}
                  <ChevronDown size={14} className={`shrink-0 transition-transform ${openGroup === group.label ? "rotate-180 text-brand-600" : "text-ink-400"}`} />
                </Link>

                {openGroup === group.label && (
                  <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-1">
                    <div className="overflow-hidden rounded-xl border border-ink-100 bg-white shadow-floating">
                      <ul className="py-2">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="flex flex-col gap-0.5 px-4 py-2.5 transition-colors hover:bg-brand-50"
                            >
                              <span className="text-[14px] font-medium text-ink-900">{link.label}</span>
                              {link.description && (
                                <span className="text-xs text-ink-500">{link.description}</span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5 xl:gap-3.5">
            <a
              href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-brand-700 xl:flex"
            >
              <Phone size={16} className="shrink-0" />
              {HOSPITAL.phone}
            </a>
            <ButtonLink href="/book-appointment" size="sm" className="hidden whitespace-nowrap sm:inline-flex">
              Book Appointment
            </ButtonLink>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-50 lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
