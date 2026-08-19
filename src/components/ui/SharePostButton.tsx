"use client";

import { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";
import ShareModal from "./ShareModal";

interface SharePostButtonProps {
  post: {
    title: string;
    description: string;
    slug: string;
  };
  /** Defaults to 'posts'. Pass 'playlists' for playlist URLs. */
  basePath?: string;
  className?: string;
  size?: number;
}

export default function SharePostButton({
  post,
  basePath = "posts",
  className = "text-gray-400 hover:text-gray-700",
  size = 22,
}: SharePostButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Share"
        title="Share"
        className={`transition-colors cursor-pointer flex items-center justify-center ${className}`}
      >
        <IoIosShareAlt size={size} />
      </button>
      <ShareModal isOpen={open} onClose={() => setOpen(false)} post={post} basePath={basePath} />
    </>
  );
}
