"use client";

import { ResourceListPage } from "@/components/admin/ResourceListPage";
import type { HealthPackage } from "@konark/shared";

export default function AdminHealthPackagesPage() {
  return (
    <ResourceListPage<HealthPackage>
      title="Health Packages"
      apiPath="/api/health-packages"
      editBasePath="/admin/health-packages"
      columns={[
        { header: "Name", render: (p) => <span className="font-medium text-ink-900">{p.name}</span> },
        { header: "Price", render: (p) => `₹${p.price.toLocaleString("en-IN")}` },
        { header: "Order", render: (p) => p.order },
      ]}
    />
  );
}
