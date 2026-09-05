import type { LucideIcon } from "lucide-react";

const THEMES = {
  brand: { from: "#166560", to: "#062725", fg: "rgba(255,255,255,0.9)" },
  accent: { from: "#1554dd", to: "#0d2440", fg: "rgba(255,255,255,0.9)" },
  light: { from: "#eefbf9", to: "#d3f4ef", fg: "#166560" },
};

/**
 * Branded placeholder used for hero/infrastructure/article imagery until real
 * photography/video is available. An abstract panel reads as intentional; a mismatched
 * stock photo (a random building or forest) reads as broken.
 */
export function PlaceholderPanel({
  icon: Icon,
  label,
  theme = "brand",
  className,
}: {
  icon: LucideIcon;
  label?: string;
  theme?: keyof typeof THEMES;
  className?: string;
}) {
  const t = THEMES[theme];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ background: `linear-gradient(155deg, ${t.from}, ${t.to})` }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden>
        <pattern id="ppanel-dots" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill={t.fg} />
        </pattern>
        <rect width="100%" height="100%" fill="url(#ppanel-dots)" />
      </svg>
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full" style={{ background: t.fg, opacity: 0.06 }} />
      <div className="pointer-events-none absolute -bottom-14 -left-8 h-44 w-44 rounded-full" style={{ background: t.fg, opacity: 0.06 }} />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: theme === "light" ? "rgba(22,101,96,0.1)" : "rgba(255,255,255,0.12)" }}
        >
          <Icon size={26} color={t.fg} strokeWidth={1.75} />
        </span>
        {label && (
          <span className="text-xs font-medium" style={{ color: t.fg }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
