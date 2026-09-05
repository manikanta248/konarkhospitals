"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { HEALTH_PACKAGE_FIELDS } from "@/lib/admin-resources";

export default function EditHealthPackagePage({ params }: { params: { id: string } }) {
  return <ResourceEditPage title="Edit Health Package" apiPath="/api/health-packages" listPath="/admin/health-packages" fields={HEALTH_PACKAGE_FIELDS} id={params.id} />;
}
