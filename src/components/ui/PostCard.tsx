import React from "react";
import Link from "next/link";
import SafeImage from "./SafeImage";
import { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  variant?: "grid" | "compact" | "horizontal";
  priority?: boolean;
}

export default function PostCard({
  post,
  variant = "grid",
  priority = false,
}: PostCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        prefetch={true}
        className="group flex flex-col rounded-none border-0 transition-all duration-200 cursor-pointer bg-white"
      >
        <div className="relative w-full h-60 rounded-none overflow-hidden mb-3 bg-gray-100">
          <SafeImage
            src={post.cover}
            alt={post.title}
            fallbackTitle={post.title}
            category={post.category}
            fill
            sizes="(max-width: 780px) 100vw, 400px"
            className="object-cover group-hover:scale-103 transition-transform duration-200 rounded-none"
            priority={priority}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
          <span className="font-bold text-blue-600 uppercase tracking-wider text-[10px]">
            {post.category}
          </span>
          <span className="text-[11px]">{post.readTime}</span>
        </div>
        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 group-hover:underline transition-colors">
          {post.title}
        </h4>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        prefetch={true}
        className="group flex flex-col sm:flex-row gap-5 p-0 rounded-none border-0 transition-all duration-200 cursor-pointer bg-white"
      >
        <div className="relative w-full sm:w-[190px] h-56 sm:h-[150px] rounded-none overflow-hidden bg-gray-100 flex-shrink-0">
          <SafeImage
            src={post.cover}
            alt={post.title}
            fallbackTitle={post.title}
            category={post.category}
            fill
            sizes="190px"
            className="object-cover group-hover:scale-103 transition-transform duration-300 rounded-none"
            priority={priority}
          />
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
              <span className="font-bold text-blue-600 uppercase tracking-wider text-[10px]">
                {post.category}
              </span>
              <span className="text-[11px]">{post.readTime}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2 mb-1">
              {post.title}
            </h3>

            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
              {post.description}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="relative w-4 h-4 rounded-none overflow-hidden flex-shrink-0">
                <SafeImage
                  src="/avatar.jpg"
                  alt={post.author}
                  fallbackTitle={post.author}
                  category="AUTHOR"
                  fill
                  sizes="16px"
                  className="object-cover rounded-none"
                />
              </div>
              <span className="font-semibold text-gray-800 text-[11px]">{post.author}</span>
            </div>
            <span className="text-[10px] text-gray-400">{post.date}</span>
          </div>
        </div>
      </Link>
    );
  }

  // Standard "grid" variant - Borderless, taller image height (h-[340px]), sharp square corners
  return (
    <Link
      href={`/posts/${post.slug}`}
      prefetch={true}
      className="group flex flex-col rounded-none border-0 transition-all duration-200 cursor-pointer bg-white"
    >
      {/* Image Container - Increased Height */}
      <div className="relative w-full h-[340px] rounded-none overflow-hidden mb-4 bg-gray-100">
        <SafeImage
          src={post.cover}
          alt={post.title}
          fallbackTitle={post.title}
          category={post.category}
          fill
          sizes="(max-width: 780px) 100vw, 420px"
          className="object-cover group-hover:scale-103 transition-transform duration-300 rounded-none"
          priority={priority}
        />
      </div>

      {/* Category Badge & Read Time */}
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

      {/* Author Footer */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5 rounded-none overflow-hidden flex-shrink-0">
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
          <span className="font-semibold text-gray-800">{post.author}</span>
        </div>
        <span>{post.date}</span>
      </div>
    </Link>
  );
}
