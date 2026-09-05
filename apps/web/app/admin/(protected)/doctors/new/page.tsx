"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { DOCTOR_FIELDS } from "@/lib/admin-resources";

export default function NewDoctorPage() {
  return <ResourceEditPage title="Add Doctor" apiPath="/api/doctors" listPath="/admin/doctors" fields={DOCTOR_FIELDS} />;
}
