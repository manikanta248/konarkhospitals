"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { TESTIMONIAL_FIELDS } from "@/lib/admin-resources";

export default function NewTestimonialPage() {
  return <ResourceEditPage title="Add Testimonial" apiPath="/api/testimonials" listPath="/admin/testimonials" fields={TESTIMONIAL_FIELDS} />;
}
