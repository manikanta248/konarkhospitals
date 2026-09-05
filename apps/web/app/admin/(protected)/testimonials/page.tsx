"use client";

import { ResourceListPage } from "@/components/admin/ResourceListPage";
import type { Testimonial } from "@konark/shared";

export default function AdminTestimonialsPage() {
  return (
    <ResourceListPage<Testimonial>
      title="Testimonials"
      apiPath="/api/testimonials"
      editBasePath="/admin/testimonials"
      columns={[
        { header: "Patient", render: (t) => <span className="font-medium text-ink-900">{t.patientName}</span> },
        { header: "Quote", render: (t) => <span className="line-clamp-1 max-w-xs">{t.quote}</span> },
        { header: "Rating", render: (t) => "★".repeat(t.rating) },
      ]}
    />
  );
}
