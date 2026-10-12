import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { rateLimit } from "@/lib/rate-limit";

const DEFAULT_QUICK_REPLIES = ["OPD timings?", "Book an appointment", "Insurance accepted?", "This is an emergency"];

// Public — the widget needs this before the visitor is authenticated as anything.
export async function GET(req: NextRequest) {
  if (!rateLimit(req, "chat", 10 * 60 * 1000, 20)) {
    return NextResponse.json({ enabled: true, quickReplies: DEFAULT_QUICK_REPLIES }, { status: 429 });
  }

  try {
    const doc = await db.collection("config").doc("chatbot").get();
    const data = doc.exists ? doc.data() ?? {} : {};
    return NextResponse.json({
      enabled: data.enabled !== false,
      quickReplies: Array.isArray(data.quickReplies) && data.quickReplies.length > 0 ? data.quickReplies : DEFAULT_QUICK_REPLIES,
    });
  } catch {
    return NextResponse.json({ enabled: true, quickReplies: DEFAULT_QUICK_REPLIES }, { status: 500 });
  }
}
