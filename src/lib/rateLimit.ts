import { headers } from "next/headers";

interface Bucket {
  count: number;
  resetAt: number;
}

/**
 * In-memory, per-process fixed-window limiter. Lightweight on purpose — no
 * external store. This means limits are per server instance, not shared
 * across a horizontally-scaled deployment, but that's an acceptable
 * tradeoff for slowing down casual scripted abuse of the public lead form.
 */
const buckets = new Map<string, Bucket>();
const CLEANUP_THRESHOLD = 5000;

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  if (buckets.size > CLEANUP_THRESHOLD) {
    for (const [k, bucket] of buckets) {
      if (now > bucket.resetAt) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

/**
 * Best-effort client IP from proxy headers. Trustworthy behind Vercel /
 * most reverse proxies, but self-spoofable if this app is ever exposed
 * directly without a proxy in front of it.
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  return headersList.get("x-real-ip") ?? "unknown";
}
