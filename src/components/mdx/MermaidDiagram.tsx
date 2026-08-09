"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
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

        const uniqueId = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(uniqueId, chart.trim());

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
      <div className="my-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-mono">
        <p className="font-semibold mb-1">Mermaid diagram error:</p>
        <pre className="text-xs whitespace-pre-wrap">{error}</pre>
        <pre className="mt-2 text-xs text-gray-500 whitespace-pre-wrap">{chart}</pre>
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
