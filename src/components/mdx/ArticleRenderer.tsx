"use client";

import React from "react";
import dynamic from "next/dynamic";
import CodeBlock from "./CodeBlock";
import SafeImage from "@/components/ui/SafeImage";

// Lazy-load Mermaid renderer (client-only, heavy dependency)
const MermaidDiagram = dynamic(() => import("./MermaidDiagram"), {
  ssr: false,
  loading: () => (
    <div className="my-6 p-6 rounded-2xl border border-indigo-100 bg-indigo-50/30 animate-pulse flex flex-col gap-2">
      <div className="h-3 bg-indigo-100 rounded w-2/3" />
      <div className="h-3 bg-indigo-100 rounded w-1/2" />
      <div className="h-3 bg-indigo-100 rounded w-3/4" />
    </div>
  ),
});

// ─── Inline markdown helper (Recursive & Robust) ───────────────────────────────
function inlineRender(text: string): React.ReactNode {
  if (!text) return text;

  // Regex pattern matching bold, italic, code, markdown links, and strikethrough
  const INLINE_REGEX = /(\*\*[\s\S]+?\*\*|\*[^\s*][^*]*?\*|`[^`]+?`|\[[^\]]+?\]\([^)]+?\)|~~[\s\S]+?~~)/g;

  const parts = text.split(INLINE_REGEX);

  return parts.filter(Boolean).map((part, i) => {
    // 1. Code blocks (raw, non-recursive)
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded-md bg-gray-100 text-pink-600 text-[0.85em] font-mono border border-gray-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // 2. Bold (recursive for nested links/italics)
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {inlineRender(part.slice(2, -2))}
        </strong>
      );
    }

    // 3. Italic (recursive)
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**") && part.length >= 2) {
      return (
        <em key={i} className="italic text-gray-700">
          {inlineRender(part.slice(1, -1))}
        </em>
      );
    }

    // 4. Strikethrough (recursive)
    if (part.startsWith("~~") && part.endsWith("~~") && part.length >= 4) {
      return (
        <del key={i} className="line-through text-gray-400">
          {inlineRender(part.slice(2, -2))}
        </del>
      );
    }

    // 5. Links (recursive label text to support bold/italic links)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, linkUrl] = linkMatch;
      const isExternal = linkUrl.startsWith("http");
      return (
        <a
          key={i}
          href={linkUrl}
          className="text-blue-600 font-semibold underline underline-offset-2 hover:text-blue-800 transition-colors cursor-pointer"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {inlineRender(linkText)}
        </a>
      );
    }

    return part;
  });
}

// ─── Alert config ─────────────────────────────────────────────────────────────
type AlertType = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

const ALERT_CONFIG: Record<AlertType, { bg: string; border: string; text: string; label: string; icon: React.ReactNode }> = {
  NOTE: {
    bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900", label: "Note",
    icon: (
      <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
  },
  TIP: {
    bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-900", label: "Tip",
    icon: (
      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-4 7.5V18a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1.5C7.5 15 5 12.5 5 9a7 7 0 0 1 7-7z"/>
        <path d="M9 21h6"/>
      </svg>
    ),
  },
  IMPORTANT: {
    bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-900", label: "Important",
    icon: (
      <svg className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 2L2 20h20L12 2z"/><path d="M12 9v4M12 17h.01"/>
      </svg>
    ),
  },
  WARNING: {
    bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-900", label: "Warning",
    icon: (
      <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 2L2 20h20L12 2z"/><path d="M12 9v4M12 17h.01"/>
      </svg>
    ),
  },
  CAUTION: {
    bg: "bg-red-50", border: "border-red-200", text: "text-red-900", label: "Caution",
    icon: (
      <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
      </svg>
    ),
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  const blocks = parseMDXBlocks(content);

  return (
    <div className="article-body flex flex-col gap-5 text-gray-800 text-base md:text-lg leading-relaxed">
      {blocks.map((block, idx) => {
        /* ── Headings ── */
        if (block.type === "h1")
          return (
            <h1 key={idx} className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-10 mb-1 tracking-tight scroll-mt-24" id={slugify(block.text)}>
              {inlineRender(block.text)}
            </h1>
          );
        if (block.type === "h2")
          return (
            <h2 key={idx} className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-1 tracking-tight border-b border-gray-100 pb-2 scroll-mt-24" id={slugify(block.text)}>
              {inlineRender(block.text)}
            </h2>
          );
        if (block.type === "h3")
          return (
            <h3 key={idx} className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-1 scroll-mt-24" id={slugify(block.text)}>
              {inlineRender(block.text)}
            </h3>
          );
        if (block.type === "h4")
          return (
            <h4 key={idx} className="text-lg font-bold text-gray-800 mt-6 mb-1 scroll-mt-24" id={slugify(block.text)}>
              {inlineRender(block.text)}
            </h4>
          );
        if (block.type === "h5")
          return (
            <h5 key={idx} className="text-base font-bold text-gray-700 mt-5 mb-1 uppercase tracking-wide scroll-mt-24" id={slugify(block.text)}>
              {inlineRender(block.text)}
            </h5>
          );

        /* ── Horizontal rule ── */
        if (block.type === "hr")
          return <hr key={idx} className="my-6 border-0 border-t border-gray-200" />;

        /* ── Inline Image ── */
        if (block.type === "image")
          return (
            <div key={idx} className="my-6 relative w-full h-[320px] md:h-[480px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
              <SafeImage
                src={block.url || ""}
                alt={block.text || "Article illustration"}
                fallbackTitle={block.text}
                category="ARTICLE"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>
          );

        /* ── Code block ── */
        if (block.type === "code")
          return <CodeBlock key={idx} code={block.text} language={block.language} />;

        /* ── Mermaid diagram ── */
        if (block.type === "mermaid")
          return <MermaidDiagram key={idx} chart={block.text} />;

        /* ── Legacy ASCII flowchart ── */
        if (block.type === "diagram")
          return (
            <div key={idx} className="my-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
                </svg>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Flowchart</span>
              </div>
              <pre className="font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto leading-relaxed p-5 bg-slate-950">
                {block.text}
              </pre>
            </div>
          );

        /* ── YouTube embed ── */
        if (block.type === "youtube")
          return (
            <div key={idx} className="my-6 aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${block.text}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );

        /* ── Blockquote ── */
        if (block.type === "blockquote")
          return (
            <blockquote key={idx} className="my-3 border-l-4 border-blue-500 bg-blue-50/60 pl-5 pr-4 py-3 rounded-r-xl text-gray-700 italic text-base">
              {inlineRender(block.text)}
            </blockquote>
          );

        /* ── GitHub-style alert callouts ── */
        if (block.type === "alert") {
          const type = (block.alertType || "NOTE") as AlertType;
          const cfg = ALERT_CONFIG[type] ?? ALERT_CONFIG.NOTE;
          return (
            <div key={idx} className={`my-3 p-4 rounded-xl border flex gap-3 text-sm leading-relaxed ${cfg.bg} ${cfg.border} ${cfg.text}`}>
              {cfg.icon}
              <div>
                <span className="font-bold text-xs uppercase tracking-wider mr-2">{cfg.label}:</span>
                {inlineRender(block.text)}
              </div>
            </div>
          );
        }

        /* ── Unordered list ── */
        if (block.type === "list" && block.items)
          return (
            <ul key={idx} className="my-1 space-y-1.5 list-none pl-0">
              {block.items.map((item, i) => (
                <li key={i} className="flex gap-2.5 text-base md:text-lg text-gray-800">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>{inlineRender(item)}</span>
                </li>
              ))}
            </ul>
          );

        /* ── Ordered list ── */
        if (block.type === "olist" && block.items)
          return (
            <ol key={idx} className="my-1 space-y-1.5 list-none pl-0 counter-reset-[item]">
              {block.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-base md:text-lg text-gray-800">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{inlineRender(item)}</span>
                </li>
              ))}
            </ol>
          );

        /* ── Table ── */
        if (block.type === "table" && block.tableData)
          return (
            <div key={idx} className="my-4 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {block.tableData.headers.map((h, hi) => (
                      <th key={hi} className="px-4 py-3 font-semibold text-gray-700 text-xs uppercase tracking-wider whitespace-nowrap">
                        {inlineRender(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {block.tableData.rows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-gray-50/70 transition-colors">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-4 py-3 text-gray-700 align-top">
                          {inlineRender(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );

        /* ── Paragraph ── */
        return (
          <p key={idx} className="text-gray-800 text-base md:text-lg leading-relaxed">
            {inlineRender(block.text)}
          </p>
        );
      })}
    </div>
  );
}

// ─── Slug helper (for heading anchors) ───────────────────────────────────────
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ─── Block types ─────────────────────────────────────────────────────────────
interface MDXBlock {
  type:
    | "h1" | "h2" | "h3" | "h4" | "h5"
    | "p" | "hr" | "image"
    | "code" | "mermaid" | "diagram"
    | "youtube"
    | "blockquote" | "alert"
    | "list" | "olist"
    | "table";
  text: string;
  url?: string;
  language?: string;
  alertType?: string;
  items?: string[];
  tableData?: { headers: string[]; rows: string[][] };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseTableRow(row: string): string[] {
  return row.split("|").map(c => c.trim()).filter((_, i, arr) => i !== 0 && i !== arr.length - 1);
}
function isTableSeparator(row: string): boolean {
  return /^[|\s:-]+$/.test(row);
}

// ─── Parser ───────────────────────────────────────────────────────────────────
function parseMDXBlocks(content: string): MDXBlock[] {
  const blocks: MDXBlock[] = [];
  const lines = content.split("\n");

  let inCode = false;
  let codeLang = "";
  let codeBuffer: string[] = [];

  let inList = false;
  let listBuffer: string[] = [];

  let inOList = false;
  let olistBuffer: string[] = [];

  let inTable = false;
  let tableHeaders: string[] = [];
  let tableRows: string[][] = [];

  const flushList = () => {
    if (inList)  { blocks.push({ type: "list",  text: "", items: listBuffer });  inList = false;  listBuffer = []; }
    if (inOList) { blocks.push({ type: "olist", text: "", items: olistBuffer }); inOList = false; olistBuffer = []; }
    if (inTable) { blocks.push({ type: "table", text: "", tableData: { headers: tableHeaders, rows: tableRows } }); inTable = false; tableHeaders = []; tableRows = []; }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // ── Code fence ───────────────────────────────────────────────────────────
    if (trimmed.startsWith("```")) {
      if (inCode) {
        const fullCode = codeBuffer.join("\n");
        const lang = codeLang.toLowerCase();
        if (lang === "mermaid") {
          blocks.push({ type: "mermaid", text: fullCode });
        } else if (lang === "flowchart" || lang === "diagram") {
          blocks.push({ type: "diagram", text: fullCode });
        } else {
          blocks.push({ type: "code", text: fullCode, language: codeLang });
        }
        inCode = false; codeBuffer = []; codeLang = "";
      } else {
        flushList();
        inCode = true;
        codeLang = trimmed.replace(/^```/, "").trim();
      }
      continue;
    }
    if (inCode) { codeBuffer.push(line); continue; }

    // ── Markdown Image ![alt](url) ───────────────────────────────────────────
    const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)/);
    if (imgMatch) {
      flushList();
      blocks.push({ type: "image", text: imgMatch[1], url: imgMatch[2] });
      continue;
    }

    // ── Tables ────────────────────────────────────────────────────────────────
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (isTableSeparator(trimmed)) continue;
      const cells = parseTableRow(trimmed);
      if (!inTable) {
        flushList();
        inTable = true;
        tableHeaders = cells;
        tableRows = [];
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      blocks.push({ type: "table", text: "", tableData: { headers: tableHeaders, rows: tableRows } });
      inTable = false; tableHeaders = []; tableRows = [];
    }

    // ── Unordered list ────────────────────────────────────────────────────────
    if (/^[-*+]\s+/.test(trimmed)) {
      if (inOList) { blocks.push({ type: "olist", text: "", items: olistBuffer }); inOList = false; olistBuffer = []; }
      if (!inList) { inList = true; listBuffer = []; }
      listBuffer.push(trimmed.replace(/^[-*+]\s+/, ""));
      continue;
    } else if (inList) {
      blocks.push({ type: "list", text: "", items: listBuffer });
      inList = false; listBuffer = [];
    }

    // ── Ordered list (1. 2. 3.) ───────────────────────────────────────────────
    if (/^\d+\.\s+/.test(trimmed)) {
      if (inList) { blocks.push({ type: "list", text: "", items: listBuffer }); inList = false; listBuffer = []; }
      if (!inOList) { inOList = true; olistBuffer = []; }
      olistBuffer.push(trimmed.replace(/^\d+\.\s+/, ""));
      continue;
    } else if (inOList) {
      blocks.push({ type: "olist", text: "", items: olistBuffer });
      inOList = false; olistBuffer = [];
    }

    // ── Horizontal rule ───────────────────────────────────────────────────────
    if (/^[-*_]{3,}$/.test(trimmed)) {
      flushList();
      blocks.push({ type: "hr", text: "" });
      continue;
    }

    // ── YouTube embed ─────────────────────────────────────────────────────────
    if (trimmed.startsWith("youtube:") || trimmed.includes("youtube.com/embed/")) {
      const videoId = trimmed.replace(/^youtube:\s*/, "").replace(/.*embed\//, "").replace(/.*v=/, "");
      blocks.push({ type: "youtube", text: videoId.trim() });
      continue;
    }

    // ── Headings ──────────────────────────────────────────────────────────────
    const hMatch = trimmed.match(/^(#{1,5})\s+(.*)/);
    if (hMatch) {
      flushList();
      const level = hMatch[1].length as 1 | 2 | 3 | 4 | 5;
      const type = (["h1","h2","h3","h4","h5"] as const)[level - 1];
      blocks.push({ type, text: hMatch[2] });
      continue;
    }

    // ── Alert callouts › [!TYPE] ──────────────────────────────────────────────
    if (trimmed.startsWith("> [!")) {
      const match = trimmed.match(/^>\s*\[!([A-Z]+)\]\s*(.*)/);
      if (match) {
        let alertText = match[2];
        while (i + 1 < lines.length && lines[i + 1].trimStart().startsWith("> ")) {
          i++;
          alertText += " " + lines[i].replace(/^>\s*/, "").trim();
        }
        blocks.push({ type: "alert", alertType: match[1], text: alertText });
        continue;
      }
    }

    // ── Blockquote ────────────────────────────────────────────────────────────
    if (trimmed.startsWith("> ")) {
      blocks.push({ type: "blockquote", text: trimmed.replace(/^>\s+/, "") });
      continue;
    }

    // ── Paragraph ─────────────────────────────────────────────────────────────
    if (trimmed.length > 0) {
      blocks.push({ type: "p", text: trimmed });
    }
  }

  // Flush anything still open
  if (inList)  blocks.push({ type: "list",  text: "", items: listBuffer });
  if (inOList) blocks.push({ type: "olist", text: "", items: olistBuffer });
  if (inTable) blocks.push({ type: "table", text: "", tableData: { headers: tableHeaders, rows: tableRows } });

  return blocks;
}
