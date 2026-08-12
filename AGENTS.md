<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SIDHYA Blog — Project & Content Guidelines

## 1. Content & Writing Directives
- **Zero AI Conversational Fluff**: No filler introductions ("In today's fast-paced world..."). Write with Stripe/Vercel Engineering authority.
- **Production-Ready Code**: All code examples in MDX must be fully typed (TypeScript/Zod or Python/Pydantic).
- **Rich MDX Artifacts**: Every article must include at least 1 Mermaid diagram (````mermaid`), 1 comparison table, GitHub-style alert callouts (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`), and cross-links to related posts/playlists.

## 2. File & Directory Conventions
- **Blog Posts**: `content/posts/<category-folder>/<slug>.mdx`
- **Playlists / Series**: `content/playlists/<playlist-slug>.mdx`
- **Images**: `/public/posts/<cover-name>.png` (fallback handled by `SafeImage` with dynamic gradient & `sr-only` accessibility text).

## 3. SEO Standards
- Canonical base URL: `https://sidhya.studio`
- Meta description length: 140–160 characters.
- Structured Data: `BlogPosting`, `Course`, `WebSite`, `BreadcrumbList`, and `CollectionPage` JSON-LD schemas.
