import React from "react";
import PostCard from "@/components/ui/PostCard";
import { getAllPosts, Post } from "@/lib/posts";

interface TopBlogsProps {
  posts?: Post[];
}

export default function TopBlogs({ posts: propPosts }: TopBlogsProps) {
  const posts = propPosts || getAllPosts();
  const topPosts = posts.slice(0, 5);

  const post1 = topPosts[0];
  const post2 = topPosts[1] || topPosts[0];
  const post3 = topPosts[2] || topPosts[0];
  const post4 = topPosts[3] || topPosts[0];
  const post5 = topPosts[4] || topPosts[0];

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 pt-4 pb-12 bg-white">
      {/* Centered 2-Layer Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1.5">
          FEATURED ARTICLES
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          Top Engineering Articles
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xl mx-auto">
          Hand-picked production deep dives covering autonomous AI agent architectures, vector search benchmarks, and cloud-native infrastructure.
        </p>
      </div>

      {/* 5-Post Bento Mosaic Grid with Dynamic Sequence Colors */}
      <div className="flex flex-col gap-4">

        {/* ── TOP ROW: 3 Vertical Block Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PostCard post={post1} index={0} variant="grid" />
          <PostCard post={post2} index={1} variant="grid" />
          <PostCard post={post3} index={2} variant="grid" />
        </div>

        {/* ── BOTTOM ROW: 2 Wide Landscape Block Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-7">
            <PostCard post={post4} index={3} variant="horizontal" />
          </div>
          <div className="lg:col-span-5">
            <PostCard post={post5} index={4} variant="horizontal" />
          </div>
        </div>

      </div>
    </section>
  );
}
