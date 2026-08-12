import React from "react";

interface PageHeaderBannerProps {
  badge: string;
  title: string;
  description: string;
  count: number;
  countLabel?: string;
}

export default function PageHeaderBanner({
  badge,
  title,
  description,
  count,
  countLabel = "Articles",
}: PageHeaderBannerProps) {
  return (
    <div className="mb-8 bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xs">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full mb-3">
          {badge}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
          {title}
        </h1>
        <p className="text-gray-600 text-sm max-w-xl leading-relaxed">
          {description}
        </p>
      </div>

      <div className="bg-white border border-gray-200 px-6 py-4 rounded-2xl text-center shadow-xs flex-shrink-0">
        <span className="text-3xl font-extrabold text-blue-600 block">{count}</span>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {count === 1 ? `${countLabel.slice(0, -1)} Found` : `${countLabel} Available`}
        </span>
      </div>
    </div>
  );
}
