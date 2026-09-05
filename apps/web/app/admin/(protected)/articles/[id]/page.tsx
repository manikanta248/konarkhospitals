"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { ARTICLE_FIELDS } from "@/lib/admin-resources";

export default function EditArticlePage({ params }: { params: { id: string } }) {
  return <ResourceEditPage title="Edit Article" apiPath="/api/articles" listPath="/admin/articles" fields={ARTICLE_FIELDS} id={params.id} />;
}
