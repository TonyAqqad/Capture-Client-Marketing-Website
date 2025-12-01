/**
 * Skeleton Loading Components
 *
 * Prevents Cumulative Layout Shift (CLS) by providing placeholder UI
 * while content loads. This is critical for Core Web Vitals.
 *
 * Usage:
 * ```tsx
 * // Basic skeleton
 * <Skeleton className="h-4 w-32" />
 *
 * // Card skeleton
 * <SkeletonCard />
 *
 * // Text skeleton with multiple lines
 * <SkeletonText lines={3} />
 *
 * // Custom skeleton grid
 * <div className="grid grid-cols-3 gap-4">
 *   <SkeletonCard />
 *   <SkeletonCard />
 *   <SkeletonCard />
 * </div>
 * ```
 */

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether to show animated shimmer effect
   */
  animate?: boolean;
}

/**
 * Base Skeleton Component
 * A simple animated placeholder
 */
export function Skeleton({
  className,
  animate = true,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-surface/20 rounded-lg",
        animate && "animate-pulse",
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton with shimmer effect (more performant than pulse)
 */
export function SkeletonShimmer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative overflow-hidden bg-surface/20 rounded-lg", className)}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

/**
 * Skeleton Card
 * Mimics the structure of feature cards
 */
interface SkeletonCardProps {
  /**
   * Whether to show the icon skeleton
   */
  showIcon?: boolean;

  /**
   * Number of text lines to show
   */
  lines?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export function SkeletonCard({
  showIcon = true,
  lines = 3,
  className,
}: SkeletonCardProps) {
  return (
    <div className={cn("card space-y-4", className)}>
      {showIcon && <Skeleton className="h-16 w-16 rounded-xl" />}
      <div className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-4"
            style={{ width: `${100 - i * 10}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton Text
 * Multiple lines of text skeleton
 */
interface SkeletonTextProps {
  /**
   * Number of lines
   */
  lines?: number;

  /**
   * Whether the last line should be shorter
   */
  lastLineShort?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export function SkeletonText({
  lines = 3,
  lastLineShort = true,
  className,
}: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4"
          style={{
            width:
              lastLineShort && i === lines - 1
                ? "60%"
                : `${95 - (i % 3) * 5}%`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Avatar
 * For profile pictures or icons
 */
interface SkeletonAvatarProps {
  /**
   * Size of the avatar
   */
  size?: "sm" | "md" | "lg" | "xl";

  /**
   * Additional CSS classes
   */
  className?: string;
}

export function SkeletonAvatar({
  size = "md",
  className,
}: SkeletonAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  };

  return (
    <Skeleton className={cn("rounded-full", sizeClasses[size], className)} />
  );
}

/**
 * Skeleton Button
 */
interface SkeletonButtonProps {
  /**
   * Button variant
   */
  variant?: "primary" | "secondary" | "ghost";

  /**
   * Additional CSS classes
   */
  className?: string;
}

export function SkeletonButton({
  variant = "primary",
  className,
}: SkeletonButtonProps) {
  const variantClasses = {
    primary: "h-12 w-32",
    secondary: "h-10 w-28",
    ghost: "h-10 w-24",
  };

  return (
    <Skeleton
      className={cn("rounded-xl", variantClasses[variant], className)}
    />
  );
}

/**
 * Skeleton Image
 * For image placeholders with aspect ratio
 */
interface SkeletonImageProps {
  /**
   * Aspect ratio (width / height)
   */
  aspectRatio?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export function SkeletonImage({
  aspectRatio = 16 / 9,
  className,
}: SkeletonImageProps) {
  return (
    <Skeleton
      className={cn("w-full rounded-xl", className)}
      style={{ aspectRatio }}
    />
  );
}

/**
 * Skeleton Hero Section
 * For homepage hero loading state
 */
export function SkeletonHero() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="container-custom px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Title skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-12 w-2/3 mx-auto" />
          </div>

          {/* Subtitle skeleton */}
          <Skeleton className="h-8 w-1/2 mx-auto" />

          {/* Description skeleton */}
          <div className="max-w-3xl mx-auto space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-4">
            <SkeletonButton variant="primary" />
            <SkeletonButton variant="ghost" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton Grid
 * For feature grids or card layouts
 */
interface SkeletonGridProps {
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4;

  /**
   * Number of items to show
   */
  count?: number;

  /**
   * Whether to show icons in cards
   */
  showIcons?: boolean;
}

export function SkeletonGrid({
  columns = 4,
  count = 4,
  showIcons = true,
}: SkeletonGridProps) {
  const gridClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridClasses[columns])}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} showIcon={showIcons} />
      ))}
    </div>
  );
}

/**
 * Skeleton Testimonial
 */
export function SkeletonTestimonial() {
  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-4">
        <SkeletonAvatar size="md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <SkeletonText lines={4} />
    </div>
  );
}

/**
 * Skeleton Pricing Card
 */
export function SkeletonPricingCard() {
  return (
    <div className="card space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 flex-1" />
          </div>
        ))}
      </div>

      <SkeletonButton variant="primary" className="w-full" />
    </div>
  );
}

/**
 * Add shimmer animation to globals.css:
 *
 * @keyframes shimmer {
 *   0% { transform: translateX(-100%); }
 *   100% { transform: translateX(100%); }
 * }
 *
 * .animate-shimmer {
 *   animation: shimmer 2s infinite;
 * }
 */

export default Skeleton;
