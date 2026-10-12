import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/require-admin";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;
  if (!rateLimit(req, "chat", 10 * 60 * 1000, 20)) {
    return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
  }

  try {
    const snap = await db.collection("chatLogs").orderBy("updatedAt", "desc").limit(200).get();
    return NextResponse.json({ items: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch chat logs" }, { status: 500 });
  }
}
