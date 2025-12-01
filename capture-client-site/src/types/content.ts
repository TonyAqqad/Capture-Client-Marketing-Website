/**
 * TypeScript interfaces for content data structures
 * Replaces `any` types throughout the application
 */

export interface Benefit {
  title: string;
  description: string;
  icon?: string;
}

export interface HowItWorksStep {
  step?: number;
  title: string;
  description: string;
  icon?: string;
}

export interface UseCase {
  title?: string;
  description?: string;
  industry?: string;
  challenge?: string;
  solution?: string;
  result?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  // Service page format
  name?: string;
  company?: string;
  role?: string;
  quote: string;
  image?: string;
  rating?: number;
  // Package page format
  author?: string;
  business?: string;
  location?: string;
  result?: string;
}

export interface TrustSignal {
  title: string;
  description: string;
  icon?: string;
  stat?: string;
}

export interface ComparisonRow {
  feature: string;
  starter: boolean | string;
  growth: boolean | string;
  enterprise: boolean | string;
}

export interface PackageFeature {
  name: string;
  description: string;
  value?: string;
  available_in?: string;
  note?: string;
}

/**
 * Service page data structure
 */
export interface ServiceContent {
  service: {
    title: string;
    service_slug: string;
    short_description: string;
    long_description: string;
    hero_cta_text?: string;
    hero_cta_url?: string;
  };
  benefits?: Benefit[];
  how_it_works?: HowItWorksStep[];
  use_cases?: UseCase[];
  faq?: FAQItem[];
  testimonials?: Testimonial[];
  trust_signals?: TrustSignal[];
}

/**
 * Location page data structure
 */
export interface LocationContent {
  location: {
    name: string;
    slug: string;
    state?: string;
    description: string;
    hero_cta_text?: string;
    hero_cta_url?: string;
  };
  services?: Array<{
    title: string;
    description: string;
  }>;
  benefits?: Benefit[];
  local_stats?: Array<{
    label: string;
    value: string;
  }>;
  faq?: FAQItem[];
  testimonials?: Testimonial[];
}

/**
 * Package/Pricing page data structure
 */
export interface PackageContent {
  package: {
    name: string;
    slug: string;
    price: string;
    billing_period?: string;
    description: string;
    tagline?: string;
    is_popular?: boolean;
  };
  features?: string[];
  benefits?: Benefit[];
  comparison?: ComparisonRow[];
  faq?: FAQItem[];
  cta_text?: string;
  cta_url?: string;
}

/**
 * National SEO keyword page data structure
 */
export interface NationalKeywordContent {
  keyword: {
    keyword_phrase: string;
    keyword_slug: string;
    title: string;
    description: string;
    hero_cta_text?: string;
    hero_cta_url?: string;
  };
  benefits?: Benefit[];
  how_it_works?: HowItWorksStep[];
  use_cases?: UseCase[];
  faq?: FAQItem[];
  testimonials?: Testimonial[];
  trust_signals?: TrustSignal[];
}
