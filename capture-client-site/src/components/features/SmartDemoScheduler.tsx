"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackFormStart, trackFormSubmission } from "@/lib/analytics";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TimeSlot {
  time: string;
  available: boolean;
  urgent?: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  industry: string;
  company: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const INDUSTRIES = [
  "HVAC",
  "Plumbing",
  "Dental",
  "Legal",
  "Auto Repair",
  "Fitness",
  "Real Estate",
  "Other",
];

// Generate time slots for next 7 days
const generateTimeSlots = (dayOffset: number): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

  times.forEach((time) => {
    // Randomly mark some as unavailable for realism
    const available = Math.random() > 0.3;
    slots.push({ time, available });
  });

  return slots;
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SmartDemoScheduler() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    industry: "",
    company: "",
  });
  const [formStarted, setFormStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate days for next week
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      fullDate: date,
    };
  });

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    setTimeSlots(generateTimeSlots(selectedDay));
    setSelectedTime(null);
  }, [selectedDay]);

  const handleFormStart = () => {
    if (!formStarted) {
      trackFormStart("smart_demo_scheduler");
      setFormStarted(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        ...formData,
        selectedDate: days[selectedDay].fullDate.toISOString(),
        selectedTime,
        source: "smart_demo_scheduler",
      };

      await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      trackFormSubmission("smart_demo_scheduler", {
        industry: formData.industry,
        selectedTime,
      });

      setStep(3);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section bg-background relative overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
          >
            Book Your Live Demo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            See Voice AI in Action
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Schedule a personalized demo with one of our AI specialists
          </motion.p>
        </div>

        {/* Scheduler card */}
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 lg:p-12">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s
                        ? "bg-accent text-white"
                        : "bg-surface-hover text-foreground-muted border border-surface-border"
                    }`}
                  >
                    {step > s ? (
                      <span className="material-icons">check</span>
                    ) : (
                      s
                    )}
                  </div>
                  <span
                    className={`hidden sm:inline text-sm font-semibold ${
                      step >= s ? "text-foreground" : "text-foreground-muted"
                    }`}
                  >
                    {s === 1 ? "Time" : s === 2 ? "Details" : "Confirm"}
                  </span>
                  {s < 3 && (
                    <div
                      className={`hidden sm:block w-16 h-0.5 ml-2 ${
                        step > s ? "bg-accent" : "bg-surface-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* STEP 1: Select Time */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-center mb-8">
                    Choose Your Preferred Time
                  </h3>

                  {/* Day selector */}
                  <div className="grid grid-cols-7 gap-2 mb-8">
                    {days.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDay(index)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedDay === index
                            ? "bg-accent/10 border-accent text-accent"
                            : "bg-surface border-surface-border text-foreground-muted hover:bg-surface-hover"
                        }`}
                      >
                        <div className="text-xs font-semibold">{day.dayName}</div>
                        <div className="text-lg font-bold mt-1">{day.date}</div>
                        <div className="text-xs">{day.month}</div>
                      </button>
                    ))}
                  </div>

                  {/* Time slots */}
                  <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
                    {timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => slot.available && setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-4 rounded-xl border-2 transition-all font-semibold ${
                          selectedTime === slot.time
                            ? "bg-accent border-accent text-white"
                            : slot.available
                            ? "bg-surface border-surface-border text-foreground hover:bg-surface-hover hover:border-accent/50"
                            : "bg-surface-hover/50 border-surface-border text-foreground-muted cursor-not-allowed opacity-50"
                        }`}
                      >
                        {slot.time}
                        {slot.urgent && slot.available && (
                          <span className="block text-xs text-red-400 mt-1">Only 1 left!</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Timezone notice */}
                  <p className="text-center text-foreground-muted text-sm mb-8">
                    <span className="material-icons text-xs align-middle mr-1">schedule</span>
                    Times shown in your local timezone (EST)
                  </p>

                  {/* Continue button */}
                  <div className="text-center">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!selectedTime}
                      className="btn-primary inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                      <span className="material-icons">arrow_forward</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Your Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-center mb-2">
                    Tell Us About Your Business
                  </h3>
                  <p className="text-center text-foreground-muted mb-8">
                    We'll customize the demo for your industry
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            handleFormStart();
                            setFormData({ ...formData, name: e.target.value });
                          }}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-border text-foreground focus:outline-none focus:border-accent"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => {
                            handleFormStart();
                            setFormData({ ...formData, company: e.target.value });
                          }}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-border text-foreground focus:outline-none focus:border-accent"
                          placeholder="ABC Company"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          handleFormStart();
                          setFormData({ ...formData, email: e.target.value });
                        }}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-border text-foreground focus:outline-none focus:border-accent"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          handleFormStart();
                          setFormData({ ...formData, phone: e.target.value });
                        }}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-border text-foreground focus:outline-none focus:border-accent"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Industry *
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => {
                          handleFormStart();
                          setFormData({ ...formData, industry: e.target.value });
                        }}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-surface-border text-foreground focus:outline-none focus:border-accent"
                      >
                        <option value="">Select your industry</option>
                        {INDUSTRIES.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 px-6 py-3 rounded-xl bg-surface border border-surface-border text-foreground font-semibold hover:bg-surface-hover transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="material-icons"
                            >
                              refresh
                            </motion.span>
                            Booking...
                          </>
                        ) : (
                          <>
                            <span className="material-icons">check_circle</span>
                            Confirm Booking
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="text-center py-12"
                >
                  {/* Success icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center mx-auto mb-8"
                  >
                    <span className="material-icons text-accent text-5xl">check_circle</span>
                  </motion.div>

                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    Demo Booked Successfully!
                  </h3>

                  <div className="max-w-md mx-auto mb-8 p-6 rounded-xl bg-surface-hover border border-surface-border">
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3">
                        <span className="material-icons text-accent">event</span>
                        <div>
                          <p className="text-xs text-foreground-muted">Date & Time</p>
                          <p className="font-semibold text-foreground">
                            {days[selectedDay].fullDate.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            })}{" "}
                            at {selectedTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="material-icons text-accent">person</span>
                        <div>
                          <p className="text-xs text-foreground-muted">Name</p>
                          <p className="font-semibold text-foreground">{formData.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="material-icons text-accent">email</span>
                        <div>
                          <p className="text-xs text-foreground-muted">Email</p>
                          <p className="font-semibold text-foreground">{formData.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-8 max-w-md mx-auto">
                    <div className="flex items-start gap-3">
                      <span className="material-icons text-primary">info</span>
                      <div className="text-left">
                        <p className="font-semibold text-foreground mb-2">
                          Check your email
                        </p>
                        <p className="text-sm text-foreground-muted">
                          We've sent a calendar invite to <strong>{formData.email}</strong> with
                          a Zoom link for your demo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-foreground-muted mb-6">
                    Have questions before your demo?{" "}
                    <a href="tel:+18889990000" className="text-accent hover:underline">
                      Call us at (888) 999-0000
                    </a>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
