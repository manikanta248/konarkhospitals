import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/require-admin";
import { rateLimit } from "@/lib/rate-limit";

const PHONE_RE = /^[6-9]\d{9}$/;

export async function POST(req: NextRequest) {
  if (!rateLimit(req, "form", 15 * 60 * 1000, 20)) {
    return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors: Array<{ msg: string }> = [];
  if (!name) errors.push({ msg: "Name is required" });
  if (!PHONE_RE.test(phone)) errors.push({ msg: "Enter a valid 10-digit Indian mobile number" });
  if (!message) errors.push({ msg: "Message is required" });
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  try {
    const payload = {
      name,
      phone,
      email: body.email ?? "",
      subject: body.subject ?? "",
      message,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection("contactSubmissions").add(payload);
    return NextResponse.json({ item: { id: docRef.id, ...payload } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;

  const snap = await db.collection("contactSubmissions").orderBy("createdAt", "desc").get();
  return NextResponse.json({ items: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
}
