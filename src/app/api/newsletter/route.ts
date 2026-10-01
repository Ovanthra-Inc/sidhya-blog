import { NextRequest, NextResponse } from "next/server";
import { sql, ensureTablesExist } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!sql) {
      return NextResponse.json(
        { error: "Newsletter service is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    await ensureTablesExist();

    try {
      await sql`
        INSERT INTO newsletter_subscribers (email)
        VALUES (${email})
        ON CONFLICT (email) DO NOTHING;
      `;
      return NextResponse.json({
        success: true,
        message: "Thank you for subscribing to SIDHYA engineering insights.",
      });
    } catch (dbErr) {
      console.error("[Neon Newsletter Insert Error]:", dbErr);
      return NextResponse.json(
        { error: "Failed to save subscription. Please try again." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("[Newsletter API Error]:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
