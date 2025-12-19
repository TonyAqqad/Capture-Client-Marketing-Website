# Interactive AI Demo - Implementation Examples

## Quick Start

### 1. Add to Existing Features Page

```tsx
// capture-client-site/src/app/features/page.tsx

import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";

export default function FeaturesPage() {
  return (
    <main>
      {/* Other features sections */}

      <InteractiveAIDemo />

      {/* More sections below */}
    </main>
  );
}
```

### 2. Create Dedicated Demo Page

```tsx
// capture-client-site/src/app/demo/page.tsx

import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Try Our AI Voice Agent - Live Demo | Capture Client",
  description: "Experience our AI voice agent technology in real-time. See how it captures leads and qualifies customers automatically.",
  openGraph: {
    title: "Try Our AI Voice Agent - Live Demo",
    description: "Interactive demo of AI-powered lead capture and qualification",
  },
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <InteractiveAIDemo />
    </main>
  );
}
```

### 3. Add to Homepage as CTA Section

```tsx
// capture-client-site/src/app/page.tsx

import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";
import { PremiumHero } from "@/components/sections/PremiumHero";
import { PremiumServices } from "@/components/sections/PremiumServices";

export default function HomePage() {
  return (
    <main>
      <PremiumHero />
      <PremiumServices />

      {/* Interactive Demo Section */}
      <InteractiveAIDemo />

      {/* Continue with other sections */}
    </main>
  );
}
```

## Advanced Implementations

### With Custom Wrapper

```tsx
// Custom wrapper with tracking and context

import { useEffect } from "react";
import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";

export default function TrackedDemo() {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "page_view", {
        page_title: "AI Demo",
        page_location: "/demo",
      });
    }
  }, []);

  return (
    <div className="relative">
      {/* Add custom header */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          See AI Voice Agents in Action
        </h1>
        <p className="text-xl text-slate-400">
          No signup required. Start a conversation below.
        </p>
      </section>

      {/* Main demo */}
      <InteractiveAIDemo />

      {/* Add CTA after demo */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Get This for Your Business?
        </h2>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-primary text-white font-semibold hover:shadow-glow transition-all"
        >
          Get Started Today
        </a>
      </section>
    </div>
  );
}
```

### Split Test Variant (A/B Testing)

```tsx
// Test different business types by default

"use client";

import { useState, useEffect } from "react";
import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";

export default function ABTestDemo() {
  const [variant, setVariant] = useState<"control" | "variant">("control");

  useEffect(() => {
    // Randomly assign variant
    const isVariant = Math.random() > 0.5;
    setVariant(isVariant ? "variant" : "control");

    // Track assignment
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "ab_test_assigned", {
        test_name: "demo_default_industry",
        variant: isVariant ? "variant" : "control",
      });
    }
  }, []);

  return (
    <div>
      {variant === "control" ? (
        <InteractiveAIDemo />
      ) : (
        <InteractiveAIDemo />
      )}
    </div>
  );
}
```

### With Lead Magnet Gate

```tsx
// Show demo after email capture

"use client";

import { useState } from "react";
import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";

export default function GatedDemo() {
  const [hasAccess, setHasAccess] = useState(false);

  const handleEmailSubmit = async (email: string) => {
    // Submit to your CRM/email list
    await fetch("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setHasAccess(true);
  };

  if (!hasAccess) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Try Our AI Demo
        </h2>
        <p className="text-xl text-slate-400 mb-8">
          Enter your email to unlock the interactive demo
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const email = (e.target as any).email.value;
            handleEmailSubmit(email);
          }}
          className="max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white mb-4"
          />
          <button
            type="submit"
            className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-primary text-white font-semibold"
          >
            Unlock Demo
          </button>
        </form>
      </section>
    );
  }

  return <InteractiveAIDemo />;
}
```

## Integration with Analytics

### Google Analytics 4

```tsx
// Add event tracking to demo interactions

"use client";

import { useEffect, useRef } from "react";
import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";

export default function AnalyticsDemo() {
  const interactionCount = useRef(0);

  useEffect(() => {
    // Track demo view
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "demo_viewed", {
        event_category: "engagement",
        event_label: "interactive_ai_demo",
      });
    }

    // Set up message tracking
    const handleMessage = () => {
      interactionCount.current++;

      if (window.gtag) {
        window.gtag("event", "demo_interaction", {
          event_category: "engagement",
          event_label: "message_sent",
          value: interactionCount.current,
        });
      }
    };

    // Listen for demo interactions
    window.addEventListener("demo_message_sent", handleMessage);

    return () => {
      window.removeEventListener("demo_message_sent", handleMessage);
    };
  }, []);

  return <InteractiveAIDemo />;
}
```

### Mixpanel / Amplitude

```tsx
// Track detailed user journey

import { useEffect } from "react";
import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";
import mixpanel from "mixpanel-browser";

export default function MixpanelDemo() {
  useEffect(() => {
    mixpanel.track("Demo Page Viewed", {
      source: "features_page",
      timestamp: new Date().toISOString(),
    });

    // Track engagement
    const startTime = Date.now();

    return () => {
      const timeSpent = Date.now() - startTime;
      mixpanel.track("Demo Page Left", {
        time_spent_seconds: Math.round(timeSpent / 1000),
      });
    };
  }, []);

  return <InteractiveAIDemo />;
}
```

## Styling Customizations

### Custom Theme

```tsx
// Override colors for specific brand

import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";

export default function CustomThemedDemo() {
  return (
    <div
      style={{
        // Custom CSS variables
        "--color-accent": "#00ff88",
        "--color-primary": "#6366f1",
      } as React.CSSProperties}
    >
      <InteractiveAIDemo />
    </div>
  );
}
```

### Compact Mode

```tsx
// Smaller version for sidebar

import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";

export default function CompactDemo() {
  return (
    <div className="max-w-xl mx-auto scale-90 origin-top">
      <InteractiveAIDemo />
    </div>
  );
}
```

## Mobile-Specific Implementations

### Bottom Sheet on Mobile

```tsx
"use client";

import { useState } from "react";
import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-primary text-white font-semibold shadow-glow lg:hidden"
      >
        Try AI Demo
      </button>

      {/* Bottom sheet on mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed inset-x-0 bottom-0 z-50 bg-slate-950 rounded-t-3xl max-h-[90vh] overflow-y-auto lg:hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-white"
              >
                Close
              </button>
              <InteractiveAIDemo />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop version */}
      <div className="hidden lg:block">
        <InteractiveAIDemo />
      </div>
    </>
  );
}
```

## SEO-Optimized Page

```tsx
// Full SEO implementation

import InteractiveAIDemo from "@/components/features/InteractiveAIDemo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Voice Agent Demo - See It Live | Capture Client",
  description: "Try our AI-powered voice agent for free. See how it captures leads, qualifies customers, and integrates with your CRM - no signup required.",
  keywords: [
    "AI voice agent demo",
    "AI receptionist demo",
    "automated lead capture",
    "AI customer service demo",
  ],
  openGraph: {
    title: "Try Our AI Voice Agent - Free Interactive Demo",
    description: "Experience AI-powered lead capture in real-time. No signup required.",
    type: "website",
    images: [
      {
        url: "/og-demo.jpg",
        width: 1200,
        height: 630,
        alt: "AI Voice Agent Demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Try Our AI Voice Agent Demo",
    description: "Interactive demo - see how AI captures and qualifies leads automatically",
  },
};

export default function SEODemoPage() {
  return (
    <main>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AI Voice Agent Demo",
            description: "Interactive demo of AI-powered voice agent technology",
            applicationCategory: "BusinessApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />

      <InteractiveAIDemo />
    </main>
  );
}
```

## Environment Configuration

### .env.local (Development)

```bash
# Required for AI responses
ANTHROPIC_API_KEY=sk-ant-api03-...

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MIXPANEL_TOKEN=xxxxx
```

### .env.production (Production)

```bash
# Production API key
ANTHROPIC_API_KEY=sk-ant-api03-...

# Rate limiting
RATE_LIMIT_MAX_REQUESTS=10
RATE_LIMIT_WINDOW_MS=60000

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deployment Checklist

- [ ] Environment variables configured
- [ ] API rate limiting tested
- [ ] Mobile responsive verified
- [ ] Accessibility audit completed
- [ ] Analytics tracking confirmed
- [ ] Error boundaries tested
- [ ] Performance metrics baseline established
- [ ] SEO metadata added
- [ ] Social sharing tested
- [ ] Cross-browser compatibility verified

---

**Need Help?** Check the main README or contact the Component Architect team.
