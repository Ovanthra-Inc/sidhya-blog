import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import CategoryPostsGrid from "@/components/category/CategoryPostsGrid";
import { getPostsByTag, getAllTags, getAllPosts } from "@/lib/posts";
import { CollectionJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({ tag: t.toLowerCase() }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const tagName = tag.charAt(0).toUpperCase() + tag.slice(1);

  if (!posts || posts.length === 0) {
    return {
      title: "Tag Not Found | SIDHYA",
      description: "Tag page not found.",
    };
  }

  return {
    title: `#${tagName} Articles & Benchmarks`,
    description: `Explore all ${posts.length} engineering breakdowns, guides, and tutorials tagged with #${tagName} on SIDHYA Blog.`,
    alternates: {
      canonical: `/tags/${tag.toLowerCase()}`,
    },
    openGraph: {
      title: `#${tagName} Technical Articles | SIDHYA`,
      description: `Browse technical guides and deep-dives tagged #${tagName}.`,
      url: `https://sidhya.studio/tags/${tag.toLowerCase()}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tagName} Technical Articles | SIDHYA`,
      description: `Browse technical guides and deep-dives tagged #${tagName}.`,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const allTags = getAllTags();
  const allPostsCount = getAllPosts().length;

  if (!posts || posts.length === 0) {
    notFound();
  }

  const formattedTag = tag.toUpperCase() === "AI" ? "AI" : tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CollectionJsonLd
        title={`#${formattedTag} Articles`}
        description={`Explore articles tagged with #${formattedTag}`}
        url={`/tags/${tag.toLowerCase()}`}
        itemCount={posts.length}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Posts", url: "/posts" },
          { name: `#${formattedTag}`, url: `/tags/${tag.toLowerCase()}` },
        ]}
      />

      <main className="px-6 md:px-20 pt-24 md:pt-28 pb-16 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        {/* Tag Header Banner */}
        <div className="mb-8 bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xs">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
              TAGGED TOPIC
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
              #{formattedTag}
            </h1>
            <p className="text-gray-600 text-sm max-w-xl leading-relaxed">
              Explore all engineering breakdowns, benchmarks, and tutorials tagged with <strong>#{formattedTag}</strong>.
            </p>
          </div>

          <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl text-center shadow-xs flex-shrink-0">
            <span className="text-3xl font-extrabold text-blue-600 block">{posts.length}</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {posts.length === 1 ? "Article" : "Articles"} Found
            </span>
          </div>
        </div>

        {/* Tag Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/posts"
            className="px-4 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
          >
            All Posts ({allPostsCount})
          </Link>
          {allTags.slice(0, 10).map((t) => {
            const isSelected = t.toLowerCase() === tag.toLowerCase();
            return (
              <Link
                key={t}
                href={`/tags/${t.toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                  isSelected
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                #{t}
              </Link>
            );
          })}
        </div>

        {/* Posts Grid */}
        <CategoryPostsGrid posts={posts} categoryName={`#${formattedTag}`} />
      </main>

      <Footer />
    </div>
  );
}
