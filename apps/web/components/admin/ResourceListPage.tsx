"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { AdminPageHeader } from "./AdminPageHeader";

interface Column<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

export function ResourceListPage<T extends { id: string }>({
  title,
  apiPath,
  editBasePath,
  columns,
}: {
  title: string;
  apiPath: string;
  editBasePath: string;
  columns: Column<T>[];
}) {
  const { getToken } = useAuth();
  const [items, setItems] = useState<T[] | null>(null);
  const [error, setError] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    try {
      const { items } = await api.get<{ items: T[] }>(apiPath);
      setItems(items);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    load();
  }, [apiPath]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const token = await getToken();
      if (!token) return;
      await api.del(`${apiPath}/${id}`, token);
      setItems((prev) => prev?.filter((i) => i.id !== id) ?? null);
    } catch {
      alert("Failed to delete. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      <AdminPageHeader title={title} newHref={`${editBasePath}/new`} />

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">Failed to load data — check that the API server is running.</p>}

      {!items && !error && (
        <div className="flex justify-center py-16">
          <Loader2 size={22} className="animate-spin text-brand-600" />
        </div>
      )}

      {items && items.length === 0 && <p className="text-sm text-ink-500">No items yet.</p>}

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
                <th className="px-4 py-3 text-right text-xs font-semibold text-ink-500">Actions</th>
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
                    <div className="flex justify-end gap-1">
                      <Link href={`${editBasePath}/${item.id}`} className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 hover:text-brand-700">
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="rounded-lg p-2 text-ink-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      >
                        {deletingId === item.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      </button>
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
