import { useState, useEffect, useCallback } from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface UseExitIntentOptions {
  sensitivity?: number; // How close to top before triggering (in pixels)
  delay?: number; // Delay before showing modal after trigger (ms)
  cookieExpiry?: number; // How many days before showing again (0 = session only)
  onExitIntent?: () => void; // Callback when exit intent is detected
}

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY = 'exitIntentShown';
const DEFAULT_SENSITIVITY = 30; // pixels from top
const DEFAULT_DELAY = 300; // ms

// ============================================================================
// CUSTOM HOOK: useExitIntent
// ============================================================================

export function useExitIntent(options: UseExitIntentOptions = {}) {
  const {
    sensitivity = DEFAULT_SENSITIVITY,
    delay = DEFAULT_DELAY,
    cookieExpiry = 7, // days
    onExitIntent,
  } = options;

  const [showModal, setShowModal] = useState(false);
  const [hasShownBefore, setHasShownBefore] = useState(false);

  // Check if exit intent was previously shown
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const shown = localStorage.getItem(STORAGE_KEY);
    if (shown) {
      const shownDate = new Date(shown);
      const now = new Date();
      const daysSince = (now.getTime() - shownDate.getTime()) / (1000 * 60 * 60 * 24);

      if (daysSince < cookieExpiry) {
        setHasShownBefore(true);
      } else {
        // Expired, remove it
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [cookieExpiry]);

  // Handle mouse movement detection
  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      // Only trigger if mouse is moving toward top of page
      if (e.clientY <= sensitivity && !hasShownBefore && !showModal) {
        // Add delay before showing
        setTimeout(() => {
          setShowModal(true);
          if (onExitIntent) {
            onExitIntent();
          }

          // Mark as shown in localStorage
          localStorage.setItem(STORAGE_KEY, new Date().toISOString());
          setHasShownBefore(true);
        }, delay);
      }
    },
    [sensitivity, hasShownBefore, showModal, delay, onExitIntent]
  );

  // Attach/detach mouse event listener
  useEffect(() => {
    if (typeof window === 'undefined' || hasShownBefore) return;

    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [handleMouseLeave, hasShownBefore]);

  // Close modal handler
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Reset storage (for testing)
  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHasShownBefore(false);
    setShowModal(false);
  }, []);

  return {
    showModal,
    closeModal,
    hasShownBefore,
    reset, // Useful for development/testing
  };
}
