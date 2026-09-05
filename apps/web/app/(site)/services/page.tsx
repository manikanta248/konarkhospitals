import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { DepartmentCard } from "@/components/services/DepartmentCard";
import { getDepartments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Medical Services",
  description: "Explore Konark Hospitals' medical specialities, from cardiology and fertility to orthopaedics and paediatrics.",
};

export default async function ServicesPage() {
  const departments = await getDepartments();

  return (
    <>
      <PageHeader
        eyebrow="Specialities"
        title="Medical Services We Offer"
        description={`${departments.length}+ specialities backed by dedicated consultants, modern diagnostics and dedicated care — all under one roof at Konark Hospitals.`}
        breadcrumbs={[{ label: "Medical Services" }]}
      />
      <Container className="py-10 sm:py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {departments.map((dept) => (
            <DepartmentCard key={dept.slug} department={dept} />
          ))}
        </div>
      </Container>
    </>
  );
}
