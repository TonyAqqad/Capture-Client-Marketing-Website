# Premium UI Components Guide

**Location**: `C:/Users/eaqqa/capture-client-website-seo/capture-client-site/src/components/ui/`

## Anti-AI-Slop Design Principles

These components follow strict design principles to avoid generic "AI slop" aesthetics:

- ✅ **Gold (#D4AF37)** as primary accent (luxury, premium feel)
- ✅ **Cyan (#00C9FF)** as secondary accent (tech, innovation)
- ✅ **Asymmetric layouts** with intentional whitespace
- ✅ **Distinctive typography** (Bricolage Grotesque display font)
- ✅ **Subtle micro-interactions** (200-300ms, max 1.02 scale)
- ✅ **Glassmorphic effects** done right (not overdone)
- ❌ **NO generic purple gradients**
- ❌ **NO perfectly symmetrical layouts everywhere**
- ❌ **NO stock-photo-feel illustrations**

---

## Component Reference

### 1. PremiumGlassCard

**File**: `PremiumGlassCard.tsx`

Premium glassmorphic card with header/body/footer slots and subtle gradient borders.

**Props:**
```typescript
interface PremiumGlassCardProps {
  children?: ReactNode;
  header?: ReactNode;
  body?: ReactNode;
  footer?: ReactNode;
  className?: string;
  variant?: "default" | "premium" | "gold" | "subtle";
  hover?: boolean;
  glowColor?: "cyan" | "gold" | "primary";
}
```

**Usage Example:**
```tsx
import { PremiumGlassCard } from "@/components/ui/premium-components";

<PremiumGlassCard
  variant="premium"
  glowColor="gold"
  hover={true}
  header={
    <div className="flex items-center justify-between">
      <h3 className="font-display text-xl font-bold">Card Title</h3>
      <IndustryBadge category="healthcare">Healthcare</IndustryBadge>
    </div>
  }
  body={
    <p className="text-foreground-muted">
      Card content goes here with proper spacing and typography.
    </p>
  }
  footer={
    <Button variant="primary">Learn More</Button>
  }
/>
```

**Variants:**
- `default`: Standard glass effect
- `premium`: Enhanced glass with gradient borders
- `gold`: Gold-tinted glass (for premium features)
- `subtle`: Minimal glass effect

---

### 2. SectionHeader

**File**: `SectionHeader.tsx`

Consistent section headers with overline, heading, subtitle, and decorative line.

**Props:**
```typescript
interface SectionHeaderProps {
  overline?: string;
  heading: string | ReactNode;
  subtitle?: string | ReactNode;
  alignment?: "left" | "center" | "right";
  showDecorator?: boolean;
  decoratorColor?: "gold" | "cyan" | "primary";
  className?: string;
  animate?: boolean;
}
```

**Usage Example:**
```tsx
import { SectionHeader } from "@/components/ui/premium-components";

<SectionHeader
  overline="Integration Partners"
  heading="Connect with Your Favorite Tools"
  subtitle="Seamlessly integrate with 100+ business tools and platforms to automate your workflow."
  alignment="center"
  decoratorColor="gold"
  animate={true}
/>
```

**Design Notes:**
- Overline: Small, uppercase, gold badge
- Heading: Large, bold, Bricolage Grotesque font
- Decorator: 1px gradient line (20px width)
- Staggered animation on scroll

---

### 3. FeatureGrid

**File**: `FeatureGrid.tsx`

Grid layout for features/benefits with icon, title, description, and optional badge.

**Props:**
```typescript
interface Feature {
  icon?: ReactNode;
  iconName?: string; // Lucide icon name
  title: string;
  description: string;
  badge?: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "cards" | "list" | "minimal";
  className?: string;
  staggerDelay?: number;
}
```

**Usage Example:**
```tsx
import { FeatureGrid } from "@/components/ui/premium-components";
import { Zap, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Lightning Fast",
    description: "Response times under 2 seconds for instant customer engagement.",
    badge: "New"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "HIPAA Compliant",
    description: "Bank-level encryption and compliance for healthcare providers."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Availability",
    description: "Never miss a lead with round-the-clock AI voice agents."
  }
];

<FeatureGrid
  features={features}
  columns={3}
  variant="cards"
  staggerDelay={0.1}
/>
```

**Variants:**
- `cards`: Full glass cards with hover effects (default)
- `list`: Horizontal layout with icon on left
- `minimal`: No cards, just icon + text

---

### 4. StatCard

**File**: `StatCard.tsx`

Animated statistic display with counting animation and optional trend indicator.

**Props:**
```typescript
interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  color?: "gold" | "cyan" | "primary" | "success";
  variant?: "default" | "minimal";
  className?: string;
  animateOnView?: boolean;
}
```

**Usage Example:**
```tsx
import { StatCard } from "@/components/ui/premium-components";
import { TrendingUp } from "lucide-react";

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <StatCard
    value={98}
    suffix="%"
    label="Call Answer Rate"
    color="gold"
    icon={<TrendingUp className="w-6 h-6" />}
    trend={{ value: 12, direction: "up" }}
  />

  <StatCard
    value={2400}
    prefix="+"
    label="Leads Captured This Month"
    color="cyan"
  />

  <StatCard
    value={42}
    suffix="s"
    label="Average Response Time"
    color="success"
    variant="minimal"
  />
</div>
```

**Features:**
- Smooth spring-based counting animation
- Animates when scrolled into view
- Optional trend indicator (up/down arrows)
- Color-coded by importance

---

### 5. IntegrationShowcase

**File**: `IntegrationShowcase.tsx`

Horizontal scrolling integration logos with hover-to-pause and glow effects.

**Props:**
```typescript
interface Integration {
  name: string;
  logo: string; // URL or path to logo
  description?: string;
  category?: string;
}

interface IntegrationShowcaseProps {
  integrations: Integration[];
  variant?: "scroll" | "grid" | "carousel";
  autoScroll?: boolean;
  scrollSpeed?: number;
  columns?: 3 | 4 | 5 | 6;
  className?: string;
}
```

**Usage Example:**
```tsx
import { IntegrationShowcase } from "@/components/ui/premium-components";

const integrations = [
  { name: "Salesforce", logo: "/images/integrations/salesforce.svg" },
  { name: "HubSpot", logo: "/images/integrations/hubspot.svg" },
  { name: "Zapier", logo: "/images/integrations/zapier.svg" },
  { name: "Slack", logo: "/images/integrations/slack.svg" },
  // ... more integrations
];

// Horizontal scroll variant
<IntegrationShowcase
  integrations={integrations}
  variant="scroll"
  autoScroll={true}
  scrollSpeed={30}
/>

// Grid variant
<IntegrationShowcase
  integrations={integrations}
  variant="grid"
  columns={6}
/>
```

**Features:**
- Auto-scrolling with seamless loop
- Hover to pause scrolling
- Gradient fade edges
- Grayscale to color on hover
- Glow effect on hover

---

### 6. IndustryBadge

**File**: `IndustryBadge.tsx`

Industry-specific badge with color-coding and icon support.

**Props:**
```typescript
interface IndustryBadgeProps {
  children: ReactNode;
  category?: "healthcare" | "automotive" | "realestate" | "legal" | "homeservices" | "restaurant" | "default";
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "outline" | "glass";
  pulse?: boolean;
  className?: string;
}
```

**Usage Example:**
```tsx
import { IndustryBadge } from "@/components/ui/premium-components";
import { Stethoscope, Car, Home, Scale } from "lucide-react";

// Healthcare badge
<IndustryBadge
  category="healthcare"
  icon={<Stethoscope className="w-4 h-4" />}
  variant="glass"
>
  Healthcare
</IndustryBadge>

// Automotive badge
<IndustryBadge
  category="automotive"
  icon={<Car className="w-4 h-4" />}
  size="md"
>
  Automotive
</IndustryBadge>

// Real Estate badge
<IndustryBadge
  category="realestate"
  icon={<Home className="w-4 h-4" />}
  pulse={true}
>
  Real Estate
</IndustryBadge>

// Legal badge
<IndustryBadge
  category="legal"
  icon={<Scale className="w-4 h-4" />}
  variant="outline"
>
  Legal Services
</IndustryBadge>
```

**Color Mapping:**
- Healthcare: Blue
- Automotive: Red
- Real Estate: Green
- Legal: Amber
- Home Services: Orange
- Restaurant: Purple
- Default: Gold

---

## Complete Page Example

Here's how to combine these components for an integration page:

```tsx
import {
  SectionHeader,
  PremiumGlassCard,
  FeatureGrid,
  StatCard,
  IntegrationShowcase,
  IndustryBadge
} from "@/components/ui/premium-components";
import { Zap, Shield, Globe, TrendingUp } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <SectionHeader
          overline="Integration Hub"
          heading="Connect Your Business Ecosystem"
          subtitle="Seamlessly integrate with 100+ platforms to automate workflows and supercharge productivity."
          alignment="center"
          decoratorColor="gold"
        />
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            value={100}
            suffix="+"
            label="Integration Partners"
            color="gold"
            icon={<Globe className="w-6 h-6" />}
          />
          <StatCard
            value={98}
            suffix="%"
            label="Uptime Guarantee"
            color="cyan"
            icon={<Shield className="w-6 h-6" />}
            trend={{ value: 2, direction: "up" }}
          />
          <StatCard
            value={5000}
            suffix="+"
            label="Active Integrations"
            color="success"
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>
      </section>

      {/* Integration Logos */}
      <section className="py-12">
        <IntegrationShowcase
          integrations={[
            { name: "Salesforce", logo: "/logos/salesforce.svg" },
            { name: "HubSpot", logo: "/logos/hubspot.svg" },
            // ... more
          ]}
          variant="scroll"
          autoScroll={true}
        />
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <SectionHeader
          overline="Key Features"
          heading="Built for Seamless Integration"
          alignment="center"
        />

        <FeatureGrid
          columns={3}
          variant="cards"
          features={[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Real-Time Sync",
              description: "Bi-directional data sync keeps all your tools up to date automatically.",
              badge: "Popular"
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Enterprise Security",
              description: "SOC 2 Type II certified with end-to-end encryption."
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: "API Access",
              description: "Build custom integrations with our developer-friendly REST API."
            }
          ]}
        />
      </section>

      {/* Industry-Specific Integrations */}
      <section className="container mx-auto px-6 py-20">
        <SectionHeader
          overline="By Industry"
          heading="Integrations for Your Industry"
          alignment="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PremiumGlassCard
            variant="premium"
            glowColor="cyan"
            header={
              <div className="flex items-center gap-3">
                <IndustryBadge category="healthcare" icon={<Stethoscope />}>
                  Healthcare
                </IndustryBadge>
                <h3 className="font-display text-xl font-bold">Healthcare Integrations</h3>
              </div>
            }
            body={
              <ul className="space-y-2 text-foreground-muted">
                <li>• Epic EMR</li>
                <li>• Cerner</li>
                <li>• Athenahealth</li>
              </ul>
            }
          />

          {/* More industry cards... */}
        </div>
      </section>
    </div>
  );
}
```

---

## Design Tokens Reference

### Colors

```typescript
// Primary Accent (Gold)
gold: "#D4AF37"
gold-50 to gold-900

// Secondary Accent (Cyan)
accent: "#00C9FF"
accent-50 to accent-900

// Primary Brand Blue
primary: "#4A69E2"

// Backgrounds
background-dark: "#0F172A"
background-darker: "#0A0F1C"

// Text
foreground: "#F8FAFC"
foreground-muted: "#94A3B8"
foreground-subtle: "#64748B"
```

### Typography

```typescript
// Font Families
font-display: "Bricolage Grotesque" // For headings
font-body: "Inter" // For body text

// Font Sizes
text-xs to text-9xl

// Display Headings
.font-display text-4xl md:text-5xl lg:text-6xl
```

### Shadows

```typescript
shadow-glow-gold: "0 0 20px rgba(212, 175, 55, 0.3)"
shadow-glow-gold-lg: "0 0 40px rgba(212, 175, 55, 0.4)"
shadow-glow: "0 0 20px rgba(0, 201, 255, 0.3)"
shadow-card: "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
```

### Animations

```typescript
// Hover transitions: 200-300ms
transition-all duration-300

// Scale on hover: 1.02 max (subtle)
hover:scale-[1.02]

// Lift on hover: -4px
hover:-translate-y-1
```

---

## Accessibility Checklist

- ✅ All interactive elements have focus states
- ✅ Color contrast meets WCAG AA standards
- ✅ Icons have `aria-hidden="true"` when decorative
- ✅ Buttons have visible labels or `aria-label`
- ✅ Animations respect `prefers-reduced-motion`
- ✅ Keyboard navigation works for all interactive elements

---

## Performance Optimization

- ✅ Use `loading="lazy"` for below-fold images
- ✅ Implement `next/image` for automatic optimization
- ✅ Framer Motion uses GPU-accelerated transforms
- ✅ Stagger animations to reduce initial load
- ✅ `'use client'` only when necessary (all these components need it for animations)

---

## Import Pattern

**Single import for all premium components:**
```tsx
import {
  PremiumGlassCard,
  SectionHeader,
  FeatureGrid,
  StatCard,
  IntegrationShowcase,
  IndustryBadge
} from "@/components/ui/premium-components";
```

**Individual imports (if preferred):**
```tsx
import { PremiumGlassCard } from "@/components/ui/PremiumGlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
```

---

## Component Hierarchy

```
Premium UI Components
├── Layout Components
│   ├── PremiumGlassCard (container with slots)
│   └── SectionHeader (page section headers)
├── Content Components
│   ├── FeatureGrid (features/benefits display)
│   ├── StatCard (animated statistics)
│   └── IntegrationShowcase (logo carousel/grid)
└── Utility Components
    ├── IndustryBadge (category labels)
    ├── Badge (generic badges)
    └── Button (CTAs and actions)
```

---

## Next Steps

1. Create integration page using `IntegrationShowcase` and `FeatureGrid`
2. Create industry pages using `IndustryBadge` and `PremiumGlassCard`
3. Add real integration logos to `/public/images/integrations/`
4. Customize color schemes per industry category
5. Test accessibility with keyboard navigation
6. Validate mobile responsiveness on iOS Safari

---

**File Locations:**
- Components: `C:/Users/eaqqa/capture-client-website-seo/capture-client-site/src/components/ui/`
- Exports: `C:/Users/eaqqa/capture-client-website-seo/capture-client-site/src/components/ui/premium-components.ts`
- This Guide: `C:/Users/eaqqa/capture-client-website-seo/PREMIUM_UI_COMPONENTS_GUIDE.md`
