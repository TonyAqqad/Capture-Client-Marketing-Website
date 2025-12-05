"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { presets } from "@/lib/simulator-animations";
import { trackFormStart, trackFormSubmission } from "@/lib/analytics";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface TimeSlot {
  time: string;
  available: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
}

type Step = "time" | "info" | "confirm";

// ============================================================================
// DATA
// ============================================================================

const TIME_SLOTS: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "11:00 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "1:00 PM", available: false },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "4:00 PM", available: true },
];

const SERVICES = [
  "Voice AI Demo",
  "Google Ads Consultation",
  "Facebook Ads Strategy",
  "Full Growth Package Review",
  "General Consultation",
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SmartScheduler() {
  const [step, setStep] = useState<Step>("time");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: SERVICES[0],
  });
  const [formStarted, setFormStarted] = useState(false);

  // Track form start on first interaction
  const handleFormStart = () => {
    if (!formStarted) {
      trackFormStart("smart_scheduler");
      setFormStarted(true);
    }
  };

  const handleTimeSelect = (time: string) => {
    handleFormStart();
    setSelectedTime(time);
  };

  const handleNext = async () => {
    if (step === "time" && selectedTime) {
      // Track step progression
      trackFormSubmission("smart_scheduler_step1", {
        step: 1,
        selected_time: selectedTime,
      });
      setStep("info");
    } else if (step === "info") {
      // Submit to server-side API route (avoids CORS issues)
      // Include service selection for better lead context in GoHighLevel
      try {
        await fetch("/api/submit-lead", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: "",
            source: "smart_scheduler",
            service: formData.service,
            message: `Appointment request for ${selectedTime}`,
          }),
        });
      } catch {
        // Graceful degradation
      }

      // Track successful form submission
      trackFormSubmission("smart_scheduler_complete", {
        step: 2,
        service: formData.service,
        selected_time: selectedTime,
      });

      setStep("confirm");
    }
  };

  const handleBack = () => {
    if (step === "info") {
      setStep("time");
    } else if (step === "confirm") {
      setStep("info");
    }
  };

  const canProceed = () => {
    if (step === "time") return selectedTime !== null;
    if (step === "info") return formData.name && formData.email && formData.phone;
    return false;
  };

  return (
    <section className="section bg-background relative overflow-hidden">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-widest text-primary mb-4"
          >
            Book Your Demo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            Schedule Your Free Consultation
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Pick a time that works for you. No pressure, just value.
          </motion.p>
        </div>

        {/* Scheduler card */}
        <div className="max-w-3xl mx-auto">
          <div className="card p-8 lg:p-10">
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-10">
              <ProgressStep
                number={1}
                label="Select Time"
                active={step === "time"}
                completed={step !== "time"}
              />
              <div
                className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-300 ${
                  step !== "time" ? "bg-accent" : "bg-surface-border"
                }`}
              />
              <ProgressStep
                number={2}
                label="Your Info"
                active={step === "info"}
                completed={step === "confirm"}
              />
              <div
                className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-300 ${
                  step === "confirm" ? "bg-accent" : "bg-surface-border"
                }`}
              />
              <ProgressStep
                number={3}
                label="Confirm"
                active={step === "confirm"}
                completed={false}
              />
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              {step === "time" && (
                <motion.div
                  key="time"
                  variants={presets.fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                    Pick Your Preferred Time
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {TIME_SLOTS.map((slot, index) => (
                      <motion.button
                        key={slot.time}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        disabled={!slot.available}
                        onClick={() => handleTimeSelect(slot.time)}
                        whileHover={slot.available ? { scale: 1.05, y: -2 } : {}}
                        whileTap={slot.available ? { scale: 0.98 } : {}}
                        className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 min-h-[56px] flex items-center justify-center relative overflow-hidden ${
                          !slot.available
                            ? "bg-surface border-surface-border text-foreground-muted cursor-not-allowed opacity-50"
                            : selectedTime === slot.time
                              ? "bg-accent/10 border-accent text-accent shadow-lg shadow-accent/20"
                              : "bg-surface border-surface-border text-foreground hover:border-accent/50 hover:shadow-md"
                        }`}
                      >
                        {selectedTime === slot.time && (
                          <motion.div
                            layoutId="timeSlotHighlight"
                            className="absolute inset-0 bg-accent/5 rounded-xl"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{slot.time}</span>
                        {!slot.available && (
                          <span className="absolute bottom-1 right-1 text-[10px] text-foreground-muted opacity-50">
                            Taken
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "info" && (
                <motion.div
                  key="info"
                  variants={presets.fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                    Tell Us About Yourself
                  </h3>
                  <div className="space-y-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-foreground font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl bg-background border-2 border-surface-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all duration-300 min-h-[48px] text-base"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-foreground font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        inputMode="email"
                        className="w-full px-4 py-3 rounded-xl bg-background border-2 border-surface-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all duration-300 min-h-[48px] text-base"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-foreground font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        inputMode="tel"
                        className="w-full px-4 py-3 rounded-xl bg-background border-2 border-surface-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all duration-300 min-h-[48px] text-base"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-foreground font-semibold mb-2">
                        What are you interested in? *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border-2 border-surface-border text-black focus:outline-none focus:border-accent focus:shadow-lg focus:shadow-accent/10 transition-all duration-300 min-h-[48px] text-base cursor-pointer"
                      >
                        {SERVICES.map((service) => (
                          <option key={service} value={service} className="text-black bg-white">
                            {service}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {step === "confirm" && (
                <motion.div
                  key="confirm"
                  variants={presets.fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6"
                    >
                      <span className="material-icons text-accent text-5xl">event_available</span>
                    </motion.div>
                    <h3 className="text-3xl font-heading font-bold text-foreground mb-3">
                      You're All Set!
                    </h3>
                    <p className="text-foreground-muted text-lg">
                      Your consultation has been scheduled
                    </p>
                  </div>

                  <div className="card p-6 mb-8 bg-accent/5 border-accent/20">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="material-icons text-accent">schedule</span>
                        <div>
                          <p className="text-foreground-muted text-sm">Time</p>
                          <p className="text-foreground font-semibold">{selectedTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-icons text-accent">person</span>
                        <div>
                          <p className="text-foreground-muted text-sm">Name</p>
                          <p className="text-foreground font-semibold">{formData.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-icons text-accent">email</span>
                        <div>
                          <p className="text-foreground-muted text-sm">Email</p>
                          <p className="text-foreground font-semibold">{formData.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="material-icons text-accent">support_agent</span>
                        <div>
                          <p className="text-foreground-muted text-sm">Service</p>
                          <p className="text-foreground font-semibold">{formData.service}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-foreground-muted text-sm">
                    A calendar invite has been sent to{" "}
                    <span className="font-semibold text-foreground">{formData.email}</span>
                    <br />
                    We'll call you at the scheduled time. Looking forward to speaking with you!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            {step !== "confirm" && (
              <div className="flex items-center justify-between gap-4 mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === "time"}
                  className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-icons">arrow_back</span>
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step === "info" ? "Confirm Booking" : "Next"}
                  <span className="material-icons">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PROGRESS STEP COMPONENT
// ============================================================================

interface ProgressStepProps {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}

function ProgressStep({ number, label, active, completed }: ProgressStepProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{
          scale: active ? 1.1 : 1,
        }}
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-300 relative overflow-hidden ${
          completed
            ? "bg-accent border-accent text-white shadow-lg shadow-accent/30"
            : active
              ? "bg-accent/10 border-accent text-accent shadow-md shadow-accent/20"
              : "bg-surface border-surface-border text-foreground-muted"
        }`}
      >
        {completed && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <span className="material-icons text-lg">check</span>
          </motion.div>
        )}
        {!completed && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {number}
          </motion.span>
        )}

        {/* Pulse effect for active step */}
        {active && !completed && (
          <motion.div
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute inset-0 rounded-full border-2 border-accent"
          />
        )}
      </motion.div>
      <p
        className={`text-xs font-medium transition-colors duration-300 ${
          active ? "text-foreground" : "text-foreground-muted"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
