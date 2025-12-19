---
name: frontend-aesthetics
description: Project-specific UI/UX guardrails for Capture Client. Use whenever changing UI, layout, motion, or page sections.
---

# Capture Client UI/UX Guardrails (anti "AI slop")

This project uses a **LIGHT THEME** design system. Do not reinvent it or introduce dark patterns.

## Typography (do not change fonts)
- Body: Inter (`--font-inter`)
- Headlines: Bricolage Grotesque (`--font-bricolage-grotesque`)
- Quotes/accents: Playfair Display (`--font-playfair`)
- Use strong weight contrast (200 ↔ 800) and clear hierarchy.

## Color (LIGHT THEME - stay on brand)
- Backgrounds: `bg-white`, `bg-slate-50`, `bg-gray-50`
- Text: `text-slate-900` (headings), `text-slate-600` (body), `text-slate-500` (muted)
- Primary CTA: Blue gradient (`bg-gradient-to-r from-blue-600 to-cyan-500`)
- Secondary buttons: `bg-white border border-slate-200 text-slate-700`
- Cards: `bg-white border border-slate-200` or light glass `bg-white/70 backdrop-blur-xl border-slate-200/60`
- Avoid random Tailwind colors and hardcoded hex values.

## NEVER USE (dark theme artifacts)
- Dark backgrounds: `bg-slate-900`, `bg-black`, `#030303`, `bg-background-dark`
- Dark glass classes: `.glass`, `.glass-premium`, `.glass-card`
- Dark button classes: `btn-gold`, `btn-ghost`
- White text on dark: `text-white`, `text-white/80`

## Layout (consistency > novelty)
- Use `container-custom` + standard responsive padding (`px-4 sm:px-6 lg:px-8`).
- Use existing patterns/components before creating anything new.
- Keep mobile-first layouts (`flex-col md:flex-row`, responsive grids).

## Motion (performance + consistency)
- Import motion from `@/lib/motion` (never directly from `framer-motion`).
- Always include `viewport={{ once: true }}` on scroll animations.
- Prefer subtle, purposeful motion; avoid heavy always-on animations.

## Don'ts
- Don't introduce new fonts, new button styles, or new glass styles.
- Don't change `src/components/ui/**`, global CSS, or Tailwind config without explicit approval.
- Don't revert to dark theme styling.
