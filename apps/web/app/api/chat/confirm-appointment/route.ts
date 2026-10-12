import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { rateLimit } from "@/lib/rate-limit";

const PHONE_RE = /^[6-9]\d{9}$/;
const ALLOWED_TYPES = ["appointment", "consultation", "second-opinion", "international"];

export async function POST(req: NextRequest) {
  // Matches apps/api/src/app.ts, which applies BOTH chatBookingLimiter (narrower, 5/15min) and
  // the broader chatLimiter (20/10min, applied to all of /api/chat/*) to this specific route.
  if (!rateLimit(req, "chat-booking", 15 * 60 * 1000, 5)) {
    return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
  }
  if (!rateLimit(req, "chat", 10 * 60 * 1000, 20)) {
    return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
  const patientName = typeof body.patientName === "string" ? body.patientName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  const errors: Array<{ msg: string }> = [];
  if (sessionId.length < 8 || sessionId.length > 128) errors.push({ msg: "Invalid session" });
  if (!patientName) errors.push({ msg: "Name is required" });
  if (!PHONE_RE.test(phone)) errors.push({ msg: "Enter a valid 10-digit Indian mobile number" });
  if (errors.length) return NextResponse.json({ errors }, { status: 400 });

  try {
    const payload = {
      patientName,
      phone,
      email: body.email ?? "",
      departmentSlug: body.departmentSlug ?? "",
      doctorSlug: body.doctorSlug ?? "",
      preferredDate: body.preferredDate ?? "",
      preferredTime: body.preferredTime ?? "",
      message: body.message ?? "",
      type: ALLOWED_TYPES.includes(body.type) ? body.type : "appointment",
      source: "chatbot",
      status: "new",
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection("appointments").add(payload);

    await db
      .collection("chatLogs")
      .doc(sessionId)
      .set({ appointmentId: docRef.id, outcome: "booked", updatedAt: new Date().toISOString() }, { merge: true });

    return NextResponse.json({ item: { id: docRef.id, ...payload } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit appointment" }, { status: 500 });
  }
}
