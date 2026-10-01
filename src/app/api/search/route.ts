import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  const allPosts = getAllPosts();

  if (!q) {
    // Return latest 5 articles as quick suggestions
    const initialSuggestions = allPosts.slice(0, 5).map((p) => ({
      title: p.title,
      slug: p.slug,
      category: p.category,
      readTime: p.readTime,
    }));
    return NextResponse.json({ results: initialSuggestions });
  }

  const results = allPosts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
    .slice(0, 8)
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      category: p.category,
      readTime: p.readTime,
    }));

  return NextResponse.json({ results });
}
