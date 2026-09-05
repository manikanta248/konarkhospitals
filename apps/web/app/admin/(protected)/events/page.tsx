"use client";

import { ResourceListPage } from "@/components/admin/ResourceListPage";
import type { HospitalEvent } from "@konark/shared";

export default function AdminEventsPage() {
  return (
    <ResourceListPage<HospitalEvent>
      title="Events"
      apiPath="/api/events"
      editBasePath="/admin/events"
      columns={[
        { header: "Title", render: (e) => <span className="font-medium text-ink-900">{e.title}</span> },
        { header: "Date", render: (e) => e.date },
        { header: "Location", render: (e) => e.location },
      ]}
    />
  );
}
