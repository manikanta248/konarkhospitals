import { Router } from "express";
import { db } from "../firebase";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.get("/summary", requireAdmin, async (_req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const [appointments, contacts, doctors, articles, chatConversations] = await Promise.all([
      db.collection("appointments").where("status", "==", "new").count().get(),
      db.collection("contactSubmissions").where("status", "==", "new").count().get(),
      db.collection("doctors").count().get(),
      db.collection("articles").count().get(),
      db.collection("chatLogs").where("updatedAt", ">=", sevenDaysAgo).count().get(),
    ]);
    res.json({
      newAppointments: appointments.data().count,
      newContacts: contacts.data().count,
      totalDoctors: doctors.data().count,
      totalArticles: articles.data().count,
      chatConversations7d: chatConversations.data().count,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load dashboard summary" });
  }
});

router.get("/me", requireAdmin, async (req: any, res) => {
  res.json({ admin: req.admin });
});

export default router;
