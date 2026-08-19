"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import ShareModal from "@/components/ui/ShareModal";
import Pagination from "@/components/ui/Pagination";
import { IoIosShareAlt } from "react-icons/io";
import { Post } from "@/lib/posts";

interface AllPostsGridProps {
  posts: Post[];
}

// Individual card with its own share state
function PostGridCard({ post }: { post: Post }) {
  const [shareOpen, setShareOpen] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareOpen(true);
  };

  return (
    <>
      <Link
        href={`/posts/${post.slug}`}
        className="group flex flex-col p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xs transition-all duration-200 cursor-pointer bg-white"
      >
        {/* Image Box */}
        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-4 bg-gray-100">
          <SafeImage
            src={post.cover}
            alt={post.title}
            fallbackTitle={post.title}
            category={post.category}
            fill
            sizes="(max-width: 780px) 100vw, 380px"
            className="object-cover group-hover:scale-103 transition-transform duration-300"
          />
          {/* Share button: top-right of image */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <button
              onClick={handleShare}
              aria-label="Share this article"
              title="Share"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 shadow-sm transition-all duration-200 cursor-pointer"
            >
              <IoIosShareAlt size={17} />
            </button>
          </div>
        </div>

        {/* Category & Read Time */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px]">
            {post.category}
          </span>
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
          {post.description}
        </p>

        {/* Footer Author Row */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
              <SafeImage
                src="/avatar.jpg"
                alt={post.author}
                fallbackTitle={post.author}
                category="AUTHOR"
                fill
                sizes="20px"
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-gray-800">{post.author}</span>
          </div>
          <span>{post.date}</span>
        </div>
      </Link>
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} post={post} />
    </>
  );
}

export default function AllPostsGrid({ posts }: AllPostsGridProps) {
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
      <div className="py-16 text-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-base font-semibold mb-2">No matching posts found</p>
        <p className="text-xs mb-4">Try searching for keywords like AI, RAG, Next.js, or Vector DB.</p>
        <Link href="/posts" className="text-xs font-bold text-blue-600 underline">
          View all posts
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header Item Range */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
        <span>
          Showing <strong>{startIndex + 1}–{Math.min(startIndex + postsPerPage, posts.length)}</strong> of <strong>{posts.length}</strong> Articles
        </span>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
      </div>

      {/* 4 Rows x 3 Columns Grid (12 items per page) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <PostGridCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Responsive Pagination Stepper */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
        className="mt-4"
      />
    </div>
  );
}
