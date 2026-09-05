"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { TESTIMONIAL_FIELDS } from "@/lib/admin-resources";

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  return <ResourceEditPage title="Edit Testimonial" apiPath="/api/testimonials" listPath="/admin/testimonials" fields={TESTIMONIAL_FIELDS} id={params.id} />;
}
