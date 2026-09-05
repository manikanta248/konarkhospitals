"use client";

import { SubmissionsListPage } from "@/components/admin/SubmissionsListPage";
import type { AppointmentSubmission } from "@konark/shared";

export default function AdminAppointmentsPage() {
  return (
    <SubmissionsListPage<AppointmentSubmission>
      title="Appointment Requests"
      apiPath="/api/appointments"
      columns={[
        { header: "Patient", render: (a) => <span className="font-medium text-ink-900">{a.patientName}</span> },
        { header: "Phone", render: (a) => <a href={`tel:${a.phone}`} className="text-brand-600">{a.phone}</a> },
        { header: "Type", render: (a) => a.type },
        { header: "Department", render: (a) => a.departmentSlug || "—" },
        { header: "Doctor", render: (a) => a.doctorSlug || "—" },
        { header: "Preferred", render: (a) => [a.preferredDate, a.preferredTime].filter(Boolean).join(" · ") || "—" },
        { header: "Received", render: (a) => new Date(a.createdAt).toLocaleString("en-IN") },
      ]}
    />
  );
}
