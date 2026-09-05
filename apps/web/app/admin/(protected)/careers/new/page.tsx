"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { CAREER_FIELDS } from "@/lib/admin-resources";

export default function NewCareerPage() {
  return <ResourceEditPage title="Add Job Posting" apiPath="/api/careers" listPath="/admin/careers" fields={CAREER_FIELDS} />;
}
