# Known issues (keep this file current)

Updated: 2025-12-21

## 🔴 Critical (blocks shipping or QA)
- **Build environment mismatch**: Next.js 16 requires Node `>= 20.9.0`; builds fail on Node 18. Fix by standardizing Node in CI/dev (add `.nvmrc`/Volta or update build runner).
- **Chrome QA on WSL**: Claude Code `/chrome` integration does not support WSL. Run Claude Code on the host OS for visual QA.

## 🟠 High (regression risk)
- **Brand palette drift**: code still contains legacy colors (`#00C9FF`, `#4A69E2`, a few `#D4AF37`). Do not introduce new instances; converge to canonical palette from `.claude/memory/state.md`.
- **Docs “truth” drift**: some docs/templates still reference dark/gold patterns and can mislead future edits (treat as legacy only).

## 🟡 Medium (cleanup / maintenance)
- **Navigation docs outdated**: `capture-client-site/src/components/navigation/README.md` still describes gold/dark tokens.

## 🟢 Low (nice-to-have)
- **Social handles**: ensure claimed/active social handles match what the site asserts in metadata/schema.

## ✅ Recently addressed (2025-12-21)
- Switched visual QA instructions to Claude Code `/chrome` (removed Chrome MCP references) in `.claude/rules/50-testing.md`, `.claude/agents/*`, `.claude/commands/*`.
- Removed schema/name confusion by renaming the duplicate SoftwareApplication helper in `capture-client-site/src/lib/advanced-schemas.ts`.
- Removed unused files `capture-client-site/src/config/global-schema.json` and `capture-client-site/src/lib/iconMap.tsx`.
