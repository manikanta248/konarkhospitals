"use client";

import { ResourceListPage } from "@/components/admin/ResourceListPage";
import type { Doctor } from "@konark/shared";

export default function AdminDoctorsPage() {
  return (
    <ResourceListPage<Doctor>
      title="Doctors"
      apiPath="/api/doctors"
      editBasePath="/admin/doctors"
      columns={[
        { header: "Name", render: (d) => <span className="font-medium text-ink-900">{d.name}</span> },
        { header: "Department", render: (d) => d.departmentName },
        { header: "Designation", render: (d) => d.designation },
        { header: "Featured", render: (d) => (d.featured ? "Yes" : "—") },
      ]}
    />
  );
}
