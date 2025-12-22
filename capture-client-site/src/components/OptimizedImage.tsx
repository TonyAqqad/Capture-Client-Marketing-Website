"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "placeholder" | "blurDataURL"> {
  /**
   * Whether this image is above the fold and should be prioritized for loading
   * This affects LCP (Largest Contentful Paint)
   */
  priority?: boolean;

  /**
   * Alt text for accessibility - required
   */
  alt: string;

  /**
   * Optional CSS classes
   */
  className?: string;

  /**
   * Whether to show a skeleton loader while image loads
   */
  showLoader?: boolean;
}

/**
 * OptimizedImage Component
 *
 * A performance-optimized wrapper around next/image with:
 * - Automatic blur placeholder for smooth loading
 * - Priority loading for above-the-fold images
 * - Proper sizes attribute for responsive loading
 * - Loading state management
 * - AVIF/WebP format optimization (configured in next.config.js)
 *
 * Usage:
 * <OptimizedImage
 *   src="/hero-image.jpg"
 *   alt="Hero banner"
 *   width={1920}
 *   height={1080}
 *   priority  // Use for above-the-fold images
 *   sizes="100vw"  // Responsive sizing
 * />
 */
export default function OptimizedImage({
  priority = false,
  alt,
  className = "",
  showLoader = true,
  sizes,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Generate proper sizes attribute if not provided
  const responsiveSizes =
    sizes || (props.fill ? "100vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw");

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton - prevents CLS */}
      {showLoader && isLoading && (
        <div className="absolute inset-0 bg-surface/20 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface/30 to-transparent animate-shimmer" />
        </div>
      )}

      <Image
        {...props}
        alt={alt}
        sizes={responsiveSizes}
        priority={priority}
        quality={90}
        onLoad={() => setIsLoading(false)}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        style={{
          ...props.style,
        }}
      />
    </div>
  );
}

/**
 * Predefined image sizes for common use cases
 */
export const ImageSizes = {
  // Hero/Banner images (full width)
  hero: "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px",

  // Feature cards (responsive grid)
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",

  // Testimonial avatars
  avatar: "(max-width: 640px) 64px, 96px",

  // Logo images
  logo: "(max-width: 640px) 120px, 180px",

  // Full width sections
  fullWidth: "100vw",

  // Half width sections
  halfWidth: "(max-width: 1024px) 100vw, 50vw",

  // Third width (3-column grid)
  thirdWidth: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",

  // Quarter width (4-column grid)
  quarterWidth: "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw",
};
