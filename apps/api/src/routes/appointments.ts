import { Router } from "express";
import { body, validationResult } from "express-validator";
import { db } from "../firebase";
import { requireAdmin } from "../middleware/auth";

const router = Router();

router.post(
  "/",
  [
    body("patientName").trim().notEmpty().withMessage("Name is required"),
    body("phone").trim().matches(/^[6-9]\d{9}$/).withMessage("Enter a valid 10-digit Indian mobile number"),
    body("type").isIn(["appointment", "consultation", "second-opinion", "international"]),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const payload = {
        patientName: req.body.patientName,
        phone: req.body.phone,
        email: req.body.email ?? "",
        departmentSlug: req.body.departmentSlug ?? "",
        doctorSlug: req.body.doctorSlug ?? "",
        preferredDate: req.body.preferredDate ?? "",
        preferredTime: req.body.preferredTime ?? "",
        message: req.body.message ?? "",
        type: req.body.type,
        status: "new",
        createdAt: new Date().toISOString(),
      };
      const docRef = await db.collection("appointments").add(payload);
      res.status(201).json({ item: { id: docRef.id, ...payload } });
    } catch (err) {
      res.status(500).json({ error: "Failed to submit appointment" });
    }
  }
);

router.get("/", requireAdmin, async (_req, res) => {
  const snap = await db.collection("appointments").orderBy("createdAt", "desc").get();
  res.json({ items: snap.docs.map((d) => ({ id: d.id, ...d.data() })) });
});

router.patch("/:id/status", requireAdmin, async (req, res) => {
  const { status } = req.body;
  if (!["new", "contacted", "resolved"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  await db.collection("appointments").doc(req.params.id).set({ status }, { merge: true });
  res.json({ ok: true });
});

export default router;
