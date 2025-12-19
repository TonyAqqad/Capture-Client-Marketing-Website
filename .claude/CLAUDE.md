# Capture Client Website — Claude Code

You’re working on a large Next.js marketing site. Keep instructions accurate, keep context lean, and finish tasks end-to-end.

## Read first
@.claude/memory/state.md

## Where the real app lives
- All deployable code is in `capture-client-site/`.
- Run commands from that directory (this repo root also contains scripts/reports that are not deployed).
- Archived reports + legacy data live in `docs/_archive/` (kept out of model reads by default).

## How to keep sessions long
- Start in **Plan Mode** for exploration.
- Delegate multi-file discovery/audits to subagents so the main thread stays clean.
- Use `/context` and `/compact` at milestones; store durable notes in `state.md`.

## Subagents (project)
- `code-searcher`: fast multi-file discovery (read-only)
- `site-auditor`: UI/UX + SEO audit reports (read-only)
- `batch-fixer`: apply the same fix across many files (writes)
- `test-runner`: run typecheck/build/tests and summarize (bash)
- `memory-sync`: update `state.md` + logs at milestones

## Commands (run inside `capture-client-site/`)
```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Guardrails
- Don’t create new components if a similar one exists.
- Don’t edit `capture-client-site/src/components/ui/**`, global CSS, or Tailwind config without explicit approval.
- Canonical domain is `https://captureclient.com` and the primary phone is `865-346-6111`.
