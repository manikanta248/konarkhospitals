import { Router } from "express";
import { randomUUID } from "crypto";
import { bucket } from "../firebase";
import { requireAdmin } from "../middleware/auth";

const router = Router();

const LIMITS = {
  image: { types: ["image/jpeg", "image/png", "image/webp"], maxBytes: 10 * 1024 * 1024 },
  video: { types: ["video/mp4", "video/webm"], maxBytes: 200 * 1024 * 1024 },
} as const;

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
}

// Step 1: hand the browser a short-lived URL it can PUT the file to directly. The file never
// passes through this API, so large videos don't hit serverless request-size limits.
router.post("/sign", requireAdmin, async (req, res) => {
  try {
    const { kind, fileName, contentType, size } = req.body ?? {};
    if (kind !== "image" && kind !== "video") return res.status(400).json({ error: "Unsupported upload type" });
    const rules = LIMITS[kind as keyof typeof LIMITS];
    if (!(rules.types as readonly string[]).includes(contentType)) return res.status(400).json({ error: "This file type is not allowed" });
    if (typeof size !== "number" || size <= 0 || size > rules.maxBytes) {
      return res.status(400).json({ error: `File must be under ${Math.round(rules.maxBytes / (1024 * 1024))} MB` });
    }

    const path = `uploads/${kind}s/${Date.now()}-${randomUUID().slice(0, 8)}-${safeName(String(fileName ?? "file"))}`;
    const [uploadUrl] = await bucket.file(path).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType,
    });
    res.json({ uploadUrl, path });
  } catch (err) {
    res.status(500).json({ error: "Could not prepare upload" });
  }
});

// Step 2: after the browser finishes uploading, give the file a permanent public download URL
// (Firebase download token, so no need to make the whole bucket public).
router.post("/finalize", requireAdmin, async (req, res) => {
  try {
    const { path } = req.body ?? {};
    if (typeof path !== "string" || !path.startsWith("uploads/")) return res.status(400).json({ error: "Invalid upload path" });

    const file = bucket.file(path);
    const [exists] = await file.exists();
    if (!exists) return res.status(404).json({ error: "Upload not found. Please try again." });

    const token = randomUUID();
    await file.setMetadata({ metadata: { firebaseStorageDownloadTokens: token } });
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: "Could not finish upload" });
  }
});

export default router;
