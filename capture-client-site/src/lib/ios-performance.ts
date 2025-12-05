/**
 * iOS Performance Optimization Utilities
 *
 * This module provides iOS-specific performance optimizations to prevent
 * memory issues, animation throttling, and Safari-specific bugs.
 */

// ============================================================================
// DEVICE DETECTION
// ============================================================================

/**
 * Detects if the current device is iOS (iPhone/iPad)
 * Uses both userAgent and platform checks for reliability
 */
export function isIOSDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  // Check userAgent for iOS identifiers
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOSUserAgent = /iphone|ipad|ipod/.test(userAgent);

  // Check platform (works on older iOS versions)
  const isIOSPlatform = /iphone|ipad|ipod/.test(navigator.platform.toLowerCase());

  // Check for iPad in Desktop mode (iOS 13+)
  const isIPadDesktopMode =
    navigator.maxTouchPoints > 1 &&
    /macintosh/.test(userAgent);

  return isIOSUserAgent || isIOSPlatform || isIPadDesktopMode;
}

// Extended Navigator interface for device memory API
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

/**
 * Detects if device is likely low-powered (iPhone SE, older models)
 */
export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  // Check memory (if available)
  const nav = navigator as NavigatorWithMemory;
  const deviceMemory = nav.deviceMemory;
  if (deviceMemory && deviceMemory < 4) {
    return true;
  }

  // Check CPU cores (if available)
  const hardwareConcurrency = navigator.hardwareConcurrency;
  if (hardwareConcurrency && hardwareConcurrency < 4) {
    return true;
  }

  // Fallback: check screen size (smaller screens = likely older devices)
  const smallScreen = window.innerWidth < 375 || window.innerHeight < 667;
  return isIOSDevice() && smallScreen;
}

/**
 * Checks if user has enabled reduced motion preference
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ============================================================================
// ANIMATION OPTIMIZATION
// ============================================================================

export interface AnimationConfig {
  enableSpring: boolean;
  enableInfinite: boolean;
  enableParallax: boolean;
  enableBlur: boolean;
  maxConcurrentAnimations: number;
  reducedDuration: boolean;
}

/**
 * Returns optimal animation configuration for current device
 */
export function getOptimalAnimationConfig(): AnimationConfig {
  const isIOS = isIOSDevice();
  const isLowPower = isLowPowerDevice();
  const reducedMotion = prefersReducedMotion();

  // Most aggressive restrictions for iOS low-power devices
  if (isIOS && isLowPower) {
    return {
      enableSpring: false,
      enableInfinite: false,
      enableParallax: false,
      enableBlur: false,
      maxConcurrentAnimations: 3,
      reducedDuration: true,
    };
  }

  // Moderate restrictions for standard iOS devices
  if (isIOS) {
    return {
      enableSpring: false, // iOS throttles spring animations
      enableInfinite: true,
      enableParallax: false, // Disable mouse tracking
      enableBlur: true,
      maxConcurrentAnimations: 8,
      reducedDuration: false,
    };
  }

  // Respect reduced motion preference
  if (reducedMotion) {
    return {
      enableSpring: false,
      enableInfinite: false,
      enableParallax: false,
      enableBlur: true,
      maxConcurrentAnimations: 0,
      reducedDuration: true,
    };
  }

  // Full animations for desktop
  return {
    enableSpring: true,
    enableInfinite: true,
    enableParallax: true,
    enableBlur: true,
    maxConcurrentAnimations: 20,
    reducedDuration: false,
  };
}

// Framer Motion transition type
interface MotionTransition {
  type?: 'spring' | 'tween' | 'keyframes' | 'inertia';
  duration?: number;
  ease?: string | number[];
  stiffness?: number;
  damping?: number;
  mass?: number;
  [key: string]: unknown;
}

/**
 * Get optimized Framer Motion transition config for iOS
 */
export function getIOSOptimizedTransition(
  defaultTransition: MotionTransition,
  isIOS: boolean
): MotionTransition {
  if (!isIOS) return defaultTransition;

  // Convert spring animations to tween for iOS
  if (defaultTransition.type === 'spring') {
    return {
      type: 'tween',
      duration: 0.3,
      ease: 'easeOut',
    };
  }

  // Reduce duration for smoother performance
  if (defaultTransition.duration) {
    return {
      ...defaultTransition,
      duration: Math.min(defaultTransition.duration, 0.5),
    };
  }

  return defaultTransition;
}

// ============================================================================
// MEMORY MANAGEMENT
// ============================================================================

/**
 * Throttles function execution using requestAnimationFrame
 * Perfect for scroll/mouse handlers on iOS
 */
export function rafThrottle<T extends (...args: never[]) => void>(
  callback: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  return function throttled(...args: Parameters<T>) {
    lastArgs = args;

    if (rafId !== null) {
      return;
    }

    rafId = requestAnimationFrame(() => {
      if (lastArgs) {
        callback(...lastArgs);
      }
      rafId = null;
    });
  };
}

/**
 * Debounces function execution (useful for resize handlers)
 */
export function debounce<T extends (...args: never[]) => void>(
  callback: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return function debounced(...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

/**
 * Creates a passive event listener (improves scroll performance on iOS)
 */
export function addPassiveEventListener(
  element: HTMLElement | Window,
  event: string,
  handler: EventListener
): () => void {
  const options: AddEventListenerOptions = {
    passive: true,
    capture: false,
  };

  element.addEventListener(event, handler, options);

  // Return cleanup function
  return () => {
    element.removeEventListener(event, handler, options);
  };
}

// ============================================================================
// INTERSECTION OBSERVER OPTIMIZATION
// ============================================================================

/**
 * Creates an iOS-optimized IntersectionObserver
 * FIXED: Increased threshold to prevent black screen during fast scroll
 * Previous: 5%/10% threshold caused elements to stay invisible during rapid scrolling
 * New: 25%/20% threshold + larger rootMargin ensures content is visible faster
 */
export function createIOSOptimizedObserver(
  callback: IntersectionObserverCallback,
  isIOS: boolean
): IntersectionObserver {
  const options: IntersectionObserverInit = {
    // INCREASED: Use larger root margin to trigger animations earlier
    // This gives the observer more time to fire before element is fully in view
    rootMargin: isIOS ? '200px' : '150px',
    // INCREASED: Higher threshold (25%) so fast scroll doesn't miss elements
    // Previous 5% was too low - elements would scroll past before observer fired
    threshold: isIOS ? 0.25 : 0.2,
  };

  return new IntersectionObserver(callback, options);
}

// ============================================================================
// CSS OPTIMIZATION
// ============================================================================

/**
 * Returns safe will-change value for iOS
 * iOS allocates extra memory for will-change, so use sparingly
 */
export function getIOSSafeWillChange(
  properties: string[],
  isIOS: boolean
): string {
  if (!isIOS) {
    return properties.join(', ');
  }

  // On iOS, only use will-change for transform and opacity
  // Remove it immediately after animation completes
  const safePropsiOS = properties.filter(prop =>
    prop === 'transform' || prop === 'opacity'
  );

  return safePropsiOS.length > 0 ? safePropsiOS.join(', ') : 'auto';
}

/**
 * Adds GPU acceleration hint without will-change
 * Safer for iOS memory management
 */
export function getGPUAccelerationStyle(isIOS: boolean): React.CSSProperties {
  if (isIOS) {
    // Use translate3d(0,0,0) for GPU acceleration without will-change
    return {
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden',
      perspective: 1000,
    };
  }

  return {
    willChange: 'transform',
  };
}

// ============================================================================
// ANIMATION CLEANUP HELPERS
// ============================================================================

/**
 * Safely cleans up intervals with iOS-specific handling
 */
export function createSafeInterval(
  callback: () => void,
  delay: number,
  isIOS: boolean
): () => void {
  // On iOS, use longer intervals to reduce CPU usage
  const adjustedDelay = isIOS ? Math.max(delay, 1000) : delay;

  const intervalId = setInterval(callback, adjustedDelay);

  return () => {
    clearInterval(intervalId);
  };
}

/**
 * Creates a visibility-aware interval (pauses when tab is hidden)
 * Critical for iOS battery life
 */
export function createVisibilityAwareInterval(
  callback: () => void,
  delay: number
): () => void {
  let intervalId: NodeJS.Timeout | null = null;
  let isPaused = false;

  const start = () => {
    if (intervalId || isPaused) return;
    intervalId = setInterval(callback, delay);
  };

  const pause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    isPaused = true;
  };

  const resume = () => {
    isPaused = false;
    start();
  };

  // Listen for visibility changes
  const handleVisibilityChange = () => {
    if (document.hidden) {
      pause();
    } else {
      resume();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  start();

  // Return cleanup function
  return () => {
    pause();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Logs performance warning if animation causes frame drops (iOS debug)
 */
export function monitorFrameRate(componentName: string): () => void {
  if (typeof window === 'undefined' || !isIOSDevice()) {
    return () => {};
  }

  let lastTime = performance.now();
  let frameCount = 0;
  let rafId: number;

  const checkFrameRate = (currentTime: number) => {
    frameCount++;

    const elapsed = currentTime - lastTime;

    // Check every second
    if (elapsed >= 1000) {
      const fps = Math.round((frameCount * 1000) / elapsed);

      // Warn if below 50fps on iOS (should target 60fps)
      if (fps < 50) {
        console.warn(
          `[iOS Performance] ${componentName}: Low frame rate detected (${fps} fps). Consider reducing animations.`
        );
      }

      frameCount = 0;
      lastTime = currentTime;
    }

    rafId = requestAnimationFrame(checkFrameRate);
  };

  rafId = requestAnimationFrame(checkFrameRate);

  // Return cleanup function
  return () => {
    cancelAnimationFrame(rafId);
  };
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export default {
  isIOSDevice,
  isLowPowerDevice,
  prefersReducedMotion,
  getOptimalAnimationConfig,
  getIOSOptimizedTransition,
  rafThrottle,
  debounce,
  addPassiveEventListener,
  createIOSOptimizedObserver,
  getIOSSafeWillChange,
  getGPUAccelerationStyle,
  createSafeInterval,
  createVisibilityAwareInterval,
  monitorFrameRate,
};
