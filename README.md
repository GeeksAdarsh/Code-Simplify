# DevToolbox

A free, fast collection of online developer tools (JSON, XML, YAML, CSV, SQL, security, text, and more) — inspired by sites like [CodeBeautify](https://codebeautify.org/), built to scale to hundreds of tools and millions of users.

## Tech Stack

- **Frontend:** Next.js 16 (App Router, TypeScript, Tailwind CSS v4). Every tool is a statically generated page (`generateStaticParams`) for maximum SEO and performance. Most tools run entirely client-side in the browser — no server round-trip, no data leaves the user's device.
- **Backend:** Java 17 + Spring Boot 3 (Maven). Reserved for tools that can't reasonably run in-browser (PDF processing, file conversions, OCR, etc.) — added incrementally as we build those tools.

## Project Structure

```
frontend/                    Next.js app
  src/
    app/
      page.tsx               Homepage
      categories/            "All tools" overview page
      [category]/            Category listing page (e.g. /json)
      [category]/[tool]/      Individual tool page (e.g. /json/formatter)
      sitemap.ts, robots.ts   SEO sitemap + robots.txt
    components/
      site-header.tsx, site-footer.tsx, tool-search.tsx
      tool-page-layout.tsx   Shared SEO layout for every tool page
      faq-section.tsx        FAQ block with JSON-LD structured data
      tools/                 Individual tool widgets (e.g. json-formatter-tool.tsx)
    config/
      tools.ts               Central registry: every category + tool (source of truth)
      tool-widgets.tsx       Maps "category/tool" slug -> interactive widget component
      tool-content.ts        Per-tool SEO content: how-to-use, features, FAQ

backend/                     Spring Boot API (Maven wrapper included, no local Maven needed)
  src/main/java/com/devtoolbox/backend/
    controller/              REST endpoints
    config/                  CORS config, etc.
```

## How Tools Get Added

`src/config/tools.ts` lists every planned tool with a `status` of `"live"` or `"soon"`. This drives the homepage, category pages, search, sitemap, and nav automatically — so the full site structure (200+ tool pages) already exists and is crawlable, even before every tool's functionality is built.

To ship a new tool:

1. Set its `status` to `"live"` in `tools.ts`.
2. Build the widget component under `components/tools/` and register it in `tool-widgets.tsx`.
3. Add SEO content (how-to-use steps, features, FAQ) in `tool-content.ts`.

The dynamic route `app/[category]/[tool]/page.tsx` handles everything else: metadata, breadcrumbs, layout, and related tools.

## Running Locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000.

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Runs on http://localhost:8080. The frontend proxies `/api/*` requests to the backend automatically in dev (see `frontend/next.config.ts`).

## Roadmap

1. ✅ Site scaffold, design system, and JSON Formatter (first live tool)
2. Remaining JSON tools (validator, minifier, diff, converters, etc.)
3. XML, YAML, CSV, SQL tool families
4. Security, IDs, text, numbers, regex tools
5. PDF & document tools (requires backend: merge/split/OCR/conversions)
6. Finance calculators
7. Ongoing: SEO content refinement, performance, analytics
