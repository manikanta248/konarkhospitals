"use client";

export type FieldConfig =
  | { type: "text"; name: string; label: string; required?: boolean; placeholder?: string }
  | { type: "textarea"; name: string; label: string; rows?: number; required?: boolean }
  | { type: "number"; name: string; label: string; required?: boolean }
  | { type: "checkbox"; name: string; label: string }
  | { type: "list"; name: string; label: string; hint?: string }
  | { type: "select"; name: string; label: string; options: { value: string; label: string }[] }
  | { type: "json"; name: string; label: string; hint?: string; rows?: number };

export const inputClass =
  "h-11 w-full rounded-lg border border-ink-200 bg-white px-3.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export const textareaClass =
  "w-full resize-none rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-800 placeholder:text-ink-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label className="mb-1.5 block text-xs font-medium text-ink-600">
      {children}
      {hint && <span className="ml-1.5 font-normal text-ink-400">{hint}</span>}
    </label>
  );
}
