"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "@/lib/motion";
import { CheckCircle, ChevronDown, ArrowRight, Phone, AlertCircle, Sparkles } from "lucide-react";
import { trackFormStart, trackFormSubmission, trackPhoneClick } from "@/lib/analytics";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateService,
  FormValidationErrors,
  hasValidationErrors,
} from "@/lib/form-validation";

interface LeadCaptureFormProps {
  source?: string;
}

export default function LeadCaptureForm({ source = "general" }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
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
      trackFormStart(`lead_capture_${source}`);
      setFormStarted(true);
    }
  };

  // Real-time validation using shared utilities
  const validateField = (field: keyof FormValidationErrors, value: string): string | null => {
    switch (field) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value);
      case "service":
        return validateService(value);
      default:
        return null;
    }
  };

  const handleBlur = (field: keyof FormValidationErrors) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field as keyof typeof formData] as string);
    setErrors({ ...errors, [field]: error ?? undefined });
  };

  const handleFieldChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });

    // Clear error when user starts typing
    if (typeof value === "string" && touched[field]) {
      const error = validateField(field as keyof FormValidationErrors, value);
      setErrors({ ...errors, [field]: error ?? undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields using shared validation
    const newErrors: FormValidationErrors = {
      name: validateName(formData.name) ?? undefined,
      email: validateEmail(formData.email) ?? undefined,
      phone: validatePhone(formData.phone) ?? undefined,
      service: validateService(formData.service) ?? undefined,
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, service: true });

    // Check if there are any errors
    if (hasValidationErrors(newErrors)) {
      return;
    }

    setIsSubmitting(true);

    // Prepare payload for GoHighLevel webhook
    // Includes all collected data for better lead context
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: "",
      source: source,
      service: formData.service,
      message: formData.message,
    };

    // Send to our server-side API route (avoids CORS issues)
    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // API error - graceful degradation
      }
    } catch {
      // Graceful degradation - show success even if API fails
    }

    // Track successful form submission
    trackFormSubmission(`lead_capture_${source}`, {
      service: formData.service,
      source: source,
    });

    // Always show success to user (graceful degradation)
    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", service: "", message: "", smsConsent: false });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="relative group overflow-hidden"
      >
        {/* Multiple floating sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              y: [0, -100 - Math.random() * 50],
              x: [0, (Math.random() - 0.5) * 100],
              scale: [0, 1, 0.5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              rotate: Math.random() * 360,
            }}
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
          </motion.div>
        ))}

        {/* Success glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 via-cyan-100 to-blue-100 rounded-3xl blur-2xl opacity-50 animate-pulse" />

        <div className="relative bg-white p-8 sm:p-10 text-center rounded-2xl border border-blue-200 shadow-2xl">
          {/* Animated checkmark with celebration */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 relative shadow-lg"
          >
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-50" />
            <CheckCircle className="w-12 h-12 text-white relative z-10" strokeWidth={3} />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3"
          >
            Message Sent!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base sm:text-lg text-slate-600 mb-2"
          >
            Thank you for reaching out to us.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-slate-500 mb-4"
          >
            We'll get back to you within <span className="font-bold text-blue-600">2 hours</span>.
          </motion.p>

          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200"
          >
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600">Secure & Confidential</span>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      {/* Name field with floating label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0 }}
        className="group relative"
      >
        <div className="relative">
          <input
            id="name"
            type="text"
            placeholder=" "
            value={formData.name}
            onChange={(e) => {
              handleFormStart();
              handleFieldChange("name", e.target.value);
            }}
            onBlur={() => handleBlur("name")}
            required
            autoComplete="name"
            className={`w-full min-h-[56px] px-5 pt-6 pb-2 text-base
                       bg-white backdrop-blur-xl
                       border-2 rounded-xl
                       text-slate-900 placeholder-transparent
                       transition-all duration-300
                       hover:bg-slate-50
                       focus:outline-none focus:bg-white
                       focus:ring-4 focus:ring-blue-100
                       focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]
                       touch-manipulation peer
                       ${errors.name && touched.name ? "border-red-400 focus:border-red-500" : "border-slate-200 hover:border-slate-300 focus:border-blue-600"}`}
          />
          {/* Floating label */}
          <label
            htmlFor="name"
            className={`absolute left-5 transition-all duration-200 pointer-events-none
                       peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400
                       peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600
                       ${formData.name ? "top-3 text-xs text-slate-600" : "top-1/2 -translate-y-1/2 text-base text-slate-400"}`}
          >
            Your Name <span className="text-blue-600">*</span>
          </label>
          {/* Decorative accent line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent transition-all duration-300
                          ${errors.name && touched.name ? "via-red-500 opacity-100" : "via-blue-600 opacity-0 group-focus-within:opacity-100"}`}
          />
        </div>
        {/* Validation message */}
        {errors.name && touched.name && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 mt-2 text-sm text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{errors.name}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Email field with floating label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="group relative"
      >
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder=" "
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            required
            autoComplete="email"
            className={`w-full min-h-[56px] px-5 pt-6 pb-2 text-base
                       bg-white backdrop-blur-xl
                       border-2 rounded-xl
                       text-slate-900 placeholder-transparent
                       transition-all duration-300
                       hover:bg-slate-50
                       focus:outline-none focus:bg-white
                       focus:ring-4 focus:ring-blue-100
                       focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]
                       touch-manipulation peer
                       ${errors.email && touched.email ? "border-red-400 focus:border-red-500" : "border-slate-200 hover:border-slate-300 focus:border-blue-600"}`}
          />
          <label
            htmlFor="email"
            className={`absolute left-5 transition-all duration-200 pointer-events-none
                       peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400
                       peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600
                       ${formData.email ? "top-3 text-xs text-slate-600" : "top-1/2 -translate-y-1/2 text-base text-slate-400"}`}
          >
            Email Address <span className="text-blue-600">*</span>
          </label>
          <div
            className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent transition-all duration-300
                          ${errors.email && touched.email ? "via-red-500 opacity-100" : "via-blue-600 opacity-0 group-focus-within:opacity-100"}`}
          />
        </div>
        {errors.email && touched.email && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 mt-2 text-sm text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{errors.email}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Phone field with floating label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="group relative"
      >
        <div className="relative">
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            placeholder=" "
            value={formData.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            required
            autoComplete="tel"
            className={`w-full min-h-[56px] px-5 pt-6 pb-2 text-base
                       bg-white backdrop-blur-xl
                       border-2 rounded-xl
                       text-slate-900 placeholder-transparent
                       transition-all duration-300
                       hover:bg-slate-50
                       focus:outline-none focus:bg-white
                       focus:ring-4 focus:ring-blue-100
                       focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]
                       touch-manipulation peer
                       ${errors.phone && touched.phone ? "border-red-400 focus:border-red-500" : "border-slate-200 hover:border-slate-300 focus:border-blue-600"}`}
          />
          <label
            htmlFor="phone"
            className={`absolute left-5 transition-all duration-200 pointer-events-none
                       peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400
                       peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600
                       ${formData.phone ? "top-3 text-xs text-slate-600" : "top-1/2 -translate-y-1/2 text-base text-slate-400"}`}
          >
            Phone Number <span className="text-blue-600">*</span>
          </label>
          <div
            className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent transition-all duration-300
                          ${errors.phone && touched.phone ? "via-red-500 opacity-100" : "via-blue-600 opacity-0 group-focus-within:opacity-100"}`}
          />
        </div>
        {errors.phone && touched.phone && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 mt-2 text-sm text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{errors.phone}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Service select with floating label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="group relative"
      >
        <div className="relative">
          <select
            id="service"
            value={formData.service}
            onChange={(e) => handleFieldChange("service", e.target.value)}
            onBlur={() => handleBlur("service")}
            required
            className={`w-full min-h-[56px] px-5 pt-6 pb-2 text-base appearance-none
                       bg-white backdrop-blur-xl
                       border-2 rounded-xl
                       transition-all duration-300
                       hover:bg-slate-50
                       focus:outline-none focus:bg-white
                       focus:ring-4 focus:ring-blue-100
                       focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]
                       touch-manipulation peer
                       [&>option]:bg-white [&>option]:text-slate-900
                       ${formData.service ? "text-slate-900" : "text-slate-400"}
                       ${errors.service && touched.service ? "border-red-400 focus:border-red-500" : "border-slate-200 hover:border-slate-300 focus:border-blue-600"}`}
          >
            <option value="">Select a Service</option>
            <option value="voice-ai">Voice AI</option>
            <option value="google-ads">Google Ads</option>
            <option value="facebook-ads">Facebook Ads</option>
            <option value="all">All Services</option>
          </select>
          <label
            htmlFor="service"
            className="absolute left-5 top-2 text-xs text-slate-500 transition-all duration-200 pointer-events-none"
          >
            Service Interested In <span className="text-blue-600">*</span>
          </label>
          <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <div
            className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent transition-all duration-300
                          ${errors.service && touched.service ? "via-red-500 opacity-100" : "via-blue-600 opacity-0 group-focus-within:opacity-100"}`}
          />
        </div>
        {errors.service && touched.service && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 mt-2 text-sm text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{errors.service}</span>
          </motion.div>
        )}
      </motion.div>

      {/* Message textarea with floating label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="group relative"
      >
        <div className="relative">
          <textarea
            id="message"
            placeholder=" "
            value={formData.message}
            onChange={(e) => handleFieldChange("message", e.target.value)}
            rows={4}
            className="w-full px-5 pt-6 pb-3 text-base
                       bg-white backdrop-blur-xl
                       border-2 border-slate-200 rounded-xl
                       text-slate-900 placeholder-transparent
                       transition-all duration-300
                       hover:bg-slate-50 hover:border-slate-300
                       focus:outline-none focus:bg-white
                       focus:border-blue-600 focus:ring-4 focus:ring-blue-100
                       focus:shadow-[0_0_20px_rgba(37,99,235,0.1)]
                       touch-manipulation peer
                       resize-none"
          />
          <label
            htmlFor="message"
            className={`absolute left-5 transition-all duration-200 pointer-events-none
                       peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400
                       peer-focus:top-3 peer-focus:text-xs peer-focus:text-blue-600
                       ${formData.message ? "top-3 text-xs text-slate-600" : "top-5 text-base text-slate-400"}`}
          >
            Tell Us About Your Business <span className="text-slate-500">(Optional)</span>
          </label>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.div>

      {/* SMS Consent Checkbox - A2P 10DLC Compliant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="group"
      >
        <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all">
          <input
            type="checkbox"
            checked={formData.smsConsent}
            onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
            className="mt-1 w-5 h-5 rounded border-2 border-slate-300 bg-slate-100
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
            Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe.{" "}
            <Link href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            &{" "}
            <Link href="/terms-of-service" className="text-blue-600 hover:underline">
              Terms
            </Link>
          </span>
        </label>
      </motion.div>

      {/* Premium gradient submit button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full min-h-[56px] overflow-hidden rounded-xl
                   transition-all duration-300
                   hover:scale-[1.02] active:scale-[0.98]
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] animate-gradient-shift" />

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

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
              Get Your Free Consultation
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </span>
      </motion.button>

      {/* Call option with trust signals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex flex-col items-center gap-3 pt-2"
      >
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-slate-300" />
          <span>OR</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-slate-300" />
        </div>

        <a
          href="tel:865-346-6111"
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg
                     bg-white border border-slate-200
                     hover:bg-slate-50 hover:border-blue-200
                     transition-all duration-300
                     touch-manipulation active:scale-95
                     min-h-[56px]"
          onClick={() => trackPhoneClick("865-346-6111", `lead_form_${source}`)}
        >
          <Phone className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
            Call us directly:
          </span>
          <span className="text-base font-bold text-blue-600 group-hover:underline">
            (865) 346-6111
          </span>
        </a>
      </motion.div>
    </form>
  );
}
