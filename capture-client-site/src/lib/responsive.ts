"use client";

import { useState, useEffect } from 'react';

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * Hook to detect current viewport breakpoint
 * Matches Tailwind defaults: mobile (<768px), tablet (768-1023px), desktop (≥1024px)
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const checkBreakpoint = () => {
      if (window.innerWidth < 768) {
        setBreakpoint('mobile');
      } else if (window.innerWidth < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);

  return breakpoint;
}

/**
 * Convenience hook for mobile detection
 */
export function useIsMobile(): boolean {
  return useBreakpoint() === 'mobile';
}

/**
 * Convenience hook for tablet detection
 */
export function useIsTablet(): boolean {
  return useBreakpoint() === 'tablet';
}

/**
 * Convenience hook for desktop detection
 */
export function useIsDesktop(): boolean {
  return useBreakpoint() === 'desktop';
}

/**
 * Hook to check if viewport is at or above a breakpoint
 * @param minBreakpoint - The minimum breakpoint to check against
 */
export function useMinBreakpoint(minBreakpoint: Breakpoint): boolean {
  const current = useBreakpoint();
  const order: Breakpoint[] = ['mobile', 'tablet', 'desktop'];
  return order.indexOf(current) >= order.indexOf(minBreakpoint);
}
