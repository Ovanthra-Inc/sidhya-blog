import { getAllPosts } from "@/lib/posts";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sidhya.studio";
    const posts = getAllPosts();

    const rssItemsXml = posts
      .map((post) => {
        const postUrl = `${baseUrl}/posts/${post.slug}`;
        let pubDate: string;
        try {
          pubDate = new Date(post.date).toUTCString();
        } catch {
          pubDate = new Date().toUTCString();
        }
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <author><![CDATA[${post.author}]]></author>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
      })
      .join("");

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SIDHYA – Minimalist AI &amp; Engineering Blog</title>
    <link>${baseUrl}</link>
    <description>Technical publishing platform for autonomous AI agents, RAG architecture, vector search benchmarks, and Next.js 16 by Asutosh Sidhya.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItemsXml}
  </channel>
</rss>`;

    return new Response(rssXml, {
      headers: {
        "Content-Type": "text/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    console.error("[RSS Feed Error]:", err);
    // Return a valid but empty RSS feed rather than a 500 error
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sidhya.studio";
    const emptyFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>SIDHYA Blog</title>
    <link>${baseUrl}</link>
    <description>SIDHYA Engineering Blog</description>
    <language>en-us</language>
  </channel>
</rss>`;
    return new Response(emptyFeed, {
      status: 200,
      headers: { "Content-Type": "text/xml; charset=utf-8" },
    });
  }
}
