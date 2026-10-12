import Image from "next/image";

// Logos sourced from Wikimedia Commons / each company's own official site. A handful of the
// smaller regional TPAs on this list don't have a reliably reachable logo asset (dead sites,
// bot-blocked pages, or entities since merged into a parent TPA) — those are listed by name
// only rather than risking an outdated or wrong mark. Swap `logo` in once a real file is on hand.
const INSURERS: { name: string; logo?: string }[] = [
  { name: "Health India", logo: "/images/insurers/health-india.png" },
  { name: "United Health Care" },
  { name: "Parekh Health Care" },
  { name: "GHPL", logo: "/images/insurers/ghpl.png" },
  { name: "FHPL" },
  { name: "Med Save", logo: "/images/insurers/med-save.jpg" },
  { name: "Raksha" },
  { name: "E-Meditek" },
  { name: "Heritage" },
  { name: "Vipul MedCorp" },
  { name: "Niva Bupa Health Insurance Co. Ltd.", logo: "/images/insurers/niva-bupa.jpg" },
  { name: "Medi Care" },
  { name: "Star Health & Allied", logo: "/images/insurers/star-health.svg" },
  { name: "Future General Insurance", logo: "/images/insurers/future-generali.jpg" },
  { name: "TTK (Vidal Health)", logo: "/images/insurers/vidal-health.png" },
  { name: "MD India", logo: "/images/insurers/md-india.svg" },
  { name: "Medi Assist", logo: "/images/insurers/medi-assist.svg" },
  { name: "Dedicated Health Care Services" },
  { name: "Bajaj Allianz Co. Ltd.", logo: "/images/insurers/bajaj-allianz.svg" },
  { name: "Alankit Health Care Limited", logo: "/images/insurers/alankit.png" },
  { name: "Religare (Care Health Insurance)", logo: "/images/insurers/care-health.png" },
  { name: "HDFC Ergo General Insurance", logo: "/images/insurers/hdfc-ergo.svg" },
];

export function InsurerLogos() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {INSURERS.map(({ name, logo }) => (
        <div
          key={name}
          className="flex h-24 flex-col items-center justify-center gap-2 rounded-xl border border-ink-100 bg-white p-3 text-center"
        >
          {logo ? (
            <div className="relative h-9 w-full">
              <Image src={logo} alt={name} fill className="object-contain" sizes="160px" />
            </div>
          ) : (
            <p className="text-[12.5px] font-medium leading-snug text-ink-700">{name}</p>
          )}
          {logo && <p className="text-[10.5px] leading-tight text-ink-400">{name}</p>}
        </div>
      ))}
    </div>
  );
}
