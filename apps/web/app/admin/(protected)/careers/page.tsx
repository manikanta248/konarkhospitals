"use client";

import { ResourceListPage } from "@/components/admin/ResourceListPage";
import type { CareerPosting } from "@konark/shared";

export default function AdminCareersPage() {
  return (
    <ResourceListPage<CareerPosting>
      title="Careers"
      apiPath="/api/careers"
      editBasePath="/admin/careers"
      columns={[
        { header: "Title", render: (c) => <span className="font-medium text-ink-900">{c.title}</span> },
        { header: "Department", render: (c) => c.department },
        { header: "Location", render: (c) => c.location },
        { header: "Active", render: (c) => (c.active ? "Yes" : "No") },
      ]}
    />
  );
}
