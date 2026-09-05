"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import type { ChatLog } from "@konark/shared";

export default function AdminChatLogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getToken } = useAuth();
  const [log, setLog] = useState<ChatLog | null>(null);
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const { item } = await api.get<{ item: ChatLog }>(`/api/chat/admin/logs/${id}`, token);
        setLog(item);
      } catch {
        setError(true);
      }
    })();
  }, [id, getToken]);

  async function handleDelete() {
    if (!confirm("Delete this conversation? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const token = await getToken();
      if (!token) return;
      await api.del(`/api/chat/admin/logs/${id}`, token);
      router.push("/admin/chat-logs");
    } catch {
      alert("Failed to delete.");
      setDeleting(false);
    }
  }

  if (error) {
    return <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">Failed to load conversation.</p>;
  }

  if (!log) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 size={22} className="animate-spin text-brand-600" />
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader title="Conversation" />

      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-ink-500">
        <span>Started {new Date(log.createdAt).toLocaleString("en-IN")}</span>
        <span>·</span>
        <span>Outcome: {log.outcome}</span>
        {log.emergencyTriggered && <span className="rounded-full bg-red-50 px-2 py-0.5 font-medium text-red-700">Emergency filter fired</span>}
        {log.appointmentId && <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">Converted to appointment</span>}
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="ml-auto flex items-center gap-1 text-red-600 hover:underline disabled:opacity-50"
        >
          <Trash2 size={13} /> Delete
        </button>
      </div>

      <div className="space-y-3 rounded-xl2 border border-ink-100 bg-white p-4">
        {(log.messages ?? []).map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                m.role === "user" ? "bg-brand-600 text-white" : "bg-ink-50 text-ink-800"
              }`}
            >
              {m.content}
              {m.role === "assistant" && m.feedback && (
                <p className={`mt-1 text-[10.5px] ${m.feedback === "up" ? "text-emerald-600" : "text-red-500"}`}>
                  {m.feedback === "up" ? "Marked helpful by visitor" : "Marked unhelpful by visitor"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
