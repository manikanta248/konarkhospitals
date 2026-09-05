"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { CHAT_KNOWLEDGE_FIELDS } from "@/lib/admin-resources";

export default function EditChatKnowledgePage({ params }: { params: { id: string } }) {
  return (
    <ResourceEditPage
      title="Edit Knowledge Base Entry"
      apiPath="/api/chat-knowledge"
      listPath="/admin/chatbot/knowledge"
      fields={CHAT_KNOWLEDGE_FIELDS}
      id={params.id}
    />
  );
}
