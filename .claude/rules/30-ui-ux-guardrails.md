---
paths: capture-client-site/src/**/*.{ts,tsx,css}
---

# UI/UX guardrails

- Reuse existing components/patterns before creating new ones (avoid duplicates).
- Do not edit these without explicit approval:
  - `capture-client-site/src/components/ui/**`
  - `capture-client-site/src/app/globals*.css`
  - `capture-client-site/tailwind.config.ts`
- Motion: import from `@/lib/motion` (never directly from `framer-motion`).

## Standardized Color System (Light Theme)

This site uses a **light theme** with blue/cyan accents (Linear/Stripe aesthetic). Do NOT use dark theme colors.

### Buttons
- **Primary**: `bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25`
- **Secondary**: `bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 hover:border-slate-300`
- **Ghost**: `bg-white/70 border border-slate-200 text-slate-900 backdrop-blur-sm hover:bg-white hover:border-slate-300`

### Text Colors
- Headings: `text-slate-900`
- Body text: `text-slate-600` or `text-slate-700`
- Secondary/meta: `text-slate-500`
- Links/accents: `text-blue-600`

### Backgrounds
- Page: `bg-white`
- Sections: `bg-slate-50` or `bg-gradient-to-b from-white to-slate-50`
- Cards: `bg-white` or `bg-white/80 backdrop-blur-xl border border-slate-200`

### Borders
- Default: `border-slate-200`
- Hover: `border-slate-300`
- Accent: `border-blue-500/20`

### DO NOT USE (Legacy Dark Theme)
- `bg-slate-800`, `bg-slate-900`, `bg-gray-800`, `bg-gray-900`
- `text-white` on light backgrounds
- `text-foreground` (use explicit colors instead)
- `border-white/10`, `border-white/20` (these are for dark backgrounds)
- `bg-white/5`, `bg-white/10` (these are for dark backgrounds)
- Gold/amber colors (`btn-gold`, `text-amber-*`, `#D4AF37`)
- `dark:` Tailwind prefixes (site is light-only)
