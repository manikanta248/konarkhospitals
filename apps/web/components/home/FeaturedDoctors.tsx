import Link from "next/link";
import type { Doctor } from "@konark/shared";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { DoctorImage } from "@/components/ui/DoctorImage";

export function FeaturedDoctors({ doctors }: { doctors: Doctor[] }) {
  return (
    <section className="py-16 lg:py-20">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Our Team</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink-950 sm:text-3xl">Meet Our Specialists</h2>
          </div>
          <ButtonLink href="/doctors" variant="outline" size="sm" className="self-start sm:self-auto">
            View all doctors
          </ButtonLink>
        </div>

        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {doctors.map((doc) => (
            <Link
              key={doc.slug}
              href={`/doctors/${doc.slug}`}
              className="group w-[75%] shrink-0 overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card transition-shadow hover:shadow-floating sm:w-auto sm:shrink"
            >
              <DoctorImage
                slug={doc.slug}
                name={doc.name}
                sizes="(min-width: 1024px) 280px, 70vw"
                className="aspect-[4/5] transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="p-4">
                <p className="text-[15px] font-semibold text-ink-900">{doc.name}</p>
                <p className="mt-0.5 text-xs text-brand-600">{doc.designation}</p>
                <p className="mt-2 text-[12.5px] text-ink-500">{doc.experienceYears}+ years · {doc.departmentName}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
