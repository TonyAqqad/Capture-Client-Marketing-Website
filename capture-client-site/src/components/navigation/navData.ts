/**
 * Navigation Data Structure for MegaMenu
 * Centralized configuration for all navigation items
 */

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string; // Icon identifier for navIcons
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationData: Record<string, NavSection> = {
  solutions: {
    title: "Solutions",
    items: [
      {
        label: "Demo",
        href: "/demo",
        description: "See our AI voice agents in action",
        icon: "demo",
      },
      {
        label: "Integrations",
        href: "/integrations",
        description: "Connect with your favorite tools",
        icon: "integrations",
      },
      {
        label: "Features",
        href: "/features",
        description: "Powerful capabilities that convert",
        icon: "features",
      },
      {
        label: "How It Works",
        href: "/how-it-works",
        description: "Our proven 3-step process",
        icon: "how-it-works",
      },
      {
        label: "Use Cases",
        href: "/use-cases",
        description: "Real-world applications",
        icon: "use-cases",
      },
      {
        label: "Pricing",
        href: "/pricing",
        description: "Transparent, value-driven plans",
        icon: "pricing",
      },
    ],
  },
  industries: {
    title: "Industries",
    items: [
      {
        label: "Healthcare",
        href: "/industries/healthcare",
        description: "Patient scheduling & triage",
        icon: "healthcare",
      },
      {
        label: "Home Services",
        href: "/industries/home-services",
        description: "HVAC, plumbing & contractors",
        icon: "home-services",
      },
      {
        label: "Real Estate",
        href: "/industries/real-estate",
        description: "Property inquiries 24/7",
        icon: "real-estate",
      },
      {
        label: "Legal",
        href: "/industries/legal",
        description: "Client intake automation",
        icon: "legal",
      },
      {
        label: "Automotive",
        href: "/industries/automotive",
        description: "Service scheduling & sales",
        icon: "automotive",
      },
      {
        label: "Restaurants",
        href: "/industries/restaurants",
        description: "Reservations & takeout orders",
        icon: "restaurants",
      },
    ],
  },
  resources: {
    title: "Resources",
    items: [
      {
        label: "Blog",
        href: "/blog",
        description: "Industry insights & trends",
        icon: "blog",
      },
      {
        label: "Case Studies",
        href: "/case-studies",
        description: "Success stories from clients",
        icon: "case-studies",
      },
      {
        label: "ROI Calculator",
        href: "/roi-calculator",
        description: "Calculate your revenue impact",
        icon: "roi-calculator",
      },
      {
        label: "FAQ",
        href: "/faq",
        description: "Common questions answered",
        icon: "faq",
      },
    ],
  },
};

// Flat list for mobile menu (preserves section grouping)
export const mobileNavSections = [
  navigationData.solutions,
  navigationData.industries,
  navigationData.resources,
];
