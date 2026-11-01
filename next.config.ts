import type { NextConfig } from "next";
import { EventEmitter } from "events";

// Increase default max event listeners to prevent Gzip/stream drain warnings during concurrent dev requests
EventEmitter.defaultMaxListeners = 30;

const nextConfig: NextConfig = {
  compress: process.env.NODE_ENV === "production",
  reactCompiler: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-cc0fb623bbd44d77925a5562302a0565.r2.dev",
      },
    ],
  },
};

export default nextConfig;
