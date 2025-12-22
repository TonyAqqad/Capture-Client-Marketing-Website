---
---

# Ignored Paths (do not reference)

## Archived Legacy Content

**NEVER read or reference files in `docs/_archive/**`**

This folder contains deprecated documentation that will mislead you:
- Outdated design systems (gold theme, dark mode)
- Old patch instructions (drifted line numbers)
- Legacy audit scripts (replaced by `/chrome`)
- Incorrect contact info

See `docs/_archive/DEPRECATED.md` for details.

## Current Source of Truth

Always use these instead:
- `.claude/CLAUDE.md` - Main instructions
- `.claude/memory/state.md` - Project state
- `.claude/rules/*.md` - Active rules
- `capture-client-site/src/**` - Actual code

## Design System Facts

Current (correct):
- **Theme**: Light only (no dark mode)
- **Font**: Inter
- **Colors**: Blue/cyan gradients (from-blue-600 to-cyan-500)
- **Phone**: 865-346-6111
- **Domain**: captureclient.com

Deprecated (ignore if found):
- Gold/amber colors (#D4AF37)
- Syne/Poppins fonts
- Dark backgrounds (bg-slate-900)
- 865-346-3339 (old phone)
- captureclient.net (old domain)
