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
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
          <span className="material-icons text-accent text-4xl">check_circle</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">We Got Your Request!</h3>
        <p className="text-gray-300 mb-4">A growth specialist will call you within 15 minutes.</p>
        <p className="text-sm text-gray-400">
          Check your phone: <span className="text-accent font-semibold">{formData.phone}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div
          className={`h-2 w-16 rounded-full transition-all duration-300 ${
            step === 1 ? "bg-accent" : "bg-accent/50"
          }`}
        />
        <div
          className={`h-2 w-16 rounded-full transition-all duration-300 ${
            step === 2 ? "bg-accent" : "bg-gray-700"
          }`}
        />
      </div>

      {/* Step 1: Name + Phone */}
      {step === 1 && (
        <form onSubmit={handleStepOne} className="space-y-4 animate-slide-up">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Your Name <span className="text-accent">*</span>
              </label>
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
                className="w-full min-h-[48px] px-5 py-4 text-base bg-white/5 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number <span className="text-accent">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(865) 555-1234"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                pattern="[0-9\s\(\)\-\+]+"
                className="w-full min-h-[48px] px-5 py-4 text-base bg-white/5 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full min-h-[52px] bg-accent text-background-dark font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-glow-lg hover:scale-[1.02] active:scale-95 uppercase tracking-wide text-sm sm:text-base"
          >
            Continue
            <span className="material-icons ml-2 text-lg align-middle">arrow_forward</span>
          </button>

          <p className="text-xs text-gray-400 text-center">
            We respect your privacy. No spam, ever.
          </p>
        </form>
      )}

      {/* Step 2: Challenge dropdown */}
      {step === 2 && (
        <form onSubmit={handleFinalSubmit} className="space-y-4 animate-slide-up">
          <div>
            <label htmlFor="challenge" className="block text-sm font-medium text-gray-300 mb-2">
              What's your biggest challenge right now?
            </label>
            <select
              id="challenge"
              value={formData.challenge}
              onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
              required
              className="w-full min-h-[48px] px-5 py-4 text-base bg-white border-2 border-gray-700 rounded-xl text-black focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
            >
              <option value="" className="text-black bg-white">Select your main challenge...</option>
              <option value="missing-calls" className="text-black bg-white">Missing too many customer calls</option>
              <option value="not-enough-leads" className="text-black bg-white">Not getting enough leads</option>
              <option value="poor-roi" className="text-black bg-white">Ad campaigns not profitable</option>
              <option value="no-system" className="text-black bg-white">No system to track leads</option>
              <option value="overwhelmed" className="text-black bg-white">Too much to manage manually</option>
              <option value="other" className="text-black bg-white">Something else</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-w-[52px] min-h-[52px] px-6 py-4 bg-white/5 border border-gray-700 text-gray-300 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-300"
            >
              <span className="material-icons text-lg">arrow_back</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 min-h-[52px] bg-accent text-background-dark font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-glow-lg hover:scale-[1.02] active:scale-95 uppercase tracking-wide text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
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
                </span>
              ) : (
                <>
                  Get My Free Demo
                  <span className="material-icons ml-2 text-lg align-middle">rocket_launch</span>
                </>
              )}
            </button>
          </div>

          {/* Trust signals near submit */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="material-icons text-green-500 text-sm">verified</span>
              <span>No Credit Card</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="material-icons text-green-500 text-sm">schedule</span>
              <span>15-min Setup</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span className="material-icons text-green-500 text-sm">support_agent</span>
              <span>Live Support</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Or call:{" "}
            <a
              href="tel:865-346-3339"
              className="text-accent hover:underline font-semibold"
              onClick={() => trackPhoneClick("865-346-3339", `optimized_form_${source}`)}
            >
              (865) 346-3339
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
