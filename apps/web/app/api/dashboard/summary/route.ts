import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/require-admin";

export async function GET(req: NextRequest) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const [appointments, contacts, doctors, articles, chatConversations] = await Promise.all([
      db.collection("appointments").where("status", "==", "new").count().get(),
      db.collection("contactSubmissions").where("status", "==", "new").count().get(),
      db.collection("doctors").count().get(),
      db.collection("articles").count().get(),
      db.collection("chatLogs").where("updatedAt", ">=", sevenDaysAgo).count().get(),
    ]);
    return NextResponse.json({
      newAppointments: appointments.data().count,
      newContacts: contacts.data().count,
      totalDoctors: doctors.data().count,
      totalArticles: articles.data().count,
      chatConversations7d: chatConversations.data().count,
    });
  } catch {
    return NextResponse.json({ error: "Failed to load dashboard summary" }, { status: 500 });
  }
}
