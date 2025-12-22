/**
 * Analytics Utilities for GA4 Event Tracking
 *
 * Helper functions to track custom events in Google Analytics 4
 * All functions check for gtag availability before firing events
 */

// Extend Window interface to include gtag
// Using the official Gtag.js function signature
type GtagCommand = "config" | "set" | "event" | "consent" | "get";

declare global {
  interface Window {
    gtag?: (command: GtagCommand, targetId: string, config?: Record<string, unknown>) => void;
  }
}

/**
 * Check if gtag is available
 */
function isGtagAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

/**
 * Track a generic custom event
 *
 * @param eventName - Name of the event (e.g., 'button_click', 'form_start')
 * @param parameters - Additional event parameters
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean>
) {
  if (!isGtagAvailable()) {
    return;
  }

  window.gtag!("event", eventName, parameters);
}

/**
 * Track form submission
 *
 * @param formName - Name/type of the form (e.g., 'lead_capture', 'contact_form')
 * @param data - Form data to track (sanitized, no PII)
 */
export function trackFormSubmission(
  formName: string,
  data?: {
    service?: string;
    source?: string;
    step?: number;
    selected_time?: string | null;
    [key: string]: string | number | boolean | null | undefined;
  }
) {
  // Filter out null/undefined values before passing to trackEvent
  const cleanData: Record<string, string | number | boolean> = { form_name: formName };
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        cleanData[key] = value;
      }
    });
  }
  trackEvent("form_submit", cleanData);
}

/**
 * Track when a form is started (first field interaction)
 *
 * @param formName - Name of the form
 */
export function trackFormStart(formName: string) {
  trackEvent("form_start", {
    form_name: formName,
  });
}

/**
 * Track CTA button clicks
 *
 * @param ctaName - Name/label of the CTA
 * @param location - Where on the page the CTA appears (e.g., 'hero', 'footer', 'sidebar')
 * @param destination - URL or action destination (optional)
 */
export function trackCTAClick(ctaName: string, location: string, destination?: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    cta_location: location,
    ...(destination && { cta_destination: destination }),
  });
}

/**
 * Track phone number clicks (click-to-call)
 *
 * @param phoneNumber - The phone number clicked (optional, for tracking different numbers)
 * @param location - Where the phone link appears on the page
 */
export function trackPhoneClick(phoneNumber?: string, location?: string) {
  trackEvent("phone_click", {
    event_category: "engagement",
    event_label: phoneNumber || "phone_number",
    ...(location && { click_location: location }),
  });
}

/**
 * Track email clicks (mailto links)
 *
 * @param location - Where the email link appears
 */
export function trackEmailClick(location?: string) {
  trackEvent("email_click", {
    event_category: "engagement",
    ...(location && { click_location: location }),
  });
}

/**
 * Track scroll depth
 *
 * @param percentage - Scroll depth percentage (25, 50, 75, 100)
 */
export function trackScrollDepth(percentage: 25 | 50 | 75 | 100) {
  trackEvent("scroll_depth", {
    scroll_percentage: percentage,
  });
}

/**
 * Track file downloads
 *
 * @param fileName - Name of the file being downloaded
 * @param fileType - Type of file (pdf, doc, etc.)
 */
export function trackFileDownload(fileName: string, fileType: string) {
  trackEvent("file_download", {
    file_name: fileName,
    file_type: fileType,
  });
}

/**
 * Track video interactions
 *
 * @param action - The action taken (play, pause, complete, etc.)
 * @param videoTitle - Title/name of the video
 * @param progress - Video progress percentage (optional)
 */
export function trackVideoInteraction(
  action: "play" | "pause" | "complete" | "progress",
  videoTitle: string,
  progress?: number
) {
  trackEvent("video_interaction", {
    video_action: action,
    video_title: videoTitle,
    ...(progress !== undefined && { video_progress: progress }),
  });
}

/**
 * Track outbound link clicks
 *
 * @param url - The external URL being clicked
 * @param linkText - The text of the link (optional)
 */
export function trackOutboundClick(url: string, linkText?: string) {
  trackEvent("outbound_click", {
    link_url: url,
    ...(linkText && { link_text: linkText }),
  });
}

/**
 * Track search queries (if you have a search feature)
 *
 * @param searchTerm - The search term entered
 * @param resultCount - Number of results returned (optional)
 */
export function trackSearch(searchTerm: string, resultCount?: number) {
  trackEvent("search", {
    search_term: searchTerm,
    ...(resultCount !== undefined && { result_count: resultCount }),
  });
}

/**
 * Track service interest
 *
 * @param serviceName - Name of the service the user is interested in
 * @param interactionType - How they showed interest (view, click, etc.)
 */
export function trackServiceInterest(serviceName: string, interactionType: string) {
  trackEvent("service_interest", {
    service_name: serviceName,
    interaction_type: interactionType,
  });
}

/**
 * Track calculator interactions (for ROI calculators, etc.)
 *
 * @param calculatorName - Name of the calculator
 * @param action - Action taken (started, completed, etc.)
 * @param result - Result value (optional)
 */
export function trackCalculatorInteraction(
  calculatorName: string,
  action: string,
  result?: number | string
) {
  trackEvent("calculator_interaction", {
    calculator_name: calculatorName,
    calculator_action: action,
    ...(result !== undefined && { calculator_result: result }),
  });
}

/**
 * Track page-specific engagement time
 * Call this when user shows meaningful engagement (scrolling, clicking, etc.)
 *
 * @param pagePath - The page path
 * @param timeSpent - Time in seconds
 */
export function trackEngagementTime(pagePath: string, timeSpent: number) {
  trackEvent("user_engagement", {
    engagement_time_msec: timeSpent * 1000,
    page_path: pagePath,
  });
}
