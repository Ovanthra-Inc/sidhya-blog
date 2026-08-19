"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { IoIosShareAlt } from "react-icons/io";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    title: string;
    description: string;
    slug: string;
  };
  /** Defaults to 'posts'. Pass 'playlists' for playlist pages. */
  basePath?: string;
}

const BASE_URL = "https://sidhya.studio";

function buildPostUrl(slug: string, basePath: string) {
  return `${BASE_URL}/${basePath}/${slug}`;
}

export default function ShareModal({ isOpen, onClose, post, basePath = "posts" }: ShareModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const copyBtnRef = useRef<HTMLButtonElement>(null);

  const postUrl = buildPostUrl(post.slug, basePath);
  const shareTitle = post.title;
  const shareText = `${post.title}\n\n${post.description}`;

  // Social platform share URLs — pre-fill title + description so they appear rich
  const xShareUrl = `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(postUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(shareTitle)}&summary=${encodeURIComponent(post.description)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}&quote=${encodeURIComponent(shareTitle)}`;
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(shareTitle)}`;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Auto-focus modal panel on open
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      if (!copyBtnRef.current) return;
      const btn = copyBtnRef.current;
      const originalText = btn.innerText;
      btn.innerText = "COPIED ✓";
      btn.style.backgroundColor = "#059669";
      setTimeout(() => {
        if (btn) {
          btn.innerText = originalText;
          btn.style.backgroundColor = "";
        }
      }, 2000);
    } catch {
      // clipboard API unavailable — graceful no-op
    }
  }, [postUrl]);

  const openShare = (url: string) => {
    window.open(url, "_blank", "width=620,height=520,noopener,noreferrer");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
        style={{ animation: "smFadeIn 0.18s ease" }}
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        ref={modalRef}
        tabIndex={-1}
        className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none outline-none"
      >
        <div
          className="pointer-events-auto w-full max-w-[440px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          style={{ animation: "smSlideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
            <div className="min-w-0 flex-1">
              <h2
                id="share-modal-title"
                className="text-base font-extrabold text-gray-900 tracking-tight"
              >
                Share this article
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5 font-medium leading-snug line-clamp-1">
                {post.title}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close share modal"
              className="ml-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          {/* Social buttons */}
          <div className="px-6 pt-5 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
              Share on
            </p>
            <div className="grid grid-cols-4 gap-3">
              <SocialButton
                onClick={() => openShare(xShareUrl)}
                label="X"
                hoverClass="hover:bg-black hover:text-white"
                icon={
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                }
              />
              <SocialButton
                onClick={() => openShare(linkedInShareUrl)}
                label="LinkedIn"
                hoverClass="hover:bg-[#0A66C2] hover:text-white"
                icon={
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                }
              />
              <SocialButton
                onClick={() => openShare(facebookShareUrl)}
                label="Facebook"
                hoverClass="hover:bg-[#1877F2] hover:text-white"
                icon={
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                }
              />
              <SocialButton
                onClick={() => openShare(redditShareUrl)}
                label="Reddit"
                hoverClass="hover:bg-[#FF4500] hover:text-white"
                icon={
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                }
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
              Post title &amp; description are pre-filled — your audience sees rich content, not just a bare link.
            </p>
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-gray-100" />

          {/* Copy link */}
          <div className="px-6 pt-4 pb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2.5">
              Copy link
            </p>
            <div className="flex items-stretch rounded-xl border border-gray-200 overflow-hidden focus-within:border-gray-400 transition-colors">
              <div className="flex-1 px-3.5 py-2.5 overflow-hidden bg-gray-50">
                <input
                  readOnly
                  value={postUrl}
                  aria-label="Post permalink URL"
                  className="w-full bg-transparent text-[12px] text-gray-500 font-mono outline-none truncate"
                />
              </div>
              <button
                ref={copyBtnRef}
                onClick={handleCopy}
                className="px-5 bg-black text-white text-[11px] font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors flex-shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2" />
                </svg>
                COPY
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes smFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes smSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}

interface SocialButtonProps {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  hoverClass: string;
}

function SocialButton({ onClick, label, icon, hoverClass }: SocialButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Share on ${label}`}
      title={`Share on ${label}`}
      className={`flex flex-col items-center justify-center gap-1.5 aspect-square rounded-xl bg-gray-100 text-gray-600 transition-all duration-200 ${hoverClass} hover:scale-105 hover:shadow-md cursor-pointer`}
    >
      {icon}
      <span className="text-[9px] font-bold uppercase tracking-wider leading-none">{label}</span>
    </button>
  );
}
