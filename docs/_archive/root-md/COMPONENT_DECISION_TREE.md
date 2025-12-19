# Component Decision Tree: Client vs Server

**Quick Reference Guide for Developers**

---

## When to Use Client Components

```
Does your component need...
│
├─ Framer Motion animations?
│  └─ YES → ✅ Client Component
│
├─ React hooks (useState, useEffect, useRef)?
│  └─ YES → ✅ Client Component
│
├─ Event handlers (onClick, onChange, onHover)?
│  └─ YES → ✅ Client Component
│
├─ Browser APIs (window, document, Image)?
│  └─ YES → ✅ Client Component
│
├─ Third-party client libraries (Swiper, etc)?
│  └─ YES → ✅ Client Component
│
└─ None of the above?
   └─ NO → 🤔 Consider Server Component
```

---

## When to Use Server Components

```
Is your component...
│
├─ A page component (page.tsx, layout.tsx)?
│  └─ YES → ✅ Server Component
│
├─ Fetching data from database/API?
│  └─ YES → ✅ Server Component
│
├─ Generating SEO metadata?
│  └─ YES → ✅ Server Component
│
├─ Rendering static content only?
│  └─ YES → ✅ Server Component
│
├─ A pure layout wrapper with no interactivity?
│  └─ YES → ✅ Server Component
│
└─ Has any interactive features?
   └─ YES → ❌ Use Client Component
```

---

## Special Cases: Create Both Versions

### Scenario 1: Badge Component

```typescript
// StaticBadge.tsx (Server Component)
export function StaticBadge({ children, variant }) {
  return (
    <span className="px-3 py-1 rounded-lg bg-primary/10">
      {children}
    </span>
  );
}

// Badge.tsx (Client Component)
'use client';
import { motion } from 'framer-motion';

export function Badge({ children, variant }) {
  return (
    <motion.span
      className="px-3 py-1 rounded-lg bg-primary/10"
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.span>
  );
}
```

**When to use which:**
- ✅ Use `StaticBadge` in server components (metadata, static lists)
- ✅ Use `Badge` in interactive sections (hover effects needed)

### Scenario 2: Card Component

```typescript
// StaticCard.tsx (Server Component)
export function StaticCard({ children }) {
  return (
    <div className="p-6 rounded-2xl bg-surface/50 border border-surface-border">
      {children}
    </div>
  );
}

// GlassCard.tsx (Client Component)
'use client';
import { motion } from 'framer-motion';

export function GlassCard({ children }) {
  return (
    <motion.div
      className="p-6 rounded-2xl bg-surface/50 border border-surface-border"
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );
}
```

**When to use which:**
- ✅ Use `StaticCard` for blog posts, documentation
- ✅ Use `GlassCard` for features, services, interactive content

---

## Common Patterns

### Pattern 1: Page with Mixed Content

```typescript
// src/app/page.tsx (Server Component)
import { HeroSection } from '@/components/sections/HeroSection'; // Client
import { StaticContent } from '@/components/StaticContent'; // Server

export default async function HomePage() {
  // ✅ Data fetching on server
  const data = await fetchData();

  return (
    <main>
      {/* ✅ Static server-rendered content */}
      <StaticContent data={data} />

      {/* ✅ Client component for animations */}
      <HeroSection />
    </main>
  );
}
```

### Pattern 2: Lazy Loading Heavy Components

```typescript
// src/app/page.tsx (Server Component)
import dynamic from 'next/dynamic';

// ✅ Lazy load client components
const InteractiveDemo = dynamic(
  () => import('@/components/features/InteractiveDemo'),
  { ssr: false, loading: () => <Skeleton /> }
);

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      {/* ✅ Loads only when user scrolls to it */}
      <InteractiveDemo />
    </main>
  );
}
```

### Pattern 3: Form Handling

```typescript
// ✅ Form component (Client)
'use client';

import { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}

// ✅ Form page (Server)
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main>
      <h1>Contact Us</h1>
      <ContactForm /> {/* Client component */}
    </main>
  );
}
```

---

## Real Examples from This Project

### Example 1: UI Components

| Component | Type | Reason |
|-----------|------|--------|
| GlassCard | Client | whileHover, whileTap animations |
| Badge | Client | whileHover, pulse animations |
| StaticBadge | Server | No animations, pure rendering |
| SectionHeader | Client | Scroll-triggered viewport animations |
| Button | Client | onClick handlers, hover effects |

### Example 2: Section Components

| Component | Type | Reason |
|-----------|------|--------|
| PremiumHero | Client | Heavy animations, useState |
| PremiumServices | Client | Interactive cards, framer-motion |
| PremiumTestimonials | Client | Carousel with state (Swiper) |
| PremiumFAQ | Client | Accordion state (open/close) |

### Example 3: Feature Components

| Component | Type | Reason |
|-----------|------|--------|
| ROICalculator | Client | Form state, calculations |
| InteractiveAIDemo | Client | Audio player, API calls, state |
| ExitIntentPopup | Client | Mouse tracking, useEffect |
| LeadTicker | Client | setInterval, rotating content |

### Example 4: Page Components

| Component | Type | Reason |
|-----------|------|--------|
| page.tsx | Server | Data fetching, SEO metadata |
| layout.tsx | Server | Layout structure, metadata |
| error.tsx | Client | Error boundary with state |
| loading.tsx | Server | Static loading UI |

---

## Optimization Decision Tree

```
Is component above the fold?
│
├─ YES
│  └─ Keep it, but optimize bundle
│     └─ ✅ Keep as-is
│
└─ NO (below the fold)
   │
   └─ Is it heavy (>50KB)?
      │
      ├─ YES
      │  └─ Lazy load it
      │     └─ ✅ Use dynamic() import
      │
      └─ NO
         └─ Keep as-is
            └─ ✅ No change needed
```

---

## When to Lazy Load

### Lazy Load These:

1. ✅ **Calculators** (ROI, Missed Calls, Money Loss)
   - Why: Heavy logic, not needed immediately
   - Impact: 150KB+ bundle reduction

2. ✅ **Interactive Demos** (AI Demo, Voice Demo)
   - Why: Audio player, API calls, large dependencies
   - Impact: 100KB+ bundle reduction

3. ✅ **CRO Components** (Exit Intent, Urgency Timer)
   - Why: Not critical for initial render
   - Impact: 50KB+ bundle reduction

4. ✅ **Carousels** (Testimonials, Case Studies)
   - Why: Swiper library is heavy
   - Impact: 75KB+ bundle reduction

5. ✅ **Charts/Dashboards** (Growth Dashboard)
   - Why: Chart libraries are heavy
   - Impact: 100KB+ bundle reduction

### Don't Lazy Load These:

1. ❌ **Hero Section** - Above the fold, critical
2. ❌ **Navigation** - Needed immediately
3. ❌ **Footer** - Small, not worth complexity
4. ❌ **Small UI Components** - Badge, Button, Card

---

## Quick Reference Checklist

### Before Creating a Component

- [ ] Does it need animations? → Client
- [ ] Does it need state? → Client
- [ ] Does it need event handlers? → Client
- [ ] Is it purely presentational? → Server
- [ ] Is it a page component? → Server

### Before Lazy Loading

- [ ] Is it above the fold? → Don't lazy load
- [ ] Is it smaller than 50KB? → Don't lazy load
- [ ] Is it critical for UX? → Don't lazy load
- [ ] Is it below the fold AND heavy? → Lazy load
- [ ] Is it a CRO feature? → Lazy load

### Before Converting Client → Server

- [ ] Remove all animations? → Will it hurt UX?
- [ ] Remove all hooks? → Is it possible?
- [ ] Remove all handlers? → Will it be static?
- [ ] Is there a use case for both versions? → Create both

---

## Code Examples

### ✅ CORRECT: Client Component

```typescript
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function FeatureCard({ title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      {isHovered && <span>Learn more →</span>}
    </motion.div>
  );
}
```

**Why Client?**
- ✅ Uses framer-motion
- ✅ Uses useState
- ✅ Uses event handlers

### ✅ CORRECT: Server Component

```typescript
// No 'use client' directive

import { getFeatures } from '@/lib/data';

export default async function FeaturesPage() {
  const features = await getFeatures();

  return (
    <main>
      <h1>Our Features</h1>
      <ul>
        {features.map((feature) => (
          <li key={feature.id}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

**Why Server?**
- ✅ No animations
- ✅ No state
- ✅ Data fetching
- ✅ SEO-friendly

### ✅ CORRECT: Lazy Loading

```typescript
// Server Component
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    ssr: false,
    loading: () => <Skeleton />
  }
);

export default function Page() {
  return (
    <main>
      <Header />
      <HeavyComponent />
    </main>
  );
}
```

**Why Lazy Load?**
- ✅ Heavy component (>50KB)
- ✅ Below the fold
- ✅ Not critical for initial render

---

## Common Mistakes

### ❌ MISTAKE 1: Using Client in Server

```typescript
// page.tsx (Server Component)
import { Badge } from '@/components/ui/Badge'; // ❌ Client component

export default function Page() {
  return <Badge>Active</Badge>; // ❌ Forces entire tree to be client
}
```

**Fix:**
```typescript
// page.tsx (Server Component)
import { StaticBadge } from '@/components/ui/StaticBadge'; // ✅ Server component

export default function Page() {
  return <StaticBadge>Active</StaticBadge>; // ✅ Stays server
}
```

### ❌ MISTAKE 2: Not Lazy Loading Heavy Components

```typescript
// page.tsx
import { InteractiveDemo } from '@/components/InteractiveDemo'; // ❌ Loaded immediately

export default function Page() {
  return (
    <main>
      <Hero />
      <InteractiveDemo /> {/* ❌ 200KB component loaded upfront */}
    </main>
  );
}
```

**Fix:**
```typescript
// page.tsx
import dynamic from 'next/dynamic';

const InteractiveDemo = dynamic(
  () => import('@/components/InteractiveDemo'), // ✅ Loaded on demand
  { ssr: false }
);

export default function Page() {
  return (
    <main>
      <Hero />
      <InteractiveDemo /> {/* ✅ Lazy loaded */}
    </main>
  );
}
```

### ❌ MISTAKE 3: Removing Animations to Convert

```typescript
// ❌ BAD: Removing animations just to make it server
export function Card({ children }) {
  return (
    <div className="p-6 rounded-2xl">
      {children}
    </div>
  );
}
// Now it's server but lost premium UX
```

**Fix:**
```typescript
// ✅ GOOD: Keep it client with animations
'use client';

export function Card({ children }) {
  return (
    <motion.div
      className="p-6 rounded-2xl"
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );
}
// Premium UX maintained
```

---

## Summary

### Key Principles

1. **Client components are NOT bad** - They're necessary for interactivity
2. **Server components are NOT always better** - They're for static content
3. **Use the right tool for the job** - Don't force conversions
4. **Optimize, don't convert** - Lazy loading > Removing features

### Mental Model

```
Client Components = Interactive Layer
Server Components = Data & Content Layer
```

Both are needed. Use them appropriately.

---

**File Location**: `C:\Users\eaqqa\capture-client-website-seo\COMPONENT_DECISION_TREE.md`

**Related Files**:
- Full Analysis: `CLIENT_SERVER_COMPONENT_MIGRATION_ANALYSIS.md`
- Action Plan: `COMPONENT_OPTIMIZATION_ACTION_PLAN.md`
- Quick Start: `QUICK_START_OPTIMIZATION.md`
- Summary: `CLIENT_COMPONENT_OPTIMIZATION_SUMMARY.md`

**Generated by**: Component Architect Agent
