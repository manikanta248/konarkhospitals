"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Loader2, MessageCircle, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { inputClass } from "@/components/admin/fields";
import { Button } from "@/components/ui/Button";
import type { ChatbotSettings } from "@konark/shared";

const MAX_QUICK_REPLIES = 8;

export default function AdminChatbotSettingsPage() {
  const { getToken } = useAuth();
  const [settings, setSettings] = useState<ChatbotSettings | null>(null);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get<ChatbotSettings>("/api/chat/settings");
        setSettings(data);
      } catch {
        setError(true);
      }
    })();
  }, []);

  function updateQuickReply(index: number, value: string) {
    setSettings((prev) => (prev ? { ...prev, quickReplies: prev.quickReplies.map((q, i) => (i === index ? value : q)) } : prev));
  }

  function removeQuickReply(index: number) {
    setSettings((prev) => (prev ? { ...prev, quickReplies: prev.quickReplies.filter((_, i) => i !== index) } : prev));
  }

  function addQuickReply() {
    setSettings((prev) => (prev && prev.quickReplies.length < MAX_QUICK_REPLIES ? { ...prev, quickReplies: [...prev.quickReplies, ""] } : prev));
  }

  async function handleSave() {
    if (!settings) return;
    setSaving(true);
    setSavedAt(null);
    try {
      const token = await getToken();
      if (!token) return;
      const cleanedReplies = settings.quickReplies.map((q) => q.trim()).filter(Boolean);
      await api.put("/api/chat/admin/settings", { enabled: settings.enabled, quickReplies: cleanedReplies }, token);
      setSettings((prev) => (prev ? { ...prev, quickReplies: cleanedReplies } : prev));
      setSavedAt(Date.now());
    } catch {
      alert("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AdminPageHeader title="Chatbot" />

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">Failed to load chatbot settings.</p>}

      {!settings && !error && (
        <div className="flex justify-center py-16">
          <Loader2 size={22} className="animate-spin text-brand-600" />
        </div>
      )}

      {settings && (
        <div className="flex flex-col gap-5">
          <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-base font-bold text-ink-950">Chat widget</h2>
                <p className="mt-1 text-sm text-ink-500">
                  Turn the site-wide chat widget off instantly — visitors see a "call us instead" message. Use this if something looks wrong
                  and you want it off the site right away, without waiting for a redeploy.
                </p>
              </div>
              <label className="flex shrink-0 cursor-pointer items-center gap-2 pl-4">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setSettings((prev) => (prev ? { ...prev, enabled: e.target.checked } : prev))}
                  className="h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full bg-ink-200 transition-colors checked:bg-brand-600 relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
                />
                <span className="text-xs font-semibold text-ink-700">{settings.enabled ? "On" : "Off"}</span>
              </label>
            </div>
          </div>

          <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-card">
            <h2 className="font-display text-base font-bold text-ink-950">Suggested questions</h2>
            <p className="mt-1 text-sm text-ink-500">
              Quick-reply chips shown when a visitor first opens the chat, so most people never need to type at all.
            </p>

            <div className="mt-4 flex flex-col gap-2">
              {settings.quickReplies.map((reply, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={reply}
                    onChange={(e) => updateQuickReply(i, e.target.value)}
                    maxLength={60}
                    className={inputClass}
                    placeholder="e.g. Do you accept insurance?"
                  />
                  <button
                    type="button"
                    onClick={() => removeQuickReply(i)}
                    aria-label="Remove"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              {settings.quickReplies.length === 0 && <p className="text-sm text-ink-400">No suggestions set — the widget will fall back to its defaults.</p>}
            </div>

            {settings.quickReplies.length < MAX_QUICK_REPLIES && (
              <button
                type="button"
                onClick={addQuickReply}
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline"
              >
                <Plus size={14} /> Add suggestion
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            {savedAt && <span className="text-xs text-emerald-600">Saved.</span>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/admin/chatbot/knowledge"
              className="flex items-start gap-3 rounded-xl2 border border-ink-100 bg-white p-5 shadow-card transition-colors hover:border-brand-200"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
                <BookOpen size={18} />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-ink-950">Knowledge Base</p>
                <p className="mt-1 text-xs text-ink-500">
                  Add custom Q&A the bot should answer with — policies, parking, insurance details, anything not already covered by your
                  department and doctor listings.
                </p>
              </div>
            </Link>
            <Link
              href="/admin/chat-logs"
              className="flex items-start gap-3 rounded-xl2 border border-ink-100 bg-white p-5 shadow-card transition-colors hover:border-brand-200"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-600 text-white">
                <MessageCircle size={18} />
              </span>
              <div>
                <p className="font-display text-sm font-bold text-ink-950">Chat Conversations</p>
                <p className="mt-1 text-xs text-ink-500">Review what visitors are actually asking, and which conversations turned into a booking.</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
