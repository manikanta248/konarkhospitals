"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, X } from "lucide-react";
import { NAV, UTILITY_LINKS } from "@/lib/navigation";
import { Logo } from "./Logo";
import { HOSPITAL } from "@konark/shared";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(NAV[0]?.label ?? null);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-ink-950/40 transition-opacity lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col bg-white shadow-floating transition-transform duration-300 lg:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-ink-100 px-4">
          <Logo />
          <button aria-label="Close menu" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-600 hover:bg-ink-50">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {NAV.map((group) => (
            <div key={group.label} className="border-b border-ink-50 last:border-none">
              <button
                onClick={() => setExpanded(expanded === group.label ? null : group.label)}
                className="flex w-full items-center justify-between px-3 py-3.5 text-left text-[15px] font-semibold text-ink-900"
              >
                {group.label}
                <ChevronDown size={16} className={`text-ink-400 transition-transform ${expanded === group.label ? "rotate-180" : ""}`} />
              </button>
              {expanded === group.label && (
                <ul className="pb-2 pl-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="block rounded-lg px-3 py-2.5 text-[14px] text-ink-600 active:bg-brand-50">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-2 flex flex-col">
            {UTILITY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-3.5 text-[15px] font-semibold text-ink-900">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="shrink-0 border-t border-ink-100 p-4">
          <a href={`tel:${HOSPITAL.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white">
            <Phone size={16} />
            Call {HOSPITAL.phone}
          </a>
        </div>
      </div>
    </>
  );
}
