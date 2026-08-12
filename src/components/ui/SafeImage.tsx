"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackTitle?: string;
  category?: string;
  className?: string;
}

export default function SafeImage({
  src,
  alt,
  fallbackTitle,
  category,
  className = "",
  fill,
  width,
  height,
  priority,
  sizes,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(!src);

  const displayTitle = fallbackTitle || (typeof alt === "string" ? alt : "Article Visual Cover");
  const displayCategory = category || "TECH";

  // Palette based on category string hash
  const getGradient = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes("ai")) {
      return "from-slate-900 via-indigo-950 to-blue-900 border-indigo-500/30 text-indigo-400";
    }
    if (lower.includes("dev") || lower.includes("fullstack")) {
      return "from-slate-900 via-blue-950 to-cyan-900 border-cyan-500/30 text-cyan-400";
    }
    if (lower.includes("tool") || lower.includes("startup")) {
      return "from-slate-900 via-purple-950 to-pink-900 border-purple-500/30 text-purple-400";
    }
    return "from-slate-900 via-slate-800 to-zinc-900 border-slate-700/40 text-blue-400";
  };

  const gradientClasses = getGradient(displayCategory);

  if (error || !src) {
    return (
      <div
        className={`relative flex flex-col justify-between p-6 bg-gradient-to-br ${gradientClasses} border rounded-2xl overflow-hidden select-none group/placeholder transition-all duration-300 ${
          fill ? "w-full h-full absolute inset-0" : ""
        } ${className}`}
        style={!fill && width && height ? { width, height } : undefined}
        role="img"
        aria-label={alt || displayTitle}
      >
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_24px]"
          aria-hidden="true"
        />

        {/* Dynamic ambient glow circle */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover/placeholder:scale-125 transition-transform duration-500"
          aria-hidden="true"
        />

        {/* Top Category Badge & Icon */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white shadow-xs">
            {displayCategory}
          </span>
          <svg
            className="w-5 h-5 opacity-40 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>

        {/* Center Title / Placeholder Label */}
        <div className="relative z-10 my-auto py-2">
          <p className="text-white/90 font-extrabold text-sm sm:text-base leading-snug line-clamp-3 tracking-tight group-hover/placeholder:text-white transition-colors">
            {displayTitle}
          </p>
        </div>

        {/* Bottom Branding Tag */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10 pt-3 mt-2">
          <span>SIDHYA BLOG</span>
          <span className="font-semibold text-white/70">PLACEHOLDER COVER</span>
        </div>

        {/* Screen Reader Accessible Hidden Text for SEO & Screen Readers */}
        <span className="sr-only">
          Visual placeholder illustration image for article: {displayTitle}. Category: {displayCategory}. Image will be updated soon.
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${fill ? "w-full h-full" : ""} ${className}`}>
      <Image
        src={src}
        alt={alt || displayTitle}
        fill={fill}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        onError={() => setError(true)}
        {...props}
      />
      {/* Screen Reader Accessible Hidden Text for image content context */}
      <span className="sr-only">{alt || displayTitle}</span>
    </div>
  );
}
