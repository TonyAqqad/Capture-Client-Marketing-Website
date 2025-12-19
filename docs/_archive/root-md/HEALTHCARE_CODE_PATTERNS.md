# Healthcare Page - Reusable Code Patterns

## Component Patterns

### 1. Animated Counter (Scroll-triggered)
```typescript
interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (end - startValue) + startValue);
      setCount(currentCount);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Usage:
<AnimatedCounter end={27} suffix="%" />
```

### 2. Trust Badge (Reusable)
```typescript
interface TrustBadgeProps {
  icon: string;
  label: string;
}

function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
      <span className="material-icons text-accent text-lg">{icon}</span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

// Usage:
<TrustBadge icon="verified_user" label="HIPAA Compliant" />
```

### 3. Feature Card (Scroll-animation)
```typescript
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-accent/30 hover:shadow-glow transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
        <span className="material-icons text-accent text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-heading font-bold text-foreground mb-2">{title}</h3>
      <p className="text-foreground-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Usage:
<FeatureCard
  icon="schedule"
  title="24/7 Patient Scheduling"
  description="Let patients book appointments anytime..."
  delay={0.1}
/>
```

### 4. Testimonial Card
```typescript
interface TestimonialProps {
  quote: string;
  author: string;
  practice: string;
  location: string;
  results: string;
}

function TestimonialCard({ quote, author, practice, location, results }: TestimonialProps) {
  return (
    <div className="glass-premium p-8 rounded-2xl">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="material-icons text-accent text-xl">person</span>
        </div>
        <div>
          <div className="font-semibold text-foreground">{author}</div>
          <div className="text-sm text-foreground-muted">{practice}</div>
          <div className="text-xs text-foreground-muted">{location}</div>
        </div>
      </div>
      <p className="text-foreground-muted italic mb-4">&quot;{quote}&quot;</p>
      <div className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
        <div className="text-sm font-semibold text-accent">{results}</div>
      </div>
    </div>
  );
}
```

### 5. Interactive Tab System
```typescript
interface PracticeType {
  id: string;
  label: string;
  icon: string;
  useCases: string[];
  benefits: string[];
}

const practiceTypes: PracticeType[] = [
  {
    id: "dental",
    label: "Dental",
    icon: "sentiment_satisfied",
    useCases: ["Schedule cleanings", "Send reminders"],
    benefits: ["80% reduction", "72% decrease"],
  },
  // ... more types
];

function PracticeTypeTabs() {
  const [activeTab, setActiveTab] = useState("dental");
  const activePractice = practiceTypes.find((p) => p.id === activeTab) || practiceTypes[0];

  return (
    <>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {practiceTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveTab(type.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === type.id
                ? "bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 text-foreground shadow-glow"
                : "bg-white/5 backdrop-blur-xl border border-white/10 text-foreground-muted hover:border-accent/20"
            }`}
          >
            <span className="material-icons">{type.icon}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass-premium p-8 sm:p-12 rounded-3xl">
        <h3>{activePractice.label} Practices</h3>
        {/* Render use cases and benefits */}
      </div>
    </>
  );
}
```

### 6. ROI Calculator
```typescript
function ROICalculator() {
  const [missedCalls, setMissedCalls] = useState(50);
  const [patientValue, setPatientValue] = useState(500);

  const conversionRate = 0.2;
  const monthlyRevenue = missedCalls * conversionRate * patientValue;
  const annualRevenue = monthlyRevenue * 12;

  return (
    <div className="glass-premium p-8 rounded-3xl">
      <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
        Calculate Your Revenue Recovery
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Monthly Missed Calls
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={missedCalls}
            onChange={(e) => setMissedCalls(Number(e.target.value))}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="text-2xl font-bold text-accent mt-2">{missedCalls} calls</div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Average Patient Value
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={patientValue}
            onChange={(e) => setPatientValue(Number(e.target.value))}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="text-2xl font-bold text-accent mt-2">${patientValue}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
        <div>
          <div className="text-sm text-foreground-muted mb-1">Monthly Revenue Recovered</div>
          <div className="text-3xl font-bold text-accent">${monthlyRevenue.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-foreground-muted mb-1">Annual Revenue Recovered</div>
          <div className="text-3xl font-bold text-accent">${annualRevenue.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
```

## Layout Patterns

### 7. Hero Section with Animated Orbs
```typescript
<section className="relative min-h-screen flex items-center overflow-hidden">
  {/* Background layers */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
    <div className="absolute inset-0 bg-mesh-premium opacity-40" />

    {/* Animated gradient orbs */}
    <motion.div
      className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full opacity-40"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-full h-full bg-gradient-radial from-cyan-500/30 via-cyan-500/10 to-transparent blur-3xl" />
    </motion.div>

    <motion.div
      className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full opacity-30"
      animate={{ scale: [1.1, 1, 1.1] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    >
      <div className="w-full h-full bg-gradient-radial from-accent/25 to-transparent blur-3xl" />
    </motion.div>
  </div>

  {/* Content */}
  <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20">
    {/* Your hero content */}
  </div>
</section>
```

### 8. Section with Glass Background
```typescript
<section className="section bg-background relative overflow-hidden">
  <div className="absolute inset-0 bg-mesh opacity-20" />

  <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
    {/* Your content */}
  </div>
</section>
```

### 9. Grid Layout (Responsive)
```typescript
// 1 col mobile → 2 col tablet → 3 col desktop
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <FeatureCard {...props} />
  <FeatureCard {...props} />
  <FeatureCard {...props} />
</div>

// 2 col mobile → 3 col tablet → 6 col desktop
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
  {/* EHR integrations */}
</div>
```

## Animation Patterns

### 10. Staggered Text Reveal
```typescript
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  Headline
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  Subheadline
</motion.p>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.3 }}
>
  CTA Buttons
</motion.div>
```

### 11. Scroll-triggered Grid Animation
```typescript
{ehrIntegrations.map((ehr, idx) => (
  <motion.div
    key={ehr.name}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: idx * 0.1 }}
  >
    {/* EHR card */}
  </motion.div>
))}
```

### 12. Infinite Loop Background Animation
```typescript
<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{
    duration: 12,
    repeat: Infinity,
    ease: "easeInOut"
  }}
>
  <div className="w-full h-full bg-gradient-radial from-cyan-500/30 to-transparent blur-3xl" />
</motion.div>
```

## CTA Patterns

### 13. Primary CTA Button (Gradient)
```typescript
<Link
  href="tel:865-346-3339"
  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-primary font-semibold text-background hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300"
>
  <span className="material-icons">phone</span>
  Get HIPAA-Compliant Demo
  <span className="material-icons group-hover:translate-x-1 transition-transform duration-300">
    arrow_forward
  </span>
</Link>
```

### 14. Secondary CTA Button (Glass)
```typescript
<Link
  href="#calculator"
  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 font-semibold text-foreground hover:border-accent/30 hover:shadow-glow transition-all duration-300"
>
  <span className="material-icons">calculate</span>
  Calculate ROI
</Link>
```

### 15. CTA with Trust Signals
```typescript
<div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
  {/* Primary + Secondary CTAs */}
</div>

<div className="flex flex-wrap justify-center gap-6 text-sm text-foreground-muted">
  <div className="flex items-center gap-2">
    <span className="material-icons text-accent text-lg">check_circle</span>
    No credit card required
  </div>
  <div className="flex items-center gap-2">
    <span className="material-icons text-accent text-lg">check_circle</span>
    48-hour setup
  </div>
  <div className="flex items-center gap-2">
    <span className="material-icons text-accent text-lg">check_circle</span>
    Cancel anytime
  </div>
</div>
```

## Utility Patterns

### 16. Section Heading Pattern
```typescript
<div className="text-center mb-12">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
    Your Headline{" "}
    <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
      Gradient Text
    </span>
  </h2>
  <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
    Supporting description text
  </p>
</div>
```

### 17. Glass Premium Card Wrapper
```typescript
<div className="glass-premium p-8 sm:p-12 rounded-3xl">
  {/* Your content */}
</div>
```

### 18. Icon + Text Pattern
```typescript
<div className="flex items-start gap-3">
  <span className="material-icons text-accent text-xl flex-shrink-0">
    check_circle
  </span>
  <span className="text-foreground-muted">
    Your benefit or feature text
  </span>
</div>
```

## Tailwind Class Patterns

### 19. Responsive Spacing
```typescript
className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
```

### 20. Responsive Font Sizes
```typescript
className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
```

### 21. Hover State Pattern
```typescript
className="hover:border-accent/30 hover:shadow-glow hover:scale-[1.02] transition-all duration-300"
```

### 22. Gradient Text Pattern
```typescript
className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
```

### 23. Glass Effect Pattern
```typescript
className="bg-white/5 backdrop-blur-xl border border-white/10"
```

### 24. Responsive Grid Pattern
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

## Server/Client Split Pattern

### 25. Page Structure
```typescript
// page.tsx (Server Component)
import { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Your Title",
  description: "Your description",
};

export default function Page() {
  return <PageClient />;
}

// PageClient.tsx (Client Component)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PageClient() {
  return <div>{/* Interactive content */}</div>;
}
```

## TypeScript Interface Patterns

### 26. Props Interface Pattern
```typescript
interface CardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;  // Optional
  variant?: "primary" | "secondary";  // Union type
}

// Usage with destructuring + defaults
function Card({ icon, title, description, delay = 0, variant = "primary" }: CardProps) {
  // ...
}
```

### 27. Data Model Interface
```typescript
interface PracticeType {
  id: string;
  label: string;
  icon: string;
  useCases: string[];
  benefits: string[];
}

// Array of objects
const practiceTypes: PracticeType[] = [
  { id: "dental", label: "Dental", /* ... */ },
  // ...
];
```

## Performance Patterns

### 28. Conditional Animation Pattern
```typescript
const [disableAnimations, setDisableAnimations] = useState(false);

useEffect(() => {
  const mobile = window.innerWidth < 768;
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  setDisableAnimations(mobile || reducedMotion);
}, []);

// Usage:
animate={disableAnimations ? {} : { scale: [1, 1.1, 1] }}
```

### 29. useInView Pattern (Lazy Animation)
```typescript
const ref = useRef<HTMLDivElement>(null);
const isInView = useInView(ref, { once: true, amount: 0.3 });

return (
  <motion.div
    ref={ref}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
  >
    {/* Content */}
  </motion.div>
);
```

### 30. Optimized Range Input
```typescript
// Use onChange instead of onInput for better performance
<input
  type="range"
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
  className="accent-accent"  // Native accent color
/>
```

## Summary

These 30 code patterns cover:
- **6 Reusable Components** (Counter, Badge, Card, Testimonial, Tabs, Calculator)
- **3 Layout Patterns** (Hero, Section, Grid)
- **3 Animation Patterns** (Stagger, Scroll, Loop)
- **3 CTA Patterns** (Primary, Secondary, Trust Signals)
- **6 Utility Patterns** (Heading, Glass Card, Icon+Text, Classes)
- **2 Architecture Patterns** (Server/Client Split, TypeScript)
- **3 Performance Patterns** (Conditional Animation, useInView, Optimized Inputs)
- **4 Additional Utility Classes** (Spacing, Font, Hover, Gradient)

All patterns are:
- **Strictly typed** (no `any`)
- **Mobile-responsive** (mobile-first)
- **Performance-optimized** (lazy animations, conditional rendering)
- **Accessible** (semantic HTML, keyboard navigation)
- **Reusable** (props interfaces, composition)
