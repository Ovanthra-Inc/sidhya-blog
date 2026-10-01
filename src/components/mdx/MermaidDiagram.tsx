"use client";

import { useEffect, useRef, useState } from "react";

// Store the singleton on globalThis so it survives Turbopack HMR.
// Module-level variables reset every time this file is HMR'd (the module
// is re-executed). globalThis lives in the browser runtime and is never
// cleared by HMR, so mermaid is loaded exactly once per browser session.
declare global {
  // eslint-disable-next-line no-var
  var __mermaidInstance: typeof import("mermaid")["default"] | undefined;
}

async function getMermaid() {
  if (!globalThis.__mermaidInstance) {
    const mod = await import("mermaid");
    const m = mod.default;
    m.initialize({
      startOnLoad: false,
      theme: "neutral",
      themeVariables: {
        primaryColor: "#6366f1",
        primaryTextColor: "#1e1b4b",
        primaryBorderColor: "#4f46e5",
        lineColor: "#6366f1",
        secondaryColor: "#f0f9ff",
        tertiaryColor: "#faf5ff",
        background: "#ffffff",
        mainBkg: "#f8fafc",
        nodeBorder: "#cbd5e1",
        clusterBkg: "#f1f5f9",
        titleColor: "#0f172a",
        edgeLabelBackground: "#ffffff",
        fontSize: "14px",
      },
      flowchart: { curve: "basis", useMaxWidth: true },
      sequence: { useMaxWidth: true },
      er: { useMaxWidth: true },
    });
    // Only assign after initialize succeeds — if import() throws (stale
    // HMR chunk), globalThis stays undefined and we retry next render.
    globalThis.__mermaidInstance = m;
  }
  return globalThis.__mermaidInstance;
}

interface MermaidDiagramProps {
  chart: string;
}

function sanitizeMermaidChart(raw: string): string {
  if (!raw) return raw;

  return raw
    .replace(/\r\n/g, "\n")
    // Fix literal \n inside labels
    .replace(/\\n/g, " ")
    // Fix unquoted braces: Node{some (text)} -> Node{"some (text)"}
    .replace(/([a-zA-Z0-9_-]+)\{([^"{}\n]+)\}/g, (_match, id, text) => {
      const clean = text.replace(/"/g, "'").trim();
      return `${id}{"${clean}"}`;
    })
    // Fix unquoted brackets: Node[some / text (test)] -> Node["some / text (test)"]
    .replace(/([a-zA-Z0-9_-]+)\[([^"[\]\n]+)\]/g, (_match, id, text) => {
      const clean = text.replace(/"/g, "'").trim();
      return `${id}["${clean}"]`;
    });
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = await getMermaid();
        const sanitized = sanitizeMermaidChart(chart.trim());

        const uniqueId = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(uniqueId, sanitized);

        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg;
          setRendered(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Diagram render error");
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-md">
        <div className="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800 bg-slate-900">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
          </svg>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Architectural Flowchart</span>
        </div>
        <pre className="font-mono text-xs md:text-sm text-emerald-400 overflow-x-auto leading-relaxed p-5 bg-slate-950">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-indigo-100 bg-white shadow-sm">
      {/* Header bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-indigo-100 bg-indigo-50/60">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-indigo-500 flex-shrink-0">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
          <path d="M10 6.5h4M17.5 10v4M6.5 10v4M10 17.5h4"/>
        </svg>
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Diagram</span>
      </div>

      {/* Diagram render area */}
      <div
        ref={ref}
        className={`p-6 flex justify-center transition-opacity duration-300 ${rendered ? "opacity-100" : "opacity-0"}`}
      />

      {/* Skeleton while loading */}
      {!rendered && !error && (
        <div className="p-6 flex flex-col items-center gap-3 animate-pulse">
          <div className="h-4 bg-gray-100 rounded w-3/4" />
          <div className="h-4 bg-gray-100 rounded w-1/2" />
          <div className="h-4 bg-gray-100 rounded w-2/3" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
        </div>
      )}
    </div>
  );
}
