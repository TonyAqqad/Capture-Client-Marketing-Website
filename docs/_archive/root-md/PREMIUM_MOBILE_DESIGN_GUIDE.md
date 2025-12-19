# Premium Mobile Design Implementation Guide

## What Makes Mobile Sites Look Premium vs Cheap

### The Premium Difference

**Premium indicators:**
- Intentional asymmetry and offset elements
- Bold typography with extreme weight contrast (200 vs 900)
- Micro-interactions that feel responsive
- Purposeful whitespace (breathing room)
- Cohesive motion design
- Premium textures (glass, gradients, noise)

**Cheap indicators to AVOID:**
- Everything perfectly centered and symmetrical
- Generic sans-serif fonts (Arial, Roboto everywhere)
- No hover/tap feedback
- Cramped layouts with no breathing room
- Static, lifeless elements
- Flat colors with no depth

---

## 1. GLASS/FROSTED UI TRENDS

### When to Use Glassmorphism

**Good use cases:**
- Navigation overlays
- CTAs that float over content
- Card overlays on hero images
- Modal dialogs
- Pricing cards on gradient backgrounds

**Avoid:**
- Text-heavy content (reduces legibility)
- Stacked glass cards (too blurry)
- Glass on glass (confusing depth)

### Premium Glass Card Implementation

```tsx
// PREMIUM: Multi-layer glass with border glow
<div className="group relative">
  {/* Glow layer */}
  <div className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />

  {/* Glass card */}
  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
    {/* Content */}
  </div>
</div>

// CHEAP (avoid this):
<div className="bg-white/10 p-4 rounded">
  {/* Too simple, no depth */}
</div>
```

### Tailwind Classes for Glass Effects

```css
/* Basic glass */
.glass-basic {
  @apply bg-white/5 backdrop-blur-xl border border-white/10;
}

/* Premium glass with multiple layers */
.glass-premium {
  @apply bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08];
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Glass with animated glow border */
.glass-glow {
  @apply relative overflow-hidden;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-glow::before {
  content: '';
  @apply absolute inset-0 opacity-0 transition-opacity duration-500;
  background: linear-gradient(
    135deg,
    rgba(0, 201, 255, 0.1),
    rgba(74, 105, 226, 0.1)
  );
}

.glass-glow:hover::before {
  @apply opacity-100;
}
```

### Background Blur Best Practices

```tsx
// Mobile-optimized backdrop blur (better performance)
<div className="backdrop-blur-md sm:backdrop-blur-xl">
  {/* Less blur on mobile = better performance */}
</div>

// Context-aware blur intensity
<div className="backdrop-blur-[8px] lg:backdrop-blur-[16px]">
  {/* Adaptive blur based on screen size */}
</div>

// Glass nav with safe area
<nav className="fixed top-0 inset-x-0 z-50 bg-background-dark/80 backdrop-blur-xl border-b border-white/10 safe-area-inset-top">
  <div className="container-custom px-4 py-4">
    {/* Navigation content */}
  </div>
</nav>
```

---

## 2. INTERACTIVE ELEMENTS THAT FEEL PREMIUM

### Premium Button Designs

```tsx
// MAGNETIC BUTTON (follows finger on hover/touch)
<button className="group relative overflow-hidden bg-gradient-to-r from-accent to-primary px-8 py-4 rounded-full font-bold text-white shadow-glow-lg active:scale-95 transition-all duration-200">
  {/* Shimmer effect on hover */}
  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

  {/* Icon animates on hover */}
  <span className="relative flex items-center gap-2">
    Get Started
    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform">
      {/* Arrow icon */}
    </svg>
  </span>
</button>

// GLASS BUTTON (secondary actions)
<button className="relative group px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl font-medium text-white hover:bg-white/10 hover:border-accent/50 active:scale-95 transition-all duration-200">
  <span className="relative z-10">Learn More</span>

  {/* Gradient border on hover */}
  <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent/20 to-primary/20 blur-sm" />
</button>

// ICON BUTTON (close, menu)
<button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/50 active:scale-90 transition-all duration-200">
  <svg className="w-6 h-6">
    {/* Icon */}
  </svg>
</button>
```

### Premium Form Fields

```tsx
// FLOATING LABEL INPUT
<div className="relative">
  <input
    type="email"
    id="email"
    className="peer w-full px-4 pt-6 pb-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-all duration-200"
    placeholder=" "
  />
  <label
    htmlFor="email"
    className="absolute left-4 top-4 text-white/60 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent pointer-events-none"
  >
    Email Address
  </label>

  {/* Success checkmark (appears when valid) */}
  <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400 opacity-0 peer-valid:opacity-100 transition-opacity">
    <path d="M5 13l4 4L19 7" />
  </svg>
</div>

// GLASS TEXTAREA
<textarea
  rows={4}
  className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none resize-none transition-all duration-200"
  placeholder="Tell us about your business..."
/>

// PREMIUM CHECKBOX
<label className="flex items-start gap-3 cursor-pointer group">
  <div className="relative flex items-center justify-center w-6 h-6 rounded-md bg-white/5 border border-white/10 group-hover:border-accent/50 transition-colors duration-200">
    <input
      type="checkbox"
      className="appearance-none peer"
    />
    <svg className="absolute w-4 h-4 text-accent opacity-0 scale-0 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200">
      <path d="M5 13l4 4L19 7" />
    </svg>
  </div>
  <span className="text-sm text-white/80">
    I agree to receive marketing emails
  </span>
</label>
```

### Card Hover/Tap States

```tsx
// PREMIUM FEATURE CARD
<div className="group relative overflow-hidden bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_50px_rgba(0,201,255,0.15)] active:scale-[0.98]">
  {/* Animated gradient overlay */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10" />
  </div>

  {/* Content */}
  <div className="relative z-10">
    {/* Icon with glow */}
    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 mb-4 group-hover:scale-110 transition-transform duration-300">
      <svg className="w-7 h-7 text-accent">
        {/* Icon */}
      </svg>
    </div>

    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
      24/7 AI Answering
    </h3>

    <p className="text-white/70 mb-4 leading-relaxed">
      Never miss a call with AI that works around the clock
    </p>

    {/* Arrow animates on hover */}
    <div className="flex items-center gap-2 text-accent font-medium">
      <span>Learn more</span>
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
        {/* Arrow */}
      </svg>
    </div>
  </div>

  {/* Corner accent (reveals on hover) */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</div>
```

### Loading States & Skeletons

```tsx
// PREMIUM SKELETON LOADER
<div className="animate-pulse space-y-4">
  {/* Shimmer effect */}
  <div className="relative overflow-hidden bg-white/5 rounded-xl h-48">
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>

  <div className="space-y-3">
    <div className="h-6 bg-white/5 rounded-lg w-3/4 relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
    <div className="h-4 bg-white/5 rounded-lg w-full relative overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  </div>
</div>

// BUTTON LOADING STATE
<button disabled className="relative px-8 py-4 bg-accent/50 rounded-full font-bold text-white cursor-not-allowed">
  <span className="opacity-0">Processing...</span>

  {/* Spinner */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
  </div>
</button>
```

---

## 3. MOBILE NAVIGATION PATTERNS

### Sticky Header Done Right

```tsx
// SMART STICKY HEADER (hides on scroll down, shows on scroll up)
'use client';

import { useEffect, useState } from 'react';

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="bg-background-dark/80 backdrop-blur-xl border-b border-white/10">
        <div className="container-custom px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Logo" className="h-8" />
          </div>

          {/* Desktop nav (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6">
            <a href="/features" className="text-white/80 hover:text-white transition-colors">
              Features
            </a>
            <a href="/pricing" className="text-white/80 hover:text-white transition-colors">
              Pricing
            </a>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 active:scale-90 transition-all">
            <svg className="w-6 h-6 text-white">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* CTA */}
          <a href="/demo" className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-accent to-primary rounded-full font-bold text-white hover:shadow-glow-lg transition-all">
            Get Started
          </a>
        </div>
      </nav>
    </header>
  );
}
```

### Bottom Navigation Bar (Mobile)

```tsx
// PREMIUM BOTTOM NAV (appears on mobile only)
<nav className="md:hidden fixed bottom-0 inset-x-0 z-50 pb-safe">
  <div className="bg-background-dark/95 backdrop-blur-xl border-t border-white/10">
    <div className="flex items-center justify-around px-4 py-3">
      {[
        { icon: 'home', label: 'Home', href: '/' },
        { icon: 'features', label: 'Features', href: '/features' },
        { icon: 'call', label: 'Call', href: 'tel:8653463339' },
        { icon: 'pricing', label: 'Pricing', href: '/pricing' },
      ].map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex flex-col items-center gap-1 min-w-0 px-2 py-1.5 rounded-lg active:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6 text-white/70">
            {/* Icon based on item.icon */}
          </svg>
          <span className="text-xs text-white/70 truncate">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  </div>
</nav>
```

### Mobile Menu with Animation

```tsx
// FULLSCREEN MOBILE MENU
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 active:scale-90 transition-all"
      >
        <svg className="w-6 h-6 text-white">
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" /> // X icon
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" /> // Hamburger
          )}
        </svg>
      </button>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-background-dark/95 backdrop-blur-2xl"
          >
            {/* Close button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsOpen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 active:scale-90 transition-all"
              >
                <svg className="w-6 h-6 text-white">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col items-center justify-center h-full space-y-6 px-8">
              {[
                { label: 'Features', href: '/features' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-3xl font-bold text-white hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}

              {/* CTA */}
              <motion.a
                href="/demo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 px-8 py-4 bg-gradient-to-r from-accent to-primary rounded-full font-bold text-white shadow-glow-lg"
              >
                Get Started Free
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

### Scroll-Based Effects

```tsx
// PROGRESS BAR (shows how far user has scrolled)
'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / totalHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
      <div
        className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

// FADE-IN ON SCROLL (element reveals when in viewport)
'use client';

import { useEffect, useRef, useState } from 'react';

export function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
}
```

---

## 4. TRUST SIGNALS ON MOBILE

### Badge Placement

```tsx
// TRUST BADGES (below hero CTA)
<div className="flex flex-wrap items-center justify-center gap-4 mt-8">
  {[
    { icon: 'shield', text: 'SOC 2 Certified' },
    { icon: 'lock', text: 'Bank-Level Security' },
    { icon: 'award', text: 'Award-Winning' },
  ].map((badge) => (
    <div
      key={badge.text}
      className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
    >
      <svg className="w-4 h-4 text-accent">
        {/* Icon */}
      </svg>
      <span className="text-xs font-medium text-white/80">
        {badge.text}
      </span>
    </div>
  ))}
</div>

// GUARANTEE BADGE (sticky to CTA)
<div className="relative">
  <button className="w-full px-8 py-4 bg-gradient-to-r from-accent to-primary rounded-xl font-bold text-white">
    Start Free Trial
  </button>

  {/* Badge overlay */}
  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 rounded-full text-xs font-bold text-white whitespace-nowrap shadow-lg">
    30-Day Money Back
  </div>
</div>
```

### Testimonial Carousels

```tsx
// MOBILE-OPTIMIZED TESTIMONIAL CAROUSEL
'use client';

import { useState } from 'react';

const testimonials = [
  {
    quote: "Capture Client tripled our lead conversion rate in just 30 days.",
    author: "Sarah Johnson",
    role: "CEO, HomeBuilders Plus",
    avatar: "/avatars/sarah.jpg",
  },
  // More testimonials...
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative overflow-hidden">
      {/* Testimonials container */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {testimonials.map((testimonial, i) => (
          <div key={i} className="min-w-full px-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-white/90 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 bg-accent'
                : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
```

### Social Proof That Doesn't Clutter

```tsx
// COMPACT SOCIAL PROOF BANNER
<div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl p-4">
  <div className="flex items-center gap-3">
    {/* Avatars stack */}
    <div className="flex -space-x-2">
      {[1, 2, 3, 4].map((i) => (
        <img
          key={i}
          src={`/avatars/user-${i}.jpg`}
          alt=""
          className="w-8 h-8 rounded-full border-2 border-background-dark"
        />
      ))}
    </div>

    {/* Text */}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-white">
        <span className="text-accent font-bold">1,247</span> businesses use Capture Client
      </p>
      <p className="text-xs text-white/60">
        Join them today
      </p>
    </div>
  </div>
</div>

// LIVE ACTIVITY TICKER (subtle, not annoying)
<div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-8 md:w-80 z-40">
  <div className="bg-background-dark/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-xl">
    <div className="flex items-start gap-3">
      {/* Green dot (live indicator) */}
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mt-1.5" />

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/90">
          <span className="font-bold">John in Nashville</span> just started a free trial
        </p>
        <p className="text-xs text-white/60 mt-0.5">
          2 minutes ago
        </p>
      </div>
    </div>
  </div>
</div>
```

---

## 5. SPACING AND ALIGNMENT RULES

### The 8px Grid System

```tsx
// CONSISTENT SPACING SYSTEM
// Base unit: 8px (0.5rem in Tailwind)

// Section padding (mobile)
<section className="py-16 px-4"> {/* 16 * 4 = 64px vertical, 16px horizontal */}

  // Card padding
  <div className="p-6"> {/* 6 * 4 = 24px */}

    // Element spacing
    <h3 className="mb-4">Title</h3> {/* 4 * 4 = 16px */}
    <p className="mb-6">Description</p> {/* 6 * 4 = 24px */}

    // Button
    <button className="px-8 py-4"> {/* 32px horizontal, 16px vertical */}
      CTA
    </button>
  </div>
</section>

// SPACING SCALE
// 0.5 = 2px   (hairline borders)
// 1   = 4px   (tight spacing)
// 2   = 8px   (compact)
// 3   = 12px  (comfortable)
// 4   = 16px  (standard gap)
// 6   = 24px  (section element gap)
// 8   = 32px  (sub-section gap)
// 12  = 48px  (section gap)
// 16  = 64px  (major section padding)
// 24  = 96px  (hero section padding)
```

### Section Spacing Examples

```tsx
// MOBILE-FIRST RESPONSIVE SPACING
<section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-8">
  {/* Mobile: 64px vertical, 16px horizontal */}
  {/* Tablet: 96px vertical, 24px horizontal */}
  {/* Desktop: 128px vertical, 32px horizontal */}

  <div className="max-w-7xl mx-auto">
    <div className="grid gap-8 md:gap-12 lg:gap-16">
      {/* Cards with responsive gaps */}
    </div>
  </div>
</section>

// CARD GUTTERS
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* Mobile: 24px gap */}
  {/* Desktop: 32px gap */}

  {cards.map((card) => (
    <div key={card.id} className="bg-white/5 rounded-2xl p-6">
      {card.content}
    </div>
  ))}
</div>
```

### Text Alignment Principles

```tsx
// LEFT-ALIGNED TEXT (best for readability)
<div className="text-left max-w-2xl">
  <h2 className="text-3xl font-bold mb-4">
    Long Heading That Wraps to Multiple Lines
  </h2>
  <p className="text-lg text-white/80 leading-relaxed">
    Body text should always be left-aligned for easy reading.
    Center alignment makes long text hard to scan.
  </p>
</div>

// CENTER-ALIGNED (only for short headlines and CTAs)
<div className="text-center max-w-xl mx-auto">
  <h1 className="text-4xl md:text-6xl font-bold mb-6">
    Short Punchy Headline
  </h1>
  <p className="text-lg text-white/80 mb-8">
    One-line subheading
  </p>
  <button className="px-8 py-4 bg-accent rounded-full">
    Get Started
  </button>
</div>

// INTENTIONAL ASYMMETRY (premium look)
<section className="grid md:grid-cols-2 gap-12 items-center">
  {/* Text content offset to left */}
  <div className="md:pr-12">
    <h2 className="text-4xl font-bold mb-6">
      Content Starts Here
    </h2>
    <p className="text-lg text-white/80">
      Not perfectly centered = more interesting
    </p>
  </div>

  {/* Visual element offset to right */}
  <div className="md:pl-12">
    <img src="/visual.png" alt="" className="w-full" />
  </div>
</section>
```

---

## 6. COMPLETE MOBILE HERO SECTION EXAMPLE

```tsx
// PREMIUM MOBILE HERO (all best practices combined)
export function PremiumMobileHero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background-dark">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background-dark to-accent/10" />

        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-mesh-premium opacity-60" />

        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02]" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float-medium" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow with animated underline */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-accent">
              Voice AI for Small Business
            </span>
          </div>

          {/* Headline with intentional line breaks */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
            <span className="block">Stop Losing</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-accent via-white to-primary">
              Leads to Voicemail
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            AI voice agents that answer every call, qualify leads, and book appointments—while you focus on running your business.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {/* Primary CTA */}
            <a
              href="/demo"
              className="group relative w-full sm:w-auto overflow-hidden px-8 py-4 bg-gradient-to-r from-accent to-primary rounded-full font-bold text-white shadow-glow-lg active:scale-95 transition-all duration-200"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Watch 2-Min Demo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>

              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </a>

            {/* Secondary CTA (Call) */}
            <a
              href="tel:8653463339"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full font-medium text-white hover:bg-white/10 hover:border-accent/50 active:scale-95 transition-all duration-200"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/20 group-hover:bg-accent/30 transition-colors">
                <svg className="w-5 h-5 text-accent">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <div className="text-left">
                <div className="text-sm font-bold">(865) 346-3339</div>
                <div className="text-xs text-white/60">Talk to a human</div>
              </div>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: 'shield', text: 'SOC 2 Certified' },
              { icon: 'star', text: '4.9/5 Rating' },
              { icon: 'users', text: '1,200+ Businesses' },
            ].map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
              >
                <svg className="w-4 h-4 text-accent">
                  {/* Icon */}
                </svg>
                <span className="text-xs font-medium text-white/80">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/40">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
```

---

## KEY TAILWIND CLASSES SUMMARY

### Glass Effects
```css
backdrop-blur-xl
backdrop-blur-2xl
bg-white/5
bg-white/[0.03]
border border-white/10
border-white/[0.08]
```

### Hover States
```css
hover:border-accent/50
hover:shadow-[0_0_50px_rgba(0,201,255,0.15)]
hover:scale-110
hover:-translate-y-1
group-hover:translate-x-1
```

### Active/Tap States
```css
active:scale-95
active:scale-90
active:bg-white/10
```

### Transitions
```css
transition-all duration-200
transition-all duration-300
transition-all duration-500
transition-transform duration-700
```

### Spacing (8px grid)
```css
p-6         /* 24px padding */
gap-4       /* 16px gap */
mb-6        /* 24px margin bottom */
py-16       /* 64px vertical padding */
space-y-4   /* 16px vertical spacing */
```

### Premium Gradients
```css
bg-gradient-to-r from-accent to-primary
bg-gradient-to-br from-white/[0.08] to-white/[0.03]
bg-clip-text text-transparent
```

### Responsive Design
```css
text-4xl md:text-6xl lg:text-7xl
py-16 md:py-24 lg:py-32
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
hidden md:block
md:hidden
```

---

## WHAT TO AVOID (Anti-Patterns)

1. **Don't**: Use flat, solid backgrounds
   **Do**: Layer gradients, mesh, noise textures

2. **Don't**: Make everything perfectly centered
   **Do**: Use intentional asymmetry and offset

3. **Don't**: Use generic blue (#007bff)
   **Do**: Use distinctive accent colors (cyan #00C9FF)

4. **Don't**: Leave buttons static
   **Do**: Add shimmer, glow, scale effects

5. **Don't**: Use Arial or Roboto
   **Do**: Use distinctive fonts (Poppins, Inter with weight contrast)

6. **Don't**: Cram content with no whitespace
   **Do**: Follow 8px grid, generous padding

7. **Don't**: Ignore mobile tap targets
   **Do**: Minimum 44px tap targets with active states

8. **Don't**: Make glass cards on glass backgrounds
   **Do**: Ensure proper contrast and hierarchy

---

## IMPLEMENTATION CHECKLIST

- [ ] Glass cards with multi-layer depth (glow, border, backdrop-blur)
- [ ] Buttons with shimmer/reveal effects on hover
- [ ] Form inputs with floating labels and validation states
- [ ] Smart sticky header (hides on scroll down)
- [ ] Bottom navigation bar for mobile
- [ ] Animated mobile menu (slide-in from right)
- [ ] Testimonial carousel with dot navigation
- [ ] Trust badges below hero CTA
- [ ] Social proof ticker (subtle, not annoying)
- [ ] 8px spacing grid throughout
- [ ] Intentional asymmetry in layouts
- [ ] Mesh gradient backgrounds
- [ ] Noise texture overlays
- [ ] Skeleton loaders with shimmer
- [ ] Scroll progress indicator
- [ ] Fade-in on scroll animations
- [ ] Minimum 44px tap targets
- [ ] Active/pressed states on all interactive elements
- [ ] Generous padding (py-16 minimum on sections)

---

This guide provides battle-tested patterns for creating premium mobile experiences that convert. Every element has intentional design choices that make users feel confident and engaged.
