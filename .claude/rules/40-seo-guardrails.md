---
paths: capture-client-site/src/{app,components,lib}/**/*.{ts,tsx}
---

# SEO guardrails

- Every indexable route must export `metadata` (or `generateMetadata`) with:
  - `title` (aim < 60 chars)
  - `description` (aim 150–160 chars)
  - `openGraph`, `twitter`, and `alternates.canonical`
- Canonicals must always use `https://captureclient.com/...` (no `www`, no `captureclientai.net`).
- Use existing JSON-LD helpers (`@/lib/seo-config` + `@/components/seo/JsonLd`) rather than inventing new schema patterns.
- If you change routes/content: verify `src/app/sitemap.ts` and `src/app/robots.ts` still match reality.
