---
description: Create a new marketing page following established patterns
argument-hint: [/route/path]
model: opus
---
Create a new page at the specified route: $ARGUMENTS

## Before Creating

1. **Read the patterns file**
   - Read @.claude/memory/patterns.md completely
   - Identify the closest Gold Standard page to copy from

2. **Check if page exists**
   - Search for existing page at this route
   - If exists, ask user if they want to modify instead

3. **Understand the page type**
   - Is this an industry page? Use `/industries/home-services` pattern
   - Is this a service page? Use `/services/*` pattern  
   - Is this a use case page? Use `/use-cases/*` pattern
   - Is this a location page? Check if it should use dynamic [slug] route

## Creation Steps

1. **Create the route folder**
   - Path: `src/app/{route}/`

2. **Create page.tsx (Server Component)**
   - Add complete Metadata (title, description, OG, Twitter, robots)
   - Import and render the client component

3. **Create {Name}Client.tsx (Client Component) if interactive**
   - Add `"use client"` directive
   - Import motion from `@/lib/motion`
   - Follow section structure from Gold Standard pages

4. **Optional: Create layout.tsx if needed**
   - For JSON-LD schemas
   - For section-specific layouts

## Required Structure

```
{route}/
├── page.tsx              # Server: metadata + imports client
├── {Name}Client.tsx      # Client: interactive content (if needed)
└── layout.tsx            # Optional: JSON-LD, shared layout
```

## Checklist Before Finishing

- [ ] Complete metadata with all fields
- [ ] Using existing components (not creating new ones)
- [ ] Following patterns.md styling exactly
- [ ] Mobile responsive (test at 375px mentally)
- [ ] Proper section structure with z-index
- [ ] CTA with phone number 865-346-6111
- [ ] Motion animations have `viewport={{ once: true }}`

## After Creation

1. Run `npm run typecheck` to verify no errors
2. Explain to user what was created and why
3. Suggest testing the page in browser
4. Offer to update progress.md with new page status
