"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { EVENT_FIELDS } from "@/lib/admin-resources";

export default function EditEventPage({ params }: { params: { id: string } }) {
  return <ResourceEditPage title="Edit Event" apiPath="/api/events" listPath="/admin/events" fields={EVENT_FIELDS} id={params.id} />;
}
