import type { Metadata } from "next";
import { HeartHandshake, IndianRupee, ShieldCheck, Sparkles, Target, Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { DepartmentImage } from "@/components/ui/DepartmentImage";
import { ABOUT, HOSPITAL } from "@konark/shared";

export const metadata: Metadata = {
  title: "About Konark Hospitals",
  description: "A 100-bed multispeciality hospital in Jeedimetla, Hyderabad, founded by Dr. T. Rajani Ashok.",
};

const valueIcons = [HeartHandshake, IndianRupee, ShieldCheck, Sparkles];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Konark"
        title="World-Class Healthcare, Within Reach of All"
        description={`${HOSPITAL.name} has been serving Jeedimetla, Hyderabad since ${ABOUT.establishedYear} — a ${ABOUT.bedCount} multispeciality hospital founded by ${ABOUT.founder.name}, one of the leading names in fertility medicine in South India.`}
        breadcrumbs={[{ label: "About Konark" }]}
      />

      <Container className="grid gap-10 py-10 sm:py-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-lg font-bold text-ink-950">Our Story</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            Since {ABOUT.establishedYear}, Konark Hospitals was built with a commitment to state-of-the-art infrastructure and advanced
            treatment options, delivered with the highest medical protocols — while balancing
            professionalism with affordability. The hospital operates under the guiding principles of the{" "}
            {ABOUT.trustName}, established by {ABOUT.trustFounder}, whose motto — &ldquo;{ABOUT.trustMotto}&rdquo; —
            continues to shape how care is delivered here.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-600">
            Today, Konark Hospitals brings together 12+ specialities under one roof, from fertility and
            obstetrics to cardiology, orthopaedics and paediatrics, backed by 24/7 emergency care.
          </p>
          <div className="mt-6">
            <ButtonLink href="/about/leadership" variant="outline">
              Read the Chairperson's Message
            </ButtonLink>
          </div>
        </div>

        <DepartmentImage
          src="/images/facilities/general-wards.png"
          alt="Konark Hospitals ward"
          sizes="(min-width: 1024px) 520px, 90vw"
          className="aspect-[4/3] w-full rounded-xl2 shadow-card"
        />
      </Container>

      <div className="bg-ink-50/60 py-10 sm:py-12">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl2 border border-ink-100 bg-white p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Eye size={19} />
            </span>
            <h3 className="mt-4 text-[15px] font-semibold text-ink-900">Our Vision</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{ABOUT.vision}</p>
          </div>
          <div className="rounded-xl2 border border-ink-100 bg-white p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Target size={19} />
            </span>
            <h3 className="mt-4 text-[15px] font-semibold text-ink-900">Our Mission</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{ABOUT.mission}</p>
          </div>
        </Container>
      </div>

      <Container className="py-10 sm:py-12">
        <h2 className="font-display text-lg font-bold text-ink-950">Our Values</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT.values.map((value, i) => {
            const Icon = valueIcons[i];
            return (
              <div key={value.name} className="rounded-xl2 border border-ink-100 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 text-[15px] font-semibold text-ink-900">{value.name}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">{value.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
}
