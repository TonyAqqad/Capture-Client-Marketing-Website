---
description: Run quality checks before committing changes
model: claude-haiku
---
model: claude-haiku-4-5-20251001
Run quality gate checks on the current changes.
## Automated Checks

### 1. TypeScript Check
```bash
cd capture-client-site && pnpm typecheck
```
**Must pass** - No TypeScript errors allowed.

### 2. Build Check
```bash
cd capture-client-site && pnpm build
```
**Must pass** - Build must complete successfully.

### 3. Lint Check
```bash
cd capture-client-site && pnpm audit
```
**Should pass** - Fix any linting errors.

## Manual Verification Checklist

Present this to the user:

```markdown
## Quality Gate Checklist

### Code Quality
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` completes successfully
- [ ] No console errors in browser

### Visual Quality (please verify)
- [ ] Page looks correct at **375px** (mobile)
- [ ] Page looks correct at **768px** (tablet)
- [ ] Page looks correct at **1440px** (desktop)
- [ ] No text overlap issues
- [ ] Buttons are clickable and styled correctly
- [ ] Images load properly

### Functionality
- [ ] All links work
- [ ] Forms submit correctly (if applicable)
- [ ] Animations play once on scroll
- [ ] No JavaScript errors in console

### SEO
- [ ] Page has title and description
- [ ] Heading hierarchy is correct (one H1)
- [ ] Images have alt text

### Consistency
- [ ] Styling matches other pages
- [ ] Using standard components
- [ ] Following patterns.md guidelines
```

## If Checks Fail

### TypeScript Errors
1. List all errors
2. Explain each error simply
3. Suggest fixes
4. Apply fixes with user approval

### Build Errors
1. Show the error output
2. Identify the cause
3. Fix the issue
4. Re-run build

### Visual Issues
1. Describe what's wrong
2. Identify the CSS/layout cause
3. Propose fix
4. Apply with user approval

## Report Format

```markdown
## Quality Gate Results

### Automated Checks
| Check | Status | Details |
|-------|--------|---------|
| TypeScript | ✅/❌ | {details} |
| Build | ✅/❌ | {details} |
| Lint | ✅/❌ | {details} |

### Result: PASS / FAIL

### Next Steps
{If PASS}: Ready to commit. Suggested commit message: "..."
{If FAIL}: Fix these issues before committing: ...
```

## After Passing

Suggest a commit message following conventional commits:

- `feat: add {feature}`
- `fix: resolve {issue}`
- `style: update {component} styling`
- `refactor: improve {area}`
- `docs: update {documentation}`

> After running these commands, ensure any Node.js processes are stopped (Ctrl+C/kill) so nothing stays running.
