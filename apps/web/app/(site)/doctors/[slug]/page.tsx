import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock, Globe2, GraduationCap, Stethoscope } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { DoctorImage } from "@/components/ui/DoctorImage";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { getDoctor, getDoctors } from "@/lib/content";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const doctor = await getDoctor(params.slug);
  if (!doctor) return {};
  return {
    title: doctor.name,
    description: `${doctor.designation} at Konark Hospitals — ${doctor.specialization}. ${doctor.experienceYears}+ years of experience.`,
  };
}

export default async function DoctorProfilePage({ params }: { params: { slug: string } }) {
  const [doctor, allDoctors] = await Promise.all([getDoctor(params.slug), getDoctors()]);
  if (!doctor) notFound();

  const related = allDoctors.filter((d) => d.departmentSlug === doctor.departmentSlug && d.slug !== doctor.slug).slice(0, 3);

  return (
    <>
      <div className="border-b border-ink-100 bg-gradient-to-b from-brand-50/60 to-white py-10 sm:py-12">
        <Container className="grid gap-8 sm:grid-cols-[220px_1fr] sm:gap-10 lg:grid-cols-[260px_1fr]">
          <DoctorImage
            slug={doctor.slug}
            name={doctor.name}
            sizes="(min-width: 640px) 260px, 60vw"
            className="mx-auto aspect-[4/5] w-full max-w-[220px] rounded-xl2 shadow-card sm:mx-0 sm:max-w-none"
          />

          <div>
            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {doctor.departmentName}
            </span>
            <h1 className="mt-3 font-display text-2xl font-bold text-ink-950 sm:text-3xl">{doctor.name}</h1>
            <p className="mt-1 text-[15px] font-medium text-brand-600">{doctor.designation}</p>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-ink-100 pt-5 sm:grid-cols-3">
              <InfoItem icon={GraduationCap} label="Qualifications" value={doctor.qualifications} />
              <InfoItem icon={Stethoscope} label="Specialization" value={doctor.specialization} />
              <InfoItem icon={CalendarClock} label="Experience" value={`${doctor.experienceYears}+ years`} />
              {doctor.languages.length > 0 && (
                <InfoItem icon={Globe2} label="Languages" value={doctor.languages.join(", ")} />
              )}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/book-appointment?doctor=${doctor.slug}`} className="w-full sm:w-auto">
                Book Consultation
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" className="w-full sm:w-auto">
                Ask a Question
              </ButtonLink>
            </div>
          </div>
        </Container>
      </div>

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-display text-lg font-bold text-ink-950">About {doctor.name}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            {doctor.bio || `${doctor.name} is a ${doctor.designation.toLowerCase()} at Konark Hospitals, specialising in ${doctor.specialization.toLowerCase()}.`}
          </p>
        </div>

        <aside className="rounded-xl2 border border-ink-100 bg-ink-50/60 p-5">
          <h3 className="text-sm font-semibold text-ink-900">OPD Availability</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {doctor.availability.map((slot, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg bg-white px-3.5 py-2.5 text-[13px] shadow-sm">
                <span className="font-medium text-ink-700">{slot.day}</span>
                <span className="text-ink-500">{slot.slots}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-500">Timings may vary — please book ahead to confirm availability.</p>
        </aside>
      </Container>

      {related.length > 0 && (
        <Container className="pb-14 sm:pb-16">
          <h2 className="font-display text-lg font-bold text-ink-950">Other Specialists in {doctor.departmentName}</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {related.map((d) => (
              <DoctorCard key={d.slug} doctor={d} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof GraduationCap; label: string; value: string }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-ink-400">
        <Icon size={12} />
        {label}
      </dt>
      <dd className="mt-1 text-[13.5px] font-medium text-ink-800">{value}</dd>
    </div>
  );
}
