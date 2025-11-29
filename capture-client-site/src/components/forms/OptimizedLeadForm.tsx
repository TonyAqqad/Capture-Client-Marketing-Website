"use client";

import { useState } from "react";

interface OptimizedLeadFormProps {
  source?: string;
}

export default function OptimizedLeadForm({ source = "general" }: OptimizedLeadFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    challenge: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleStepOne = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    console.log("Form submitted:", { ...formData, source });
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", phone: "", challenge: "" });
      setStep(1);
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-4">
          <span className="material-icons text-accent text-4xl">check_circle</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">We Got Your Request!</h3>
        <p className="text-gray-300 mb-4">
          A growth specialist will call you within 15 minutes.
        </p>
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
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-5 py-4 bg-white/5 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
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
                className="w-full px-5 py-4 bg-white/5 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-background-dark font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-glow-lg hover:scale-[1.02] uppercase tracking-wide text-sm"
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
              className="w-full px-5 py-4 bg-white/5 border-2 border-gray-700 rounded-xl text-white focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
            >
              <option value="">Select your main challenge...</option>
              <option value="missing-calls">Missing too many customer calls</option>
              <option value="not-enough-leads">Not getting enough leads</option>
              <option value="poor-roi">Ad campaigns not profitable</option>
              <option value="no-system">No system to track leads</option>
              <option value="overwhelmed">Too much to manage manually</option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-4 bg-white/5 border border-gray-700 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <span className="material-icons text-lg">arrow_back</span>
            </button>
            <button
              type="submit"
              className="flex-1 bg-accent text-background-dark font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-glow-lg hover:scale-[1.02] uppercase tracking-wide text-sm"
            >
              Get My Free Demo
              <span className="material-icons ml-2 text-lg align-middle">rocket_launch</span>
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
            Or call: <a href="tel:865-346-3339" className="text-accent hover:underline font-semibold">(865) 346-3339</a>
          </p>
        </form>
      )}
    </div>
  );
}
