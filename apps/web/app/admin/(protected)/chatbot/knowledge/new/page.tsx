"use client";

import { ResourceEditPage } from "@/components/admin/ResourceEditPage";
import { CHAT_KNOWLEDGE_FIELDS } from "@/lib/admin-resources";

export default function NewChatKnowledgePage() {
  return (
    <ResourceEditPage
      title="Add Knowledge Base Entry"
      apiPath="/api/chat-knowledge"
      listPath="/admin/chatbot/knowledge"
      fields={CHAT_KNOWLEDGE_FIELDS}
    />
  );
}
