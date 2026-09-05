interface Step {
  title: string;
  description: string;
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="relative">
      {/* One continuous line behind all steps, rather than a segment per step — avoids visible
          breaks at the gap between list items. */}
      <div className="absolute bottom-4 left-[17px] top-4 w-[2px] bg-brand-200" aria-hidden />

      <ol className="flex flex-col gap-8 sm:gap-9">
        {steps.map((step, i) => (
          <li key={i} className="relative flex gap-4 sm:gap-5">
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white ring-4 ring-white">
              {i + 1}
            </span>
            <div className="pt-1.5">
              <h3 className="text-[15px] font-semibold text-ink-900">{step.title}</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-600">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
