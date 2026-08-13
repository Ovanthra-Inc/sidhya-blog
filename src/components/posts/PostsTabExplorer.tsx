"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import PostCard from "@/components/ui/PostCard";
import CategoryPills, { CategoryOption } from "@/components/ui/CategoryPills";
import { Post } from "@/lib/posts";

interface PostsTabExplorerProps {
  allPosts: Post[];
  categories: string[];
  initialCategory?: string;
  initialQuery?: string;
  headerTitle?: string;
  headerDescription?: string;
}

export default function PostsTabExplorer({
  allPosts,
  categories,
  initialCategory = "all",
  initialQuery = "",
  headerTitle,
  headerDescription,
}: PostsTabExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory.toLowerCase()
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedCategory(initialCategory.toLowerCase());
    setCurrentPage(1);
  }, [initialCategory]);

  const postsPerPage = 12; // 4 rows x 3 columns

  // Prepare category pill options with counts
  const categoryOptions: CategoryOption[] = categories.map((cat) => {
    const count = allPosts.filter(
      (p) => p.category.toLowerCase() === cat.toLowerCase()
    ).length;
    return {
      name: cat,
      displayName: cat.toUpperCase() === "AI" ? "AI" : cat,
      count,
    };
  });

  const searchQuery = initialQuery.toLowerCase().trim();

  // Filter posts dynamically in-memory for 0ms tab switching
  const filteredPosts = allPosts.filter((post) => {
    const categoryMatch =
      selectedCategory === "all" ||
      post.category.toLowerCase() === selectedCategory;

    const queryMatch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery) ||
      post.category.toLowerCase().includes(searchQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery));

    return categoryMatch && queryMatch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  const handleTabSwitch = (catKey: string) => {
    setSelectedCategory(catKey);
    setCurrentPage(1);

    const targetUrl =
      catKey === "all" ? "/posts" : `/categories/${catKey.toLowerCase()}`;

    if (typeof window !== "undefined") {
      window.history.pushState({ category: catKey }, "", targetUrl);
    }
  };

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

  const currentCategoryName =
    selectedCategory === "all"
      ? "All Posts"
      : selectedCategory.toUpperCase() === "AI"
      ? "AI"
      : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

  const displayTitle =
    headerTitle ||
    (selectedCategory === "all"
      ? "All Posts"
      : `${currentCategoryName} Articles`);

  const displayDesc =
    headerDescription ||
    (selectedCategory === "all"
      ? "Technical guides, AI agent architecture, vector search benchmarks, and fullstack engineering articles."
      : `Explore comprehensive technical guides, deep-dive benchmarks, system architecture patterns, and production breakdowns under the ${currentCategoryName} category.`);

  return (
    <div className="flex flex-col">
      {/* Header Title & Subtitle */}
      <div className="mb-8 min-h-[84px]">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
          {displayTitle}
        </h1>
        <p className="text-gray-500 text-sm max-w-xl leading-relaxed min-h-[40px]">
          {displayDesc}
        </p>
      </div>

      {/* Search Feedback Banner */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-none flex items-center justify-between text-xs text-blue-900">
          <span>
            Search results for: <strong>&quot;{initialQuery}&quot;</strong> (
            {filteredPosts.length} posts found)
          </span>
          <Link href="/posts" prefetch={true} className="underline font-semibold hover:text-blue-700">
            Clear Search
          </Link>
        </div>
      )}

      {/* Reusable Category Filter Pills */}
      <CategoryPills
        categories={categoryOptions}
        selectedCategory={selectedCategory}
        onSelectCategory={handleTabSwitch}
        allPostsCount={allPosts.length}
      />

      {/* Range Counter Indicator */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-6">
        <span>
          Showing <strong>{filteredPosts.length === 0 ? 0 : startIndex + 1}–{Math.min(startIndex + postsPerPage, filteredPosts.length)}</strong> of <strong>{filteredPosts.length}</strong> Articles
        </span>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
      </div>

      {/* 4 Rows x 3 Columns Grid using Image-Free Sequence-Colored PostCards */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center text-gray-400 bg-gray-50 rounded-none border border-dashed border-gray-200">
          <p className="text-base font-semibold mb-2">No matching posts found</p>
          <p className="text-xs mb-4">
            Try selecting another category tab or searching for different keywords.
          </p>
          <button
            onClick={() => handleTabSwitch("all")}
            className="text-xs font-bold text-blue-600 underline cursor-pointer"
          >
            View all posts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPosts.map((post, idx) => (
            <PostCard key={post.slug} post={post} index={startIndex + idx} variant="grid" />
          ))}
        </div>
      )}

      {/* Pagination Stepper */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-100 pt-6 text-xs text-gray-500 mt-8">
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
              <path
                d="M19 12H5M12 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`w-8 h-8 rounded-none text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
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
              <path
                d="M5 12h14M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
