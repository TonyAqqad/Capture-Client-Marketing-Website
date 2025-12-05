'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getIntegrationLogo, getIntegrationLogoUrl } from '@/data/integration-logos';
import { cn } from '@/lib/utils';

export interface IntegrationLogoProps {
  /**
   * Integration key (e.g., 'zapier', 'hubspot', 'slack')
   */
  integration: string;

  /**
   * Size preset
   * - sm: 32px
   * - md: 48px (default)
   * - lg: 64px
   * - xl: 96px
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Custom width (overrides size preset)
   */
  width?: number;

  /**
   * Custom height (overrides size preset)
   */
  height?: number;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Show integration name as fallback
   */
  showNameFallback?: boolean;

  /**
   * Priority loading (for above-the-fold images)
   */
  priority?: boolean;

  /**
   * Grayscale filter (useful for "integrates with" sections)
   */
  grayscale?: boolean;
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
} as const;

/**
 * Integration Logo Component
 *
 * Displays integration partner logos with multiple fallback strategies:
 * 1. Official logo from integration-logos.ts mapping
 * 2. Clearbit Logo API
 * 3. Initials fallback (colored circle with first letter)
 *
 * @example
 * ```tsx
 * <IntegrationLogo integration="zapier" size="md" />
 * <IntegrationLogo integration="hubspot" size="lg" grayscale />
 * <IntegrationLogo integration="custom-integration" showNameFallback />
 * ```
 */
export function IntegrationLogo({
  integration,
  size = 'md',
  width,
  height,
  className,
  showNameFallback = true,
  priority = false,
  grayscale = false,
}: IntegrationLogoProps) {
  const [hasError, setHasError] = useState(false);

  // Get dimensions
  const logoSize = width && height ? { width, height } : { width: sizeMap[size], height: sizeMap[size] };

  // Get logo data
  const logoData = getIntegrationLogo(integration);
  const logoUrl = getIntegrationLogoUrl(integration);
  const displayName = logoData?.name || formatIntegrationName(integration);

  // If image failed to load, show fallback
  if (hasError) {
    return (
      <InitialsFallback
        name={displayName}
        size={logoSize.width}
        className={className}
        showName={showNameFallback}
      />
    );
  }

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        className
      )}
      style={{
        width: logoSize.width,
        height: logoSize.height,
      }}
    >
      <Image
        src={logoUrl}
        alt={`${displayName} logo`}
        width={logoSize.width}
        height={logoSize.height}
        className={cn(
          'object-contain',
          grayscale && 'grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300'
        )}
        onError={() => setHasError(true)}
        priority={priority}
        unoptimized // Clearbit logos are already optimized
      />
    </div>
  );
}

/**
 * Initials Fallback Component
 *
 * Shows a colored circle with the first letter of the integration name
 */
function InitialsFallback({
  name,
  size,
  className,
  showName,
}: {
  name: string;
  size: number;
  className?: string;
  showName?: boolean;
}) {
  const initial = name.charAt(0).toUpperCase();
  const backgroundColor = getColorFromString(name);

  return (
    <div
      className={cn(
        'relative inline-flex items-center gap-2',
        className
      )}
    >
      <div
        className="flex items-center justify-center rounded-lg font-semibold text-white"
        style={{
          width: size,
          height: size,
          backgroundColor,
          fontSize: size * 0.5,
        }}
      >
        {initial}
      </div>
      {showName && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {name}
        </span>
      )}
    </div>
  );
}

/**
 * Generate a consistent color from a string
 */
function getColorFromString(str: string): string {
  const colors = [
    '#3B82F6', // blue
    '#10B981', // green
    '#F59E0B', // amber
    '#EF4444', // red
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#14B8A6', // teal
    '#F97316', // orange
  ];

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }

  return colors[Math.abs(hash) % colors.length];
}

/**
 * Format integration key to display name
 * e.g., "google-calendar" -> "Google Calendar"
 */
function formatIntegrationName(key: string): string {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Integration Logo Grid Component
 *
 * Displays a grid of integration logos
 *
 * @example
 * ```tsx
 * <IntegrationLogoGrid
 *   integrations={['zapier', 'hubspot', 'salesforce']}
 *   size="md"
 *   grayscale
 * />
 * ```
 */
export function IntegrationLogoGrid({
  integrations,
  size = 'md',
  grayscale = true,
  className,
}: {
  integrations: string[];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  grayscale?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 items-center justify-items-center',
        className
      )}
    >
      {integrations.map((integration) => (
        <IntegrationLogo
          key={integration}
          integration={integration}
          size={size}
          grayscale={grayscale}
        />
      ))}
    </div>
  );
}

/**
 * Integration Logo Marquee Component
 *
 * Infinite scrolling marquee of integration logos
 *
 * @example
 * ```tsx
 * <IntegrationLogoMarquee
 *   integrations={['zapier', 'hubspot', 'salesforce', 'slack']}
 *   speed="slow"
 * />
 * ```
 */
export function IntegrationLogoMarquee({
  integrations,
  size = 'md',
  speed = 'normal',
  grayscale = true,
  className,
}: {
  integrations: string[];
  size?: 'sm' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'normal' | 'fast';
  grayscale?: boolean;
  className?: string;
}) {
  const speedMap = {
    slow: 60,
    normal: 40,
    fast: 20,
  };

  const animationDuration = speedMap[speed];

  // Duplicate integrations for seamless loop
  const allIntegrations = [...integrations, ...integrations];

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="flex gap-12 items-center"
        style={{
          animation: `marquee ${animationDuration}s linear infinite`,
        }}
      >
        {allIntegrations.map((integration, index) => (
          <div key={`${integration}-${index}`} className="flex-shrink-0">
            <IntegrationLogo
              integration={integration}
              size={size}
              grayscale={grayscale}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
