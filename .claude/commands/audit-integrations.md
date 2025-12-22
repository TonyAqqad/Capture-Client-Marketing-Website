---
description: Batch audit all /integrations/* pages for consistency
---

# Audit Integrations Command

Batch audit all integration pages for visual, content, and SEO consistency.

## Purpose
Run a comprehensive audit across all `/integrations/[slug]` pages to ensure they follow the established patterns.

## Execution Steps

### 1. Discover All Integrations
```bash
# List all integration page files
ls capture-client-site/src/app/integrations/*/page.tsx
```

### 2. For Each Integration, Check:

#### Visual Consistency
- IntegrationFeatures cards use blue/cyan theme
- Cards are equal-sized in 3-column grid
- Hero section follows standard layout
- CTA buttons use correct gradient

#### Content Consistency
- Integration name matches data file
- Category is accurate
- Feature list is populated
- Partner URL is valid

#### SEO Requirements
- Title format: "[Name] Integration | ..."
- Meta description: 150-160 chars
- Canonical URL present
- Schema markup valid

### 3. Use Integration Auditor Agent
Delegate detailed audits to `integration-auditor` agent for each page.

## Output Format

```markdown
## Integration Pages Audit Report

**Date**: [timestamp]
**Total Pages**: 25
**Pass**: 20
**Needs Attention**: 5

### Summary by Category

| Category | Pages | Pass | Issues |
|----------|-------|------|--------|
| CRM Systems | 8 | 7 | 1 |
| Scheduling | 5 | 5 | 0 |
| Phone Systems | 4 | 3 | 1 |
| Automation | 4 | 3 | 1 |
| All-in-One | 4 | 2 | 2 |

### Issues by Severity

#### P0 - Critical
| Integration | Issue |
|-------------|-------|
| salesforce | Feature cards using tan background |

#### P1 - High
| Integration | Issue |
|-------------|-------|
| hubspot | Meta description too short (89 chars) |

#### P2 - Medium
| Integration | Issue |
|-------------|-------|
| calendly | Partner URL returns 404 |

### Recommended Actions
1. Fix P0 issues immediately
2. Address P1 issues before next deployment
3. Schedule P2 issues for cleanup sprint
```

## Related Commands
- `/audit-page /integrations/[slug]` - Single page audit
- `/fix-page /integrations/[slug]` - Fix specific integration

## Reference
- Integration data: `capture-client-site/src/data/integrations.ts`
- Integration auditor: `@.claude/agents/integration-auditor.md`
- Feature component: `capture-client-site/src/components/integrations/IntegrationFeatures.tsx`
