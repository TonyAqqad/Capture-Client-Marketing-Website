/**
 * CLIENT LOGOS CAROUSEL - Integration Code Examples
 *
 * Copy-paste ready examples for integrating the ClientLogosCarousel
 * and IntegrationPartnersGrid components into your pages.
 *
 * File locations:
 * - ClientLogosCarousel: src/components/ui/ClientLogosCarousel.tsx
 * - IntegrationPartnersGrid: src/components/ui/IntegrationPartnersGrid.tsx
 */

// ============================================================================
// EXAMPLE 1: Homepage Integration (Recommended)
// ============================================================================

// File: src/app/page.tsx

import { ClientLogosCarousel } from "@/components/ui/ClientLogosCarousel";
import { PremiumHero } from "@/components/sections/PremiumHero";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
// ... other imports

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <PremiumHero />

      {/* SOCIAL PROOF CAROUSEL - Add here for maximum impact */}
      <ClientLogosCarousel />

      {/* Features Section */}
      <FeaturesSection />

      {/* Rest of your sections... */}
    </main>
  );
}

// ============================================================================
// EXAMPLE 2: Integrations Page (Full Implementation)
// ============================================================================

// File: src/app/integrations/page.tsx

import {
  IntegrationPartnersGrid,
  IntegrationPartner,
  exampleIntegrations,
} from "@/components/ui/IntegrationPartnersGrid";
import { ClientLogosCarousel } from "@/components/ui/ClientLogosCarousel";

// Define your integrations data
const allIntegrations: IntegrationPartner[] = [
  {
    name: "ServiceTitan",
    category: "Field Service",
    description: "Sync leads directly to your ServiceTitan account",
    icon: "🔧",
    url: "/integrations/servicetitan",
  },
  {
    name: "HubSpot",
    category: "CRM",
    description: "Two-way sync with HubSpot contacts and deals",
    icon: "📊",
    url: "/integrations/hubspot",
  },
  {
    name: "Salesforce",
    category: "CRM",
    description: "Enterprise CRM integration for lead management",
    icon: "☁️",
    url: "/integrations/salesforce",
  },
  {
    name: "Calendly",
    category: "Scheduling",
    description: "Seamless appointment booking integration",
    icon: "📅",
    url: "/integrations/calendly",
  },
  {
    name: "Zapier",
    category: "Automation",
    description: "Connect with 5000+ apps via Zapier",
    icon: "⚡",
    url: "/integrations/zapier",
  },
  {
    name: "QuickBooks",
    category: "Accounting",
    description: "Sync customer data with QuickBooks",
    icon: "💼",
    url: "/integrations/quickbooks",
  },
  {
    name: "Housecall Pro",
    category: "Field Service",
    description: "Integration with Housecall Pro workflow",
    icon: "🏠",
    url: "/integrations/housecall-pro",
  },
  {
    name: "Jobber",
    category: "Field Service",
    description: "Streamline operations with Jobber",
    icon: "📋",
    url: "/integrations/jobber",
  },
  // Add more integrations...
];

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-background-darker">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Seamless Integrations
          </h1>
          <p className="text-lg lg:text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Connect Capture Client with your existing tools and workflows. Start capturing more
            leads in minutes.
          </p>
        </div>
      </section>

      {/* Scrolling Logo Carousel */}
      <ClientLogosCarousel />

      {/* Integration Partners Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">All Integration Partners</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Click any integration to learn more about how Capture Client works with your favorite
              tools.
            </p>
          </div>

          <IntegrationPartnersGrid integrations={allIntegrations} showDescription={true} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-premium p-12 lg:p-16 rounded-3xl max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Don't See Your Tool?</h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
              We're constantly adding new integrations. Let us know what you need and we'll
              prioritize it.
            </p>
            <button className="btn-primary px-8 py-4 text-lg">Request Integration</button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// EXAMPLE 3: About Page Integration
// ============================================================================

// File: src/app/about/page.tsx

import { ClientLogosCarousel } from "@/components/ui/ClientLogosCarousel";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-24">
      {/* About Hero */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold mb-6">About Capture Client</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We're on a mission to help businesses never miss another lead.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Founded in 2020, Capture Client was born from a simple observation: businesses were
            losing thousands of dollars in missed calls and unanswered messages...
          </p>
        </div>
      </section>

      {/* TRUST SIGNAL - Add carousel here */}
      <ClientLogosCarousel />

      {/* Team Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">Our Team</h2>
          {/* Team cards... */}
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// EXAMPLE 4: With Custom Click Handler & Analytics
// ============================================================================

// File: src/app/integrations/page.tsx (Advanced)

("use client");

import { useRouter } from "next/navigation";
import {
  IntegrationPartnersGrid,
  IntegrationPartner,
} from "@/components/ui/IntegrationPartnersGrid";

export default function IntegrationsPage() {
  const router = useRouter();

  // Custom click handler with analytics
  const handleIntegrationClick = (integration: IntegrationPartner) => {
    // Track with Google Analytics (if installed)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "integration_click", {
        event_category: "Integrations",
        event_label: integration.name,
        integration_category: integration.category,
      });
    }

    // Navigate to detail page
    if (integration.url) {
      router.push(integration.url);
    }
  };

  return (
    <main>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <IntegrationPartnersGrid
            integrations={allIntegrations}
            onCardClick={handleIntegrationClick}
            showDescription={true}
          />
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// EXAMPLE 5: Creating Integration Data from CMS/API
// ============================================================================

// File: src/app/integrations/page.tsx (Dynamic Data)

import {
  IntegrationPartnersGrid,
  IntegrationPartner,
} from "@/components/ui/IntegrationPartnersGrid";

// Fetch integrations from your CMS or API
async function getIntegrations(): Promise<IntegrationPartner[]> {
  // Example: Fetch from headless CMS
  const response = await fetch("https://your-cms.com/api/integrations");
  const data = await response.json();

  // Transform API data to IntegrationPartner interface
  return data.map((item: any) => ({
    name: item.name,
    category: item.category,
    description: item.description,
    icon: item.icon,
    logo: item.logo_url,
    url: `/integrations/${item.slug}`,
  }));
}

export default async function IntegrationsPage() {
  // Server-side data fetching
  const integrations = await getIntegrations();

  return (
    <main>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <IntegrationPartnersGrid integrations={integrations} />
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// EXAMPLE 6: Filtering Integrations by Category
// ============================================================================

// File: src/app/integrations/page.tsx (With Filtering)

("use client");

import { useState } from "react";
import {
  IntegrationPartnersGrid,
  IntegrationPartner,
  exampleIntegrations,
} from "@/components/ui/IntegrationPartnersGrid";

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Get unique categories
  const categories = ["All", ...new Set(exampleIntegrations.map((i) => i.category))];

  // Filter integrations
  const filteredIntegrations =
    selectedCategory === "All"
      ? exampleIntegrations
      : exampleIntegrations.filter((i) => i.category === selectedCategory);

  return (
    <main>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-accent text-background-dark"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filtered Grid */}
          <IntegrationPartnersGrid integrations={filteredIntegrations} />
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// EXAMPLE 7: Custom Styling
// ============================================================================

// Adding custom classes to components

export function CustomStyledIntegrations() {
  return (
    <>
      {/* Carousel with custom background */}
      <ClientLogosCarousel className="bg-gradient-to-b from-background-dark to-background-darker border-0" />

      {/* Grid with custom gap and max width */}
      <IntegrationPartnersGrid
        integrations={exampleIntegrations}
        className="max-w-5xl mx-auto gap-6 lg:gap-8"
      />
    </>
  );
}

// ============================================================================
// TYPESCRIPT INTERFACES (For Reference)
// ============================================================================

// Already exported from components, but here for quick reference:

interface ClientLogo {
  name: string; // Company name (e.g., "ServiceTitan")
  logo: string; // Path to logo image
  url?: string; // Optional link URL
}

interface IntegrationPartner {
  name: string; // Integration name (required)
  category: string; // Category tag (required)
  description?: string; // Optional description
  logo?: string; // Optional logo path
  url?: string; // Optional detail page URL
  icon?: string; // Optional emoji/icon
}

// ============================================================================
// USAGE TIPS
// ============================================================================

/**
 * TIP 1: Import what you need
 * Only import the components you're using to keep bundle size small
 */

/**
 * TIP 2: Use example data to start
 * The components come with `exampleIntegrations` you can use immediately
 */

/**
 * TIP 3: Add real logos later
 * Start with icon/emoji fallbacks, add actual logo images when ready
 */

/**
 * TIP 4: TypeScript autocomplete
 * Both components have full TypeScript support with JSDoc comments
 */

/**
 * TIP 5: Customize props gradually
 * Start with defaults, then customize as needed based on real usage
 */
