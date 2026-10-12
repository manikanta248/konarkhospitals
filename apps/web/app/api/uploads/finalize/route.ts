import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { bucket } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/require-admin";

// Step 2: after the browser finishes uploading, give the file a permanent public download URL
// (Firebase download token, so no need to make the whole bucket public).
export async function POST(req: NextRequest) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;

  try {
    const { path } = (await req.json().catch(() => ({}))) ?? {};
    if (typeof path !== "string" || !path.startsWith("uploads/")) {
      return NextResponse.json({ error: "Invalid upload path" }, { status: 400 });
    }

    const file = bucket.file(path);
    const [exists] = await file.exists();
    if (!exists) return NextResponse.json({ error: "Upload not found. Please try again." }, { status: 404 });

    const token = randomUUID();
    await file.setMetadata({ metadata: { firebaseStorageDownloadTokens: token } });
    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(path)}?alt=media&token=${token}`;
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Could not finish upload" }, { status: 500 });
  }
}
