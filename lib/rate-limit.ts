type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000;
const LIMIT_PER_MIN = 12;
const LIMIT_PER_DAY = 150;
const dayKeyPrefix = "day:";

function hit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);

  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count += 1;
  return true;
}

/**
 * 进程内限流。Vercel / 单实例 Node 够用。
 * 多实例部署时需要换成 KV 或 Redis，否则限流会被分摊到各实例上。
 */
export function checkRateLimit(ip: string): {
  ok: boolean;
  reason?: "minute" | "day";
  retryAfter?: number;
} {
  if (!hit(`min:${ip}`, LIMIT_PER_MIN, WINDOW_MS)) {
    return { ok: false, reason: "minute", retryAfter: 60 };
  }
  if (!hit(`${dayKeyPrefix}${ip}`, LIMIT_PER_DAY, 24 * 60 * 60 * 1000)) {
    return { ok: false, reason: "day" };
  }
  return { ok: true };
}

/** 定期清理过期桶，避免长时间运行后内存缓慢增长 */
let lastSweep = Date.now();
export function maybeSweep() {
  const now = Date.now();
  if (now - lastSweep < 10 * 60 * 1000) return;
  lastSweep = now;
  for (const [k, v] of buckets) {
    if (now > v.resetAt) buckets.delete(k);
  }
}
