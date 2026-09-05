"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { DEPARTMENT_FIELDS } from "@/lib/admin-resources";

export default function EditDepartmentPage({ params }: { params: { id: string } }) {
  return <ResourceEditPage title="Edit Department" apiPath="/api/departments" listPath="/admin/departments" fields={DEPARTMENT_FIELDS} id={params.id} />;
}
