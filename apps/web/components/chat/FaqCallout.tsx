"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, X } from "lucide-react";
import { SITE_FAQS as FAQS } from "@/lib/site-faqs";

export function FaqCallout({ hidden }: { hidden: boolean }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  if (hidden) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close frequently asked questions" : "Frequently asked questions"}
        className="fixed bottom-[148px] right-4 z-40 flex items-center gap-1.5 rounded-full border border-ink-100 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 shadow-floating transition-colors hover:border-brand-200 hover:text-brand-700 lg:bottom-[92px] lg:right-6"
      >
        {open ? <X size={14} /> : <HelpCircle size={14} className="text-brand-600" />}
        FAQs
      </button>

      {open && (
        <div className="fixed inset-x-3 bottom-[196px] z-40 max-h-[50vh] w-auto overflow-y-auto rounded-2xl border border-ink-100 bg-white p-2 shadow-floating sm:inset-x-auto sm:bottom-[236px] sm:right-6 sm:w-[340px] lg:bottom-[144px]">
          {FAQS.map((faq, i) => {
            const isOpen = expanded === i;
            return (
              <div key={faq.question} className="border-b border-ink-50 last:border-none">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-2 px-2.5 py-3 text-left text-[13px] font-medium text-ink-800"
                >
                  {faq.question}
                  <ChevronDown size={15} className={`shrink-0 text-ink-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="px-2.5 pb-3 text-[12.5px] leading-relaxed text-ink-500">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
