# Premium UI Components - Quick Start

**30-Second Copy/Paste Guide**

---

## Import

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

---

## 1. Section Header

```tsx
<SectionHeader
  overline="Integration Hub"
  heading="Connect Your Business"
  subtitle="100+ integrations available"
  decoratorColor="gold"
/>
```

---

## 2. Stats Row

```tsx
<div className="grid md:grid-cols-3 gap-6">
  <StatCard value={100} suffix="+" label="Partners" color="gold" />
  <StatCard value={98} suffix="%" label="Uptime" color="cyan" />
  <StatCard value={5000} suffix="+" label="Active" color="success" />
</div>
```

---

## 3. Feature Grid

```tsx
<FeatureGrid
  columns={3}
  variant="cards"
  features={[
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Under 2 second response times"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure",
      description: "Bank-level encryption"
    }
  ]}
/>
```

---

## 4. Integration Logos

```tsx
<IntegrationShowcase
  integrations={[
    { name: "Salesforce", logo: "/logos/salesforce.svg" },
    { name: "HubSpot", logo: "/logos/hubspot.svg" }
  ]}
  variant="scroll"
  autoScroll={true}
/>
```

---

## 5. Industry Badge

```tsx
<IndustryBadge
  category="healthcare"
  icon={<Stethoscope className="w-4 h-4" />}
>
  Healthcare
</IndustryBadge>
```

---

## 6. Premium Card

```tsx
<PremiumGlassCard
  variant="premium"
  glowColor="gold"
  header={<h3>Title</h3>}
  body={<p>Content</p>}
  footer={<Button>Action</Button>}
/>
```

---

## Full Page Template

```tsx
export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-background-dark">
      {/* Hero */}
      <section className="container mx-auto px-6 py-20">
        <SectionHeader
          overline="Integration Hub"
          heading="100+ Integrations"
          subtitle="Connect your favorite tools"
          decoratorColor="gold"
        />
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard value={100} suffix="+" label="Partners" color="gold" />
          <StatCard value={98} suffix="%" label="Uptime" color="cyan" />
          <StatCard value={5000} suffix="+" label="Active" color="success" />
        </div>
      </section>

      {/* Logo Carousel */}
      <section className="py-12">
        <IntegrationShowcase
          integrations={integrations}
          variant="scroll"
          autoScroll={true}
        />
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <SectionHeader
          overline="Key Features"
          heading="Built for Seamless Integration"
        />
        <FeatureGrid columns={3} variant="cards" features={features} />
      </section>

      {/* By Industry */}
      <section className="container mx-auto px-6 py-20">
        <SectionHeader
          overline="By Industry"
          heading="Integrations for Your Industry"
        />
        <div className="grid md:grid-cols-2 gap-6">
          <PremiumGlassCard
            variant="premium"
            glowColor="cyan"
            header={
              <IndustryBadge category="healthcare">
                Healthcare
              </IndustryBadge>
            }
            body={<p>Epic, Cerner, Athena...</p>}
          />
        </div>
      </section>
    </main>
  );
}
```

---

## Color Codes (Copy/Paste)

```tsx
// Primary Accents
gold: "#D4AF37"     // Use for CTAs, highlights
cyan: "#00C9FF"     // Use for tech, links
primary: "#4A69E2"  // Use for brand

// Industry Colors
healthcare: "#3B82F6"    // Blue
automotive: "#EF4444"    // Red
realestate: "#22C65E"    // Green
legal: "#F59E0B"         // Amber
homeservices: "#F97316"  // Orange
restaurant: "#A855F7"    // Purple
```

---

## Animation Values (Copy/Paste)

```tsx
// Transitions
duration: 200-300ms  // Use this
ease: [0.25, 0.1, 0.25, 1]  // "Premium" easing

// Scale
hover: 1.02-1.05  // Use this
active: 0.98      // Use this

// Movement
hover: -4px (lift)  // Use this
```

---

## Common Patterns

### Stats + Features
```tsx
<StatCard value={98} suffix="%" label="Success Rate" color="gold" />
<FeatureGrid columns={3} features={[...]} />
```

### Header + Badge
```tsx
<SectionHeader
  overline={<IndustryBadge category="healthcare">Healthcare</IndustryBadge>}
  heading="Healthcare Solutions"
/>
```

### Card Grid
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <PremiumGlassCard variant="premium" {...} />
  <PremiumGlassCard variant="premium" {...} />
  <PremiumGlassCard variant="premium" {...} />
</div>
```

---

## Don't Forget

- ✅ Import from `@/components/ui/premium-components`
- ✅ Use `gold` for CTAs (not purple)
- ✅ Use `cyan` for tech elements
- ✅ Keep animations subtle (200-300ms)
- ✅ Use `font-display` for headings
- ✅ Test on mobile (touch targets 44px+)

---

**Files:**
- Components: `src/components/ui/`
- Full Guide: `PREMIUM_UI_COMPONENTS_GUIDE.md`
- Visual Reference: `PREMIUM_UI_VISUAL_REFERENCE.md`
