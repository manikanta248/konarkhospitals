import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/require-admin";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;
  if (!rateLimit(req, "chat", 10 * 60 * 1000, 20)) {
    return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
  }

  try {
    const doc = await db.collection("chatLogs").doc(params.id).get();
    if (!doc.exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ item: { id: doc.id, ...doc.data() } });
  } catch {
    return NextResponse.json({ error: "Failed to fetch conversation" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;
  if (!rateLimit(req, "chat", 10 * 60 * 1000, 20)) {
    return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
  }

  try {
    await db.collection("chatLogs").doc(params.id).delete();
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "Failed to delete conversation" }, { status: 500 });
  }
}
