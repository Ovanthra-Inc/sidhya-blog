import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://stuffsus-blog.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/preview/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
