/**
 * Custom SVG Icons for Navigation
 * Premium, minimal icon set with consistent stroke weight
 */

import React from "react";

interface IconProps {
  className?: string;
}

// Solutions Icons
export const DemoIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 10L19.553 7.724C20.237 7.382 21 7.87 21 8.618V15.382C21 16.13 20.237 16.618 19.553 16.276L15 14M5 18H13C14.105 18 15 17.105 15 16V8C15 6.895 14.105 6 13 6H5C3.895 6 3 6.895 3 8V16C3 17.105 3.895 18 5 18Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IntegrationsIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.5 10.5L21 3M21 3H16.5M21 3V7.5M10.5 13.5L3 21M3 21H7.5M3 21V16.5M21 13.5L13.5 21M21 21V16.5M21 21H16.5M3 10.5L10.5 3M3 3V7.5M3 3H7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FeaturesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 12L11 14L15 10M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HowItWorksIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 5H7C5.895 5 5 5.895 5 7V19C5 20.105 5.895 21 7 21H17C18.105 21 19 20.105 19 19V7C19 5.895 18.105 5 17 5H15M9 5C9 6.105 9.895 7 11 7H13C14.105 7 15 6.105 15 5M9 5C9 3.895 9.895 3 11 3H13C14.105 3 15 3.895 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const UseCasesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 6C4 4.895 4.895 4 6 4H8C9.105 4 10 4.895 10 6V8C10 9.105 9.105 10 8 10H6C4.895 10 4 9.105 4 8V6ZM14 6C14 4.895 14.895 4 16 4H18C19.105 4 20 4.895 20 6V8C20 9.105 19.105 10 18 10H16C14.895 10 14 9.105 14 8V6ZM4 16C4 14.895 4.895 14 6 14H8C9.105 14 10 14.895 10 16V18C10 19.105 9.105 20 8 20H6C4.895 20 4 19.105 4 18V16ZM14 16C14 14.895 14.895 14 16 14H18C19.105 14 20 14.895 20 16V18C20 19.105 19.105 20 18 20H16C14.895 20 14 19.105 14 18V16Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PricingIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 8V8.01M12 11V16M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Industries Icons
export const HealthcareIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.318 6.318C2.561 8.075 2.561 10.925 4.318 12.682L12 20.364L19.682 12.682C21.439 10.925 21.439 8.075 19.682 6.318C17.925 4.561 15.075 4.561 13.318 6.318L12 7.636L10.682 6.318C8.925 4.561 6.075 4.561 4.318 6.318Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HomeServicesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.552 5.448 21 6 21H9M19 10L21 12M19 10V20C19 20.552 18.552 21 18 21H15M9 21C9.552 21 10 20.552 10 20V16C10 15.448 10.448 15 11 15H13C13.552 15 14 15.448 14 16V20C14 20.552 14.448 21 15 21M9 21H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const RealEstateIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 21V5C19 3.895 18.105 3 17 3H7C5.895 3 5 3.895 5 5V21M3 21H21M9 7H10M9 11H10M14 7H15M14 11H15M14 15H15M14 19H15M9 15H10M9 19H10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LegalIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 6L3 8C3 9.105 3.895 10 5 10C6.105 10 7 9.105 7 8V6M3 6C3 4.895 3.895 4 5 4C6.105 4 7 4.895 7 6M3 6H7M5 10V20M5 20H8M5 20H2M17 8V20M17 20H14M17 20H20M17 8C18.657 8 20 6.657 20 5C20 3.343 18.657 2 17 2C15.343 2 14 3.343 14 5C14 6.657 15.343 8 17 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const AutomotiveIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 17C5 17.552 5.448 18 6 18C6.552 18 7 17.552 7 17C7 16.448 6.552 16 6 16C5.448 16 5 16.448 5 17ZM17 17C17 17.552 17.448 18 18 18C18.552 18 19 17.552 19 17C19 16.448 18.552 16 18 16C17.448 16 17 16.448 17 17ZM4 7L6 17H18L20 7H4ZM4 7C3.448 7 3 6.552 3 6C3 5.448 3.448 5 4 5H20C20.552 5 21 5.448 21 6C21 6.552 20.552 7 20 7M9 11H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const RestaurantsIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 2V12C3 13.105 3.895 14 5 14C6.105 14 7 13.105 7 12V2M3 2H7M5 14V22M17 10C19.209 10 21 8.209 21 6V2M17 2V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ITServicesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 16L4 20M4 20H8M4 20C4 18.895 4.895 18 6 18H18C19.105 18 20 18.895 20 20M20 20H16M20 20V16M9 5H15M12 5V8M5 8H19C20.105 8 21 8.895 21 10V14C21 15.105 20.105 16 19 16H5C3.895 16 3 15.105 3 14V10C3 8.895 3.895 8 5 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FinancialServicesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 8C10.343 8 9 9.343 9 11C9 12.657 10.343 14 12 14C13.657 14 15 15.343 15 17C15 18.657 13.657 20 12 20M12 8C13.11 8 14.08 8.59 14.593 9.5M12 8V6M12 20V22M12 20C10.89 20 9.92 19.41 9.407 18.5M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const InsuranceIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12L11 14L15 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PropertyManagementIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 21V5C19 3.895 18.105 3 17 3H7C5.895 3 5 3.895 5 5V21M3 21H21M9 7H10M9 11H10M9 15H10M14 7H15M14 11H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 21V17C16 16.448 15.552 16 15 16H13C12.448 16 12 16.448 12 17V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CleaningIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19 14L20.293 12.707C20.921 12.079 21 11.111 20.413 10.413L19 9C18.448 8.448 17.552 8.448 17 9L14 12M14 12L8.5 17.5C8.224 17.776 8 18.224 8 18.707V21H10.293C10.776 21 11.224 20.776 11.5 20.5L17 15M14 12L17 15M5 8L3 10L5 12L7 10L5 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 5L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PestControlIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4C9.791 4 8 5.791 8 8C8 9.657 9.343 11 11 11H13C14.657 11 16 9.657 16 8C16 5.791 14.209 4 12 4ZM12 4V2M6 8H4M20 8H18M7.5 6L6 4.5M16.5 6L18 4.5M11 11V14M13 11V14M11 14C9.343 14 8 15.343 8 17V20M13 14C14.657 14 16 15.343 16 17V20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Resources Icons
export const BlogIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 6.253V13L15.844 10.573M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CaseStudiesIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 19V6L3 12L9 19ZM9 19L15 12L9 6M15 19V6L21 12L15 19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ROICalculatorIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 7H10M9 11H10M9 15H10M14 7H15M14 11H15M14 15H15M6 20H18C19.105 20 20 19.105 20 18V6C20 4.895 19.105 4 18 4H6C4.895 4 4 4.895 4 6V18C4 19.105 4.895 20 6 20Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FAQIcon: React.FC<IconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.228 9C8.623 7.343 10.147 6 12 6C14.209 6 16 7.791 16 10C16 11.892 14.751 13.482 13 13.899V15M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12ZM12 18H12.01V18.01H12V18Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Icon mapping object
export const navIcons: Record<string, React.FC<IconProps>> = {
  demo: DemoIcon,
  integrations: IntegrationsIcon,
  features: FeaturesIcon,
  "how-it-works": HowItWorksIcon,
  "use-cases": UseCasesIcon,
  pricing: PricingIcon,
  healthcare: HealthcareIcon,
  "home-services": HomeServicesIcon,
  "real-estate": RealEstateIcon,
  legal: LegalIcon,
  automotive: AutomotiveIcon,
  restaurants: RestaurantsIcon,
  "it-services": ITServicesIcon,
  "financial-services": FinancialServicesIcon,
  insurance: InsuranceIcon,
  "property-management": PropertyManagementIcon,
  cleaning: CleaningIcon,
  "pest-control": PestControlIcon,
  blog: BlogIcon,
  "case-studies": CaseStudiesIcon,
  "roi-calculator": ROICalculatorIcon,
  faq: FAQIcon,
};
