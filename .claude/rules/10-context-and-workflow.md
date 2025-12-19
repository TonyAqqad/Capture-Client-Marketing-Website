---
---

# Context & Workflow (keep sessions long)

## Default workflow
1. Start in **Plan Mode** for exploration and planning.
2. Use subagents for search/audit so the main thread stays clean.
3. Implement in small batches; validate frequently.

## Context hygiene
- Use `/context` when a session starts to feel “full”.
- Use `/compact` at milestones with a short focus instruction.
- Keep durable state in `@.claude/memory/state.md` instead of in chat.
- For parallel work, use `git worktree` (one task per worktree).

## Subagents (project)
- Use `code-searcher` for multi-file discovery.
- Use `site-auditor` for UI/UX + SEO audits (read-only).
- Use `batch-fixer` for repetitive fixes across many files.
- Use `test-runner` to run typecheck/build/tests and summarize results.
- Use `memory-sync` at milestones to update `state.md` + logs.
