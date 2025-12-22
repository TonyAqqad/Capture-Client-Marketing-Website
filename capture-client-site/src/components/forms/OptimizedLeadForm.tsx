"use client";

import { useState } from "react";
import Link from "next/link";
import { trackFormStart, trackFormSubmission, trackPhoneClick } from "@/lib/analytics";
import {
  CheckCircle,
  Phone,
  Lock,
  ArrowRight,
  Rocket,
  ArrowLeft,
  Shield,
  Clock,
  Headset,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import {
  validateName,
  validatePhone,
  validateEmailOptional,
  validateChallenge,
  FormValidationErrors,
  hasValidationErrors,
} from "@/lib/form-validation";

interface OptimizedLeadFormProps {
  source?: string;
}

// Use server-side API route to avoid CORS issues
const API_ROUTE = "/api/submit-lead";

export default function OptimizedLeadForm({ source = "general" }: OptimizedLeadFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    challenge: "",
    smsConsent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Track form start on first interaction
  const handleFormStart = () => {
    if (!formStarted) {
      trackFormStart(`optimized_lead_form_${source}`);
      setFormStarted(true);
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate step 1 fields
    const stepOneErrors: FormValidationErrors = {
      name: validateName(formData.name) ?? undefined,
      phone: validatePhone(formData.phone) ?? undefined,
      email: validateEmailOptional(formData.email) ?? undefined,
    };

    setErrors(stepOneErrors);
    setTouched({ name: true, phone: true, email: true });

    if (hasValidationErrors(stepOneErrors)) {
      return;
    }

    // Track progression to step 2
    trackFormSubmission(`optimized_lead_form_step1_${source}`, {
      step: 1,
      source: source,
    });
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate challenge field
    const challengeError = validateChallenge(formData.challenge);
    if (challengeError) {
      setErrors({ ...errors, challenge: challengeError });
      setTouched({ ...touched, challenge: true });
      return;
    }

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
          email: formData.email,
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
        <div className="absolute -inset-6 bg-gradient-to-r from-blue-100/60 via-cyan-100/60 to-blue-100/60 rounded-3xl blur-3xl opacity-60 animate-pulse" />

        <div className="relative bg-white p-10 text-center rounded-2xl border-2 border-blue-200 shadow-xl">
          {/* Animated checkmark */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 border-2 border-blue-500 mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping" />
            <CheckCircle className="w-16 h-16 text-blue-600 relative z-10" />
          </div>

          <h3 className="text-3xl font-black text-slate-900 mb-3">We Got Your Request!</h3>
          <p className="text-lg text-slate-700 mb-4">
            A growth specialist will call you within{" "}
            <span className="text-blue-600 font-bold">15 minutes</span>.
          </p>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-5 py-2.5">
            <Phone className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-slate-600">
              Check your phone:{" "}
              <span className="text-blue-600 font-bold text-base">{formData.phone}</span>
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
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-200"
                : "bg-blue-400"
            }`}
          />
          {step === 1 && (
            <div className="absolute inset-0 rounded-full bg-blue-300/50 animate-pulse" />
          )}
        </div>
        <div className="relative">
          <div
            className={`h-2 w-20 rounded-full transition-all duration-500 ${
              step === 2
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-blue-200"
                : "bg-slate-200"
            }`}
          />
          {step === 2 && (
            <div className="absolute inset-0 rounded-full bg-blue-300/50 animate-pulse" />
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
                className="block text-sm font-semibold text-slate-700 mb-2.5 transition-colors group-focus-within:text-blue-600"
              >
                Your Name <span className="text-blue-600">*</span>
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
                    if (touched.name) {
                      const error = validateName(e.target.value);
                      setErrors({ ...errors, name: error ?? undefined });
                    }
                  }}
                  onBlur={() => handleBlur("name")}
                  autoComplete="name"
                  className={`w-full min-h-[52px] px-5 py-4 text-base
                             bg-white
                             border-2 rounded-xl
                             text-slate-900 placeholder-slate-400
                             transition-all duration-300
                             hover:border-slate-300
                             focus:outline-none focus:bg-white
                             focus:ring-4 focus:ring-blue-100
                             touch-manipulation
                             ${errors.name && touched.name ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-blue-500"}`}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent transition-opacity duration-300
                                ${errors.name && touched.name ? "via-red-500 opacity-100" : "via-blue-500 opacity-0 group-focus-within:opacity-100"}`}
                />
              </div>
              {errors.name && touched.name && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Phone field */}
            <div className="group">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-slate-700 mb-2.5 transition-colors group-focus-within:text-blue-600"
              >
                Phone Number <span className="text-blue-600">*</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="(865) 555-1234"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (touched.phone) {
                      const error = validatePhone(e.target.value);
                      setErrors({ ...errors, phone: error ?? undefined });
                    }
                  }}
                  onBlur={() => handleBlur("phone")}
                  autoComplete="tel"
                  className={`w-full min-h-[52px] px-5 py-4 text-base
                             bg-white
                             border-2 rounded-xl
                             text-slate-900 placeholder-slate-400
                             transition-all duration-300
                             hover:border-slate-300
                             focus:outline-none focus:bg-white
                             focus:ring-4 focus:ring-blue-100
                             touch-manipulation
                             ${errors.phone && touched.phone ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-blue-500"}`}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent transition-opacity duration-300
                                ${errors.phone && touched.phone ? "via-red-500 opacity-100" : "via-blue-500 opacity-0 group-focus-within:opacity-100"}`}
                />
              </div>
              {errors.phone && touched.phone && (
                <div className="flex items-center gap-1.5 mt-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* Email field (optional) */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2.5 transition-colors group-focus-within:text-blue-600"
              >
                Email <span className="text-slate-400">(optional)</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  autoComplete="email"
                  className="w-full min-h-[52px] px-5 py-4 text-base
                             bg-white
                             border-2 border-slate-200 rounded-xl
                             text-slate-900 placeholder-slate-400
                             transition-all duration-300
                             hover:border-slate-300
                             focus:outline-none focus:bg-white
                             focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                             touch-manipulation"
                />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* SMS Consent Checkbox - A2P 10DLC Compliant */}
            <div className="group">
              <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all">
                <input
                  type="checkbox"
                  checked={formData.smsConsent}
                  onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
                  className="mt-1 w-5 h-5 rounded border-2 border-slate-300 bg-white
                             checked:bg-blue-600 checked:border-blue-600
                             focus:ring-2 focus:ring-blue-100 focus:ring-offset-0
                             cursor-pointer appearance-none
                             relative after:content-['✓'] after:absolute after:inset-0
                             after:flex after:items-center after:justify-center
                             after:text-white after:font-bold after:text-xs
                             after:opacity-0 checked:after:opacity-100
                             transition-all"
                />
                <span className="text-sm text-slate-600 leading-relaxed">
                  I agree to receive text messages from Capture Client at the phone number provided.
                  Message frequency varies. Message and data rates may apply. Reply STOP to
                  unsubscribe.{" "}
                  <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>{" "}
                  &{" "}
                  <Link href="/terms-of-service" className="text-blue-600 hover:underline">
                    Terms
                  </Link>
                </span>
              </label>
            </div>
          </div>

          {/* Premium continue button */}
          <button
            type="submit"
            className="group relative w-full min-h-[56px] overflow-hidden rounded-xl
                       transition-all duration-300
                       hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />

            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-700 to-cyan-600" />

            {/* Button content */}
            <span className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-white uppercase tracking-wider">
              Continue
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>

          {/* Trust badge */}
          <p className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
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
              className="block text-sm font-semibold text-slate-700 mb-2.5 transition-colors group-focus-within:text-blue-600"
            >
              What's your biggest challenge right now? <span className="text-blue-600">*</span>
            </label>
            <div className="relative">
              <select
                id="challenge"
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                required
                className="w-full min-h-[52px] px-5 py-4 text-base appearance-none
                           bg-white
                           border-2 border-slate-200 rounded-xl
                           text-slate-900
                           transition-all duration-300
                           hover:border-slate-300
                           focus:outline-none focus:bg-white
                           focus:border-blue-500 focus:ring-4 focus:ring-blue-100
                           touch-manipulation
                           [&>option]:bg-white [&>option]:text-slate-900"
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
              <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="flex gap-3">
            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep(1)}
              className="min-w-[56px] min-h-[56px] px-4 rounded-xl
                         bg-white border-2 border-slate-200
                         text-slate-600
                         transition-all duration-300
                         hover:bg-slate-50 hover:border-slate-300
                         touch-manipulation active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
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
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500" />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-700 to-cyan-600" />

              {/* Button content */}
              <span className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-white uppercase tracking-wider">
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
                    Try Our AI Now
                    <Rocket className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Trust signals near submit */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="flex flex-col items-center gap-1 text-center">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] sm:text-xs text-slate-500">No Credit Card</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] sm:text-xs text-slate-500">15-min Setup</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Headset className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] sm:text-xs text-slate-500">Live Support</span>
            </div>
          </div>

          {/* Call option */}
          <div className="flex flex-col items-center gap-3 pt-2 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Or call:{" "}
              <a
                href="tel:865-346-6111"
                className="text-blue-600 hover:underline font-bold inline-flex items-center
                           touch-manipulation active:scale-95 transition-transform duration-100
                           min-h-[48px]"
                onClick={() => trackPhoneClick("865-346-6111", `optimized_form_${source}`)}
              >
                (865) 346-6111
              </a>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
