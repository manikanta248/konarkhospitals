"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { AdminPageHeader } from "./AdminPageHeader";
import type { SubmissionStatus } from "@konark/shared";

interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  new: "bg-brand-50 text-brand-700",
  contacted: "bg-amber-50 text-amber-700",
  resolved: "bg-emerald-50 text-emerald-700",
};

export function SubmissionsListPage<T extends { id: string; status: SubmissionStatus }>({
  title,
  apiPath,
  columns,
}: {
  title: string;
  apiPath: string;
  columns: Column<T>[];
}) {
  const { getToken } = useAuth();
  const [items, setItems] = useState<T[] | null>(null);
  const [error, setError] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const { items } = await api.get<{ items: T[] }>(apiPath, token);
        setItems(items);
      } catch {
        setError(true);
      }
    })();
  }, [apiPath, getToken]);

  async function updateStatus(id: string, status: SubmissionStatus) {
    setUpdatingId(id);
    try {
      const token = await getToken();
      if (!token) return;
      await api.patch(`${apiPath}/${id}/status`, { status }, token);
      setItems((prev) => prev?.map((i) => (i.id === id ? { ...i, status } : i)) ?? null);
    } catch {
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <AdminPageHeader title={title} />

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">Failed to load data — check that the API server is running.</p>}

      {!items && !error && (
        <div className="flex justify-center py-16">
          <Loader2 size={22} className="animate-spin text-brand-600" />
        </div>
      )}

      {items && items.length === 0 && <p className="text-sm text-ink-500">No submissions yet.</p>}

      {items && items.length > 0 && (
        <div className="overflow-x-auto rounded-xl2 border border-ink-100 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-100 bg-ink-50/60">
                {columns.map((col) => (
                  <th key={col.header} className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-ink-500">
                    {col.header}
                  </th>
                ))}
                <th className="px-4 py-3 text-xs font-semibold text-ink-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-ink-50 last:border-none hover:bg-ink-50/40">
                  {columns.map((col) => (
                    <td key={col.header} className="px-4 py-3 text-ink-700">
                      {col.render(item)}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[item.status]}`}>{item.status}</span>
                      <select
                        value={item.status}
                        disabled={updatingId === item.id}
                        onChange={(e) => updateStatus(item.id, e.target.value as SubmissionStatus)}
                        className="rounded-lg border border-ink-200 bg-white px-2 py-1 text-xs focus:border-brand-400 focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
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
