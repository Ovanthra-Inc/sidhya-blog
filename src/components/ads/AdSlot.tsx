import React from "react";

interface AdSlotProps {
  position: "article-top" | "article-middle" | "article-bottom" | "sidebar";
  className?: string;
}

export default function AdSlot({ position: _position, className: _className }: AdSlotProps) {
  // Hide all ad slots per user request
  return null;
}
