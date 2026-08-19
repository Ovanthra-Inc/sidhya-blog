"use client";

import React, { useState } from "react";
import PostCard from "@/components/ui/PostCard";
import Pagination from "@/components/ui/Pagination";
import { Post } from "@/lib/posts";

interface LatestBlogsProps {
  posts: Post[];
}

export default function LatestBlogs({ posts }: LatestBlogsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <section className="px-4 sm:px-8 md:px-16 lg:px-20 py-8 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black tracking-tight">Latest Blog</h2>
        <span className="text-xs text-gray-400 font-medium">
          Showing {startIndex + 1}-{Math.min(startIndex + postsPerPage, posts.length)} of {posts.length} Posts
        </span>
      </div>

      {/* Grid displaying 6 post cards per page using dynamic sequence color blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((blog, idx) => (
          <PostCard key={blog.slug} post={blog} index={startIndex + idx} variant="grid" />
        ))}
      </div>

      {/* Responsive Pagination Stepper */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        className="mt-10"
      />
    </section>
  );
}

