"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "@/components/layout/Logo";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const data = new FormData(e.currentTarget);

    try {
      await login(String(data.get("email")), String(data.get("password")));
      router.replace("/admin");
    } catch {
      setError("Invalid email or password.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50/50 px-4">
      <div className="w-full max-w-sm rounded-xl2 border border-ink-100 bg-white p-8 shadow-card">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-lg font-bold text-ink-950">Admin Sign In</h1>
        <p className="mt-1 text-center text-sm text-ink-500">Staff access only</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-600">Email</label>
            <input
              name="email"
              type="email"
              required
              className="h-11 w-full rounded-lg border border-ink-200 px-3.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="you@konarkhospitals.com"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-600">Password</label>
            <input
              name="password"
              type="password"
              required
              className="h-11 w-full rounded-lg border border-ink-200 px-3.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-[13px] text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-600 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
