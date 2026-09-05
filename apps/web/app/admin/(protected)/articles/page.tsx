"use client";

import { ResourceListPage } from "@/components/admin/ResourceListPage";
import type { Article } from "@konark/shared";

export default function AdminArticlesPage() {
  return (
    <ResourceListPage<Article>
      title="Articles & Resources"
      apiPath="/api/articles"
      editBasePath="/admin/articles"
      columns={[
        { header: "Title", render: (a) => <span className="font-medium text-ink-900">{a.title}</span> },
        { header: "Type", render: (a) => a.type },
        { header: "Published", render: (a) => new Date(a.publishedAt).toLocaleDateString("en-IN") },
      ]}
    />
  );
}
