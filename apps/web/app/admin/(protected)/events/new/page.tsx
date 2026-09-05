"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { EVENT_FIELDS } from "@/lib/admin-resources";

export default function NewEventPage() {
  return <ResourceEditPage title="Add Event" apiPath="/api/events" listPath="/admin/events" fields={EVENT_FIELDS} />;
}
