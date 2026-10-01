import fs from "fs";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { tavily } from "@tavily/core";

// ── Environment Variables & Configuration ────────────────────────────────────
const AZURE_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_ENDPOINT =
  process.env.AZURE_OPENAI_ENDPOINT ||
  "https://invest-resource.services.ai.azure.com/openai/v1";
const MODEL_NAME = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-5-mini";
const IMAGE_MODEL = process.env.AZURE_OPENAI_IMAGE_DEPLOYMENT || "gpt-image-1-mini";
const TAVILY_KEY = process.env.TAVILY_API_KEY;

const R2_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "51bed705f4270b9ae2c0a3b1b64a0657";
const R2_BUCKET = process.env.CLOUDFLARE_R2_BUCKET_NAME || "sidhya-blog";
const R2_ACCESS_KEY = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const R2_SECRET_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const R2_PUBLIC_URL =
  process.env.CLOUDFLARE_R2_PUBLIC_URL ||
  "https://pub-cc0fb623bbd44d77925a5562302a0565.r2.dev";

// S3 Client configured for Cloudflare R2
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY || "",
    secretAccessKey: R2_SECRET_KEY || "",
  },
});

// ── Topic Search Seed Queries ─────────────────────────────────────────────────
const RESEARCH_TOPICS = [
  "autonomous AI agent memory orchestration multi-agent systems benchmarks 2026",
  "LLM tool use JSON schema validation event loop latency optimization",
  "RAG vector search hybrid retrieval reranking context compression 2026",
  "Next.js 16 AI SDK streaming UI agentic workflows React 19",
  "evaluation frameworks for LLMs hallucination detection production benchmarks",
  "agentic workflow patterns reflection routing state machines LangGraph Mastra",
];

// ── Helpers ──────────────────────────────────────────────────────────────────
function getExistingSlugs() {
  const postsDir = path.join(process.cwd(), "content/posts");
  const slugs = new Set();

  function scan(dir) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) scan(full);
      else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
        const content = fs.readFileSync(full, "utf8");
        const match = content.match(/slug:\s*["']?([^"'\r\n]+)/);
        if (match) slugs.add(match[1].trim());
        slugs.add(entry.name.replace(/\.mdx?$/, ""));
      }
    }
  }

  scan(postsDir);
  return slugs;
}

// Generate an elegant SVG editorial cover adhering to IMAGE_PROMPT.md
function generateEditorialCoverSvg(title, category) {
  // Hash title for stable abstract geometric variation
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
    hash |= 0;
  }
  const h = Math.abs(hash);

  const cx1 = 400 + (h % 200);
  const cy1 = 260 + ((h >> 2) % 120);
  const cx2 = 700 + ((h >> 4) % 240);
  const cy2 = 360 + ((h >> 6) % 140);
  const cx3 = 560 + ((h >> 8) % 180);
  const cy3 = 180 + ((h >> 10) % 100);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="50%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
    <linearGradient id="accentGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#1D4ED8" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="accentGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#2563EB" stop-opacity="0.8"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#F8FAFC" stop-opacity="0.85"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="32" flood-color="#0F172A" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0F172A" flood-opacity="0.04"/>
    </filter>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60" result="blur"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="675" fill="url(#bgGrad)"/>

  <!-- Subtle Studio Ambient Glow -->
  <circle cx="${cx1}" cy="${cy1}" r="280" fill="#93C5FD" opacity="0.35" filter="url(#glow)"/>
  <circle cx="${cx2}" cy="${cy2}" r="320" fill="#C7D2FE" opacity="0.25" filter="url(#glow)"/>

  <!-- Subtle Minimal Grid Lines -->
  <g stroke="#CBD5E1" stroke-width="1" opacity="0.35" stroke-dasharray="4 8">
    <line x1="120" y1="0" x2="120" y2="675"/>
    <line x1="360" y1="0" x2="360" y2="675"/>
    <line x1="600" y1="0" x2="600" y2="675"/>
    <line x1="840" y1="0" x2="840" y2="675"/>
    <line x1="1080" y1="0" x2="1080" y2="675"/>
    <line x1="0" y1="135" x2="1200" y2="135"/>
    <line x1="0" y1="337" x2="1200" y2="337"/>
    <line x1="0" y1="540" x2="1200" y2="540"/>
  </g>

  <!-- Central Architectural 3D Isometric Elements -->
  <g filter="url(#softShadow)">
    <!-- Base Platform Layer -->
    <polygon points="600,160 960,340 600,520 240,340" fill="url(#cardGrad)" stroke="#E2E8F0" stroke-width="2"/>
    <!-- Depth Face Left -->
    <polygon points="240,340 600,520 600,545 240,365" fill="#CBD5E1" opacity="0.7"/>
    <!-- Depth Face Right -->
    <polygon points="600,520 960,340 960,365 600,545" fill="#94A3B8" opacity="0.7"/>

    <!-- Dynamic Architectural Nodes -->
    <circle cx="${cx3}" cy="${cy3}" r="36" fill="url(#accentGrad1)"/>
    <circle cx="${cx1}" cy="${cy1}" r="24" fill="url(#accentGrad2)"/>
    <circle cx="${cx2}" cy="${cy2}" r="28" fill="url(#accentGrad1)"/>

    <!-- Interconnecting Topology Vectors -->
    <line x1="${cx3}" y1="${cy3}" x2="${cx1}" y2="${cy1}" stroke="#3B82F6" stroke-width="3" stroke-linecap="round" stroke-dasharray="6 6"/>
    <line x1="${cx3}" y1="${cy3}" x2="${cx2}" y2="${cy2}" stroke="#2563EB" stroke-width="3" stroke-linecap="round"/>
    <line x1="${cx1}" y1="${cy1}" x2="${cx2}" y2="${cy2}" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-dasharray="4 4"/>
  </g>
</svg>`;
}

async function generateAICoverImage(title, category) {
  try {
    console.log(`[Azure AI Image] Generating 1536x1024 editorial image with ${IMAGE_MODEL}...`);

    const visualPrompt = `Professional, clean, minimalist modern technology editorial illustration representing the engineering concept: "${title}".
Abstract 3D architectural systems, nodes, pipelines, and layered data structures.
Soft neutral background, predominantly light gray and white with subtle cool blue accents.
Soft studio lighting, realistic materials, subtle depth, shadows, and ambient occlusion.
Wide landscape composition.
NO TEXT, NO LETTERS, NO WORDS, NO NUMBERS, NO LOGOS, NO WATERMARKS UNDER ANY CIRCUMSTANCES.`;

    const endpoint = `https://invest-resource.openai.azure.com/openai/deployments/${IMAGE_MODEL}/images/generations?api-version=2024-02-01`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": AZURE_KEY,
      },
      body: JSON.stringify({
        prompt: visualPrompt,
        n: 1,
        size: "1536x1024",
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[Azure Image Warning]: ${errText}. Falling back to SVG vector engine.`);
      return null;
    }

    const data = await res.json();
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) return null;

    return Buffer.from(b64, "base64");
  } catch (err) {
    console.warn(`[Azure Image Error]: ${err.message}. Falling back to SVG vector engine.`);
    return null;
  }
}

async function uploadCoverToR2(slug, title, category) {
  try {
    // 1. Try Azure AI image generation first (gpt-image-1-mini)
    const pngBuffer = await generateAICoverImage(title, category);

    if (pngBuffer) {
      const key = `posts/${slug}.png`;
      await s3.send(
        new PutObjectCommand({
          Bucket: R2_BUCKET,
          Key: key,
          Body: pngBuffer,
          ContentType: "image/png",
          CacheControl: "public, max-age=31536000, immutable",
        })
      );
      const publicUrl = `${R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
      console.log(`[R2] AI-generated PNG cover successfully uploaded: ${publicUrl}`);
      return publicUrl;
    }

    // 2. Fallback to SVG engine if needed
    const svgContent = generateEditorialCoverSvg(title, category);
    const key = `posts/${slug}.svg`;

    await s3.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: Buffer.from(svgContent, "utf8"),
        ContentType: "image/svg+xml",
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    const publicUrl = `${R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`;
    console.log(`[R2] Vector SVG cover uploaded: ${publicUrl}`);
    return publicUrl;
  } catch (err) {
    console.warn(`[R2 Upload Failed]: ${err.message}. Using fallback gradient.`);
    return "/hero.png";
  }
}

// ── Main Generation Pipeline ──────────────────────────────────────────────────
async function run() {
  console.log("=== SIDHYA Blog: Autonomous Content Engine ===");

  if (!AZURE_KEY) throw new Error("Missing AZURE_OPENAI_API_KEY");
  if (!TAVILY_KEY) throw new Error("Missing TAVILY_API_KEY");

  const existingSlugs = getExistingSlugs();
  console.log(`[Scanner] Loaded ${existingSlugs.size} existing post slugs for deduplication.`);

  // 1. Tavily Research
  const seedTopic = RESEARCH_TOPICS[Math.floor(Math.random() * RESEARCH_TOPICS.length)];
  console.log(`[Tavily] Researching topic: "${seedTopic}"...`);

  const tavilyClient = tavily({ apiKey: TAVILY_KEY });
  const searchResults = await tavilyClient.search(seedTopic, {
    searchDepth: "advanced",
    maxResults: 6,
  });

  const researchContext = searchResults.results
    .map((r) => `Title: ${r.title}\nURL: ${r.url}\nSummary: ${r.content}`)
    .join("\n\n---\n\n");

  console.log(`[Tavily] Gathered ${searchResults.results.length} technical sources.`);

  // 2. Draft Post via Azure OpenAI gpt-5-mini
  console.log(`[Azure AI] Generating full MDX post with ${MODEL_NAME}...`);

  const today = new Date().toISOString().split("T")[0];

  const systemPrompt = `You are a Principal AI Systems Architect and Lead Technical Writer for SIDHYA Blog (https://sidhya.studio).
Your audience consists of Senior Software Engineers, AI Researchers, and CTOs.

STRICT EDITORIAL RULES (FROM PROMPT.md):
1. ZERO AI Conversational Fluff: Do NOT write "In today's fast-paced world...", "Welcome to this blog", or rhetorical questions. Start directly with the architectural challenge and technical solution.
2. Voice & Tone: Stripe/Vercel Engineering authority.
3. Every post MUST include:
   - Frontmatter (YAML) with:
     title: "..."
     description: "..." (MUST BE EXACTLY 140-160 characters long)
     slug: "kebab-case-unique-slug"
     date: "${today}"
     author: "Asutosh Sidhya"
     category: "AI" (or "Development" | "Tools")
     tags: ["Tag1", "Tag2", "Tag3", "Tag4"]
     featured: false
     draft: false
   - At least 1 Mermaid diagram (\`\`\`mermaid) flowchart or sequence diagram.
   - At least 1 comparison table with concrete benchmarks, memory, latency, or throughput metrics.
   - Production-ready typed TypeScript or Python code blocks (fully typed, no pseudo-code).
   - GitHub-style alert callouts (> [!NOTE], > [!TIP], > [!IMPORTANT]).
   - Practical, reproducible implementation steps.

4. Slugs to AVOID (already exist): ${Array.from(existingSlugs).slice(0, 30).join(", ")}.

OUTPUT FORMAT: Output ONLY the complete raw MDX file starting with --- and ending with the final markdown section. Do NOT wrap in outer \`\`\`mdx code fences.`;

  const userPrompt = `Using the following research findings from today's technical web releases, write a comprehensive, deep-dive technical article:

RESEARCH CONTEXT:
${researchContext}

Ensure the post has an authoritative title, exactly 140-160 characters in description, 1 Mermaid diagram, 1 comparison table, typed code, and alert callouts.`;

  const response = await fetch(`${AZURE_ENDPOINT.replace(/\/$/, "")}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": AZURE_KEY,
    },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      reasoning_effort: "low",
      max_completion_tokens: 8000,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Azure API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  let mdxContent = data.choices?.[0]?.message?.content?.trim();

  if (!mdxContent) throw new Error("Empty response from Azure OpenAI");

  // Strip accidental outer code fences
  mdxContent = mdxContent.replace(/^```(mdx|markdown)?\s*\n/i, "").replace(/\n```\s*$/i, "");

  // 3. Extract Frontmatter metadata
  const titleMatch = mdxContent.match(/title:\s*["']([^"']+)["']/);
  const slugMatch = mdxContent.match(/slug:\s*["']([^"']+)["']/);
  const categoryMatch = mdxContent.match(/category:\s*["']([^"']+)["']/);

  const title = titleMatch ? titleMatch[1] : "Advanced AI Engineering";
  let slug = slugMatch ? slugMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const category = categoryMatch ? categoryMatch[1] : "AI";

  // Prevent collision
  if (existingSlugs.has(slug)) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
    mdxContent = mdxContent.replace(/slug:\s*["'][^"']+["']/, `slug: "${slug}"`);
  }

  console.log(`[Article Generated] "${title}" (${slug})`);

  // 4. Generate & Upload Cover Image to Cloudflare R2
  console.log(`[R2] Generating and uploading cover image for: ${slug}...`);
  const coverUrl = await uploadCoverToR2(slug, title, category);

  // Inject cover URL into frontmatter
  if (mdxContent.includes("cover:")) {
    mdxContent = mdxContent.replace(/cover:\s*["'][^"']*["']/, `cover: "${coverUrl}"`);
  } else {
    mdxContent = mdxContent.replace(/---\s*\n/, `---\ncover: "${coverUrl}"\n`);
  }

  // 5. Save to content/posts/
  const targetDir = path.join(process.cwd(), "content/posts/ai-engineering");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, `${slug}.mdx`);
  fs.writeFileSync(filePath, mdxContent, "utf8");

  console.log(`\n🎉 SUCCESS! Article saved to:\n${filePath}`);
  console.log(`Cover Image URL:\n${coverUrl}`);
  return { slug, title, filePath, coverUrl };
}

run().catch((err) => {
  console.error("FATAL ERROR in auto-publish:", err);
  process.exit(1);
});
