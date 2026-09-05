"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-ink-100 rounded-xl2 border border-ink-100 bg-white">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
          >
            <span className="text-[14.5px] font-medium text-ink-900">{faq.question}</span>
            <ChevronDown size={16} className={`shrink-0 text-ink-400 transition-transform ${open === i ? "rotate-180 text-brand-600" : ""}`} />
          </button>
          {open === i && <p className="px-5 pb-4 text-[13.5px] leading-relaxed text-ink-600">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
}
