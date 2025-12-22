"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Cookie, X, Settings } from "lucide-react";

interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

/**
 * Cookie Consent Banner Component
 *
 * Features:
 * - Google Consent Mode v2 integration
 * - localStorage persistence
 * - Dark glass design matching site aesthetic
 * - Responsive mobile/desktop layout
 * - Customizable consent categories
 */
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie_consent");

    if (!consent) {
      // Delay banner appearance for better UX (show after 1 second)
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // User has previously set preferences, apply them
      try {
        const savedPreferences = JSON.parse(consent);
        updateConsentMode(savedPreferences);
      } catch (e) {
        console.error("Error parsing saved consent preferences:", e);
      }
    }
  }, []);

  // Listen for custom event to reopen cookie settings
  useEffect(() => {
    const handleReopenCookieSettings = () => {
      setShowBanner(true);
      setShowCustomize(true);
    };

    window.addEventListener("reopenCookieSettings", handleReopenCookieSettings);
    return () => {
      window.removeEventListener("reopenCookieSettings", handleReopenCookieSettings);
    };
  }, []);

  /**
   * Update Google Consent Mode v2
   * https://developers.google.com/tag-platform/security/guides/consent
   */
  const updateConsentMode = (prefs: ConsentPreferences) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: prefs.marketing ? "granted" : "denied",
        ad_personalization: prefs.marketing ? "granted" : "denied",
        ad_user_data: prefs.marketing ? "granted" : "denied",
        analytics_storage: prefs.analytics ? "granted" : "denied",
      });
    }
  };

  const handleAcceptAll = () => {
    const allAccepted: ConsentPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };

    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const allRejected: ConsentPreferences = {
      essential: true, // Essential always stays true
      analytics: false,
      marketing: false,
    };

    savePreferences(allRejected);
    setShowBanner(false);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
    setShowBanner(false);
  };

  const savePreferences = (prefs: ConsentPreferences) => {
    localStorage.setItem("cookie_consent", JSON.stringify(prefs));
    localStorage.setItem("cookie_consent_timestamp", new Date().toISOString());
    updateConsentMode(prefs);
  };

  const togglePreference = (key: keyof ConsentPreferences) => {
    if (key === "essential") return; // Essential can't be disabled

    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-xl border-t border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
            {/* Main Banner */}
            {!showCustomize ? (
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 flex items-center justify-center border border-slate-200">
                      <Cookie className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      We Value Your Privacy
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      We use cookies to enhance your browsing experience, analyze site traffic, and
                      personalize content. By clicking "Accept All", you consent to our use of
                      cookies.{" "}
                      <a
                        href="/privacy-policy"
                        className="text-cyan-600 hover:text-blue-600 transition-colors underline"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>

                  {/* Actions - Desktop */}
                  <div className="hidden sm:flex flex-col gap-3 min-w-[200px]">
                    <button
                      onClick={handleAcceptAll}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap w-full hover:scale-105 transition-transform shadow-lg shadow-blue-500/25"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap w-full"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={() => setShowCustomize(true)}
                      className="text-sm text-slate-600 hover:text-cyan-600 transition-colors flex items-center justify-center gap-2 py-2"
                    >
                      <Settings className="w-4 h-4" />
                      Customize
                    </button>
                  </div>
                </div>

                {/* Actions - Mobile */}
                <div className="flex sm:hidden flex-col gap-3 mt-6">
                  <button
                    onClick={handleAcceptAll}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold text-sm w-full shadow-lg shadow-blue-500/25"
                  >
                    Accept All
                  </button>
                  <div className="flex gap-3">
                    <button
                      onClick={handleRejectAll}
                      className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-6 py-3 rounded-xl font-semibold text-sm flex-1"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={() => setShowCustomize(true)}
                      className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-6 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Customize Panel */
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Customize Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowCustomize(false)}
                    className="text-slate-600 hover:text-slate-900 transition-colors p-2 hover:bg-slate-100 rounded-lg"
                    aria-label="Close customize panel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Essential Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">Essential</h4>
                        <span className="text-xs text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                          Always Active
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Required for the website to function properly. Cannot be disabled.
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">Analytics</h4>
                      <p className="text-sm text-slate-600">
                        Help us understand how visitors interact with our website (Google
                        Analytics).
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("analytics")}
                      className="flex-shrink-0 group"
                      aria-label="Toggle analytics cookies"
                    >
                      <div
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.analytics
                            ? "bg-cyan-500 justify-end"
                            : "bg-slate-300 justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full transition-transform group-hover:scale-110" />
                      </div>
                    </button>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900 mb-1">Marketing</h4>
                      <p className="text-sm text-slate-600">
                        Used to track visitors across websites for advertising purposes (Facebook
                        Pixel, etc.).
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference("marketing")}
                      className="flex-shrink-0 group"
                      aria-label="Toggle marketing cookies"
                    >
                      <div
                        className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.marketing
                            ? "bg-cyan-500 justify-end"
                            : "bg-slate-300 justify-start"
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full transition-transform group-hover:scale-110" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Save Preferences Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSaveCustom}
                    className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold w-full sm:w-auto hover:scale-105 transition-transform shadow-lg shadow-blue-500/25"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={() => setShowCustomize(false)}
                    className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-8 py-3 rounded-xl font-semibold w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
