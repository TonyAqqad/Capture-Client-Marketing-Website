# Learnings (lean)
- Always add `relative z-10` over backgrounds; use `overflow-hidden` on parents.
- Responsive defaults: `flex-col md:flex-row`, `grid md:grid-cols-2 lg:grid-cols-3`, `px-4 sm:px-6 lg:px-8`, buttons `w-full sm:w-auto`.
- Motion import must be `@/lib/motion`; include `viewport={{ once: true }}`.
- Standard components/classes first; avoid new button/glass styles; no hardcoded colors.
- Phone number: 865-346-3339 everywhere.
- Icons: use lucide-react; convert remaining Material Icons.
- SEO: keep server/client split; metadata + canonical + JSON-LD on pages; titles <60 chars, descriptions ~150-160.
- Batch work: discovery agents in parallel; batch-fixer sequential per folder; verify with typecheck/build and quick audits.
- **CSS Architecture Decision** (2025-12-07): Keep globals.css AND globals-mobile-optimized.css as separate files. globals.css = design system (standard rules), globals-mobile-optimized.css = performance overrides (uses !important for mobile-first loading). They serve different purposes and should remain separate.
