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
      {
        label: "Legal & Law Firms",
        href: "/who-we-serve/legal-law-firms",
        description: "24/7 call handling for law firms",
        icon: "legal",
      },
      {
        label: "Home Services",
        href: "/who-we-serve/home-services",
        description: "HVAC, plumbing & contractor support",
        icon: "home-services",
      },
      {
        label: "Real Estate Agents",
        href: "/who-we-serve/real-estate",
        description: "Property inquiries & showings 24/7",
        icon: "real-estate",
      },
      {
        label: "Healthcare & Medical",
        href: "/who-we-serve/healthcare",
        description: "Patient scheduling & appointment management",
        icon: "healthcare",
      },
      {
        label: "IT Services & MSPs",
        href: "/who-we-serve/it-services",
        description: "Tech support triage & ticket routing",
        icon: "it-services",
      },
      {
        label: "Automotive Services",
        href: "/who-we-serve/automotive",
        description: "Service appointments & sales inquiries",
        icon: "automotive",
      },
      {
        label: "Financial Services",
        href: "/who-we-serve/financial-services",
        description: "Client onboarding & appointment booking",
        icon: "financial-services",
      },
      {
        label: "Insurance Agencies",
        href: "/who-we-serve/insurance",
        description: "Quote requests & policy inquiries",
        icon: "insurance",
      },
      {
        label: "Property Management",
        href: "/who-we-serve/property-management",
        description: "Tenant requests & maintenance coordination",
        icon: "property-management",
      },
      {
        label: "Cleaning Services",
        href: "/who-we-serve/cleaning-services",
        description: "Booking & scheduling automation",
        icon: "cleaning",
      },
      {
        label: "Pest Control",
        href: "/who-we-serve/pest-control",
        description: "Emergency calls & service scheduling",
        icon: "pest-control",
      },
      {
        label: "Restaurants & Hospitality",
        href: "/who-we-serve/restaurants",
        description: "Reservations & takeout orders",
        icon: "restaurants",
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
      {
        label: "Fitness & Gyms",
        href: "/industries/fitness",
        description: "Member management & bookings",
        icon: "fitness",
      },
      {
        label: "Martial Arts",
        href: "/industries/martial-arts",
        description: "Class scheduling & trials",
        icon: "martial-arts",
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
  navigationData.industries,
  navigationData.resources,
];
