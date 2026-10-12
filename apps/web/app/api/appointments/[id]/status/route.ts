import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/require-admin";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;

  const body = await req.json().catch(() => ({}));
  const { status } = body;
  if (!["new", "contacted", "resolved"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  await db.collection("appointments").doc(params.id).set({ status }, { merge: true });
  return NextResponse.json({ ok: true });
}
