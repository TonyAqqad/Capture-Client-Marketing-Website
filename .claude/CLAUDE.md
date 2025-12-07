# Capture Client Website - Claude Code Instructions

## ⚠️ READ THIS FIRST
You are working on a 200+ page Next.js marketing website that is 65% complete.
The owner (Max) is NOT a developer. Explain technical concepts simply.
There are inconsistencies - your job is to FIX them, not add more.

## Project Context
- **Site**: captureclientai.net - AI voice agent marketing site
- **Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Status**: ~65% complete, many inconsistencies to resolve
- **Goal**: Finish quickly with quality, don't break existing work
- **Project root (code)**: `capture-client-site/` (run commands and searches here)

## Memory Bank (READ THESE)
@.claude/memory/project-brief.md
@.claude/memory/architecture.md
@.claude/memory/patterns.md
@.claude/memory/progress.md
@.claude/memory/learnings.md
@.claude/memory/known-issues.md

## Subagents (Always Available)

| Agent                | Model                      | Purpose                          | Trigger Example                     |
|----------------------|----------------------------|----------------------------------|-------------------------------------|
| `code-searcher`      | `claude-sonnet-4-5-20250929` | Find patterns/components fast    | "Find all using glass-premium"      |
| `page-auditor`       | `claude-opus-4-5-20251101`   | Audit pages vs. patterns         | "Audit all industry pages"          |
| `batch-fixer`        | `claude-sonnet-4-5-20250929` | Same fix across many files       | "Add z-10 to all containers"        |
| `responsive-checker` | `claude-sonnet-4-5-20250929` | Mobile/desktop issues            | "Check responsive on services"      |
| `component-finder`   | `claude-opus-4-5-20251101`   | Find canonical components/dupes  | "Find all hero components"          |
| `seo-checker`        | `claude-sonnet-4-5-20250929` | SEO metadata sweep               | "Check SEO on service pages"        |
| `memory-sync`        | `claude-sonnet-4-5-20250929` | Update memory bank               | "End of session"                    |

**Models:** `Opus` = judgment tasks (audit, decisions) • `Sonnet` = execution • `Haiku` = validation (typecheck, build)

### Delegation
If a task matches an agent, spawn it via Task tool with the ACTION AGENT DIRECTIVE (read, change, verify, report). Subagents work in their own context.

### Automatic delegation rules
- Search >3 files → code-searcher
- Audit >1 page → page-auditor
- Same fix on >2 files → batch-fixer
- Mobile/responsive issues → responsive-checker
- Find/choose components → component-finder
- SEO across multiple pages → seo-checker
- Session end/milestone → memory-sync

### Parallel vs Sequential
**Parallel OK (read-only):** code-searcher, page-auditor, responsive-checker, seo-checker, component-finder
**Must be sequential:** batch-fixer (after discovery), memory-sync (always last)
**batch-fixer parallel rule:** Can parallelize if fixing *different folders* (e.g., /industries/* and /services/*). Never parallel on same files.

### Execution order
```
1. DISCOVER (parallel)  →  code-searcher, responsive-checker, seo-checker
2. REVIEW              →  present findings to user
3. FIX (sequential)    →  batch-fixer → typecheck (repeat per fix type)
4. VALIDATE            →  pnpm build
5. DOCUMENT            →  memory-sync
```

### Task → agent mapping
- "Find all… / Search for…" → code-searcher
- "Audit… / Check pages…" → page-auditor
- "Fix all… / Update every…" → batch-fixer
- "Mobile issues / Responsive…" → responsive-checker
- "Is there a component for… / Duplicate…" → component-finder
- "SEO… / Metadata…" → seo-checker
- "Update memory / Save progress" → memory-sync

## 🚨 CRITICAL RULES
**Process hygiene:** Only start dev servers when needed, and stop them when done (Ctrl+C/kill). If multiple are running, clean up with `pkill -f "pnpm dev|next dev|node .*dev"` from repo root.

### Before ANY Change:
1. **Read the pattern files** - Check @.claude/memory/patterns.md
2. **Check if component exists** - Search before creating new ones
3. **Test mobile AND desktop** - Both viewports, always
4. **Run typecheck** - `cd capture-client-site && pnpm typecheck` after code changes


### NEVER Do This:
- Create new components if similar ones exist (causes duplicates)
- Modify files in `components/ui/` without explicit approval
- Change global CSS files (`globals.css`, `critical.css`)
- Use different styling patterns than existing pages
- Skip mobile responsiveness checks

### ALWAYS Do This:
- Follow patterns from the "Gold Standard" pages (see patterns.md)
- Use existing utility classes (`glass-premium`, `btn-gold`, etc.)
- Import icons from `lucide-react` only
- Import motion from `@/lib/motion` (NOT directly from framer-motion)
- Add proper metadata to every page

## Commands
```bash
cd capture-client-site && pnpm dev       # Start dev server (http://localhost:3000)
cd capture-client-site && pnpm build     # Production build - MUST pass before commit
cd capture-client-site && pnpm typecheck # TypeScript validation - run after every change
cd capture-client-site && pnpm lint      # ESLint check
```
After running dev/build, stop any Node.js processes (Ctrl+C or kill the process) so nothing is left running.

## Directory Structure (Know Your Zones)

### ✅ SAFE TO MODIFY
- `capture-client-site/src/app/*` - All route pages
- `capture-client-site/src/components/sections/*` - Section components
- `capture-client-site/src/data/*` - JSON data files
- `capture-client-site/src/components/navigation/*` - Nav components

### ⚠️ MODIFY WITH CAUTION (check patterns.md first)
- `capture-client-site/src/components/*` - General components
- `capture-client-site/src/lib/*` - Utility functions

### 🚫 DO NOT MODIFY (without explicit approval)
- `capture-client-site/src/components/ui/*` - Design system primitives
- `capture-client-site/src/app/globals.css` - Global styles
- `capture-client-site/src/app/critical.css` - Critical CSS
- `capture-client-site/tailwind.config.ts` - Tailwind config
- `capture-client-site/middleware.ts` - Middleware

## Gold Standard Pages (COPY THESE PATTERNS)
These pages work well - use them as templates:

1. **Home Services** - `/industries/home-services`
   - File: `capture-client-site/src/app/industries/home-services/page.tsx`
   - Pattern: Industry page with ROI calculator, trade tabs, testimonials

2. **Legal** - `/industries/legal`  
   - File: `capture-client-site/src/app/industries/legal/LegalIndustryClient.tsx`
   - Pattern: Practice area tabs, urgency badges, software integrations

3. **Homepage** - `/`
   - File: `capture-client-site/src/app/page.tsx`
   - Pattern: Hero with aurora, problem/solution, features

## Key Styling Classes (USE THESE)
```tsx
// Cards & Containers
glass-premium    // Glassmorphism card with blur
glass-card       // Simple glass effect
glass            // Basic transparency

// Buttons
btn-gold         // Primary gold CTA
btn-ghost        // Secondary transparent
btn-glass        // Glass button variant

// Text Gradients
text-gradient-gold-cyan    // Gold to cyan gradient
text-gradient-premium      // Premium gradient

// Backgrounds
bg-background-dark    // Main dark background
bg-background         // Lighter sections
bg-aurora-animated    // Animated aurora effect
bg-mesh               // Mesh gradient pattern
bg-mesh-premium       // Premium mesh pattern

// Sections
section              // Standard section padding
container-custom     // Constrained width container
```

## Motion Patterns
```tsx
// CORRECT - Import from lib
import { motion } from "@/lib/motion";

// Standard animation pattern
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>

// For staggered children
transition={{ delay: index * 0.1 }}
```

## Page Structure Template
```tsx
// Server Component (default) - page.tsx
import { Metadata } from "next";
import ClientComponent from "./ClientComponent";

export const metadata: Metadata = {
  title: "Page Title | Capture Client",
  description: "150-160 character description",
  // ... full metadata
};

export default function Page() {
  return <ClientComponent />;
}

// Client Component - when interactivity needed
"use client";
import { motion } from "@/lib/motion";
import Link from "next/link";
// ... component code
```

## Common Issues & Fixes

### Text Overlap
- Check `z-index` values
- Use `relative z-10` on content over backgrounds
- Ensure `overflow-hidden` on parent containers

### Mobile Layout Breaking
- Always use responsive classes: `flex-col md:flex-row`
- Check padding: `px-4 sm:px-6 lg:px-8`
- Test at 375px viewport width

### Inconsistent Styling
- Search for existing component first
- Copy class patterns from Gold Standard pages
- Don't invent new color values

## Quality Gate (Before Commit)
1. `cd capture-client-site && pnpm typecheck` - Must pass
2. `cd capture-client-site && pnpm build` - Must complete successfully  
3. Check page at 375px (mobile) using Playwright subagent
4. Check page at 1440px (desktop) using Playwright subagent
5. Verify no console errors
6. Update @.claude/memory/progress.md if completing items

## Communication Style
- Explain what you're doing in simple terms
- Warn before making changes to multiple files
- If you find inconsistencies, list them and ask which to fix
- When in doubt, ask Max for clarification

## Session End
At the end of each session, offer to update the memory bank:
- New patterns discovered
- Bugs fixed and their solutions
- Progress on roadmap items
- Architecture decisions made

Run `/project:sync-memory` or use the `memory-sync` agent.
