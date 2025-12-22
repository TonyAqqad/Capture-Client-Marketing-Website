---
argument-hint: "[optional: path/to/scan]"
description: Find legacy colors and dark theme remnants in codebase
---

# Check Palette Command

Scan the codebase for legacy colors and dark theme patterns that don't match the current light theme standard.

## Scope
Default: `capture-client-site/src/`
Can be narrowed with argument: `/check-palette src/components/sections`

## Patterns to Find

### Dark Backgrounds (Critical)
```
bg-slate-900
bg-slate-950
bg-black
bg-gray-900
#030303
#0F172A (as background)
```

### Legacy Colors (Warning)
```
#00C9FF (old cyan)
#4A69E2 (old blue)
#D4AF37 (gold)
btn-gold
btn-ghost
```

### Dark Glass Effects (Critical)
```
.glass
.glass-premium
.glass-card
backdrop-blur with dark bg
```

### Dark Mode Prefixes (Remove)
```
dark:
```

## Canonical Replacements

| Legacy | Replace With |
|--------|--------------|
| `bg-slate-900` | `bg-white` or `bg-slate-50` |
| `bg-black` | `bg-white` |
| `#00C9FF` | `#17B4EF` (cyan-500 equivalent) |
| `#4A69E2` | `#2563EB` (blue-600) |
| `#D4AF37` | Remove or use `blue-600` |
| `.glass` | `bg-white/70 backdrop-blur-xl border-slate-200/60` |
| `dark:*` | Remove entirely |

## Output Format

```markdown
## Palette Audit Results

### Critical (Dark Theme)
| File | Line | Pattern | Suggestion |
|------|------|---------|------------|
| src/components/X.tsx | 45 | bg-slate-900 | Use bg-white |

### Warning (Legacy Colors)
| File | Line | Pattern | Suggestion |
|------|------|---------|------------|
| src/components/Y.tsx | 12 | #D4AF37 | Remove gold accent |

### Summary
- Critical: 3 files need dark→light conversion
- Warning: 5 files have legacy colors
- Total: 8 files to review

### Recommended Actions
1. Run `/fix-page` on critical files
2. Review warning files for context
```

## Execution

1. Use Grep to find each pattern
2. Aggregate results by severity
3. Provide file:line references
4. Suggest replacements from canonical palette

## Reference
- Light theme standard: `@.claude/memory/state.md`
- UI guardrails: `@.claude/rules/30-ui-ux-guardrails.md`
- Patterns: `@.claude/memory/patterns.md`
