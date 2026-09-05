"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { HEALTH_PACKAGE_FIELDS } from "@/lib/admin-resources";

export default function NewHealthPackagePage() {
  return <ResourceEditPage title="Add Health Package" apiPath="/api/health-packages" listPath="/admin/health-packages" fields={HEALTH_PACKAGE_FIELDS} />;
}
