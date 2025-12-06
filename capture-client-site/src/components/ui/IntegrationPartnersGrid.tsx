"use client";

import { motion } from "@/lib/motion";

/**
 * Integration Partner Data Interface
 */
export interface IntegrationPartner {
  /**
   * Integration name (e.g., "ServiceTitan")
   */
  name: string;
  /**
   * Category tag (e.g., "Field Service", "CRM")
   */
  category: string;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Logo path (relative to /public)
   */
  logo?: string;
  /**
   * Optional URL to integration detail page
   */
  url?: string;
  /**
   * Optional custom icon/emoji
   */
  icon?: string;
}

/**
 * IntegrationPartnersGrid Props
 */
interface IntegrationPartnersGridProps {
  /**
   * Array of integration partners to display
   */
  integrations: IntegrationPartner[];
  /**
   * Optional click handler for cards
   */
  onCardClick?: (integration: IntegrationPartner) => void;
  /**
   * Show description text in cards
   * @default false
   */
  showDescription?: boolean;
  /**
   * Custom className for grid wrapper
   */
  className?: string;
}

/**
 * IntegrationPartnersGrid Component
 *
 * Interactive grid showcase for integration partners.
 * Features glass cards with hover lift effects, responsive layout,
 * and graceful logo fallbacks.
 *
 * Responsive grid:
 * - Mobile: 2 columns
 * - Tablet: 3 columns
 * - Desktop: 4 columns
 *
 * @example
 * ```tsx
 * const integrations = [
 *   {
 *     name: "ServiceTitan",
 *     category: "Field Service",
 *     description: "Sync leads directly to ServiceTitan",
 *     icon: "🔧"
 *   },
 *   // ... more integrations
 * ];
 *
 * <IntegrationPartnersGrid integrations={integrations} />
 * ```
 */
export function IntegrationPartnersGrid({
  integrations,
  onCardClick,
  showDescription = false,
  className = "",
}: IntegrationPartnersGridProps) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 ${className}`}
    >
      {integrations.map((integration) => (
        <IntegrationCard
          key={integration.name}
          integration={integration}
          onClick={onCardClick}
          showDescription={showDescription}
        />
      ))}
    </div>
  );
}

/**
 * Individual Integration Card Component
 */
interface IntegrationCardProps {
  integration: IntegrationPartner;
  onClick?: (integration: IntegrationPartner) => void;
  showDescription?: boolean;
}

function IntegrationCard({
  integration,
  onClick,
  showDescription = false,
}: IntegrationCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(integration);
    } else if (integration.url) {
      window.location.href = integration.url;
    }
  };

  const isInteractive = Boolean(onClick || integration.url);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={isInteractive ? { scale: 0.98 } : {}}
      onClick={isInteractive ? handleClick : undefined}
      className={`glass p-6 rounded-xl text-center group transition-all duration-300 hover:border-accent/30 ${
        isInteractive ? "cursor-pointer" : ""
      }`}
      style={{
        // Hardware acceleration
        transform: "translateZ(0)",
      }}
      role={isInteractive ? "button" : "article"}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={
        isInteractive
          ? `View ${integration.name} integration details`
          : integration.name
      }
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    >
      {/* Logo/Icon Container */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
        {integration.icon ? (
          // Custom icon/emoji
          <span className="text-2xl" aria-hidden="true">
            {integration.icon}
          </span>
        ) : (
          // Text fallback - first letter
          <span className="text-2xl font-bold text-white/60 group-hover:text-accent transition-colors duration-300">
            {integration.name[0]}
          </span>
        )}

        {/* TODO: Add actual logo images when available */}
        {/* Uncomment when logos are ready
        {integration.logo && (
          <Image
            src={integration.logo}
            alt={`${integration.name} logo`}
            width={48}
            height={48}
            className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        )}
        */}
      </div>

      {/* Integration Name */}
      <h4 className="font-semibold text-white mb-1 text-sm lg:text-base">
        {integration.name}
      </h4>

      {/* Category Tag */}
      <p className="text-xs text-white/50 mb-2">{integration.category}</p>

      {/* Optional Description */}
      {showDescription && integration.description && (
        <p className="text-xs text-white/40 leading-relaxed mt-2">
          {integration.description}
        </p>
      )}
    </motion.div>
  );
}

/**
 * Example integration data
 *
 * Use this as a template for creating your integration data:
 */
export const exampleIntegrations: IntegrationPartner[] = [
  {
    name: "ServiceTitan",
    category: "Field Service",
    description: "Sync leads directly to your ServiceTitan account",
    icon: "🔧",
  },
  {
    name: "HubSpot",
    category: "CRM",
    description: "Two-way sync with HubSpot contacts and deals",
    icon: "📊",
  },
  {
    name: "Salesforce",
    category: "CRM",
    description: "Enterprise CRM integration for lead management",
    icon: "☁️",
  },
  {
    name: "Calendly",
    category: "Scheduling",
    description: "Seamless appointment booking integration",
    icon: "📅",
  },
  {
    name: "Zapier",
    category: "Automation",
    description: "Connect with 5000+ apps via Zapier",
    icon: "⚡",
  },
  {
    name: "QuickBooks",
    category: "Accounting",
    description: "Sync customer data with QuickBooks",
    icon: "💼",
  },
  {
    name: "Housecall Pro",
    category: "Field Service",
    description: "Integration with Housecall Pro workflow",
    icon: "🏠",
  },
  {
    name: "Jobber",
    category: "Field Service",
    description: "Streamline operations with Jobber",
    icon: "📋",
  },
];
