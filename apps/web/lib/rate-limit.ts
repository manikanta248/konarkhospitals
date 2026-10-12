import { NextRequest } from "next/server";

// Best-effort only: a Vercel serverless function instance can be torn down or scaled out at
// any time, so this in-memory counter doesn't give the strict guarantee express-rate-limit's
// memory store gave the single long-running Express process. It still blocks rapid bursts hitting
// the same warm instance, which is the common case in practice.
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export function rateLimit(req: NextRequest, name: string, windowMs: number, max: number): boolean {
  const key = `${name}:${clientIp(req)}`;
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= max) return false;
  bucket.count += 1;
  return true;
}
