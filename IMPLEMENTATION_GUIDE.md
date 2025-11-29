# Implementation Guide
## Integrating Premium UI Components into Capture Client Website

### Quick Start

#### 1. Replace the Hero Section

**File:** `src/app/page.tsx`

**Before:**
```tsx
<section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background-dark">
  {/* Old hero content */}
</section>
```

**After:**
```tsx
import { HeroRedesign } from "@/components/sections/HeroRedesign";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <HeroRedesign />
      {/* Rest of sections */}
    </div>
  );
}
```

---

#### 2. Upgrade Service Cards

**Before:**
```tsx
<div className="card group">
  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-6">
    <span className="material-icons text-primary text-3xl">support_agent</span>
  </div>
  <h3 className="text-xl font-heading font-bold text-foreground mb-3">
    Voice AI Agents
  </h3>
  <p className="text-foreground-muted leading-relaxed">
    AI-powered voice agents handle calls 24/7...
  </p>
</div>
```

**After:**
```tsx
import { FeatureCard } from "@/components/ui/FeatureCard";

<FeatureCard
  icon="support_agent"
  title="Voice AI Agents"
  description="AI-powered voice agents handle calls 24/7, qualify leads, book appointments, and answer questions—so you never miss an opportunity."
  iconColor="primary"
  index={0}
/>
```

**Full Grid Example:**
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
  <FeatureCard
    icon="support_agent"
    title="Voice AI Agents"
    description="AI-powered voice agents handle calls 24/7..."
    iconColor="primary"
    index={0}
  />
  <FeatureCard
    icon="trending_up"
    title="Lead Generation"
    description="Professionally managed Google and Facebook Ads..."
    iconColor="accent"
    index={1}
  />
  <FeatureCard
    icon="contacts"
    title="Built-in CRM"
    description="Manage all client interactions, track conversations..."
    iconColor="primary"
    index={2}
  />
  <FeatureCard
    icon="insights"
    title="Marketing Dashboard"
    description="Real-time analytics and reporting give you complete visibility..."
    iconColor="accent"
    index={3}
  />
</div>
```

---

#### 3. Add Section Dividers

**Between sections:**
```tsx
import { SectionDivider } from "@/components/ui/SectionDivider";

<section id="services" className="section bg-background">
  {/* Services content */}
</section>

<SectionDivider variant="gradient-line" className="my-16" />

<section id="features" className="section bg-background-dark">
  {/* Features content */}
</section>
```

**Variant options:**
- `gradient-line`: Animated line with center dot (default)
- `angular`: Skewed gradient divider
- `wave`: SVG wave pattern

---

#### 4. Enhance Headlines with Text Reveal

**Before:**
```tsx
<h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
  Everything You Need in One Platform
</h2>
```

**After:**
```tsx
import { TextReveal } from "@/components/ui/TextReveal";

<TextReveal>
  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
    Everything You Need in One Platform
  </h2>
</TextReveal>
```

**With staggered reveals:**
```tsx
<TextReveal delay={0}>
  <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
    The Integrated Solution
  </h2>
</TextReveal>

<TextReveal delay={0.2}>
  <p className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
    Everything You Need in One Platform
  </p>
</TextReveal>

<TextReveal delay={0.4}>
  <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
    Stop juggling multiple tools...
  </p>
</TextReveal>
```

---

#### 5. Upgrade CTA Buttons

**Before:**
```tsx
<Link href="#contact" className="btn-primary">
  Book a Demo
</Link>
```

**After:**
```tsx
import { MagneticButton } from "@/components/ui/MagneticButton";

<MagneticButton className="btn-premium">
  <Link href="#contact">Book a Demo</Link>
</MagneticButton>
```

**Alternative styling:**
```tsx
<MagneticButton className="relative overflow-hidden bg-gradient-to-r from-accent to-primary text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-glow-lg transition-all duration-300 hover:shadow-glow group">
  <Link href="#contact" className="relative z-10 flex items-center gap-3">
    Book a Demo
    <span className="material-icons">arrow_forward</span>
  </Link>
  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</MagneticButton>
```

---

#### 6. Apply Glow Cards to Existing Elements

**Before:**
```tsx
<div className="card">
  {/* Content */}
</div>
```

**After:**
```tsx
import { GlowCard } from "@/components/ui/GlowCard";

<GlowCard className="bg-surface/50 border border-surface-border rounded-2xl p-8 backdrop-blur-lg transition-all duration-500 hover:border-primary/30 hover:shadow-card-hover hover:-translate-y-1">
  {/* Content */}
</GlowCard>
```

---

### Complete Page Example

```tsx
import { HeroRedesign } from "@/components/sections/HeroRedesign";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlowCard } from "@/components/ui/GlowCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      {/* ==================== HERO ==================== */}
      <HeroRedesign />

      <SectionDivider variant="gradient-line" className="my-16" />

      {/* ==================== SERVICES ==================== */}
      <section id="services" className="section bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-background to-background-dark opacity-50" />

        <div className="container-custom relative z-10">
          {/* Section header with text reveals */}
          <div className="text-center mb-16">
            <TextReveal>
              <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">
                The Integrated Solution
              </h2>
            </TextReveal>
            <TextReveal delay={0.2}>
              <p className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Everything You Need in One Platform
              </p>
            </TextReveal>
            <TextReveal delay={0.4}>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                Stop juggling multiple tools. Capture Client brings AI, ads, CRM, and analytics together
                in one seamless growth engine.
              </p>
            </TextReveal>
          </div>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="support_agent"
              title="Voice AI Agents"
              description="AI-powered voice agents handle calls 24/7, qualify leads, book appointments, and answer questions—so you never miss an opportunity."
              iconColor="primary"
              index={0}
            />
            <FeatureCard
              icon="trending_up"
              title="Lead Generation"
              description="Professionally managed Google and Facebook Ads campaigns designed to drive high-quality leads directly to your business."
              iconColor="accent"
              index={1}
            />
            <FeatureCard
              icon="contacts"
              title="Built-in CRM"
              description="Manage all client interactions, track conversations, and organize your pipeline in one unified inbox—no more scattered tools."
              iconColor="primary"
              index={2}
            />
            <FeatureCard
              icon="insights"
              title="Marketing Dashboard"
              description="Real-time analytics and reporting give you complete visibility into campaign performance, ROI, and growth metrics."
              iconColor="accent"
              index={3}
            />
          </div>
        </div>
      </section>

      <SectionDivider variant="angular" className="my-24" />

      {/* ==================== FINAL CTA ==================== */}
      <section id="contact" className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <TextReveal>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4">
                  Ready to <span className="text-gradient">Capture Your Market?</span>
                </h2>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
                  Start automating leads and capturing more clients today. Book a free demo
                  to see the platform in action.
                </p>
              </TextReveal>
            </div>

            <GlowCard className="glass p-8 lg:p-12 rounded-2xl shadow-glow max-w-2xl mx-auto mb-12">
              {/* Lead capture form */}
            </GlowCard>

            <div className="flex justify-center">
              <MagneticButton className="btn-premium">
                <Link href="#contact" className="flex items-center gap-2">
                  Book Your Demo
                  <span className="material-icons">arrow_forward</span>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

### Styling Utilities Reference

#### Background Classes
```tsx
className="bg-mesh"              // Original mesh gradient
className="bg-mesh-premium"      // Enhanced 5-layer mesh
className="bg-gradient-angular"  // Angular gradient (Primary → Accent → Primary)
```

#### Text Effects
```tsx
className="text-gradient"        // Primary → Accent gradient
className="text-depth"           // Subtle shadow for depth
```

#### Buttons
```tsx
className="btn-primary"          // Original gradient button
className="btn-premium"          // Enhanced with shimmer
className="btn-secondary"        // Border style
className="btn-ghost"            // Transparent with border
```

#### Animations
```tsx
className="animate-shimmer"      // Horizontal shimmer sweep
className="animate-rotate-slow"  // 30s rotation
className="animate-scale-pulse"  // Breathing scale effect
```

#### Effects
```tsx
className="shimmer-effect"       // Add shimmer overlay
className="gradient-border-animated"  // Animated border
className="angular-divider"      // Skewed section divider
```

---

### Component Props Reference

#### FeatureCard
```tsx
interface FeatureCardProps {
  icon: string;              // Material icon name
  title: string;             // Card headline
  description: string;       // Card body text
  iconColor?: "primary" | "accent";  // Icon theme (default: "primary")
  index?: number;            // For stagger animation (default: 0)
}
```

#### MagneticButton
```tsx
interface MagneticButtonProps {
  children: React.ReactNode;  // Button content
  className?: string;         // Additional classes
}
```

#### TextReveal
```tsx
interface TextRevealProps {
  children: React.ReactNode;  // Content to reveal
  delay?: number;            // Animation delay in seconds (default: 0)
  className?: string;        // Additional classes
}
```

#### GlowCard
```tsx
interface GlowCardProps {
  children: React.ReactNode;  // Card content
  className?: string;         // Additional classes
}
```

#### SectionDivider
```tsx
interface SectionDividerProps {
  variant?: "angular" | "wave" | "gradient-line";  // Style (default: "gradient-line")
  className?: string;  // Additional classes
}
```

---

### Performance Tips

1. **Lazy load heavy components:**
```tsx
import dynamic from "next/dynamic";

const HeroRedesign = dynamic(() => import("@/components/sections/HeroRedesign").then(mod => ({ default: mod.HeroRedesign })), {
  loading: () => <div className="min-h-screen bg-background-dark animate-pulse" />
});
```

2. **Reduce motion for accessibility:**
```tsx
// In globals.css (already included)
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

3. **Use `viewport={{ once: true }}`** for animations that should only trigger once (already implemented)

4. **Optimize images:**
```tsx
import Image from "next/image";

<Image
  src="/hero-visual.png"
  alt="Dashboard preview"
  width={800}
  height={600}
  priority={true}  // For above-fold images
  placeholder="blur"  // Show blur while loading
/>
```

---

### Testing Checklist

- [ ] Hero section renders correctly on all screen sizes
- [ ] Magnetic buttons work on hover (desktop only)
- [ ] Text reveals trigger when scrolling into view
- [ ] Glow cards respond to cursor movement
- [ ] Section dividers animate on scroll
- [ ] Animations respect `prefers-reduced-motion`
- [ ] All CTAs are keyboard accessible
- [ ] Focus states are visible
- [ ] Colors meet WCAG contrast ratios
- [ ] Mobile navigation works correctly
- [ ] Forms are accessible (labels, aria attributes)

---

### Browser Testing

Recommended browsers to test:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

Known compatibility:
- ✅ All modern browsers (2021+)
- ✅ Backdrop blur (Safari 9+)
- ✅ CSS Grid (all modern)
- ✅ Framer Motion (React 16.8+)

---

### Troubleshooting

**Issue:** Magnetic button not working
- **Solution:** Ensure mouse events are enabled (doesn't work on touch devices by design)

**Issue:** Text reveals not animating
- **Solution:** Check viewport settings, ensure element is in view

**Issue:** Glow card cursor position incorrect
- **Solution:** Verify parent container has correct positioning context

**Issue:** Animations too slow on mobile
- **Solution:** Add conditional duration based on device:
```tsx
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
const duration = isMobile ? 0.3 : 0.8;
```

**Issue:** Build errors with Framer Motion
- **Solution:** Ensure "use client" directive is at the top of all component files

---

**Ready to ship!** 🚀
