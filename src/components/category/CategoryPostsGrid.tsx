"use client";

import React, { useState } from "react";
import Link from "next/link";
import PostCard from "@/components/ui/PostCard";
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

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {/* Pagination Stepper */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-6 text-xs text-gray-500">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:text-black"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageClick(pageNum)}
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                pageNum === currentPage
                  ? "bg-black text-white shadow-xs scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:text-black"
          }`}
        >
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
