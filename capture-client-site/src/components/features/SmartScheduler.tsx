"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { presets } from "@/lib/simulator-animations";

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

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleNext = () => {
    if (step === "time" && selectedTime) {
      setStep("info");
    } else if (step === "info") {
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
    if (step === "info")
      return formData.name && formData.email && formData.phone;
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
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot.time}
                        disabled={!slot.available}
                        onClick={() => handleTimeSelect(slot.time)}
                        className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                          !slot.available
                            ? "bg-surface border-surface-border text-foreground-muted cursor-not-allowed opacity-50"
                            : selectedTime === slot.time
                            ? "bg-accent/10 border-accent text-accent"
                            : "bg-surface border-surface-border text-foreground hover:border-accent/50"
                        }`}
                      >
                        {slot.time}
                      </button>
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
                    <div>
                      <label className="block text-foreground font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-surface-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-surface-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 rounded-xl bg-background border border-surface-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-foreground font-semibold mb-2">
                        What are you interested in? *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-background border border-surface-border text-foreground focus:outline-none focus:border-accent transition-colors"
                      >
                        {SERVICES.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
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
                      <span className="material-icons text-accent text-5xl">
                        event_available
                      </span>
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
        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold transition-colors duration-300 ${
          completed
            ? "bg-accent border-accent text-white"
            : active
            ? "bg-accent/10 border-accent text-accent"
            : "bg-surface border-surface-border text-foreground-muted"
        }`}
      >
        {completed ? (
          <span className="material-icons text-lg">check</span>
        ) : (
          number
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
