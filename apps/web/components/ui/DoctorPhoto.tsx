import { initialsOf, gradientFor } from "@/lib/avatar";

/**
 * Placeholder doctor "photo": a branded monogram tile. Used until real headshots are
 * uploaded via the admin panel — deliberately not a random stock photo, since an
 * unrelated stock image (a building, a coffee cup) reads as broken rather than "in progress".
 */
export function DoctorPhoto({ name, className }: { name: string; className?: string }) {
  const [from, to] = gradientFor(name);
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className ?? ""}`}
      style={{ background: `linear-gradient(150deg, ${from}, ${to})` }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
        <pattern id={`grid-${name}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#grid-${name})`} />
      </svg>
      <span className="relative font-display text-4xl font-bold tracking-tight text-white/90">
        {initialsOf(name)}
      </span>
    </div>
  );
}
