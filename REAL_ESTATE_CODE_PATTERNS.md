# Real Estate Industry Page - Code Patterns Reference

## Quick Copy-Paste Patterns for Future Industry Pages

---

## 1. Page Component Pattern (Server Component)

```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { ComponentName } from "@/components/industries/[industry]/ComponentName";
import { PremiumTestimonials } from "@/components/sections/PremiumTestimonials";
import { PremiumFAQ } from "@/components/sections/PremiumFAQ";

export const metadata: Metadata = {
  title: "AI Voice Agents for [Industry] | Key Benefit | Capture Client",
  description: "Compelling description with stats and CTA. Include main benefits and integrations.",
  keywords: [
    "primary keyword",
    "secondary keyword",
    "integration keyword",
    // 10-15 keywords total
  ],
  openGraph: {
    title: "AI Voice Agents for [Industry] | Key Benefit | Capture Client",
    description: "Social sharing description",
    url: "https://captureclientai.net/industries/[industry]",
    siteName: "Capture Client",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Voice Agents for [Industry] | Key Benefit",
    description: "Twitter description",
  },
};

export default function IndustryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background-darker via-background-dark to-background">
      {/* Hero */}
      <HeroComponent />

      {/* Feature Section 1 */}
      <FeatureSection1 />

      {/* Feature Section 2 */}
      <FeatureSection2 />

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumTestimonials />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PremiumFAQ />
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTAComponent />
    </main>
  );
}
```

---

## 2. Hero Component Pattern

```typescript
"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function IndustryHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsMobile(mobile);
      setDisableAnimations(mobile || reducedMotion);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ minHeight: isMobile ? '-webkit-fill-available' : '100vh' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-background-dark to-background-darker" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-30"
        animate={disableAnimations ? {} : { scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-gradient-radial from-gold/40 via-gold/10 to-transparent blur-3xl" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: disableAnimations ? 0 : y, opacity: disableAnimations ? 1 : opacity }}
        className="relative z-10 w-full pt-24 sm:pt-32 lg:pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <span className="material-icons text-gold text-xl">flash_on</span>
              <span className="text-sm sm:text-base font-semibold text-white/90">
                Industry Stat Here
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero font-bold mb-6 sm:mb-8"
            >
              <span className="block text-white mb-2">Main Headline</span>
              <span className="block relative">
                <span className="bg-gradient-to-r from-gold via-accent to-gold bg-clip-text text-transparent">
                  Key Benefit Statement
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-gold/50 via-accent/50 to-gold/50 origin-center rounded-full"
                />
              </span>
            </motion.h1>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                href="/contact"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold" />
                <div className="absolute inset-0 bg-gradient-to-r from-gold-light via-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-black">Primary CTA Text</span>
              </Link>

              <Link
                href="tel:865-346-3339"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-6 rounded-2xl font-semibold text-lg border-2 border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <span className="material-icons text-accent text-2xl">phone</span>
                <span className="text-white">(865) 346-3339</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
```

---

## 3. Feature Section Pattern (with useInView)

```typescript
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: "gold" | "accent" | "purple";
}

const features: Feature[] = [
  {
    title: "Feature Name",
    description: "Feature description",
    icon: "material_icon",
    color: "gold"
  },
  // ... more features
];

export function FeatureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  const colorClasses = {
    gold: {
      icon: "from-gold to-gold-light",
      text: "text-gold",
      border: "border-gold/30",
      glow: "group-hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
    },
    accent: {
      icon: "from-accent to-cyan-400",
      text: "text-accent",
      border: "border-accent/30",
      glow: "group-hover:shadow-[0_0_40px_rgba(0,201,255,0.3)]"
    },
    purple: {
      icon: "from-purple-500 to-pink-500",
      text: "text-purple-400",
      border: "border-purple-500/30",
      glow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
    }
  };

  return (
    <section ref={containerRef} className="py-16 sm:py-20 lg:py-28 relative">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-hero font-bold text-white mb-6">
            Section <span className="text-gold">Headline</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Section description
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <GlassCard
                  variant="premium"
                  className={`h-full p-8 border-2 ${colors.border} ${colors.glow} transition-all duration-500`}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.icon} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="material-icons text-black text-3xl">
                      {feature.icon}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl font-bold ${colors.text} mb-3`}>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

---

## 4. Stats Section Pattern

```typescript
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { GlassCard } from "@/components/ui/GlassCard";

interface Stat {
  value: string;
  label: string;
  icon: string;
}

const stats: Stat[] = [
  { value: "77%", label: "Stat Description", icon: "trending_up" },
  { value: "63%", label: "Another Stat", icon: "speed" },
  { value: "24/7", label: "Availability", icon: "all_inclusive" }
];

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });

  return (
    <section ref={containerRef} className="py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard variant="premium" className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold to-accent flex items-center justify-center">
                  <span className="material-icons text-black text-3xl">
                    {stat.icon}
                  </span>
                </div>
                <p className="text-5xl font-black text-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-white/80 font-medium">
                  {stat.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 5. Final CTA Pattern

```typescript
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

export function IndustryFinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.5 });

  return (
    <section ref={containerRef} className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-background-dark to-slate-900" />

      {/* Animated orb */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        <div className="w-full h-full bg-gradient-radial from-gold/40 to-transparent blur-3xl" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 border-2 border-gold/30 backdrop-blur-xl mb-8"
        >
          <span className="material-icons text-gold text-2xl">emoji_events</span>
          <span className="text-base font-bold text-gold uppercase">Badge Text</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-hero font-bold text-white mb-6"
        >
          Ready to <span className="text-gold">Transform Your Business?</span>
        </motion.h2>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/contact"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-6 rounded-2xl font-bold text-xl overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_80px_rgba(212,175,55,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-light to-gold" />
            <span className="relative z-10 text-black">Book Your Demo</span>
          </Link>

          <Link
            href="tel:865-346-3339"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl font-bold text-xl border-2 border-white/20 bg-white/5 backdrop-blur-xl"
          >
            <span className="material-icons text-accent text-3xl">phone</span>
            <span className="text-white">(865) 346-3339</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## 6. Common TypeScript Interfaces

```typescript
// Feature with color variant
interface Feature {
  title: string;
  description: string;
  icon: string;
  color: "gold" | "accent" | "purple";
  items?: string[];
}

// Stat with icon
interface Stat {
  value: string;
  label: string;
  sublabel?: string;
  icon: string;
}

// Timeline item with status
interface TimelineItem {
  time: string;
  multiplier: string;
  label: string;
  status: "excellent" | "good" | "poor";
  icon: string;
}

// Use case scenario
interface UseCase {
  scenario: string;
  problem: string;
  solution: string;
  result: string;
  icon: string;
  time?: string;
}

// CRM Platform
interface CRMPlatform {
  name: string;
  description: string;
  logo: string;
  features: string[];
  popular?: boolean;
}
```

---

## 7. Common Utility Classes

### Container
```typescript
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

### Section Spacing
```typescript
className="py-16 sm:py-20 lg:py-28"
```

### Text Gradients
```typescript
// Gold gradient
className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent"

// Accent gradient
className="bg-gradient-to-r from-accent via-cyan-400 to-accent bg-clip-text text-transparent"

// Multi-color gradient
className="bg-gradient-to-r from-gold via-accent to-purple-400 bg-clip-text text-transparent"
```

### Glass Cards
```typescript
// Basic glass
className="bg-white/5 backdrop-blur-xl border border-white/10"

// Premium glass
className="bg-gradient-to-br from-white/[0.12] via-white/[0.06] to-white/[0.03] backdrop-blur-2xl border-2 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
```

### Button Gradients
```typescript
// Gold CTA
className="bg-gradient-to-r from-gold via-gold-light to-gold"

// Glass button
className="bg-white/5 backdrop-blur-xl border-2 border-white/20 hover:bg-white/10"
```

---

## 8. Animation Patterns

### Fade In + Slide Up
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

### Scroll-Triggered with useInView
```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
>
```

### Staggered Grid
```typescript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, scale: 0.9 }}
    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
))}
```

### Background Orb Animation
```typescript
<motion.div
  animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
  transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
>
  <div className="w-full h-full bg-gradient-radial from-gold/40 to-transparent blur-3xl" />
</motion.div>
```

---

## 9. Responsive Grid Patterns

### 2-Column Grid
```typescript
className="grid grid-cols-1 md:grid-cols-2 gap-6"
```

### 3-Column Grid
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

### 4-Column Grid
```typescript
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
```

### Asymmetric Grid
```typescript
className="grid grid-cols-1 lg:grid-cols-12 gap-8"
// Then use lg:col-span-7 and lg:col-span-5 for 7-5 split
```

---

## 10. Color Variant Generator Function

```typescript
function getColorClasses(color: "gold" | "accent" | "purple" | "green" | "red") {
  const variants = {
    gold: {
      icon: "from-gold to-gold-light",
      text: "text-gold",
      border: "border-gold/30",
      bg: "from-gold/20 to-gold/10",
      glow: "group-hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
    },
    accent: {
      icon: "from-accent to-cyan-400",
      text: "text-accent",
      border: "border-accent/30",
      bg: "from-accent/20 to-cyan-500/10",
      glow: "group-hover:shadow-[0_0_40px_rgba(0,201,255,0.3)]"
    },
    purple: {
      icon: "from-purple-500 to-pink-500",
      text: "text-purple-400",
      border: "border-purple-500/30",
      bg: "from-purple-500/20 to-pink-500/10",
      glow: "group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
    },
    green: {
      icon: "from-green-500 to-emerald-500",
      text: "text-green-400",
      border: "border-green-500/30",
      bg: "from-green-500/20 to-emerald-500/10",
      glow: "group-hover:shadow-[0_0_40px_rgba(34,197,94,0.3)]"
    },
    red: {
      icon: "from-red-500 to-orange-500",
      text: "text-red-400",
      border: "border-red-500/30",
      bg: "from-red-500/20 to-orange-500/10",
      glow: "group-hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]"
    }
  };
  return variants[color];
}
```

---

**Code Patterns Complete**
**Use these patterns to maintain consistency across all industry pages**
