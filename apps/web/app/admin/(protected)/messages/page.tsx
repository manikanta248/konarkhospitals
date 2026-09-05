"use client";

import { SubmissionsListPage } from "@/components/admin/SubmissionsListPage";
import type { ContactSubmission } from "@konark/shared";

export default function AdminMessagesPage() {
  return (
    <SubmissionsListPage<ContactSubmission>
      title="Contact Messages"
      apiPath="/api/contact"
      columns={[
        { header: "Name", render: (c) => <span className="font-medium text-ink-900">{c.name}</span> },
        { header: "Phone", render: (c) => <a href={`tel:${c.phone}`} className="text-brand-600">{c.phone}</a> },
        { header: "Subject", render: (c) => c.subject || "—" },
        { header: "Message", render: (c) => <span className="line-clamp-1 max-w-xs">{c.message}</span> },
        { header: "Received", render: (c) => new Date(c.createdAt).toLocaleString("en-IN") },
      ]}
    />
  );
}
