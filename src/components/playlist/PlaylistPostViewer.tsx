"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import ArticleRenderer from "@/components/mdx/ArticleRenderer";
import BackButton from "@/components/ui/BackButton";
import PostCard from "@/components/ui/PostCard";
import { Post } from "@/lib/posts";
import { PlaylistContext } from "@/lib/playlists";

interface PlaylistPostViewerProps {
  initialPost: Post;
  playlistContext: PlaylistContext;
  playlistPostsMap: Record<string, Post>;
  relatedPosts: Post[];
}

export default function PlaylistPostViewer({
  initialPost,
  playlistContext,
  playlistPostsMap,
  relatedPosts,
}: PlaylistPostViewerProps) {
  const [currentSlug, setCurrentSlug] = useState(initialPost.slug);

  useEffect(() => {
    setCurrentSlug(initialPost.slug);
  }, [initialPost.slug]);

  const currentPost = playlistPostsMap[currentSlug] || initialPost;
  const { playlist } = playlistContext;

  const allOrderedSlugs: { slug: string; title: string; readTime: string }[] = [];
  playlist.modules.forEach((mod) => {
    mod.posts.forEach((p) => {
      allOrderedSlugs.push({ slug: p.slug, title: p.title, readTime: p.readTime });
    });
  });

  const currentIndex = allOrderedSlugs.findIndex((p) => p.slug === currentSlug);
  const activeNumber = currentIndex >= 0 ? currentIndex + 1 : 1;
  const totalPosts = allOrderedSlugs.length;

  const prevPost = currentIndex > 0 ? allOrderedSlugs[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < totalPosts - 1
      ? allOrderedSlugs[currentIndex + 1]
      : null;

  const handleTopicSwitch = (slug: string) => {
    setCurrentSlug(slug);
    if (typeof window !== "undefined") {
      window.history.pushState({ slug }, "", `/posts/${slug}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Top Back Button */}
      <BackButton label="Previous" />

      {/* Article Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 max-w-4xl tracking-tight">
        {currentPost.title}
      </h1>

      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Link
          href={`/categories/${currentPost.category.toLowerCase()}`}
          prefetch={true}
          className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-none hover:bg-blue-100 transition-colors"
        >
          {currentPost.category}
        </Link>
      </div>

      {/* Description */}
      <p className="text-base md:text-lg text-gray-600 mb-6 max-w-3xl leading-relaxed">
        {currentPost.description}
      </p>

      {/* Author & Meta */}
      <div className="flex items-center gap-3 text-xs md:text-sm text-gray-600 mb-8 pb-6 border-b border-gray-100">
        <div className="relative w-9 h-9 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
          <SafeImage
            src="/avatar.jpg"
            alt={currentPost.author}
            fallbackTitle={currentPost.author}
            category="AUTHOR"
            fill
            sizes="36px"
            className="object-cover rounded-none"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span>
            By <strong className="font-semibold text-gray-900">{currentPost.author}</strong>
          </span>
          <span>•</span>
          <span>{currentPost.date}</span>
          <span>•</span>
          <span>{currentPost.readTime}</span>
        </div>
      </div>

      {/* Cover Image - Taller height (h-[420px] md:h-[640px]) and sharp square corners (rounded-none) */}
      <div className="relative w-full h-[420px] md:h-[640px] rounded-none overflow-hidden mb-12 bg-gray-100">
        <SafeImage
          src={currentPost.cover}
          alt={currentPost.title}
          fallbackTitle={currentPost.title}
          category={currentPost.category}
          fill
          sizes="100vw"
          className="object-cover rounded-none"
          priority
        />
      </div>

      {/* Main Grid: Content + Playlist Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Main Article Body */}
        <div className="lg:col-span-8 flex flex-col">
          {/* Render MDX Content */}
          <ArticleRenderer content={currentPost.content} />

          {/* Bottom Playlist Stepper Card */}
          <div className="my-8 p-5 bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-100 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
                {playlist.title} ({activeNumber}/{totalPosts})
              </span>
              <p className="text-xs font-semibold text-gray-900">
                {nextPost ? `Up Next: ${nextPost.title}` : "Course Series Completed! 🎉"}
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {prevPost && (
                <button
                  onClick={() => handleTopicSwitch(prevPost.slug)}
                  className="flex-1 sm:flex-initial text-center px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-none text-xs font-bold hover:bg-gray-50 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                >
                  ← Previous Topic
                </button>
              )}
              {nextPost && (
                <button
                  onClick={() => handleTopicSwitch(nextPost.slug)}
                  className="flex-1 sm:flex-initial text-center px-4 py-2 bg-blue-600 text-white rounded-none text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Next Topic →
                </button>
              )}
            </div>
          </div>

          {/* Tags */}
          {currentPost.tags && currentPost.tags.length > 0 && (
            <div className="flex items-center gap-2 mt-4 pt-6 border-t border-gray-100 flex-wrap">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Tags:
              </span>
              {currentPost.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag.toLowerCase()}`}
                  prefetch={true}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-none text-xs hover:bg-gray-200 transition-colors font-medium"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-gray-50 border border-gray-200 rounded-none p-5 sticky top-24 shadow-xs">
            <div className="mb-4 pb-3 border-b border-gray-200">
              <div className="flex items-center justify-between text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                <span>{playlist.category} PLAYLIST</span>
                <span>
                  {activeNumber} / {totalPosts}
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-900 leading-snug">
                {playlist.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {playlist.description}
              </p>

              <div className="w-full bg-gray-200 h-1.5 rounded-none mt-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-none transition-all duration-300"
                  style={{ width: `${(activeNumber / totalPosts) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto mb-5 pr-1 scrollbar-thin">
              {playlist.modules.map((mod, modIdx) => (
                <div key={modIdx} className="flex flex-col gap-1.5">
                  <p className="text-[11px] font-bold text-gray-800 uppercase tracking-wide bg-gray-200/60 px-2.5 py-1 rounded-none">
                    {mod.title}
                  </p>

                  {mod.posts.map((p) => {
                    const isCurrent = p.slug === currentSlug;
                    const itemIndex = allOrderedSlugs.findIndex(
                      (item) => item.slug === p.slug
                    );
                    const isCompleted = itemIndex < currentIndex;

                    return (
                      <button
                        key={p.slug}
                        onClick={() => handleTopicSwitch(p.slug)}
                        className={`w-full flex items-start gap-2.5 px-3 py-2 rounded-none text-xs text-left transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-blue-600 text-white font-semibold shadow-xs"
                            : isCompleted
                            ? "bg-white text-gray-700 border border-gray-100 hover:bg-gray-100"
                            : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-100"
                        }`}
                      >
                        <span
                          className={`font-mono flex-shrink-0 text-[11px] ${
                            isCurrent ? "text-blue-200" : "text-gray-400"
                          }`}
                        >
                          {isCompleted ? "✓" : isCurrent ? "→" : p.formattedIndex}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="line-clamp-1">{p.title}</p>
                          <span
                            className={`text-[10px] ${
                              isCurrent ? "text-blue-100" : "text-gray-400"
                            }`}
                          >
                            {p.readTime}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
              {prevPost ? (
                <button
                  onClick={() => handleTopicSwitch(prevPost.slug)}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                >
                  ← Previous Topic
                </button>
              ) : (
                <span className="text-gray-300">← Previous</span>
              )}

              {nextPost ? (
                <button
                  onClick={() => handleTopicSwitch(nextPost.slug)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer"
                >
                  Next Topic →
                </button>
              ) : (
                <span className="text-gray-300">Next →</span>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Read More Section using Reusable PostCard (Borderless & Sharp Square) */}
      <section className="pt-10 border-t border-gray-200">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-6">
          READ MORE ARTICLES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((related) => (
            <PostCard key={related.slug} post={related} variant="compact" />
          ))}
        </div>
      </section>
    </div>
  );
}
