"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "./SafeImage";
import ShareModal from "./ShareModal";
import { IoIosShareAlt } from "react-icons/io";
import { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  index?: number;
  variant?: "grid" | "compact" | "horizontal" | "full-bg" | "color-block" | "horizontal-split" | "no-image";
  priority?: boolean;
}

export default function PostCard({
  post,
  variant = "grid",
  priority = false,
}: PostCardProps) {
  const [shareOpen, setShareOpen] = useState(false);

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareOpen(true);
  };

  // Reusable share icon button (dark bg, top-right)
  const ShareBtn = ({ light = false }: { light?: boolean }) => (
    <button
      onClick={handleShareClick}
      aria-label="Share this article"
      title="Share"
      className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
        light
          ? "bg-black/40 backdrop-blur-md text-white hover:bg-black/70"
          : "bg-white/90 backdrop-blur-md text-gray-700 hover:bg-white hover:shadow-md"
      } shadow-sm`}
    >
      <IoIosShareAlt size={17} />
    </button>
  );

  // ── 1. Full Card Background Image Variant (For TopBlogs Card 1 & Card 3) ──
  if (variant === "full-bg") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        prefetch={true}
        className="group relative flex flex-col justify-between p-6 sm:p-7 min-h-[380px] sm:min-h-[400px] overflow-hidden rounded-none transition-all duration-300 cursor-pointer bg-black text-white shadow-md hover:shadow-xl border-0"
      >
        {/* Full background cover image */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src={post.cover || "/hero.png"}
            alt={post.title}
            fallbackTitle={post.title}
            category={post.category}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-95"
          />
          {/* Refined subtle gradient overlay so the image is clearly visible while text stays readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15 z-10" />
        </div>

        {/* Top Bar: Category Left, Share Right */}
        <div className="relative z-20 flex items-center justify-between text-xs mb-4">
          <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold uppercase tracking-wider rounded-none shadow-xs">
            {post.category} • {post.readTime}
          </span>
          <ShareBtn light />
        </div>

        {/* Middle Body: Title + Description */}
        <div className="relative z-20 my-auto py-2">
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight mb-3 line-clamp-3 group-hover:translate-x-1 transition-transform drop-shadow-md">
            {post.title}
          </h2>

          <p className="text-xs text-white/95 line-clamp-3 leading-relaxed font-medium drop-shadow-xs">
            {post.description}
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-20 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white mt-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-white/40">
              <SafeImage
                src="/avatar.jpg"
                alt={post.author}
                fallbackTitle={post.author}
                category="AUTHOR"
                fill
                sizes="24px"
                className="object-cover rounded-none"
              />
            </div>
            <span className="font-bold text-white text-xs">{post.author}</span>
          </div>

          <span className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            READ ARTICLE →
          </span>
        </div>
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} post={post} />
      </Link>
    );
  }

  // ── 2. Solid Crimson Color Block Variant (For TopBlogs Card 2) ──
  if (variant === "color-block") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        prefetch={true}
        className="group relative flex flex-col justify-between p-6 sm:p-7 min-h-[380px] sm:min-h-[400px] overflow-hidden rounded-none transition-all duration-300 cursor-pointer bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white shadow-md hover:shadow-xl border-0"
      >
        {/* Top Bar: Category Left, Share Right */}
        <div className="flex items-center justify-between text-xs mb-4">
          <span className="px-2.5 py-1 bg-black/30 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-none">
            {post.category} • {post.readTime}
          </span>
          <ShareBtn light />
        </div>

        {/* Middle Body: Bold Uppercase Title + Description */}
        <div className="my-auto py-2">
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight mb-3 line-clamp-4 group-hover:translate-x-1 transition-transform">
            {post.title}
          </h2>

          <p className="text-xs text-white/90 line-clamp-3 leading-relaxed font-medium">
            {post.description}
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white mt-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-white/40">
              <SafeImage
                src="/avatar.jpg"
                alt={post.author}
                fallbackTitle={post.author}
                category="AUTHOR"
                fill
                sizes="24px"
                className="object-cover rounded-none"
              />
            </div>
            <span className="font-bold text-white text-xs">{post.author}</span>
          </div>

          <span className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            READ ARTICLE →
          </span>
        </div>
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} post={post} />
      </Link>
    );
  }

  // ── 3. Horizontal Split Card (Text Left, Image Right - For TopBlogs Card 4) ──
  if (variant === "horizontal-split") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        prefetch={true}
        className="group relative flex flex-col sm:flex-row justify-between p-6 sm:p-7 rounded-none transition-all duration-300 cursor-pointer bg-black text-white min-h-[240px] shadow-md hover:shadow-xl border-0 gap-6 h-full"
      >
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="px-2.5 py-1 bg-blue-900/60 border border-blue-500/30 text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded-none">
              {post.category} • {post.readTime}
            </span>
            <ShareBtn light />
          </div>

          <div className="my-auto py-2">
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight line-clamp-2 mb-2 group-hover:translate-x-1 transition-transform">
              {post.title}
            </h3>
            <p className="text-xs text-white/80 line-clamp-2 leading-relaxed font-normal">
              {post.description}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/90 mt-4">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-white/30">
                <SafeImage
                  src="/avatar.jpg"
                  alt={post.author}
                  fallbackTitle={post.author}
                  category="AUTHOR"
                  fill
                  sizes="20px"
                  className="object-cover rounded-none"
                />
              </div>
              <span className="font-bold text-white text-xs">{post.author}</span>
            </div>
            <span className="font-bold uppercase tracking-wider text-xs group-hover:translate-x-1 transition-transform">
              EXPLORE →
            </span>
          </div>
        </div>

        {/* Right side image container */}
        <div className="relative w-full sm:w-48 md:w-56 aspect-[4/3] sm:aspect-auto sm:h-full min-h-[160px] overflow-hidden rounded-none bg-zinc-900 flex-shrink-0 self-center">
          <SafeImage
            src={post.cover || "/hero.png"}
            alt={post.title}
            fallbackTitle={post.title}
            category={post.category}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 250px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} post={post} />
      </Link>
    );
  }

  // ── 4. Pure Text Card - No Image / No Fallback (For TopBlogs Card 5) ──
  if (variant === "no-image") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        prefetch={true}
        className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-none transition-all duration-300 cursor-pointer bg-black text-white min-h-[240px] shadow-md hover:shadow-xl border-0 h-full"
      >
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="px-2.5 py-1 bg-red-900/60 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase tracking-wider rounded-none">
            {post.category} • {post.readTime}
          </span>
          <ShareBtn light />
        </div>

        <div className="my-auto py-2">
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight uppercase tracking-tight line-clamp-2 mb-2 group-hover:translate-x-1 transition-transform">
            {post.title}
          </h3>
          <p className="text-xs text-white/80 line-clamp-3 leading-relaxed font-normal">
            {post.description}
          </p>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/90 mt-4">
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 rounded-none overflow-hidden flex-shrink-0 ring-1 ring-white/30">
              <SafeImage
                src="/avatar.jpg"
                alt={post.author}
                fallbackTitle={post.author}
                category="AUTHOR"
                fill
                sizes="20px"
                className="object-cover rounded-none"
              />
            </div>
            <span className="font-bold text-white text-xs">{post.author}</span>
          </div>
          <span className="font-bold uppercase tracking-wider text-xs text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            EXPLORE →
          </span>
        </div>
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} post={post} />
      </Link>
    );
  }

  // ── 5. Compact Card ──
  if (variant === "compact") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        prefetch={true}
        className="group relative flex flex-col justify-between rounded-xl overflow-hidden transition-all duration-300 cursor-pointer bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-md shadow-xs"
      >
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
          <SafeImage
            src={post.cover || "/hero.png"}
            alt={post.title}
            fallbackTitle={post.title}
            category={post.category}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2 py-0.5 bg-black/75 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider rounded">
              {post.category}
            </span>
          </div>
          <div className="absolute top-2.5 right-2.5 z-10">
            <ShareBtn light />
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1 justify-between">
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>

          <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h4>

          <div className="pt-2.5 mt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span>{post.author}</span>
            <span className="font-bold text-blue-600">Read →</span>
          </div>
        </div>
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} post={post} />
      </Link>
    );
  }

  // ── 6. Horizontal Card ──
  if (variant === "horizontal") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        prefetch={true}
        className="group relative flex flex-col sm:flex-row rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xl shadow-xs h-full"
      >
        <div className="relative w-full sm:w-5/12 aspect-[16/9] sm:aspect-auto min-h-[180px] overflow-hidden bg-gray-100 flex-shrink-0">
          <SafeImage
            src={post.cover || "/hero.png"}
            alt={post.title}
            fallbackTitle={post.title}
            category={post.category}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 z-10 sm:hidden">
            <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              {post.category}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
          <div>
            <div className="hidden sm:flex items-center justify-between text-xs text-gray-400 mb-2">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-[10px] rounded">
                {post.category}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-500">{post.readTime}</span>
                <ShareBtn />
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight tracking-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
              {post.description}
            </p>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 mt-auto">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
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
              <span className="font-semibold text-gray-800 text-xs">{post.author}</span>
            </div>
            <span className="font-bold text-xs text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Read Article →
            </span>
          </div>
        </div>
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} post={post} />
      </Link>
    );
  }

  // ── 7. Standard "grid" variant featuring dynamic MDX cover image (For LatestBlogs & Posts Explorer) ──
  return (
    <Link
      href={`/posts/${post.slug}`}
      prefetch={true}
      className="group relative flex flex-col justify-between rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer bg-white border border-gray-200/80 hover:border-gray-300 hover:shadow-xl shadow-xs"
    >
      {/* Cover Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
        <SafeImage
          src={post.cover || "/hero.png"}
          alt={post.title}
          fallbackTitle={post.title}
          category={post.category}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
            {post.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <ShareBtn light />
        </div>
      </div>

      {/* Text Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2.5">
            <span className="font-mono text-[11px]">{post.date}</span>
            <span className="font-semibold text-gray-500">{post.readTime}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-tight tracking-tight mb-2.5 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4 font-normal">
            {post.description}
          </p>
        </div>

        <div className="pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600 mt-auto">
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
              <SafeImage
                src="/avatar.jpg"
                alt={post.author}
                fallbackTitle={post.author}
                category="AUTHOR"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-gray-800 text-xs">{post.author}</span>
          </div>
          <span className="font-bold text-xs text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Read Article →
          </span>
        </div>
      </div>
      <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} post={post} />
    </Link>
  );
}
