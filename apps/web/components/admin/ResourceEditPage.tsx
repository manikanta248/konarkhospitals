"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { AdminPageHeader } from "./AdminPageHeader";
import { ResourceForm } from "./ResourceForm";
import type { FieldConfig } from "./fields";

export function ResourceEditPage({
  title,
  apiPath,
  listPath,
  fields,
  id,
}: {
  title: string;
  apiPath: string;
  listPath: string;
  fields: FieldConfig[];
  id?: string;
}) {
  const { getToken } = useAuth();
  const router = useRouter();
  const [initialValues, setInitialValues] = useState<Record<string, unknown> | undefined>(id ? undefined : {});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const { item } = await api.get<{ item: Record<string, unknown> }>(`${apiPath}/${id}`);
        setInitialValues(item);
      } catch {
        setNotFound(true);
      }
    })();
  }, [id, apiPath]);

  async function handleSubmit(values: Record<string, unknown>) {
    const token = await getToken();
    if (!token) throw new Error("Not authenticated");
    if (id) {
      await api.put(`${apiPath}/${id}`, values, token);
    } else {
      await api.post(apiPath, values, token);
    }
    router.push(listPath);
  }

  return (
    <div>
      <AdminPageHeader title={title} />

      {notFound && <p className="text-sm text-red-600">Item not found.</p>}

      {!initialValues && !notFound && (
        <div className="flex justify-center py-16">
          <Loader2 size={22} className="animate-spin text-brand-600" />
        </div>
      )}

      {initialValues && (
        <div className="max-w-2xl rounded-xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
          <ResourceForm fields={fields} initialValues={initialValues} onSubmit={handleSubmit} cancelHref={listPath} submitLabel={id ? "Save Changes" : "Create"} />
        </div>
      )}
    </div>
  );
}
