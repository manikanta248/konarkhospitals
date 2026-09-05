"use client";

import { ResourceListPage } from "@/components/admin/ResourceListPage";
import type { Department } from "@konark/shared";

export default function AdminDepartmentsPage() {
  return (
    <ResourceListPage<Department>
      title="Departments"
      apiPath="/api/departments"
      editBasePath="/admin/departments"
      columns={[
        { header: "Name", render: (d) => <span className="font-medium text-ink-900">{d.name}</span> },
        { header: "Slug", render: (d) => d.slug },
        { header: "Order", render: (d) => d.order },
      ]}
    />
  );
}
