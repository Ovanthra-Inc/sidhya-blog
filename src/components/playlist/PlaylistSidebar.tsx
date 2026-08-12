"use client";

import React from "react";
import Link from "next/link";
import { PlaylistContext } from "@/lib/playlists";

interface PlaylistSidebarProps {
  context: PlaylistContext;
  currentSlug: string;
}

export default function PlaylistSidebar({ context, currentSlug }: PlaylistSidebarProps) {
  const { playlist, currentIndex, totalPosts, prevPost, nextPost } = context;

  const handleSmoothScroll = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sticky top-24 shadow-xs">
      {/* Playlist Header */}
      <div className="mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center justify-between text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
          <span>{playlist.category} PLAYLIST</span>
          <span>{currentIndex} / {totalPosts}</span>
        </div>
        <h3 className="text-base font-bold text-gray-900 leading-snug">
          {playlist.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {playlist.description}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${(currentIndex / totalPosts) * 100}%` }}
          />
        </div>
      </div>

      {/* Playlist Modules & Topic Posts */}
      <div className="flex flex-col gap-4 max-h-[420px] overflow-y-auto mb-5 pr-1 scrollbar-thin">
        {playlist.modules.map((mod, modIdx) => (
          <div key={modIdx} className="flex flex-col gap-1.5">
            {/* Topic Header */}
            <p className="text-[11px] font-bold text-gray-800 uppercase tracking-wide bg-gray-200/60 px-2.5 py-1 rounded-md">
              {mod.title}
            </p>

            {/* Posts under this Topic */}
            {mod.posts.map((post) => {
              const isCurrent = post.slug === currentSlug;
              const isCompleted = post.index < currentIndex;

              return (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  prefetch={true}
                  scroll={false}
                  onClick={handleSmoothScroll}
                  className={`flex items-start gap-2.5 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-blue-600 text-white font-semibold shadow-xs"
                      : isCompleted
                      ? "bg-white text-gray-700 border border-gray-100 hover:bg-gray-100"
                      : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-100"
                  }`}
                >
                  <span className={`font-mono flex-shrink-0 text-[11px] ${isCurrent ? "text-blue-200" : "text-gray-400"}`}>
                    {isCompleted ? "✓" : isCurrent ? "→" : post.formattedIndex}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="line-clamp-1">{post.title}</p>
                    <span className={`text-[10px] ${isCurrent ? "text-blue-100" : "text-gray-400"}`}>
                      {post.readTime}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Prev / Next Navigation */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200 text-xs">
        {prevPost ? (
          <Link
            href={`/posts/${prevPost.slug}`}
            prefetch={true}
            scroll={false}
            onClick={handleSmoothScroll}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
          >
            ← Previous Topic
          </Link>
        ) : (
          <span className="text-gray-300">← Previous</span>
        )}

        {nextPost ? (
          <Link
            href={`/posts/${nextPost.slug}`}
            prefetch={true}
            scroll={false}
            onClick={handleSmoothScroll}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold transition-colors cursor-pointer"
          >
            Next Topic →
          </Link>
        ) : (
          <span className="text-gray-300">Next →</span>
        )}
      </div>
    </div>
  );
}
