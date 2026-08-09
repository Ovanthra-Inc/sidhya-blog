"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <section className="px-6 md:px-20 py-8 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black tracking-tight">Latest Blog</h2>
        <span className="text-xs text-gray-400 font-medium">
          Showing {startIndex + 1}-{Math.min(startIndex + postsPerPage, posts.length)} of {posts.length} Posts
        </span>
      </div>

      {/* Grid displaying 6 post cards per page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((blog) => (
          <Link
            key={blog.slug}
            href={`/posts/${blog.slug}`}
            className="group flex flex-col p-5 rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-xs transition-all duration-200 cursor-pointer"
          >
            {/* Taller Image Height: 260px */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 w-full" style={{ height: "260px" }}>
              <Image
                src={blog.cover}
                alt={blog.title}
                fill
                sizes="(max-width: 780px) 100vw, 400px"
                className="object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 mt-3">
              <span className="font-bold text-blue-600 uppercase tracking-wider">
                {blog.category}
              </span>
              <span>{blog.readTime}</span>
            </div>
            <h3 className="text-sm font-bold text-black leading-snug mt-1 group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2">
              {blog.title}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed mt-1 line-clamp-3">
              {blog.description}
            </p>

            <div className="flex items-center gap-2 mt-auto pt-3">
              <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                <Image
                  src="/avatar.jpg"
                  alt="Asutosh Sidhya"
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              <div className="text-[11px]">
                <span className="text-gray-400">By </span>
                <span className="font-semibold text-gray-900">{blog.author}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Fully Functional Pagination Stepper */}
      <div className="flex items-center justify-between mt-10 border-t border-gray-100 pt-5 text-xs text-gray-500">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${currentPage === 1
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
              className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${pageNum === currentPage
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
          className={`flex items-center gap-1.5 font-semibold transition-colors cursor-pointer ${currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:text-black"
            }`}
        >
          Next
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </section>
  );
}
