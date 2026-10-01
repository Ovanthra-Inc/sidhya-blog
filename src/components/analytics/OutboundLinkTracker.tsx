"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// List of known dev/cloud/AI tool domains for automatic affiliate & outbound classification
const MONETIZED_DOMAINS = [
  "vultr.com",
  "digitalocean.com",
  "runpod.io",
  "pinecone.io",
  "qdrant.tech",
  "weaviate.io",
  "together.ai",
  "groq.com",
  "supabase.com",
  "neon.tech",
  "upstash.com",
  "cursor.com",
  "gumroad.com",
  "lemonsqueezy.com",
  "amazon.com",
  "amzn.to",
];

export default function OutboundLinkTracker() {
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Find closest anchor tag clicked
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor || !anchor.href) return;

      const href = anchor.href;

      // Ignore hash links, javascript:, tel:, mailto:
      if (
        href.startsWith("#") ||
        href.startsWith("javascript:") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.origin);

        // Check if internal domain
        if (url.host === window.location.host) {
          return;
        }

        const isAffiliateAttr =
          anchor.hasAttribute("data-affiliate") ||
          (anchor.rel && anchor.rel.includes("sponsored"));

        const isKnownMonetizedDomain = MONETIZED_DOMAINS.some((domain) =>
          url.host.includes(domain)
        );

        const isAffiliate = isAffiliateAttr || isKnownMonetizedDomain;
        const affiliateTag =
          anchor.getAttribute("data-affiliate") ||
          (isKnownMonetizedDomain ? url.host : undefined);

        const linkText =
          anchor.getAttribute("data-track-name") ||
          anchor.textContent?.trim().slice(0, 50) ||
          "";

        // 1. Vercel Web Analytics Custom Event
        track("outbound_click", {
          url: href,
          host: url.host,
          text: linkText,
          isAffiliate,
          affiliateTag: affiliateTag || "none",
          page: window.location.pathname,
        });

        // 2. Google Analytics 4 event
        const win = window as unknown as {
          gtag?: (command: string, action: string, params: Record<string, unknown>) => void;
        };
        if (typeof win.gtag === "function") {
          win.gtag("event", isAffiliate ? "affiliate_click" : "outbound_click", {
            event_category: isAffiliate ? "monetization" : "outbound",
            event_label: href,
            outbound_host: url.host,
            link_text: linkText,
            page_path: window.location.pathname,
            transport_type: "beacon",
          });
        }
      } catch {
        // Ignore invalid URLs
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
