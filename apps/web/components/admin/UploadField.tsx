"use client";

import { useRef, useState } from "react";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { uploadFile, UPLOAD_RULES, type UploadKind } from "@/lib/upload";
import { inputClass } from "./fields";

export function UploadField({
  id,
  kind,
  value,
  onChange,
  placeholder,
  help,
}: {
  id: string;
  kind: UploadKind;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  help?: string;
}) {
  const { getToken } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const rules = UPLOAD_RULES[kind];

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setProgress(0);
    try {
      const token = await getToken();
      if (!token) throw new Error("Your session has expired. Please sign in again.");
      const url = await uploadFile(kind, file, token, setProgress);
      onChange(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setProgress(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-dashed border-ink-200 bg-ink-50/40 p-3.5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-ink-100 sm:h-20 sm:w-28">
          {value && kind === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="h-full w-full object-cover" />
          )}
          {value && kind === "video" && <video src={value} muted className="h-full w-full object-cover" />}
          {!value && <ImageIcon size={22} className="text-ink-300" />}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={progress !== null}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
            >
              {progress !== null ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              {progress !== null ? `Uploading ${progress}%` : value ? "Replace file" : `Upload ${kind} from computer`}
            </button>
            {value && progress === null && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 text-sm font-medium text-ink-700 hover:bg-ink-50"
              >
                <X size={14} /> Remove
              </button>
            )}
          </div>
          <p className="text-xs text-ink-500">
            {help ?? `${rules.label}, up to ${rules.maxMb} MB.`}
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={rules.accept}
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      </div>

      <div>
        <label htmlFor={id} className="mb-1 block text-xs font-medium text-ink-500">
          Or paste a link
        </label>
        <input id={id} type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
      </div>

      {progress !== null && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full bg-brand-500 transition-[width]" style={{ width: `${progress}%` }} />
        </div>
      )}
      {error && <p className="text-[13px] text-red-600">{error}</p>}
    </div>
  );
}
