import { Router } from "express";
import { db } from "../firebase";
import { requireAdmin } from "../middleware/auth";

/**
 * Generic CRUD router factory for simple content collections (departments, doctors,
 * articles, testimonials, events, careers, healthPackages). Public GET, admin-only writes.
 */
export function createCollectionRouter(collectionName: string, options?: { publicFilter?: (query: any) => any }) {
  const router = Router();

  router.get("/", async (req, res) => {
    try {
      let ref: FirebaseFirestore.Query = db.collection(collectionName);
      if (options?.publicFilter) ref = options.publicFilter(ref);

      // Opt-in cursor pagination for large/growing collections — pass ?limit= to enable.
      // Collections without a limit keep the original full-list response for compatibility.
      const limitParam = req.query.limit ? parseInt(String(req.query.limit), 10) : undefined;
      if (limitParam && Number.isFinite(limitParam) && limitParam > 0) {
        let pageRef = ref.orderBy("createdAt", "desc").limit(limitParam);
        if (req.query.cursor) pageRef = pageRef.startAfter(String(req.query.cursor));
        const snap = await pageRef.get();
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        const last = snap.docs[snap.docs.length - 1];
        const nextCursor = snap.docs.length === limitParam && last ? last.get("createdAt") ?? null : null;
        return res.json({ items, nextCursor });
      }

      const snap = await ref.get();
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      res.json({ items });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch " + collectionName });
    }
  });

  router.get("/:slugOrId", async (req, res) => {
    try {
      const { slugOrId } = req.params;
      const bySlug = await db.collection(collectionName).where("slug", "==", slugOrId).limit(1).get();
      if (!bySlug.empty) {
        const doc = bySlug.docs[0];
        return res.json({ item: { id: doc.id, ...doc.data() } });
      }
      const byId = await db.collection(collectionName).doc(slugOrId).get();
      if (!byId.exists) return res.status(404).json({ error: "Not found" });
      res.json({ item: { id: byId.id, ...byId.data() } });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch item" });
    }
  });

  router.post("/", requireAdmin, async (req, res) => {
    try {
      const now = new Date().toISOString();
      const payload = { ...req.body, createdAt: now, updatedAt: now };
      const docRef = await db.collection(collectionName).add(payload);
      res.status(201).json({ item: { id: docRef.id, ...payload } });
    } catch (err) {
      res.status(500).json({ error: "Failed to create item" });
    }
  });

  router.put("/:id", requireAdmin, async (req, res) => {
    try {
      const payload = { ...req.body, updatedAt: new Date().toISOString() };
      await db.collection(collectionName).doc(req.params.id).set(payload, { merge: true });
      const updated = await db.collection(collectionName).doc(req.params.id).get();
      res.json({ item: { id: updated.id, ...updated.data() } });
    } catch (err) {
      res.status(500).json({ error: "Failed to update item" });
    }
  });

  router.delete("/:id", requireAdmin, async (req, res) => {
    try {
      await db.collection(collectionName).doc(req.params.id).delete();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete item" });
    }
  });

  return router;
}
