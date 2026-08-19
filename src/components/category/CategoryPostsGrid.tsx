"use client";

import React, { useState } from "react";
import Link from "next/link";
import PostCard from "@/components/ui/PostCard";
import Pagination from "@/components/ui/Pagination";
import { Post } from "@/lib/posts";

interface CategoryPostsGridProps {
  posts: Post[];
  categoryName: string;
}

export default function CategoryPostsGrid({ posts, categoryName }: CategoryPostsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12; // 4 rows x 3 columns = 12 posts per page

  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <p className="text-base font-semibold mb-2">No articles found in {categoryName}</p>
        <p className="text-xs mb-4">Check back soon or explore other engineering topics.</p>
        <Link href="/posts" prefetch={true} className="text-xs font-bold text-blue-600 underline">
          View all posts
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header Range */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
        <span>
          Showing <strong>{startIndex + 1}–{Math.min(startIndex + postsPerPage, posts.length)}</strong> of <strong>{posts.length}</strong> Articles
        </span>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
      </div>

      {/* 4 Rows x 3 Columns Grid using Reusable PostCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <PostCard key={post.slug} post={post} variant="grid" />
        ))}
      </div>

      {/* Responsive Pagination Stepper */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
        className="mt-6"
      />
    </div>
  );
}
