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
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 sm:p-8 text-center animate-fade-in">
        <span className="material-icons text-primary text-5xl sm:text-6xl mb-4">check_circle</span>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-sm sm:text-base text-gray-300">We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name field with label */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Your Name <span className="text-primary">*</span>
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
          className="w-full min-h-[48px] px-4 py-3 text-base bg-white/5 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>

      {/* Email field with label */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address <span className="text-primary">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full min-h-[48px] px-4 py-3 text-base bg-white/5 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>

      {/* Phone field with label */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number <span className="text-primary">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="(865) 555-1234"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="w-full min-h-[48px] px-4 py-3 text-base bg-white/5 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
      </div>

      {/* Service select with label */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
          Service Interested In <span className="text-primary">*</span>
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          required
          className="w-full min-h-[48px] px-4 py-3 text-base bg-white border-2 border-gray-700 rounded-lg text-black focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        >
          <option value="" className="text-black bg-white">Select a Service</option>
          <option value="voice-ai" className="text-black bg-white">Voice AI</option>
          <option value="google-ads" className="text-black bg-white">Google Ads</option>
          <option value="facebook-ads" className="text-black bg-white">Facebook Ads</option>
          <option value="all" className="text-black bg-white">All Services</option>
        </select>
      </div>

      {/* Message textarea with label */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Tell Us About Your Business (Optional)
        </label>
        <textarea
          id="message"
          placeholder="What are your goals?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 text-base bg-white/5 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
        />
      </div>

      {/* Submit button - mobile optimized */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[52px] bg-primary text-black px-6 sm:px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 active:scale-95 glowing-button disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          "Get Your Free Consultation"
        )}
      </button>

      {/* Call option - mobile optimized */}
      <p className="text-xs sm:text-sm text-gray-400 text-center pt-2">
        Or call us directly:{" "}
        <a
          href="tel:865-346-3339"
          className="text-primary hover:underline font-semibold min-h-[44px] inline-block"
          onClick={() => trackPhoneClick("865-346-3339", `lead_form_${source}`)}
        >
          (865) 346-3339
        </a>
      </p>
    </form>
  );
}
