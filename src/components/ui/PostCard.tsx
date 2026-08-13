import React from "react";
import Link from "next/link";
import SafeImage from "./SafeImage";
import { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  index?: number;
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
      </Link>
    );
  }

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
              <span className="font-semibold text-gray-500">{post.readTime}</span>
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
      </Link>
    );
  }

  // Standard "grid" variant featuring dynamic MDX cover image
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
    </Link>
  );
}
