"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { FieldLabel, inputClass, textareaClass, type FieldConfig } from "./fields";

function toDisplayValue(field: FieldConfig, raw: unknown): string {
  if (raw === undefined || raw === null) return field.type === "checkbox" ? "false" : "";
  if (field.type === "list" && Array.isArray(raw)) return raw.join(", ");
  if (field.type === "json") return JSON.stringify(raw, null, 2);
  return String(raw);
}

function parseValue(field: FieldConfig, value: string): unknown {
  switch (field.type) {
    case "number":
      return value === "" ? 0 : Number(value);
    case "checkbox":
      return value === "true";
    case "list":
      return value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    case "json":
      try {
        return value.trim() ? JSON.parse(value) : [];
      } catch {
        return [];
      }
    default:
      return value;
  }
}

export function ResourceForm({
  fields,
  initialValues,
  onSubmit,
  cancelHref,
  submitLabel = "Save",
}: {
  fields: FieldConfig[];
  initialValues?: Record<string, unknown>;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
  cancelHref: string;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const f of fields) initial[f.name] = toDisplayValue(f, initialValues?.[f.name]);
    return initial;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setField(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const parsed: Record<string, unknown> = {};
      for (const f of fields) parsed[f.name] = parseValue(f, values[f.name] ?? "");
      await onSubmit(parsed);
    } catch {
      setError("Failed to save. Please check your inputs and try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {fields.map((field) => (
        <div key={field.name}>
          {field.type !== "checkbox" && (
            <FieldLabel hint={field.type === "list" ? field.hint ?? "comma-separated" : field.type === "json" ? field.hint ?? "JSON array" : undefined}>
              {field.label}
              {"required" in field && field.required ? " *" : ""}
            </FieldLabel>
          )}

          {field.type === "textarea" || field.type === "list" || field.type === "json" ? (
            <textarea
              value={values[field.name] ?? ""}
              onChange={(e) => setField(field.name, e.target.value)}
              rows={"rows" in field ? field.rows ?? 3 : 3}
              required={"required" in field ? field.required : false}
              className={textareaClass}
            />
          ) : field.type === "select" ? (
            <select value={values[field.name] ?? ""} onChange={(e) => setField(field.name, e.target.value)} className={inputClass}>
              <option value="">Select...</option>
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input
                type="checkbox"
                checked={values[field.name] === "true"}
                onChange={(e) => setField(field.name, String(e.target.checked))}
                className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-400"
              />
              {field.label}
            </label>
          ) : (
            <input
              type={field.type === "number" ? "number" : "text"}
              value={values[field.name] ?? ""}
              onChange={(e) => setField(field.name, e.target.value)}
              required={"required" in field ? field.required : false}
              placeholder={"placeholder" in field ? field.placeholder : undefined}
              className={inputClass}
            />
          )}
        </div>
      ))}

      {error && <p className="text-[13px] text-red-600">{error}</p>}

      <div className="mt-2 flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving && <Loader2 size={16} className="animate-spin" />}
          {saving ? "Saving..." : submitLabel}
        </Button>
        <ButtonLink href={cancelHref} variant="outline">
          Cancel
        </ButtonLink>
      </div>
    </form>
  );
}
