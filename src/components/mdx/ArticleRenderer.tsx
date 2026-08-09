import React from "react";
import CodeBlock from "./CodeBlock";

interface ArticleRendererProps {
  content: string;
}

export default function ArticleRenderer({ content }: ArticleRendererProps) {
  // Parse rich MDX content blocks
  const blocks = parseMDXBlocks(content);

  return (
    <div className="article-body flex flex-col gap-6 text-gray-800 text-base md:text-lg leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.type === "h1") {
          return (
            <h1 key={idx} className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-8 mb-2 tracking-tight">
              {block.text}
            </h1>
          );
        }

        if (block.type === "h2") {
          return (
            <h2 key={idx} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-2 tracking-tight border-b border-gray-100 pb-2">
              {block.text}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3 key={idx} className="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-2">
              {block.text}
            </h3>
          );
        }

        if (block.type === "code") {
          return (
            <CodeBlock key={idx} code={block.text} language={block.language} />
          );
        }

        if (block.type === "diagram") {
          return (
            <div key={idx} className="my-6 p-5 md:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Architecture Flowchart Diagram
              </div>
              <pre className="font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto leading-relaxed p-4 bg-slate-950 rounded-xl border border-slate-800 scrollbar-thin">
                {block.text}
              </pre>
            </div>
          );
        }

        if (block.type === "youtube") {
          return (
            <div key={idx} className="my-8 aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${block.text}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote key={idx} className="my-4 border-l-4 border-blue-600 bg-blue-50/70 pl-5 py-3 rounded-r-xl text-gray-700 italic text-base">
              {block.text}
            </blockquote>
          );
        }

        if (block.type === "alert") {
          const isWarning = block.alertType === "WARNING" || block.alertType === "IMPORTANT";
          return (
            <div
              key={idx}
              className={`my-4 p-4 rounded-xl border flex gap-3 text-sm leading-relaxed ${
                isWarning
                  ? "bg-amber-50 border-amber-200 text-amber-900"
                  : "bg-blue-50 border-blue-200 text-blue-900"
              }`}
            >
              <div className="font-bold uppercase tracking-wider text-xs flex-shrink-0 mt-0.5">
                [{block.alertType || "NOTE"}]
              </div>
              <div>{block.text}</div>
            </div>
          );
        }

        if (block.type === "list" && block.items) {
          return (
            <ul key={idx} className="my-2 space-y-2 list-disc pl-6 text-gray-800">
              {block.items.map((item, i) => (
                <li key={i} className="text-gray-800 text-base md:text-lg">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="text-gray-800 text-base md:text-lg leading-relaxed">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

interface MDXBlock {
  type: "h1" | "h2" | "h3" | "p" | "code" | "diagram" | "youtube" | "blockquote" | "alert" | "list";
  text: string;
  language?: string;
  alertType?: string;
  items?: string[];
}

function parseMDXBlocks(content: string): MDXBlock[] {
  const blocks: MDXBlock[] = [];
  const lines = content.split("\n");
  let inCode = false;
  let codeLang = "";
  let codeBuffer: string[] = [];

  let inList = false;
  let listBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code blocks / Flowcharts
    if (trimmed.startsWith("```")) {
      if (inCode) {
        const fullCode = codeBuffer.join("\n");
        if (codeLang === "mermaid" || codeLang === "flowchart" || codeLang === "diagram") {
          blocks.push({ type: "diagram", text: fullCode });
        } else {
          blocks.push({ type: "code", text: fullCode, language: codeLang });
        }
        inCode = false;
        codeBuffer = [];
        codeLang = "";
      } else {
        inCode = true;
        codeLang = trimmed.replace(/^```/, "").trim();
      }
      continue;
    }

    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    // List items
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (!inList) {
        inList = true;
        listBuffer = [];
      }
      listBuffer.push(trimmed.replace(/^[-*]\s+/, ""));
      continue;
    } else if (inList) {
      blocks.push({ type: "list", text: "", items: listBuffer });
      inList = false;
      listBuffer = [];
    }

    // YouTube embeds
    if (trimmed.startsWith("youtube:") || trimmed.includes("youtube.com/embed/")) {
      const videoId = trimmed.replace(/^youtube:\s*/, "").replace(/.*embed\//, "").replace(/.*v=/, "");
      blocks.push({ type: "youtube", text: videoId.trim() });
      continue;
    }

    // Headings
    if (trimmed.startsWith("# ")) {
      blocks.push({ type: "h1", text: trimmed.replace(/^#\s+/, "") });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.replace(/^##\s+/, "") });
      continue;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.replace(/^###\s+/, "") });
      continue;
    }

    // Alert Callouts `> [!NOTE]` or `> [!WARNING]`
    if (trimmed.startsWith("> [!")) {
      const match = trimmed.match(/^>\s*\[!([A-Z]+)\]\s*(.*)/);
      if (match) {
        blocks.push({ type: "alert", alertType: match[1], text: match[2] || lines[i+1]?.replace(/^>\s*/, "") || "" });
        if (lines[i+1]?.startsWith("> ")) i++;
        continue;
      }
    }

    // Blockquotes
    if (trimmed.startsWith("> ")) {
      blocks.push({ type: "blockquote", text: trimmed.replace(/^>\s+/, "") });
      continue;
    }

    if (trimmed.length > 0) {
      blocks.push({ type: "p", text: trimmed });
    }
  }

  if (inList) {
    blocks.push({ type: "list", text: "", items: listBuffer });
  }

  return blocks;
}
