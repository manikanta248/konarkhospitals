"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { DEPARTMENT_FIELDS } from "@/lib/admin-resources";

export default function NewDepartmentPage() {
  return <ResourceEditPage title="Add Department" apiPath="/api/departments" listPath="/admin/departments" fields={DEPARTMENT_FIELDS} />;
}
