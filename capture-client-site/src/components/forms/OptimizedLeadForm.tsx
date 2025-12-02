"use client";

import { useState } from "react";
import { trackFormStart, trackFormSubmission, trackPhoneClick } from "@/lib/analytics";

interface OptimizedLeadFormProps {
  source?: string;
}

// Use server-side API route to avoid CORS issues
const API_ROUTE = "/api/submit-lead";

export default function OptimizedLeadForm({ source = "general" }: OptimizedLeadFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    challenge: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  // Track form start on first interaction
  const handleFormStart = () => {
    if (!formStarted) {
      trackFormStart(`optimized_lead_form_${source}`);
      setFormStarted(true);
    }
  };

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    // Track progression to step 2
    trackFormSubmission(`optimized_lead_form_step1_${source}`, {
      step: 1,
      source: source,
    });
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to server-side API route (avoids CORS issues)
      // Include all collected data for GoHighLevel - especially challenge for lead qualification
      const response = await fetch(API_ROUTE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: "",
          phone: formData.phone,
          company: "",
          source: source,
          challenge: formData.challenge,
        }),
      });

      if (!response.ok) {
        // API error - graceful degradation
      }

      // Track successful form submission
      trackFormSubmission(`optimized_lead_form_complete_${source}`, {
        step: 2,
        source: source,
      });

      setSubmitted(true);
    } catch {
      // Graceful degradation - show success to user
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative group animate-fade-in">
        {/* Success glow effect */}
        <div className="absolute -inset-6 bg-gradient-to-r from-accent/40 via-primary/40 to-accent/40 rounded-3xl blur-3xl opacity-60 animate-pulse" />

        <div className="relative glass-premium p-10 text-center rounded-2xl border border-accent/40">
          {/* Animated checkmark */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-accent/20 border-2 border-accent mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
            <span className="material-icons text-accent text-6xl relative z-10">check_circle</span>
          </div>

          <h3 className="text-3xl font-black text-white mb-3">
            We Got Your Request!
          </h3>
          <p className="text-lg text-white/80 mb-4">
            A growth specialist will call you within <span className="text-accent font-bold">15 minutes</span>.
          </p>
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-5 py-2.5">
            <span className="material-icons text-accent text-lg">phone</span>
            <p className="text-sm text-white/70">
              Check your phone: <span className="text-accent font-bold text-base">{formData.phone}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator with glow */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="relative">
          <div
            className={`h-2 w-20 rounded-full transition-all duration-500 ${
              step === 1
                ? "bg-gradient-to-r from-accent to-primary shadow-[0_0_12px_rgba(0,201,255,0.5)]"
                : "bg-accent/50"
            }`}
          />
          {step === 1 && (
            <div className="absolute inset-0 rounded-full bg-accent/30 animate-pulse" />
          )}
        </div>
        <div className="relative">
          <div
            className={`h-2 w-20 rounded-full transition-all duration-500 ${
              step === 2
                ? "bg-gradient-to-r from-primary to-accent shadow-[0_0_12px_rgba(74,105,226,0.5)]"
                : "bg-white/10"
            }`}
          />
          {step === 2 && (
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse" />
          )}
        </div>
      </div>

      {/* Step 1: Name + Phone */}
      {step === 1 && (
        <form onSubmit={handleStepOne} className="space-y-5 animate-slide-up">
          <div className="space-y-5">
            {/* Name field */}
            <div className="group">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-white/90 mb-2.5 transition-colors group-focus-within:text-accent"
              >
                Your Name <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => {
                    handleFormStart();
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  required
                  autoComplete="name"
                  className="w-full min-h-[52px] px-5 py-4 text-base
                             bg-white/[0.03] backdrop-blur-xl
                             border-2 border-white/10 rounded-xl
                             text-white placeholder-white/40
                             transition-all duration-300
                             hover:bg-white/[0.05] hover:border-white/20
                             focus:outline-none focus:bg-white/[0.08]
                             focus:border-accent focus:ring-4 focus:ring-accent/20
                             focus:shadow-[0_0_20px_rgba(0,201,255,0.15)]"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Phone field */}
            <div className="group">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-white/90 mb-2.5 transition-colors group-focus-within:text-accent"
              >
                Phone Number <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="(865) 555-1234"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  autoComplete="tel"
                  pattern="[0-9\s\(\)\-\+]+"
                  className="w-full min-h-[52px] px-5 py-4 text-base
                             bg-white/[0.03] backdrop-blur-xl
                             border-2 border-white/10 rounded-xl
                             text-white placeholder-white/40
                             transition-all duration-300
                             hover:bg-white/[0.05] hover:border-white/20
                             focus:outline-none focus:bg-white/[0.08]
                             focus:border-accent focus:ring-4 focus:ring-accent/20
                             focus:shadow-[0_0_20px_rgba(0,201,255,0.15)]"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Premium continue button */}
          <button
            type="submit"
            className="group relative w-full min-h-[56px] overflow-hidden rounded-xl
                       transition-all duration-300
                       hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] animate-gradient-shift" />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-background-dark uppercase tracking-wider">
              Continue
              <span className="material-icons text-xl transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </span>
          </button>

          {/* Trust badge */}
          <p className="flex items-center justify-center gap-2 text-xs text-white/50">
            <span className="material-icons text-accent text-sm">lock</span>
            We respect your privacy. No spam, ever.
          </p>
        </form>
      )}

      {/* Step 2: Challenge dropdown */}
      {step === 2 && (
        <form onSubmit={handleFinalSubmit} className="space-y-5 animate-slide-up">
          <div className="group">
            <label
              htmlFor="challenge"
              className="block text-sm font-semibold text-white/90 mb-2.5 transition-colors group-focus-within:text-accent"
            >
              What's your biggest challenge right now? <span className="text-accent">*</span>
            </label>
            <div className="relative">
              <select
                id="challenge"
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                required
                className="w-full min-h-[52px] px-5 py-4 text-base appearance-none
                           bg-white/[0.03] backdrop-blur-xl
                           border-2 border-white/10 rounded-xl
                           text-white
                           transition-all duration-300
                           hover:bg-white/[0.05] hover:border-white/20
                           focus:outline-none focus:bg-white/[0.08]
                           focus:border-accent focus:ring-4 focus:ring-accent/20
                           focus:shadow-[0_0_20px_rgba(0,201,255,0.15)]
                           [&>option]:bg-background-dark [&>option]:text-white"
              >
                <option value="">Select your main challenge...</option>
                <option value="missing-calls">Missing too many customer calls</option>
                <option value="not-enough-leads">Not getting enough leads</option>
                <option value="poor-roi">Ad campaigns not profitable</option>
                <option value="no-system">No system to track leads</option>
                <option value="overwhelmed">Too much to manage manually</option>
                <option value="other">Something else</option>
              </select>
              {/* Custom dropdown icon */}
              <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-xl">
                expand_more
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="flex gap-3">
            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-w-[56px] min-h-[56px] px-4 rounded-xl
                         bg-white/[0.03] border-2 border-white/10
                         text-white/80
                         transition-all duration-300
                         hover:bg-white/[0.08] hover:border-white/20
                         active:scale-95"
            >
              <span className="material-icons text-xl">arrow_back</span>
            </button>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex-1 min-h-[56px] overflow-hidden rounded-xl
                         transition-all duration-300
                         hover:scale-[1.02] active:scale-[0.98]
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] animate-gradient-shift" />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-background-dark uppercase tracking-wider">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Get My Free Demo
                    <span className="material-icons text-xl transition-transform duration-300 group-hover:translate-x-1">
                      rocket_launch
                    </span>
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Trust signals near submit */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="material-icons text-accent text-lg">verified</span>
              <span className="text-[10px] sm:text-xs text-white/60">No Credit Card</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="material-icons text-accent text-lg">schedule</span>
              <span className="text-[10px] sm:text-xs text-white/60">15-min Setup</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="material-icons text-accent text-lg">support_agent</span>
              <span className="text-[10px] sm:text-xs text-white/60">Live Support</span>
            </div>
          </div>

          {/* Call option */}
          <div className="flex flex-col items-center gap-3 pt-2 border-t border-white/10">
            <p className="text-xs text-white/50">
              Or call:{" "}
              <a
                href="tel:865-346-3339"
                className="text-accent hover:underline font-bold inline-flex items-center min-h-[44px]"
                onClick={() => trackPhoneClick("865-346-3339", `optimized_form_${source}`)}
              >
                (865) 346-3339
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
