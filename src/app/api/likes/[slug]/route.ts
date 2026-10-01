import { NextRequest, NextResponse } from "next/server";

// Fallback in-memory store for serverless instance lifetime
const inMemoryLikes = new Map<string, number>();

/**
 * Generate a deterministic base like count based on slug string
 * so newly published articles start with a healthy social proof count (e.g. 15-45)
 */
function getDeterministicBaseCount(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return 15 + (Math.abs(hash) % 35);
}

// Check for Upstash or Vercel KV REST API environment variables
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function getFromRedis(key: string): Promise<number | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result ? parseInt(data.result, 10) : null;
  } catch {
    return null;
  }
}

async function incrInRedis(key: string): Promise<number | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const res = await fetch(`${KV_URL}/incr/${key}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.result === "number" ? data.result : parseInt(data.result, 10);
  } catch {
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const key = `likes:${slug}`;

  // 1. Try Redis / KV if configured
  const redisVal = await getFromRedis(key);
  if (redisVal !== null) {
    return NextResponse.json({ likes: redisVal });
  }

  // 2. Fallback to in-memory store + deterministic base
  const base = getDeterministicBaseCount(slug);
  const current = inMemoryLikes.get(slug) || 0;
  return NextResponse.json({ likes: base + current });
}

export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const key = `likes:${slug}`;

  // 1. Try Redis / KV if configured
  const redisVal = await incrInRedis(key);
  if (redisVal !== null) {
    return NextResponse.json({ likes: redisVal, success: true });
  }

  // 2. Fallback in-memory increment
  const base = getDeterministicBaseCount(slug);
  const current = (inMemoryLikes.get(slug) || 0) + 1;
  inMemoryLikes.set(slug, current);

  return NextResponse.json({ likes: base + current, success: true });
}
