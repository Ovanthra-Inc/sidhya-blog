"use client";

import React, { useState, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { track } from "@vercel/analytics";

interface LikeButtonProps {
  slug: string;
  title: string;
  variant?: "compact" | "banner";
  className?: string;
}

export default function LikeButton({
  slug,
  title,
  variant = "compact",
  className = "",
}: LikeButtonProps) {
  const [likes, setLikes] = useState<number | null>(null);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check localStorage and fetch like count on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`sidhya_liked_${slug}`);
      if (stored === "true") {
        setHasLiked(true);
      }
    }

    // Fetch initial count from API
    fetch(`/api/likes/${encodeURIComponent(slug)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.likes === "number") {
          setLikes(data.likes);
        }
      })
      .catch(() => {
        // Fallback gracefully without fake counts
        setLikes(0);
      });
  }, [slug]);

  const handleLike = async () => {
    if (isLoading) return;

    // Trigger playful pop animation
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    const prevLiked = hasLiked;
    const nextLiked = !prevLiked;

    // Optimistic UI update
    setHasLiked(nextLiked);
    setLikes((prev) => (prev !== null ? prev + (nextLiked ? 1 : -1) : 1));

    if (typeof window !== "undefined") {
      localStorage.setItem(`sidhya_liked_${slug}`, nextLiked ? "true" : "false");
    }

    // Only fire tracking events when liking (not unliking)
    if (nextLiked) {
      try {
        track("like_article", {
          slug,
          title,
        });
      } catch {
        // Analytics error ignored in local dev
      }

      // Google Analytics 4 event
      if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", "like_article", {
          event_category: "engagement",
          event_label: slug,
          article_title: title,
        });
      }

      // Persist to API
      setIsLoading(true);
      try {
        const res = await fetch(`/api/likes/${encodeURIComponent(slug)}`, {
          method: "POST",
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.likes === "number") {
            setLikes(data.likes);
          }
        }
      } catch {
        // Handled silently
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ── Variant: Compact (Header meta row alongside Share button) ─────────────
  if (variant === "compact") {
    return (
      <button
        onClick={handleLike}
        aria-label={hasLiked ? "Unlike article" : "Like article"}
        title={hasLiked ? "You liked this article" : "Like this article"}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none border ${
          hasLiked
            ? "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100 shadow-xs"
            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
        } ${className}`}
      >
        <span
          className={`inline-flex transition-transform duration-300 ${
            isAnimating ? "scale-135 rotate-[-12deg]" : "scale-100"
          }`}
        >
          {hasLiked ? (
            <AiFillHeart className="w-4 h-4 text-rose-500 fill-current" />
          ) : (
            <AiOutlineHeart className="w-4 h-4 text-gray-500 group-hover:text-rose-500" />
          )}
        </span>
        <span className="font-semibold tabular-nums">
          {likes !== null ? likes : "—"}
        </span>
      </button>
    );
  }

  // ── Variant: Banner (Prominent interactive callout at bottom of article) ────
  return (
    <div
      className={`my-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-rose-50/30 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 ${className}`}
    >
      <div className="flex flex-col text-center sm:text-left">
        <h4 className="text-lg md:text-xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
          <span>Enjoyed this deep dive?</span>
          <span className="text-xl">✨</span>
        </h4>
        <p className="text-sm text-gray-600 mt-1 max-w-md">
          Hit the like button to support future engineering guides on autonomous AI agents and vector architectures.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLike}
          disabled={isLoading}
          aria-label={hasLiked ? "Unlike article" : "Like article"}
          className={`group relative flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer shadow-sm ${
            hasLiked
              ? "bg-rose-500 text-white shadow-rose-500/25 hover:bg-rose-600 hover:shadow-md"
              : "bg-white text-gray-800 border border-gray-300 hover:border-rose-400 hover:text-rose-600 hover:shadow-md"
          }`}
        >
          <span
            className={`inline-flex transition-transform duration-300 ${
              isAnimating ? "scale-150 rotate-[-15deg]" : "scale-100"
            }`}
          >
            {hasLiked ? (
              <AiFillHeart className="w-5 h-5 text-white fill-current" />
            ) : (
              <AiOutlineHeart className="w-5 h-5 text-rose-500 group-hover:scale-110 transition-transform" />
            )}
          </span>

          <span className="tabular-nums font-bold">
            {likes !== null ? `${likes} ${likes === 1 ? "Like" : "Likes"}` : "Like"}
          </span>

          {hasLiked && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
              Liked!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
