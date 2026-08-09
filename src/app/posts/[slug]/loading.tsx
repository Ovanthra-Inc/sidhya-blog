import React from "react";

export default function PostLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse z-50" />

      {/* Main Container */}
      <main className="px-6 md:px-20 pt-24 pb-16 max-w-4xl mx-auto w-full flex-1">
        {/* Back Button Skeleton */}
        <div className="w-24 h-8 rounded-full bg-gray-200 animate-pulse mb-8" />

        {/* Category & Read Time */}
        <div className="w-32 h-4 rounded-md bg-gray-200 animate-pulse mb-3" />

        {/* Article Title Skeleton */}
        <div className="w-full h-10 rounded-lg bg-gray-200 animate-pulse mb-3" />
        <div className="w-3/4 h-10 rounded-lg bg-gray-200 animate-pulse mb-6" />

        {/* Author Avatar Skeleton */}
        <div className="flex items-center gap-3 pb-8 mb-8 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          <div className="flex flex-col gap-1.5">
            <div className="w-28 h-4 rounded-md bg-gray-200 animate-pulse" />
            <div className="w-20 h-3 rounded-md bg-gray-100 animate-pulse" />
          </div>
        </div>

        {/* Cover Image Skeleton */}
        <div className="w-full h-[400px] rounded-3xl bg-gray-200 animate-pulse mb-12" />

        {/* Article Paragraph Text Skeletons */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-4 rounded-md bg-gray-200 animate-pulse" />
          <div className="w-full h-4 rounded-md bg-gray-200 animate-pulse" />
          <div className="w-5/6 h-4 rounded-md bg-gray-200 animate-pulse" />
          <div className="w-4/5 h-4 rounded-md bg-gray-100 animate-pulse" />
          <div className="w-full h-32 rounded-xl bg-gray-100 animate-pulse my-4" />
          <div className="w-full h-4 rounded-md bg-gray-200 animate-pulse" />
          <div className="w-2/3 h-4 rounded-md bg-gray-200 animate-pulse" />
        </div>
      </main>
    </div>
  );
}
