"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export default function BackButton({ label = "Previous", className = "" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 bg-transparent border-0 shadow-none p-0 mb-6 transition-all cursor-pointer group focus-visible:outline-none ${className}`}
      title="Go back to previous page"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:-translate-x-1 transition-transform"
      >
        <path
          d="M19 12H5M12 19l-7-7 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
}
