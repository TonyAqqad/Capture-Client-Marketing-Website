"use client";

import React, { useRef, useState, useEffect, MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "@/lib/motion";
import { clsx } from "clsx";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
}

/**
 * MagneticButton - Premium cursor-following button with physics-based animations
 *
 * Features:
 * - Magnetic cursor-following effect (desktop only)
 * - Smooth spring physics via Framer Motion
 * - Shimmer/glow effect on hover
 * - Click ripple effect
 * - Multiple variants and sizes
 * - Full accessibility support
 * - SSR-safe with mobile detection
 *
 * Technical:
 * - Disables magnetic effect on mobile/touch for performance
 * - Uses GPU-accelerated transforms
 * - Proper SSR guards to prevent hydration errors
 */
export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  fullWidth = false,
  ariaLabel,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  // Magnetic effect motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth magnetic pull
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  // Ripple effect state
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Mobile/touch detection (SSR-safe)
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // SSR guard: Only run on client
  useEffect(() => {
    setIsMounted(true);

    const checkMobile = () => {
      // Check for touch support OR small screen
      const hasTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 1024;
      setIsMobile(hasTouch || isSmallScreen);
    };

    checkMobile();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  // Magnetic effect handler
  const handleMouseMove = (e: MouseEvent) => {
    // Disable on touch devices or when disabled
    if (!ref.current || isMobile || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // 30% pull strength for subtle effect
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    if (isMobile || disabled) return;
    x.set(0);
    y.set(0);
  };

  // Ripple effect on click
  const handleClick = (e: MouseEvent) => {
    if (disabled) return;

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const rippleX = e.clientX - rect.left;
      const rippleY = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x: rippleX, y: rippleY, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }

    if (onClick) onClick();
  };

  // Base styles
  const baseClasses = clsx(
    "relative inline-flex items-center justify-center font-semibold transition-all duration-300",
    "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background",
    "overflow-hidden touch-manipulation select-none",
    {
      "w-full": fullWidth,
      "opacity-50 cursor-not-allowed": disabled,
      "cursor-pointer": !disabled,
    }
  );

  // Variant styles
  const variantClasses = {
    primary: clsx(
      "bg-gradient-to-r from-accent via-primary to-accent text-white",
      "shadow-glow-lg hover:shadow-glow-gold-lg border-2 border-transparent",
      "hover:border-gold/30 hover:shadow-glow-gold-intense"
    ),
    secondary: clsx(
      "bg-transparent border-2 border-surface-border text-foreground backdrop-blur-sm",
      "hover:bg-surface/50 hover:border-primary/50"
    ),
    ghost: clsx(
      "bg-white/5 border border-white/10 text-foreground backdrop-blur-sm",
      "hover:bg-white/10 hover:border-white/20"
    ),
  };

  // Size styles (minimum 44x44px for touch targets)
  const sizeClasses = {
    sm: "px-5 py-3 text-sm rounded-lg min-h-[48px]",
    md: "px-6 py-3.5 text-base rounded-xl min-h-[48px]",
    lg: "px-8 py-4 text-lg rounded-2xl min-h-[52px]",
  };

  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // Content with shimmer effect
  const content = (
    <>
      {/* Shimmer effect on hover (primary variant only) */}
      {variant === "primary" && !disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      {/* Gold glow overlay for primary variant */}
      {variant === "primary" && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </>
  );

  // Render as anchor if href is provided
  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={buttonClasses}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        style={isMounted && !isMobile && !disabled ? { x: springX, y: springY } : {}}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        transition={{ duration: 0.1 }}
      >
        {content}
      </motion.a>
    );
  }

  // Render as button
  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={buttonClasses}
      aria-label={ariaLabel}
      disabled={disabled}
      style={isMounted && !isMobile && !disabled ? { x: springX, y: springY } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.1 }}
    >
      {content}
    </motion.button>
  );
}
