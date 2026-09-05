import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getHealthPackages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Health Packages",
  description: "Preventive health checkup packages at Konark Hospitals, Jeedimetla, Hyderabad.",
};

export default async function HealthPackagesPage() {
  const packages = await getHealthPackages();

  return (
    <>
      <PageHeader
        eyebrow="Patient Acquisition"
        title="Preventive Health Packages"
        description="Early detection makes a real difference. Choose a screening package tailored to your needs, at a transparent, upfront price."
        breadcrumbs={[{ label: "Health Packages" }]}
      />

      <Container className="py-10 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg) => (
            <div key={pkg.slug} className="flex flex-col overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card">
              <div className="relative aspect-[4/3]">
                <Image src={pkg.image} alt={pkg.name} fill className="object-cover" sizes="(min-width: 1024px) 320px, 90vw" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[15px] font-semibold text-ink-900">{pkg.name}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{pkg.description}</p>
                <p className="mt-3 font-display text-xl font-bold text-ink-950">
                  ₹{pkg.price.toLocaleString("en-IN")}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {pkg.inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[12.5px] text-ink-600">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-brand-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={`/book-appointment?type=appointment&package=${pkg.slug}`} size="sm" className="mt-5 w-full">
                  Book This Package
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
