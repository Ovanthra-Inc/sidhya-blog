"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";
import ShareModal from "@/components/ui/ShareModal";
import { IoIosShareAlt } from "react-icons/io";
import { Playlist } from "@/lib/playlists";

interface PlaylistCardProps {
  playlist: Playlist;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const [shareOpen, setShareOpen] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareOpen(true);
  };

  return (
    <>
      <Link
        href={`/playlists/${playlist.slug}`}
        prefetch={true}
        className="group flex flex-col rounded-none border-0 transition-all duration-200 cursor-pointer bg-white"
      >
        {/* Taller Image Container (h-[340px] sharp square) */}
        <div className="relative w-full h-[340px] rounded-none overflow-hidden mb-4 bg-gray-100">
          <SafeImage
            src={playlist.cover}
            alt={playlist.title}
            fallbackTitle={playlist.title}
            category={playlist.category}
            fill
            sizes="(max-width: 780px) 100vw, 420px"
            className="object-cover group-hover:scale-103 transition-transform duration-300 rounded-none"
          />
          {/* Share button: top-right of image */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <button
              onClick={handleShare}
              aria-label="Share this playlist"
              title="Share"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/70 shadow-sm transition-all duration-200 cursor-pointer"
            >
              <IoIosShareAlt size={17} />
            </button>
          </div>
        </div>

        {/* Category Badge & Post Count */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <span className="font-bold text-blue-600 uppercase tracking-wider text-[11px]">
            {playlist.category} PLAYLIST
          </span>
          <span className="font-semibold text-gray-700 text-xs">{playlist.posts.length} Lessons</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-blue-600 group-hover:underline transition-colors line-clamp-2">
          {playlist.title}
        </h2>

        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">
          {playlist.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
          <span>Start Series →</span>
        </div>
      </Link>
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        post={{
          title: playlist.title,
          description: playlist.description,
          slug: playlist.slug,
        }}
        basePath="playlists"
      />
    </>
  );
}
