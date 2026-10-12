import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/require-admin";
import { rateLimit } from "@/lib/rate-limit";

const ALLOWED_TYPES = ["appointment", "consultation", "second-opinion", "international"];
const PHONE_RE = /^[6-9]\d{9}$/;

export async function POST(req: NextRequest) {
  if (!rateLimit(req, "form", 15 * 60 * 1000, 20)) {
    return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const patientName = typeof body.patientName === "string" ? body.patientName.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";

  const errors: Array<{ msg: string }> = [];
  if (!patientName) errors.push({ msg: "Name is required" });
  if (!PHONE_RE.test(phone)) errors.push({ msg: "Enter a valid 10-digit Indian mobile number" });
  if (!ALLOWED_TYPES.includes(body.type)) errors.push({ msg: "Invalid appointment type" });
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
      type: body.type,
      status: "new",
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection("appointments").add(payload);
    return NextResponse.json({ item: { id: docRef.id, ...payload } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit appointment" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;

  const snap = await db.collection("appointments").orderBy("createdAt", "desc").get();
  return NextResponse.json({ items: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
}
