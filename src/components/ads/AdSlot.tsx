"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiExternalLink, FiCpu } from "react-icons/fi";

interface AdSlotProps {
  position: "article-top" | "article-middle" | "article-bottom" | "sidebar";
  className?: string;
}

export default function AdSlot({ position, className = "" }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  // Network configuration from environment variables
  const carbonServe = process.env.NEXT_PUBLIC_CARBON_SERVE; // e.g. "CEBI6K3W"
  const carbonPlacement = process.env.NEXT_PUBLIC_CARBON_PLACEMENT; // e.g. "sidhyastudio"
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID; // e.g. "ca-pub-1234567890"
  const adsenseSlot =
    position === "sidebar"
      ? process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR
      : process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE;

  const enableAds =
    process.env.NEXT_PUBLIC_ENABLE_ADS === "true" ||
    Boolean(carbonServe && carbonPlacement) ||
    Boolean(adsenseClientId);

  // Carbon Ads dynamic script loader
  useEffect(() => {
    if (!carbonServe || !carbonPlacement || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = ""; // Clear existing

    const script = document.createElement("script");
    script.id = "_carbonads_js";
    script.src = `//cdn.carbonads.com/carbon.js?serve=${carbonServe}&placement=${carbonPlacement}`;
    script.async = true;
    script.onload = () => setAdLoaded(true);

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [carbonServe, carbonPlacement, position]);

  // Google AdSense loader
  useEffect(() => {
    if (!adsenseClientId || carbonServe) return;

    try {
      const win = window as unknown as { adsbygoogle?: unknown[] };
      (win.adsbygoogle = win.adsbygoogle || []).push({});
      setAdLoaded(true);
    } catch {
      // AdSense push error handled
    }
  }, [adsenseClientId, carbonServe, position]);

  // If ads are not explicitly enabled or configured, show a clean, native developer sponsor card
  if (!enableAds && process.env.NEXT_PUBLIC_SHOW_DEV_SPONSOR !== "true") {
    // Show high-converting, unobtrusive Developer Sponsor / Tool Recommendation
    return (
      <div
        className={`my-8 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-950 text-white border border-gray-800 shadow-sm ${className}`}
      >
        <div className="flex items-center justify-between text-xs text-gray-400 mb-3 border-b border-gray-800 pb-2.5">
          <span className="font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
            <FiCpu className="w-3.5 h-3.5" />
            Developer Recommendations
          </span>
          <span className="text-[10px] bg-gray-800/80 px-2 py-0.5 rounded text-gray-400">
            Sponsored
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h5 className="font-bold text-base text-gray-100 mb-1">
              Building Autonomous AI Agents & Vector Search?
            </h5>
            <p className="text-xs text-gray-300 leading-relaxed max-w-xl">
              Deploy high-throughput embeddings, LLM inference endpoints, and serverless vector pipelines with low latency.
            </p>
          </div>

          <a
            href="https://sidhya.studio/contact"
            data-affiliate="sponsor"
            data-track-name="adslot_sponsor_partner"
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
          >
            <span>Partner With Us</span>
            <FiExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`ad-container my-8 flex flex-col items-center justify-center min-h-[120px] rounded-2xl border border-gray-200/80 bg-gray-50/50 p-4 transition-all ${className}`}
    >
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 w-full text-center">
        Advertisement
      </div>

      {/* 1. Carbon Ads Container */}
      {carbonServe && carbonPlacement ? (
        <div ref={containerRef} className="carbon-wrapper w-full flex justify-center" />
      ) : adsenseClientId && adsenseSlot ? (
        /* 2. Google AdSense Responsive Unit */
        <ins
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-client={adsenseClientId}
          data-ad-slot={adsenseSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        /* 3. Fallback Sponsor Card */
        <div className="text-xs text-gray-500 text-center py-2">
          Want to reach thousands of AI engineers and developers?{" "}
          <Link href="/contact" className="text-blue-600 font-semibold underline">
            Sponsor an article on SIDHYA
          </Link>
        </div>
      )}
    </div>
  );
}
