import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { rateLimit } from "@/lib/rate-limit";

export async function PATCH(req: NextRequest, { params }: { params: { sessionId: string } }) {
  if (!rateLimit(req, "chat", 10 * 60 * 1000, 20)) {
    return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
  }

  const { sessionId } = params;
  const body = await req.json().catch(() => ({}));
  const { timestamp, feedback } = body;
  if (!["up", "down"].includes(feedback)) return NextResponse.json({ error: "Invalid feedback" }, { status: 400 });

  try {
    const ref = db.collection("chatLogs").doc(sessionId);
    const snap = await ref.get();
    if (!snap.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const messages = (snap.data()?.messages ?? []).map((m: any) => (m.timestamp === timestamp ? { ...m, feedback } : m));
    await ref.set({ messages }, { merge: true });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
