"use client";

import { useEffect, useState } from "react";
import { Calendar, FileText, Mail, MessageCircle, Stethoscope } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";

interface Summary {
  newAppointments: number;
  newContacts: number;
  totalDoctors: number;
  totalArticles: number;
  chatConversations7d: number;
}

export default function AdminDashboardPage() {
  const { getToken, user } = useAuth();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const data = await api.get<Summary>("/api/dashboard/summary", token);
        setSummary(data);
      } catch {
        setError(true);
      }
    })();
  }, [getToken]);

  const cards = [
    { label: "New Appointments", value: summary?.newAppointments, icon: Calendar, tone: "bg-brand-600" },
    { label: "New Messages", value: summary?.newContacts, icon: Mail, tone: "bg-accent-600" },
    { label: "Total Doctors", value: summary?.totalDoctors, icon: Stethoscope, tone: "bg-brand-700" },
    { label: "Published Articles", value: summary?.totalArticles, icon: FileText, tone: "bg-accent-700" },
    { label: "Chat Conversations (7d)", value: summary?.chatConversations7d, icon: MessageCircle, tone: "bg-emerald-600" },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-bold text-ink-950">Welcome back{user?.displayName ? `, ${user.displayName}` : ""}</h1>
      <p className="mt-1 text-sm text-ink-500">Here's what's happening at Konark Hospitals today.</p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Could not load dashboard data — check that the API server is running.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="rounded-xl2 border border-ink-100 bg-white p-5 shadow-card">
            <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone} text-white`}>
              <Icon size={18} />
            </span>
            <p className="mt-4 font-display text-2xl font-bold text-ink-950">{value ?? "—"}</p>
            <p className="text-xs text-ink-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
