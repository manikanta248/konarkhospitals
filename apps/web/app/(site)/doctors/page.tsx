import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { DoctorsDirectory } from "@/components/doctors/DoctorsDirectory";
import { getDepartments, getDoctors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Find a Doctor in Hyderabad",
  description: "Search Konark Hospitals' specialists in Jeedimetla, Hyderabad by name or department and book a consultation online.",
  alternates: { canonical: "/doctors" },
};

export default async function DoctorsPage() {
  const [doctors, departments] = await Promise.all([getDoctors(), getDepartments()]);

  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Find the Right Doctor"
        description="Browse our specialists across 12+ departments — search by name, specialty or department to find the right consultant for you."
        breadcrumbs={[{ label: "Doctors" }]}
      />
      <Container className="py-10 sm:py-12">
        <Suspense fallback={null}>
          <DoctorsDirectory doctors={doctors} departments={departments} />
        </Suspense>
      </Container>
    </>
  );
}
