"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  scrollToTop?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  scrollToTop = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
    if (scrollToTop && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate pagination items for desktop screens (>= sm)
  const getDesktopPages = (): (number | string)[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  // Generate compact pagination items for mobile screens (< sm) to prevent any overflow
  const getMobilePages = (): (number | string)[] => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 2) {
      return [1, 2, 3, "...", totalPages];
    }
    if (currentPage >= totalPages - 1) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, "...", currentPage, "...", totalPages];
  };

  const desktopPages = getDesktopPages();
  const mobilePages = getMobilePages();

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex items-center justify-between border-t border-gray-100 pt-5 text-xs text-gray-500 w-full max-w-full overflow-hidden select-none ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer flex-shrink-0 ${
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
        <span className="hidden xs:inline sm:inline">Previous</span>
        <span className="inline xs:hidden sm:hidden">Prev</span>
      </button>

      {/* Desktop Numbers Row (Hidden on mobile) */}
      <div className="hidden sm:flex items-center gap-1.5 md:gap-2">
        {desktopPages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-8 h-8 flex items-center justify-center text-xs font-bold text-gray-400 select-none"
              >
                …
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={`page-${pageNum}`}
              onClick={() => handlePageClick(pageNum)}
              aria-current={isActive ? "page" : undefined}
              className={`w-8 h-8 rounded-none text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-xs scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Mobile Numbers Row (Visible only on mobile < sm) */}
      <div className="flex sm:hidden items-center gap-1">
        {mobilePages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`m-ellipsis-${index}`}
                className="w-7 h-7 flex items-center justify-center text-[11px] font-bold text-gray-400 select-none"
              >
                …
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={`m-page-${pageNum}`}
              onClick={() => handlePageClick(pageNum)}
              aria-current={isActive ? "page" : undefined}
              className={`w-7 h-7 rounded-none text-[11px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? "bg-black text-white shadow-xs scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={`flex items-center gap-1 font-semibold transition-colors cursor-pointer flex-shrink-0 ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-700 hover:text-black"
        }`}
      >
        <span className="hidden xs:inline sm:inline">Next</span>
        <span className="inline xs:hidden sm:hidden">Next</span>
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
    </nav>
  );
}
