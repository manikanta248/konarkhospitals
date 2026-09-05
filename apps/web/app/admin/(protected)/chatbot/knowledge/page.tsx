"use client";

import { ResourceListPage } from "@/components/admin/ResourceListPage";
import type { ChatKnowledgeEntry } from "@konark/shared";

export default function AdminChatKnowledgePage() {
  return (
    <ResourceListPage<ChatKnowledgeEntry>
      title="Chatbot Knowledge Base"
      apiPath="/api/chat-knowledge"
      editBasePath="/admin/chatbot/knowledge"
      columns={[
        { header: "Question / Topic", render: (k) => <span className="font-medium text-ink-900">{k.question}</span> },
        { header: "Answer", render: (k) => <span className="line-clamp-1 max-w-md">{k.answer}</span> },
      ]}
    />
  );
}
