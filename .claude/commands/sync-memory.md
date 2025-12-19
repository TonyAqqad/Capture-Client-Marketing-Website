---
description: Update memory bank files at end of session
model: sonnet
---
Update the memory bank with learnings from this session.

## What to Capture

Review the conversation and identify:

### 1. Progress Updates
**File (primary)**: @.claude/memory/state.md

- Update current priorities and “what’s true” (keep it short)

### 2. Progress Updates (historical, only if needed)
**File**: @.claude/memory/progress.md

- Pages completed or status changed
- Tasks finished from sprint list
- New known issues discovered

### 3. New Learnings
**File**: @.claude/memory/learnings.md

- Bugs fixed and how
- Gotchas discovered
- Patterns that worked well
- Mistakes to avoid

### 4. Pattern Updates
**File**: @.claude/memory/patterns.md

- New reusable patterns discovered
- Better ways to do existing patterns
- Anti-patterns to add

### 5. Project Brief Updates
**File**: @.claude/memory/project-brief.md

- Scope changes
- New requirements
- Updated priorities

## Update Process

### Step 1: Summarize Session
Create a summary of what was accomplished:

```markdown
## Session Summary

**Date**: [date]
**Duration**: ~[time]

### Completed
- Item 1
- Item 2

### Fixed
- Bug 1: [cause] → [fix]
- Bug 2: [cause] → [fix]

### Discovered
- Learning 1
- Learning 2

### Still Pending
- Item 1
- Item 2
```

### Step 2: Propose Updates

Show the user what will be updated:

```markdown
## Proposed Memory Bank Updates

### progress.md
- Move "X page" from 🟡 to ✅
- Add "Y issue" to Known Issues

### learnings.md
- Add new bug/fix: "Z issue"
- Add new gotcha: "A pattern"

### patterns.md
- [Usually no changes unless new patterns discovered]

Shall I apply these updates?
```

### Step 3: Apply Updates

With user approval:
1. Update each file
2. Add dates/timestamps where appropriate
3. Confirm completion

## Update Templates

### Progress.md - Task Complete
```markdown
| Date | Item | Notes |
|------|------|-------|
| YYYY-MM-DD | Completed X page | Fixed Y issues |
```

### Learnings.md - Bug Fix
```markdown
### {Bug Name}

**Problem**: Description of the bug
**Cause**: What caused it
**Fix**: How we fixed it
**Lesson**: What to remember
```


### Learnings.md - Gotcha
```markdown
| Date | Issue | Root Cause | Fix | Lesson |
|------|-------|------------|-----|--------|
| YYYY-MM-DD | Description | Cause | Fix | Lesson |
```

## Session End Checklist

- [ ] All changes committed or noted as pending
- [ ] progress.md reflects current state
- [ ] learnings.md captures any new fixes/gotchas
- [ ] User knows what's left to do next session
