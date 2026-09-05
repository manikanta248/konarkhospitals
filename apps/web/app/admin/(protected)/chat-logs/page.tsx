"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import type { ChatLog } from "@konark/shared";

const OUTCOME_STYLES: Record<string, string> = {
  active: "bg-ink-100 text-ink-600",
  answered: "bg-brand-50 text-brand-700",
  booked: "bg-emerald-50 text-emerald-700",
  abandoned: "bg-ink-100 text-ink-500",
  emergency: "bg-red-50 text-red-700",
};

export default function AdminChatLogsPage() {
  const { getToken } = useAuth();
  const [items, setItems] = useState<ChatLog[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const { items } = await api.get<{ items: ChatLog[] }>("/api/chat/admin/logs", token);
        setItems(items);
      } catch {
        setError(true);
      }
    })();
  }, [getToken]);

  return (
    <div>
      <AdminPageHeader title="Chat Conversations" />

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">Failed to load chat logs — check that the API server is running.</p>}

      {!items && !error && (
        <div className="flex justify-center py-16">
          <Loader2 size={22} className="animate-spin text-brand-600" />
        </div>
      )}

      {items && items.length === 0 && <p className="text-sm text-ink-500">No conversations yet.</p>}

      {items && items.length > 0 && (
        <div className="overflow-x-auto rounded-xl2 border border-ink-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50/60">
                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-ink-500">Started</th>
                <th className="px-4 py-3 text-xs font-semibold text-ink-500">First Message</th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-ink-500">Messages</th>
                <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-ink-500">Outcome</th>
                <th className="px-4 py-3 text-xs font-semibold text-ink-500" />
              </tr>
            </thead>
            <tbody>
              {items.map((log) => (
                <tr key={log.id} className="border-b border-ink-50 last:border-none hover:bg-ink-50/40">
                  <td className="whitespace-nowrap px-4 py-3 text-ink-700">{new Date(log.createdAt).toLocaleString("en-IN")}</td>
                  <td className="max-w-xs truncate px-4 py-3 text-ink-700">{log.messages?.[0]?.content ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-700">{log.messages?.length ?? 0}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${OUTCOME_STYLES[log.outcome] ?? "bg-ink-100 text-ink-600"}`}>
                      {log.outcome}
                      {log.appointmentId ? " · booked" : ""}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/chat-logs/${log.id}`} className="text-xs font-semibold text-brand-600 hover:underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
