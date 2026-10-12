import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { bucket } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/require-admin";

const LIMITS = {
  image: { types: ["image/jpeg", "image/png", "image/webp"], maxBytes: 10 * 1024 * 1024 },
  video: { types: ["video/mp4", "video/webm"], maxBytes: 200 * 1024 * 1024 },
} as const;

function safeName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
}

// Step 1: hand the browser a short-lived URL it can PUT the file to directly. The file never
// passes through this API, so large videos don't hit serverless request-size limits.
export async function POST(req: NextRequest) {
  const result = await requireAdmin(req);
  if ("error" in result) return result.error;

  try {
    const { kind, fileName, contentType, size } = (await req.json().catch(() => ({}))) ?? {};
    if (kind !== "image" && kind !== "video") return NextResponse.json({ error: "Unsupported upload type" }, { status: 400 });
    const rules = LIMITS[kind as keyof typeof LIMITS];
    if (!(rules.types as readonly string[]).includes(contentType)) {
      return NextResponse.json({ error: "This file type is not allowed" }, { status: 400 });
    }
    if (typeof size !== "number" || size <= 0 || size > rules.maxBytes) {
      return NextResponse.json({ error: `File must be under ${Math.round(rules.maxBytes / (1024 * 1024))} MB` }, { status: 400 });
    }

    const path = `uploads/${kind}s/${Date.now()}-${randomUUID().slice(0, 8)}-${safeName(String(fileName ?? "file"))}`;
    const [uploadUrl] = await bucket.file(path).getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 15 * 60 * 1000,
      contentType,
    });
    return NextResponse.json({ uploadUrl, path });
  } catch {
    return NextResponse.json({ error: "Could not prepare upload" }, { status: 500 });
  }
}
