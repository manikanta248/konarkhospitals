"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, X } from "lucide-react";
import { HOSPITAL } from "@konark/shared";

const FAQS = [
  {
    question: "What are your OPD timings?",
    answer: `OPD consultations run ${HOSPITAL.opdHours}. The Emergency Department is open 24/7.`,
  },
  {
    question: "How can I book an appointment?",
    answer: "Book online through our Book Appointment page, call us, or use the chat right here — all three reach the same team.",
  },
  {
    question: "Do you accept insurance or cashless TPA treatment?",
    answer:
      "Yes. Our billing desk verifies your coverage and handles pre-authorization for cashless treatment wherever possible — carry your insurance/TPA card and policy details at admission.",
  },
  {
    question: "Is emergency care available 24/7?",
    answer: `Yes — call ${HOSPITAL.emergency} or come directly to the hospital any time, day or night.`,
  },
  {
    question: "Do you treat international patients?",
    answer: `Yes. Email your medical reports to ${HOSPITAL.email} and our team will respond with a treatment plan and cost estimate, typically within 2–3 business days.`,
  },
  {
    question: "Where is Konark Hospitals located?",
    answer: `${HOSPITAL.address}. On-site parking is available for patients and visitors.`,
  },
];

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
