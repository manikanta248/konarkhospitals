"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { DOCTOR_FIELDS } from "@/lib/admin-resources";

export default function EditDoctorPage({ params }: { params: { id: string } }) {
  return <ResourceEditPage title="Edit Doctor" apiPath="/api/doctors" listPath="/admin/doctors" fields={DOCTOR_FIELDS} id={params.id} />;
}
