import React from "react";

export default function GlobalLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Animated Loading Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 animate-pulse z-50" />

      {/* Navbar Skeleton */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-6 md:px-20 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
          <div className="w-24 h-5 rounded-md bg-gray-200 animate-pulse" />
        </div>
        <div className="hidden md:flex gap-6">
          <div className="w-16 h-4 rounded-md bg-gray-200 animate-pulse" />
          <div className="w-16 h-4 rounded-md bg-gray-200 animate-pulse" />
          <div className="w-16 h-4 rounded-md bg-gray-200 animate-pulse" />
        </div>
        <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
      </div>

      {/* Main Content Skeleton */}
      <main className="px-6 md:px-20 py-10 max-w-[1440px] mx-auto w-full flex-1">
        {/* Hero Section Skeleton */}
        <div className="w-full h-[400px] rounded-3xl bg-gray-100 animate-pulse mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        </div>

        {/* Post Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col gap-3 p-4 rounded-2xl border border-gray-100">
              <div className="w-full h-56 rounded-xl bg-gray-200 animate-pulse" />
              <div className="w-20 h-4 rounded-md bg-gray-200 animate-pulse mt-2" />
              <div className="w-full h-6 rounded-md bg-gray-200 animate-pulse" />
              <div className="w-3/4 h-4 rounded-md bg-gray-100 animate-pulse" />
              <div className="flex items-center gap-2 mt-4">
                <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-24 h-3 rounded-md bg-gray-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
