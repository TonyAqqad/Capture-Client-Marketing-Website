"use client";

import { useEffect } from "react";

/**
 * ScrollToTop component
 * Ensures the page starts at the top when navigating to integration detail pages
 */
export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
