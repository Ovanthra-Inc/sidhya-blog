"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/posts";

interface CategoryPostsGridProps {
  posts: Post[];
  categoryName: string;
}

export default function CategoryPostsGrid({ posts, categoryName }: CategoryPostsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(posts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
        <p className="text-base font-semibold mb-2">No articles found in {categoryName}</p>
        <p className="text-xs mb-4">Check back soon or explore other engineering topics.</p>
        <Link href="/posts" className="text-xs font-bold text-blue-600 underline">
          View all posts
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* 3-column grid displaying max 6 posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group flex flex-col p-4 rounded-3xl border border-gray-200 hover:border-blue-300 bg-white hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            {/* Taller Image Height: h-64 (256px) */}
            <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4 bg-gray-100">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes="(max-width: 780px) 100vw, 380px"
                className="object-cover group-hover:scale-103 transition-transform duration-300"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px]">
                {post.category}
              </span>
              <span>{post.readTime}</span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2">
              {post.title}
            </h2>

            <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-6">
              {post.description}
            </p>

            {/* Card Footer Author Row */}
            <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                  <Image
                    src="/avatar.jpg"
                    alt="Asutosh Sidhya"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
                <span className="font-semibold text-gray-800">{post.author}</span>
              </div>
              <span>{post.date}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Stepper (shown if totalPages > 1 or for navigation) */}
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Previous
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
