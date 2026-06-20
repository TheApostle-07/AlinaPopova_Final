type RateLimitEntry = { requests: number[] };

const buckets = new Map<string, RateLimitEntry>();

export const isRateLimited = (key: string, maxRequests: number, windowMs: number) => {
  const now = Date.now();
  const active = (buckets.get(key)?.requests ?? []).filter((timestamp) => now - timestamp < windowMs);

  if (active.length >= maxRequests) {
    buckets.set(key, { requests: active });
    return true;
  }

  active.push(now);
  buckets.set(key, { requests: active });
  return false;
};
