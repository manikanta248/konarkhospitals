import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/require-admin";
import { rateLimit } from "@/lib/rate-limit";

export async function PUT(req: NextRequest) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;
  if (!rateLimit(req, "chat", 10 * 60 * 1000, 20)) {
    return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const { enabled, quickReplies } = body;

  const errors: Array<{ msg: string }> = [];
  if (typeof enabled !== "boolean") errors.push({ msg: "enabled must be a boolean" });
  if (!Array.isArray(quickReplies) || quickReplies.length > 8) errors.push({ msg: "quickReplies must be an array of at most 8 items" });
  else if (!quickReplies.every((q) => typeof q === "string" && q.trim().length >= 1 && q.trim().length <= 60)) {
    errors.push({ msg: "Each quick reply must be 1-60 characters" });
  }
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  try {
    await db.collection("config").doc("chatbot").set({ enabled, quickReplies }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
