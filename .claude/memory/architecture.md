# Architecture Guide

---
# model: claude-opus-4-5-20251101
---

## How This Website Works (For Non-Developers)

### What is Next.js?
Next.js is the framework that runs this website. Think of it like the engine of a car - you don't need to understand every part, but knowing the basics helps.

### The Two Types of Pages

#### 1. Server Components (Default)
- **What**: Pages that load content before sending to the browser
- **When to use**: Static pages, SEO content, data fetching
- **Looks like**: Just a normal function, no special tag
- **Example**: About page, blog posts, location pages

```tsx
// This is a Server Component (default)
export default function AboutPage() {
  return <div>About us content...</div>;
}
```

#### 2. Client Components
- **What**: Pages/parts that need interactivity (buttons, forms, animations)
- **When to use**: Anything the user interacts with
- **Looks like**: Has `"use client"` at the very top
- **Example**: ROI calculators, tabs, forms, animated sections

```tsx
"use client"; // This line makes it a Client Component

export default function Calculator() {
  const [value, setValue] = useState(0); // Can use state
  return <button onClick={() => setValue(1)}>Click me</button>;
}
```

### File Organization

```
src/
├── app/                    # All the pages (routes)
│   ├── page.tsx           # Homepage (/)
│   ├── about/page.tsx     # About page (/about)
│   ├── industries/
│   │   ├── home-services/page.tsx    # /industries/home-services
│   │   ├── legal/page.tsx            # /industries/legal
│   │   └── ...
│   ├── layout.tsx         # Wraps ALL pages (header/footer)
│   └── globals.css        # Global styles
│
├── components/            # Reusable pieces
│   ├── ui/               # Basic building blocks (buttons, cards)
│   ├── sections/         # Page sections (Hero, FAQ, CTA)
│   ├── navigation/       # Menu, nav components
│   └── ...               # Other components
│
├── data/                  # JSON content files
│   ├── services/         # Service page content
│   ├── locations/        # Location page content
│   └── ...
│
└── lib/                   # Helper functions
    ├── motion.tsx        # Animation helpers
    ├── utils.ts          # Utility functions
    └── seo-config.ts     # SEO settings
```

### URL = Folder Structure
The URL of a page matches its folder location:

| URL | File Location |
|-----|---------------|
| `/` | `src/app/page.tsx` |
| `/about` | `src/app/about/page.tsx` |
| `/industries/legal` | `src/app/industries/legal/page.tsx` |
| `/services/voice-ai` | `src/app/services/voice-ai/page.tsx` |

### Common Patterns

#### Pattern 1: Server Page + Client Component
Most pages use this pattern for SEO + interactivity:

```
industries/legal/
├── page.tsx              # Server: metadata, SEO, imports client
├── LegalIndustryClient.tsx   # Client: animations, interactions
└── layout.tsx            # Optional: shared layout for section
```

#### Pattern 2: Dynamic Pages (slug)
For pages generated from data (like location pages):

```
[slug]/
└── page.tsx    # One file generates many pages from data
```

The `[slug]` means "any value here" - so `/locations/nashville` and `/locations/atlanta` use the same file.

### The Layout System
Layouts wrap pages and their children. They're like nesting dolls:

```
app/layout.tsx (root - has Header/Footer)
  └── industries/layout.tsx (industries section layout)
      └── industries/legal/page.tsx (the actual page)
```

### Components vs Pages
- **Page** (`page.tsx`): A route you can visit in the browser
- **Component**: A reusable piece used inside pages

```tsx
// This is a COMPONENT (reusable piece)
// File: components/sections/PremiumHero.tsx
function PremiumHero({ title, subtitle }) {
  return <section>...</section>;
}

// This is a PAGE (route you visit)
// File: app/about/page.tsx
function AboutPage() {
  return <PremiumHero title="About Us" subtitle="..." />;
}
```

### Why TypeScript?
TypeScript catches errors before they break the site. When you see red squiggly lines, something is wrong. Running `npm run typecheck` shows all errors.

### Common Terms Translated

| Term | What It Means |
|------|---------------|
| `props` | Data passed into a component |
| `state` | Data that can change (like form values) |
| `hook` | Special function starting with `use` (useState, useEffect) |
| `import` | Bringing in code from another file |
| `export` | Making code available to other files |
| `className` | How you add CSS classes in React |
| `metadata` | SEO info (title, description) |
| `JSX/TSX` | HTML-like syntax in JavaScript/TypeScript |

### Key Files You Should Know

| File | Purpose |
|------|---------|
| `package.json` | Project settings, dependencies |
| `tailwind.config.ts` | Custom colors, fonts, sizes |
| `tsconfig.json` | TypeScript settings |
| `next.config.js` | Next.js settings |
| `middleware.ts` | Runs before every page load |
