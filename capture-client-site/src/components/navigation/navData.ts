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
  whoWeServe: {
    title: "Who We Serve",
    items: [
      // Top 3 Priority Industries
      {
        label: "Legal & Law Firms",
        href: "/who-we-serve/legal-law-firms",
        description: "24/7 call handling for law firms",
        icon: "legal",
      },
      {
        label: "Fitness & Gyms",
        href: "/who-we-serve/fitness",
        description: "Book trials 24/7, even during classes",
        icon: "fitness",
      },
      {
        label: "Martial Arts Studios",
        href: "/who-we-serve/martial-arts",
        description: "Answer parent calls while you teach",
        icon: "martial-arts",
      },
      // Additional High-Value Industries
      {
        label: "Home Services",
        href: "/who-we-serve/home-services",
        description: "HVAC, plumbing & contractor support",
        icon: "home-services",
      },
      {
        label: "Healthcare & Medical",
        href: "/who-we-serve/healthcare",
        description: "Patient scheduling & appointments",
        icon: "healthcare",
      },
      {
        label: "Real Estate",
        href: "/who-we-serve/real-estate",
        description: "Property inquiries & showings 24/7",
        icon: "real-estate",
      },
      {
        label: "Restaurants",
        href: "/who-we-serve/restaurants",
        description: "Reservations & takeout orders",
        icon: "restaurants",
      },
      // View All Link
      {
        label: "View All Industries",
        href: "/who-we-serve",
        description: "See all 14+ industries we serve",
        icon: "view-all",
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
        href: "/pricing",
        description: "See pricing and calculate your ROI",
        icon: "roi-calculator",
      },
      {
        label: "Missed Call Calculator",
        href: "/tools/missed-call-calculator",
        description: "See how much revenue you're losing",
        icon: "missed-calls",
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
  navigationData.whoWeServe,
  navigationData.resources,
];
