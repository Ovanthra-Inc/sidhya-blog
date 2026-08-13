import type { NextConfig } from "next";
import { EventEmitter } from "events";

// Increase default max event listeners to prevent Gzip/stream drain warnings during concurrent dev requests
EventEmitter.defaultMaxListeners = 30;

const nextConfig: NextConfig = {
  compress: process.env.NODE_ENV === "production",
  reactCompiler: true,
};

export default nextConfig;
