# Learnings (lean)
- Always add `relative z-10` over backgrounds; use `overflow-hidden` on parents.
- Responsive defaults: `flex-col md:flex-row`, `grid md:grid-cols-2 lg:grid-cols-3`, `px-4 sm:px-6 lg:px-8`, buttons `w-full sm:w-auto`.
- Motion import must be `@/lib/motion`; include `viewport={{ once: true }}`.
- Standard components/classes first; avoid new button/glass styles; no hardcoded colors.
- Phone number: 865-346-3339 everywhere.
- Icons: use lucide-react only. Centralized mapping in `src/lib/icon-map.ts`.
- SEO: keep server/client split; metadata + canonical + JSON-LD on pages; titles <60 chars, descriptions ~150-160.
- Batch work: discovery agents in parallel; batch-fixer sequential per folder; verify with typecheck/build and quick audits.
- **Icon Serialization Pattern** (2025-12-07, Phase 4): In Next.js 14+, React components (like Lucide icons) cannot be passed directly from server to client components. Error: "Functions cannot be passed directly to Client Components". Fix: Pass icon NAME as string prop, then resolve to component inside the client component using an internal icon map. Example:
  ```tsx
  // Server: <IntegrationDetailHero categoryIcon="users" />
  // Client: const IconComponent = categoryIcons[categoryIcon] || null;
  ```
- **CSS Architecture Decision** (2025-12-07): Keep globals.css AND globals-mobile-optimized.css as separate files. globals.css = design system (standard rules), globals-mobile-optimized.css = performance overrides (uses !important for mobile-first loading). They serve different purposes and should remain separate.
- **Audit verification pattern** (2025-12-07, Phase 3): When running automated audits for unused imports, always verify removal candidates by checking actual usage in code. Tools like ts-prune can have false positives. Manual verification prevents accidentally removing imports that are used indirectly (e.g., via type inference, re-exports, or runtime-only usage).
