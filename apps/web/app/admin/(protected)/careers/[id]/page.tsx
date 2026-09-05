"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { CAREER_FIELDS } from "@/lib/admin-resources";

export default function EditCareerPage({ params }: { params: { id: string } }) {
  return <ResourceEditPage title="Edit Job Posting" apiPath="/api/careers" listPath="/admin/careers" fields={CAREER_FIELDS} id={params.id} />;
}
