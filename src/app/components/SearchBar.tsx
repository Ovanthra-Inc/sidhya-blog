"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SearchResult {
  title: string;
  slug: string;
  category: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Mock search suggestions list
  const searchIndex: SearchResult[] = [
    { title: "How I Built an Autonomous AI Agent with Next.js 16", slug: "how-i-built-an-ai-agent", category: "AI" },
    { title: "Understanding Retrieval-Augmented Generation (RAG)", slug: "what-is-rag", category: "AI" },
    { title: "High-Performance Vector Databases: Pinecone vs Qdrant vs Pgvector", slug: "vector-databases", category: "AI" },
    { title: "Advanced Prompt Engineering: Chain-of-Thought & ReAct", slug: "prompt-engineering", category: "AI" },
    { title: "Next.js 16 App Router & Turbopack Deep Dive", slug: "nextjs-16-mastery", category: "Development" },
  ];

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length > 0) {
      const filtered = searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(trimmed) ||
          item.category.toLowerCase().includes(trimmed)
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (query.trim()) {
      router.push(`/posts?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/posts");
    }
  };

  return (
    <div ref={dropdownRef} className="relative z-20 -mt-18 px-3 sm:px-8 md:px-16 lg:px-20">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-t-[24px] md:rounded-t-[32px] px-4 sm:px-6 md:px-16 py-4 sm:py-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4"
      >
        <h2 className="text-lg sm:text-xl font-bold text-black tracking-tight whitespace-nowrap">
          Blog SIDHYA
        </h2>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto relative">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3.5 py-2 bg-white flex-1 sm:w-[320px] focus-within:border-blue-500 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <circle cx="11" cy="11" r="8" stroke="#9CA3AF" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length > 0 && setIsOpen(true)}
              placeholder="Search AI agents, RAG, Next.js..."
              className="w-full text-xs text-gray-700 outline-none bg-transparent placeholder:text-gray-400 min-w-0"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-gray-400 hover:text-gray-600 px-1"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white text-xs font-semibold px-4 sm:px-6 py-2.5 rounded-full hover:bg-gray-800 transition-colors cursor-pointer flex-shrink-0"
          >
            Search
          </button>
        </div>
      </form>

      {/* Instant Search Live Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute left-3 right-3 sm:left-auto sm:right-8 md:right-16 top-full mt-2 sm:w-[360px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 p-2">
          <div className="text-[10px] font-bold text-gray-400 px-3 py-1.5 uppercase tracking-wider">
            Matching Articles ({results.length})
          </div>

          {results.length === 0 ? (
            <div className="px-4 py-3 text-xs text-gray-400 text-center">
              No matching articles found. Press Enter to search all.
            </div>
          ) : (
            <div className="flex flex-col">
              {results.map((res) => (
                <Link
                  key={res.slug}
                  href={`/posts/${res.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 rounded-xl transition-colors text-left group"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-xs font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                      {res.title}
                    </p>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
                      {res.category}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={handleSearch}
            className="w-full text-center py-2 text-xs font-bold text-blue-600 bg-blue-50/50 hover:bg-blue-50 rounded-xl mt-1 transition-colors"
          >
            View all search results →
          </button>
        </div>
      )}
    </div>
  );
}
