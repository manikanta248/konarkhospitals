import { Hero } from "@/components/home/Hero";
import { QuickActions } from "@/components/home/QuickActions";
import { HighlightsMarquee } from "@/components/home/HighlightsMarquee";
import { DepartmentsGrid } from "@/components/home/DepartmentsGrid";
import { TrustSection } from "@/components/home/TrustSection";
import { FeaturedDoctors } from "@/components/home/FeaturedDoctors";
import { InternationalPatientsBanner } from "@/components/home/InternationalPatientsBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { getDepartments, getDoctors, getTestimonials } from "@/lib/content";

export default async function HomePage() {
  const [departments, doctors, testimonials] = await Promise.all([
    getDepartments(),
    getDoctors(),
    getTestimonials(),
  ]);

  const featuredDoctors = doctors.filter((d) => d.featured).slice(0, 6);

  return (
    <>
      <Hero />
      <QuickActions />
      <HighlightsMarquee />
      <DepartmentsGrid departments={departments.slice(0, 8)} total={departments.length} />
      <TrustSection />
      <FeaturedDoctors doctors={featuredDoctors} />
      <InternationalPatientsBanner />
      <TestimonialsSection testimonials={testimonials} />
      <CtaBanner />
    </>
  );
}
