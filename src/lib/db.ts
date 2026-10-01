import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

export const sql = databaseUrl ? neon(databaseUrl) : null;

/**
 * Auto-creates necessary schema tables if they do not exist.
 * Safe to run idempotently on database boot.
 */
export async function ensureTablesExist(): Promise<boolean> {
  if (!sql) return false;

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS post_likes (
        slug VARCHAR(255) PRIMARY KEY,
        likes INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS post_views (
        slug VARCHAR(255) PRIMARY KEY,
        views INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return true;
  } catch (error) {
    console.error("[Neon DB] Error ensuring schema tables:", error);
    return false;
  }
}
