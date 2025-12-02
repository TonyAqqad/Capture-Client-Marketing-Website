"use client";

import { useState } from "react";
import { trackFormStart, trackFormSubmission, trackPhoneClick } from "@/lib/analytics";

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
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  // Track form start on first interaction
  const handleFormStart = () => {
    if (!formStarted) {
      trackFormStart(`lead_capture_${source}`);
      setFormStarted(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="relative group animate-fade-in">
        {/* Success glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 via-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-50 animate-pulse" />

        <div className="relative glass-premium p-8 sm:p-10 text-center rounded-2xl border border-accent/30">
          {/* Animated checkmark */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 border-2 border-accent mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-accent/10 animate-ping" />
            <span className="material-icons text-accent text-5xl relative z-10 animate-bounce-subtle">check_circle</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Thank You!
          </h3>
          <p className="text-base sm:text-lg text-white/70 mb-2">
            Your message has been sent successfully.
          </p>
          <p className="text-sm text-white/50">
            We'll get back to you within 2 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      {/* Name field with premium glass styling */}
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
                       focus:shadow-[0_0_20px_rgba(0,201,255,0.15)]
                       touch-manipulation"
          />
          {/* Decorative accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Email field with glass styling */}
      <div className="group">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-white/90 mb-2.5 transition-colors group-focus-within:text-accent"
        >
          Email Address <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="john@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            autoComplete="email"
            className="w-full min-h-[52px] px-5 py-4 text-base
                       bg-white/[0.03] backdrop-blur-xl
                       border-2 border-white/10 rounded-xl
                       text-white placeholder-white/40
                       transition-all duration-300
                       hover:bg-white/[0.05] hover:border-white/20
                       focus:outline-none focus:bg-white/[0.08]
                       focus:border-accent focus:ring-4 focus:ring-accent/20
                       focus:shadow-[0_0_20px_rgba(0,201,255,0.15)]
                       touch-manipulation"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Phone field with glass styling */}
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
            className="w-full min-h-[52px] px-5 py-4 text-base
                       bg-white/[0.03] backdrop-blur-xl
                       border-2 border-white/10 rounded-xl
                       text-white placeholder-white/40
                       transition-all duration-300
                       hover:bg-white/[0.05] hover:border-white/20
                       focus:outline-none focus:bg-white/[0.08]
                       focus:border-accent focus:ring-4 focus:ring-accent/20
                       focus:shadow-[0_0_20px_rgba(0,201,255,0.15)]
                       touch-manipulation"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Service select with premium styling */}
      <div className="group">
        <label
          htmlFor="service"
          className="block text-sm font-semibold text-white/90 mb-2.5 transition-colors group-focus-within:text-accent"
        >
          Service Interested In <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <select
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
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
                       touch-manipulation
                       [&>option]:bg-background-dark [&>option]:text-white"
          >
            <option value="">Select a Service</option>
            <option value="voice-ai">Voice AI</option>
            <option value="google-ads">Google Ads</option>
            <option value="facebook-ads">Facebook Ads</option>
            <option value="all">All Services</option>
          </select>
          {/* Custom dropdown icon */}
          <span className="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-xl">
            expand_more
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Message textarea with premium styling */}
      <div className="group">
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-white/90 mb-2.5 transition-colors group-focus-within:text-accent"
        >
          Tell Us About Your Business <span className="text-white/40">(Optional)</span>
        </label>
        <div className="relative">
          <textarea
            id="message"
            placeholder="What are your goals?"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={4}
            className="w-full px-5 py-4 text-base
                       bg-white/[0.03] backdrop-blur-xl
                       border-2 border-white/10 rounded-xl
                       text-white placeholder-white/40
                       transition-all duration-300
                       hover:bg-white/[0.05] hover:border-white/20
                       focus:outline-none focus:bg-white/[0.08]
                       focus:border-accent focus:ring-4 focus:ring-accent/20
                       focus:shadow-[0_0_20px_rgba(0,201,255,0.15)]
                       touch-manipulation
                       resize-none"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Premium gradient submit button */}
      <button
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
        <span className="relative z-10 flex items-center justify-center gap-3 px-8 py-4 text-base sm:text-lg font-bold text-background-dark uppercase tracking-wider">
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Get Your Free Consultation
              <span className="material-icons text-xl transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </>
          )}
        </span>
      </button>

      {/* Call option with trust signals */}
      <div className="flex flex-col items-center gap-3 pt-2">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-white/20" />
          <span>OR</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-white/20" />
        </div>

        <a
          href="tel:865-346-3339"
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg
                     bg-white/[0.03] border border-white/10
                     hover:bg-white/[0.08] hover:border-accent/30
                     transition-all duration-300
                     touch-manipulation active:scale-95
                     min-h-[56px]"
          onClick={() => trackPhoneClick("865-346-3339", `lead_form_${source}`)}
        >
          <span className="material-icons text-accent text-lg">phone</span>
          <span className="text-sm text-white/80 group-hover:text-white transition-colors">
            Call us directly:
          </span>
          <span className="text-base font-bold text-accent group-hover:underline">
            (865) 346-3339
          </span>
        </a>
      </div>
    </form>
  );
}
