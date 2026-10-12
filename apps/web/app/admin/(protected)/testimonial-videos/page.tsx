"use client";

import { ResourceListPage } from "@/components/admin/ResourceListPage";
import type { TestimonialVideo } from "@konark/shared";

export default function AdminTestimonialVideosPage() {
  return (
    <ResourceListPage<TestimonialVideo>
      title="Video Testimonials"
      apiPath="/api/testimonial-videos"
      editBasePath="/admin/testimonial-videos"
      columns={[
        {
          header: "Poster",
          render: (v) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.posterUrl} alt="" className="h-12 w-12 rounded-md object-cover" />
          ),
        },
        { header: "Patient", render: (v) => <span className="font-medium text-ink-900">{v.patientName || "—"}</span> },
        { header: "Video URL", render: (v) => <span className="line-clamp-1 max-w-xs text-ink-500">{v.videoUrl}</span> },
      ]}
    />
  );
}
