"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { TESTIMONIAL_VIDEO_FIELDS } from "@/lib/admin-resources";

export default function EditTestimonialVideoPage({ params }: { params: { id: string } }) {
  return (
    <ResourceEditPage
      title="Edit Video Testimonial"
      apiPath="/api/testimonial-videos"
      listPath="/admin/testimonial-videos"
      fields={TESTIMONIAL_VIDEO_FIELDS}
      id={params.id}
    />
  );
}
