import React from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sidhya.studio";

// ─── 1. WebSite & Organization / Person Schema ────────────────────────────────
export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": "SIDHYA",
        "description": "Minimalist AI & Engineering Blog by Asutosh Sidhya. Autonomous AI agents, RAG architecture, vector search, and Next.js 16.",
        "publisher": {
          "@id": `${SITE_URL}/#organization`,
        },
        "inLanguage": "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "SIDHYA Blog",
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/logo-s.png`,
          "width": 512,
          "height": 512,
        },
        "founder": {
          "@type": "Person",
          "name": "Asutosh Sidhya",
          "jobTitle": "Principal AI & Fullstack Engineer",
          "url": SITE_URL,
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#author`,
        "name": "Asutosh Sidhya",
        "jobTitle": "Principal AI Engineer",
        "url": SITE_URL,
        "sameAs": [
          "https://github.com/asutoshsidhya",
          "https://twitter.com/asutoshsidhya",
          "https://linkedin.com/in/asutoshsidhya",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 2. BlogPosting / TechArticle Schema ────────────────────────────────────────
interface BlogPostingJsonLdProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
}

export function BlogPostingJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
  authorName = "Asutosh Sidhya",
  coverImage = "/posts/ai-agent-cover.png",
  category,
  tags = [],
}: BlogPostingJsonLdProps) {
  const postUrl = `${SITE_URL}/posts/${slug}`;
  const imageUrl = coverImage.startsWith("http") ? coverImage : `${SITE_URL}${coverImage}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${postUrl}/#article`,
    "isPartOf": {
      "@type": "WebPage",
      "@id": postUrl,
      "url": postUrl,
      "name": title,
    },
    "headline": title,
    "description": description,
    "url": postUrl,
    "mainEntityOfPage": postUrl,
    "datePublished": new Date(datePublished).toISOString(),
    "dateModified": new Date(dateModified || datePublished).toISOString(),
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "SIDHYA Blog",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo-s.png`,
      },
    },
    "image": {
      "@type": "ImageObject",
      "url": imageUrl,
    },
    "articleSection": category || "Technology",
    "keywords": tags.join(", "),
    "inLanguage": "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 3. BreadcrumbList Schema ──────────────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 4. Course / Playlist Series Schema ──────────────────────────────────────
interface CourseJsonLdProps {
  title: string;
  description: string;
  slug: string;
  posts: Array<{ title: string; slug: string }>;
}

export function CourseJsonLd({ title, description, slug, posts }: CourseJsonLdProps) {
  const playlistUrl = `${SITE_URL}/playlists/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "SIDHYA Blog",
      "url": SITE_URL,
    },
    "url": playlistUrl,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
    },
    "itemListElement": posts.map((post, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "TechArticle",
        "name": post.title,
        "url": `${SITE_URL}/posts/${post.slug}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 5. CollectionPage Schema for Categories/Tags ─────────────────────────────
interface CollectionJsonLdProps {
  title: string;
  description: string;
  url: string;
  itemCount: number;
}

export function CollectionJsonLd({ title, description, url, itemCount }: CollectionJsonLdProps) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": title,
    "description": description,
    "url": fullUrl,
    "numberOfItems": itemCount,
    "publisher": {
      "@type": "Organization",
      "name": "SIDHYA Blog",
      "url": SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
