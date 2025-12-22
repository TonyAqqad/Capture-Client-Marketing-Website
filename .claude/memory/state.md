# State (keep this file small)

## Current reality
- Deployable app root: `capture-client-site/` (Next.js App Router)
- Canonical domain: `https://captureclient.com` (no `www`)
- Primary phone: `865-346-6111` (`tel:865-346-6111`)
- Build/runtime requirement: Node.js `>= 20.9.0` (Next.js 16)

## 🚨 Light theme standard (DO NOT REVERT)
- Backgrounds: `bg-white`, `bg-slate-50`, `bg-gray-50`
- Text: `text-slate-900` (headings), `text-slate-600` (body), `text-slate-500` (muted)
- Cards: `bg-white border border-slate-200` or light glass `bg-white/70 backdrop-blur-xl border-slate-200/60`
- Buttons: `bg-gradient-to-r from-blue-600 to-cyan-500` (primary), `bg-white border-slate-200` (secondary)

Never use:
- Dark backgrounds (`bg-slate-900`, `bg-black`, `#030303`)
- Dark glass (`.glass`, `.glass-premium`, `.glass-card`)
- Legacy buttons (`btn-gold`, `btn-ghost`)
- `dark:` Tailwind prefixes (site is light-only)

## Brand colors (canonical)
- Blue: `#2563EB` (primary)
- Cyan: `#17B4EF` (accent)
- Dark navy: `#0F172A` (secondary text / “CLIENT”)

## Tooling / automation (source of truth)
- Visual QA: Claude Code Chrome integration (`claude --chrome`, then `/chrome`)
- External research/scraping: Bright Data MCP (`mcp__brightdata__*`) via `API_TOKEN` env var (never commit tokens)
- Keep these separate: `/chrome` for `http://localhost:3000`, Bright Data for external URLs
- Pre-commit hooks: `.claude/settings.local.json` (typecheck + build before commits)

## Orchestration (2025-12-21)
- **Agents**: code-searcher, site-auditor, batch-fixer, test-runner, memory-sync, component-finder, schema-builder, integration-auditor
- **Commands**: audit-page, fix-page, new-page, quality-gate, sync-memory, check-palette, audit-integrations, mobile-frontend
- **Skills**: `/frontend-design` (UI/UX guardrails, light theme)
- **Memory**: state.md (current), progress.md (recent), progress-archive.md (>7 days), component-inventory.md (80+ components)
- **Archive**: `docs/_archive/` (legacy docs - DO NOT USE, see `.claude/rules/05-ignore-paths.md`)

## Known drift (don’t regress)
- Some code/docs still contain legacy colors (`#00C9FF`, `#4A69E2`, `#D4AF37`). Don’t introduce new instances; converge toward the canonical palette above.
- Some archived templates still describe dark/gold styling. Treat as legacy only.

## Production Readiness Push (2025-12-22)
Final push to get from 75% → 95%+ production-ready. **All P0/P1 issues resolved.**

### Completed
- ✅ 32+ location JSON files: Fixed field names (`state_abbr`, `page_title`, `h1_heading`, etc.)
- ✅ 3 package JSON files: Fixed `seo.title` → `seo.page_title`
- ✅ 3 CTA contrast fixes: `text-black` → `text-white` (WCAG AA compliance)
- ✅ 6 favicon/PWA icons generated from SVG source
- ✅ Homepage schema deduplication (removed inline WebSite + SoftwareApplication)
- ✅ JSON-LD added to `/pricing/[slug]` (Product, Breadcrumb, FAQ schemas)
- ✅ JSON-LD added to `/[slug]` national pages (Service, Breadcrumb, FAQ schemas)
- ✅ Lighthouse optimizations: LeadConnector lazy load, font reduction (16→8 weights)
- ✅ CSS cleanup: 55+ unused classes removed (~600 lines, ~12KB savings)
- ✅ CLS fixes: Header spacing, logo dimensions, animation cleanup (target <0.1)

### Remaining Optimizations (non-blocking)
- Performance: LCP 8-14s (target <2.5s) - heavy component lazy loading
- Content: 69 integrations missing howItWorks, 6 industries missing FAQs
- SEO: /pricing missing from sitemap, Search Console verification

## Where details live
- Progress history: `.claude/memory/progress.md`
- Detailed learnings: `.claude/memory/learnings.md`
- Known issues: `.claude/memory/known-issues.md`
