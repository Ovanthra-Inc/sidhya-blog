import { NextRequest, NextResponse } from "next/server";
import { sql, ensureTablesExist } from "@/lib/db";

// Fallback in-memory store if no external database is connected
const inMemoryLikes = new Map<string, number>();
let tablesInitialized = false;

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
  const decodedSlug = decodeURIComponent(slug);

  // 1. Neon Serverless Postgres (Primary Production Store)
  if (sql) {
    try {
      if (!tablesInitialized) {
        await ensureTablesExist();
        tablesInitialized = true;
      }
      const rows = await sql`
        SELECT likes FROM post_likes WHERE slug = ${decodedSlug} LIMIT 1;
      `;
      const count = rows.length > 0 ? Number(rows[0].likes) : 0;
      return NextResponse.json({ likes: count, source: "neon" });
    } catch (err) {
      console.error("[Neon GET Likes Error]:", err);
    }
  }

  // 2. Upstash / Redis KV (Secondary Store)
  const key = `likes:${decodedSlug}`;
  const redisVal = await getFromRedis(key);
  if (redisVal !== null) {
    return NextResponse.json({ likes: redisVal, source: "kv" });
  }

  // 3. In-memory fallback (starts at real 0, zero dummy fake counts)
  const current = inMemoryLikes.get(decodedSlug) || 0;
  return NextResponse.json({ likes: current, source: "memory" });
}

export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const decodedSlug = decodeURIComponent(slug);

  // 1. Neon Serverless Postgres (Atomic Upsert)
  if (sql) {
    try {
      if (!tablesInitialized) {
        await ensureTablesExist();
        tablesInitialized = true;
      }
      const rows = await sql`
        INSERT INTO post_likes (slug, likes, updated_at)
        VALUES (${decodedSlug}, 1, CURRENT_TIMESTAMP)
        ON CONFLICT (slug)
        DO UPDATE SET
          likes = post_likes.likes + 1,
          updated_at = CURRENT_TIMESTAMP
        RETURNING likes;
      `;
      const count = Number(rows[0].likes);
      return NextResponse.json({ likes: count, success: true, source: "neon" });
    } catch (err) {
      console.error("[Neon POST Likes Error]:", err);
    }
  }

  // 2. Upstash / Redis KV
  const key = `likes:${decodedSlug}`;
  const redisVal = await incrInRedis(key);
  if (redisVal !== null) {
    return NextResponse.json({ likes: redisVal, success: true, source: "kv" });
  }

  // 3. In-memory fallback increment
  const current = (inMemoryLikes.get(decodedSlug) || 0) + 1;
  inMemoryLikes.set(decodedSlug, current);

  return NextResponse.json({ likes: current, success: true, source: "memory" });
}
