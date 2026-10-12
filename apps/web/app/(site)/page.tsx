import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { SuccessMetrics } from "@/components/home/SuccessMetrics";
import { QuickActions } from "@/components/home/QuickActions";
import { HighlightsMarquee } from "@/components/home/HighlightsMarquee";
import { DepartmentsGrid } from "@/components/home/DepartmentsGrid";
import { TrustSection } from "@/components/home/TrustSection";
import { FeaturedDoctors } from "@/components/home/FeaturedDoctors";
import { InternationalPatientsBanner } from "@/components/home/InternationalPatientsBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TestimonialVideos } from "@/components/home/TestimonialVideos";
import { ContactSection } from "@/components/home/ContactSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_FAQS } from "@/lib/site-faqs";
import { getDepartments, getDoctors, getTestimonials, getTestimonialVideos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Best Multispeciality Hospital in Hyderabad",
  description:
    "Konark Hospitals, Jeedimetla — best multispeciality hospital in Hyderabad for fertility & IVF, gynecology, paediatrics, cardiology, orthopaedics and 24/7 emergency care. Book an appointment online.",
  alternates: { canonical: "/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: SITE_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default async function HomePage() {
  const [departments, doctors, testimonials, testimonialVideos] = await Promise.all([
    getDepartments(),
    getDoctors(),
    getTestimonials(),
    getTestimonialVideos(12),
  ]);

  const featuredDoctors = doctors.filter((d) => d.featured).slice(0, 6);

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Hero />
      <QuickActions />
      <SuccessMetrics />
      <HighlightsMarquee />
      <DepartmentsGrid departments={departments.slice(0, 8)} total={departments.length} />
      <TrustSection />
      <FeaturedDoctors doctors={featuredDoctors} />
      <InternationalPatientsBanner />
      <TestimonialsSection testimonials={testimonials} />
      <TestimonialVideos initialItems={testimonialVideos.items} initialCursor={testimonialVideos.nextCursor} />
      <ContactSection />
      <CtaBanner />
    </>
  );
}
