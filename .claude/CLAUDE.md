# Capture Client Website — Claude Code

You're working on a large Next.js marketing site (230+ pages). Keep instructions accurate, keep context lean, and finish tasks end-to-end.

## Read First
@.claude/memory/state.md

---

## Quick Commands

### Page Workflows
- `/audit-page /route` - Audit any page (read-only)
- `/fix-page /route` - Fix issues on a page
- `/new-page /route` - Create new page from patterns
- `/quality-gate` - Pre-commit validation

### Specialized
- `/check-palette` - Find legacy colors and dark theme remnants
- `/audit-integrations` - Batch audit all integration pages
- `/mobile-frontend /route` - Mobile optimization audit
- `/sync-memory` - Update memory at milestones

### Skills
- `/frontend-design` - Desktop UI patterns and component design
- `/mobile-frontend` - Mobile-first responsive optimization

---

## Orchestration Philosophy

1. **Main agent handles most work** - Use built-in Task tool for delegation
2. **Custom subagents for specialized patterns** - See Subagents section
3. **Hooks for deterministic validation** - Pre-commit checks run automatically
4. **Skills for domain knowledge** - Reusable context without agent overhead

---

## Hooks (Automatic)

Hooks run automatically via `.claude/settings.local.json`:
- **Pre-commit**: Validates `npm run typecheck` + `npm run build` before any commit
- **Edit logger**: Tracks all file changes for memory-sync

---

## Where the Real App Lives
- All deployable code is in `capture-client-site/`
- Run commands from that directory
- Archived reports live in `docs/_archive/` (not deployed)

---

## Subagents (Project)

### Discovery (Read-Only)
- `code-searcher` - Fast multi-file search
- `site-auditor` - UI/UX + SEO audits
- `component-finder` - Find existing components before creating new ones
- `integration-auditor` - Specialized for /integrations/* pages

### Writing
- `batch-fixer` - Apply same fix across many files
- `schema-builder` - Generate/validate JSON-LD schemas
- `memory-sync` - Update state.md + logs at milestones

### Validation
- `test-runner` - Run typecheck/build/tests

---

## NPM Commands (run inside `capture-client-site/`)
```bash
npm run dev        # Start dev server
npm run typecheck  # TypeScript validation
npm run lint       # ESLint checks
npm run build      # Production build
npm run format     # Prettier formatting
```

---

## Guardrails

### Protected Files (require explicit approval)
- `capture-client-site/src/components/ui/**`
- `capture-client-site/src/app/globals*.css`
- `tailwind.config.ts`

### Component Reuse
- **Always** use `component-finder` before creating new components
- 200+ existing components in `src/components/`

### Brand Constants
- Canonical domain: `https://captureclient.com` (no www)
- Primary phone: `865-346-6111`

---

## Session Management

- Start in **Plan Mode** for exploration
- Delegate multi-file discovery to subagents
- Use `/context` and `/compact` at milestones
- Store durable notes in `state.md` via `/sync-memory`
