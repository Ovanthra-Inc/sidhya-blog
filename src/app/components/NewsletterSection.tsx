"use client";

import React, { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed. Please check your email.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again later.");
    }
  };

  return (
    <section className="mx-3 sm:mx-8 md:mx-16 lg:mx-20 bg-[#1A1A1A] text-white px-5 sm:px-8 md:px-12 py-8 sm:py-10 rounded-2xl sm:rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-4 tracking-tight">
            Stay Ahead in AI &<br />Software Architecture
          </h2>
          <p className="text-xs text-gray-400 mb-6 max-w-sm">
            Get Asutosh Sidhya&apos;s latest technical breakdowns on AI agents, vector search, and Next.js 16 straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 w-full sm:w-[260px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 text-xs text-gray-800 bg-transparent placeholder:text-gray-400 border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 shadow-none min-w-0"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-black text-xs font-bold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors text-center cursor-pointer flex-shrink-0 disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {message && (
            <p
              className={`text-xs mt-3 ${
                status === "success" ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Right */}
        <div>
          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
            SIDHYA Engineering Insights
          </p>
          <p className="text-xs text-gray-300 leading-relaxed">
            Zero noise, zero fluff. Deep technical articles, complete code repositories, architectural diagrams, and real-world system patterns designed for software engineers.
          </p>
        </div>
      </div>
    </section>
  );
}
