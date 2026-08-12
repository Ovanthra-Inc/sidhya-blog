import React from "react";
import Link from "next/link";

export interface CategoryOption {
  name: string;
  displayName: string;
  count: number;
}

interface CategoryPillsProps {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory?: (categoryKey: string) => void;
  allPostsCount: number;
}

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelectCategory,
  allPostsCount,
}: CategoryPillsProps) {
  const isAllSelected = selectedCategory.toLowerCase() === "all";

  return (
    <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
      {/* All Posts Pill */}
      {onSelectCategory ? (
        <button
          onClick={() => onSelectCategory("all")}
          className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all whitespace-nowrap ${
            isAllSelected
              ? "bg-black text-white shadow-xs"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Posts ({allPostsCount})
        </button>
      ) : (
        <Link
          href="/posts"
          prefetch={true}
          className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all whitespace-nowrap ${
            isAllSelected
              ? "bg-black text-white shadow-xs"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Posts ({allPostsCount})
        </Link>
      )}

      {/* Dynamic Category Pills */}
      {categories.map((cat) => {
        const catKey = cat.name.toLowerCase();
        const isSelected = selectedCategory.toLowerCase() === catKey;

        if (onSelectCategory) {
          return (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(catKey)}
              className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all whitespace-nowrap ${
                isSelected
                  ? "bg-black text-white shadow-xs"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat.displayName} ({cat.count})
            </button>
          );
        }

        return (
          <Link
            key={cat.name}
            href={`/categories/${catKey}`}
            prefetch={true}
            className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all whitespace-nowrap ${
              isSelected
                ? "bg-black text-white shadow-xs"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.displayName} ({cat.count})
          </Link>
        );
      })}
    </div>
  );
}
