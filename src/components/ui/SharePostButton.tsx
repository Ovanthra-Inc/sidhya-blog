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
}

export default function SharePostButton({ post }: SharePostButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Share this article"
        title="Share"
        className="text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
      >
        <IoIosShareAlt size={22} />
      </button>
      <ShareModal isOpen={open} onClose={() => setOpen(false)} post={post} />
    </>
  );
}
