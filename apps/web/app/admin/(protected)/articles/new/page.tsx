"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { ARTICLE_FIELDS } from "@/lib/admin-resources";

export default function NewArticlePage() {
  return <ResourceEditPage title="Add Article" apiPath="/api/articles" listPath="/admin/articles" fields={ARTICLE_FIELDS} />;
}
