const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit & { next?: { revalidate?: number } }): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  // Public content barely changes minute-to-minute, so cache it briefly (Next.js Data Cache)
  // instead of hitting the live serverless API on every single page navigation — that
  // no-store-on-every-GET was the main cause of pages feeling stuck while navigating.
  // Admin-authenticated reads (token passed) skip caching so edits show up immediately.
  get: <T>(path: string, token?: string) =>
    request<T>(path, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      ...(token ? { cache: "no-store" as const } : { next: { revalidate: 60 } }),
    }),
  post: <T>(path: string, data: unknown, token?: string) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(data),
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache: "no-store",
    }),
  put: <T>(path: string, data: unknown, token: string) =>
    request<T>(path, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  patch: <T>(path: string, data: unknown, token: string) =>
    request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }),
  del: (path: string, token: string) =>
    request<void>(path, { method: "DELETE", headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }),
};
