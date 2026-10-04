import { NextRequest, NextResponse } from "next/server";
import { sql, ensureTablesExist } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Vercel-CDN-Cache-Control": "no-store",
};

// Fallback in-memory store if no external database is connected
const inMemoryLikes = new Map<string, number>();

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

async function updateInRedis(key: string, action: "like" | "unlike"): Promise<number | null> {
  if (!KV_URL || !KV_TOKEN) return null;
  try {
    const endpoint = action === "unlike" ? `${KV_URL}/decr/${key}` : `${KV_URL}/incr/${key}`;
    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const count = typeof data.result === "number" ? data.result : parseInt(data.result, 10);
    // Prevent negative counts in Redis
    if (count < 0) {
      await fetch(`${KV_URL}/set/${key}/0`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        cache: "no-store",
      });
      return 0;
    }
    return count;
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
      await ensureTablesExist();
      const rows = await sql`
        SELECT likes FROM post_likes WHERE slug = ${decodedSlug} LIMIT 1;
      `;
      const count = rows.length > 0 ? Number(rows[0].likes) : 0;
      return NextResponse.json({ likes: count, source: "neon" }, { headers: NO_CACHE_HEADERS });
    } catch (err) {
      console.error("[Neon GET Likes Error]:", err);
      // Fall through to next store on DB error
    }
  }

  // 2. Upstash / Redis KV (Secondary Store)
  const key = `likes:${decodedSlug}`;
  const redisVal = await getFromRedis(key);
  if (redisVal !== null) {
    return NextResponse.json({ likes: redisVal, source: "kv" }, { headers: NO_CACHE_HEADERS });
  }

  // 3. In-memory fallback (starts at real 0, zero dummy fake counts)
  const current = inMemoryLikes.get(decodedSlug) || 0;
  return NextResponse.json({ likes: current, source: "memory" }, { headers: NO_CACHE_HEADERS });
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const decodedSlug = decodeURIComponent(slug);

  let action: "like" | "unlike" = "like";
  try {
    const body = await request.json();
    if (body?.action === "unlike") {
      action = "unlike";
    }
  } catch {
    // If no body provided, defaults to like
  }

  // 1. Neon Serverless Postgres (Atomic Upsert / Decrement)
  if (sql) {
    try {
      await ensureTablesExist();

      if (action === "unlike") {
        const rows = await sql`
          UPDATE post_likes
          SET
            likes = GREATEST(0, post_likes.likes - 1),
            updated_at = CURRENT_TIMESTAMP
          WHERE slug = ${decodedSlug}
          RETURNING likes;
        `;
        const count = rows.length > 0 ? Number(rows[0].likes) : 0;
        return NextResponse.json({ likes: count, success: true, source: "neon" }, { headers: NO_CACHE_HEADERS });
      } else {
        const rows = await sql`
          INSERT INTO post_likes (slug, likes, updated_at)
          VALUES (${decodedSlug}, 1, CURRENT_TIMESTAMP)
          ON CONFLICT (slug)
          DO UPDATE SET
            likes = post_likes.likes + 1,
            updated_at = CURRENT_TIMESTAMP
          RETURNING likes;
        `;
        const count = rows.length > 0 ? Number(rows[0].likes) : 1;
        return NextResponse.json({ likes: count, success: true, source: "neon" }, { headers: NO_CACHE_HEADERS });
      }
    } catch (err) {
      console.error("[Neon POST Likes Error]:", err);
      // Fall through to next store on DB error
    }
  }

  // 2. Upstash / Redis KV
  const key = `likes:${decodedSlug}`;
  const redisVal = await updateInRedis(key, action);
  if (redisVal !== null) {
    return NextResponse.json({ likes: redisVal, success: true, source: "kv" }, { headers: NO_CACHE_HEADERS });
  }

  // 3. In-memory fallback
  let current = inMemoryLikes.get(decodedSlug) || 0;
  if (action === "unlike") {
    current = Math.max(0, current - 1);
  } else {
    current += 1;
  }
  inMemoryLikes.set(decodedSlug, current);

  return NextResponse.json({ likes: current, success: true, source: "memory" }, { headers: NO_CACHE_HEADERS });
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const decodedSlug = decodeURIComponent(slug);

  if (sql) {
    try {
      await ensureTablesExist();
      const rows = await sql`
        UPDATE post_likes
        SET
          likes = GREATEST(0, post_likes.likes - 1),
          updated_at = CURRENT_TIMESTAMP
        WHERE slug = ${decodedSlug}
        RETURNING likes;
      `;
      const count = rows.length > 0 ? Number(rows[0].likes) : 0;
      return NextResponse.json({ likes: count, success: true, source: "neon" }, { headers: NO_CACHE_HEADERS });
    } catch (err) {
      console.error("[Neon DELETE Likes Error]:", err);
    }
  }

  const key = `likes:${decodedSlug}`;
  const redisVal = await updateInRedis(key, "unlike");
  if (redisVal !== null) {
    return NextResponse.json({ likes: redisVal, success: true, source: "kv" }, { headers: NO_CACHE_HEADERS });
  }

  const current = Math.max(0, (inMemoryLikes.get(decodedSlug) || 1) - 1);
  inMemoryLikes.set(decodedSlug, current);
  return NextResponse.json({ likes: current, success: true, source: "memory" }, { headers: NO_CACHE_HEADERS });
}
