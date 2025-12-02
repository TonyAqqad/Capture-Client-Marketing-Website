"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExitIntent } from "@/hooks/useExitIntent";
import { trackFormStart, trackFormSubmission } from "@/lib/analytics";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ExitIntentModal() {
  const { showModal, closeModal } = useExitIntent({
    sensitivity: 30,
    delay: 300,
    cookieExpiry: 7,
  });

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  // Track form start on first interaction
  const handleFormStart = () => {
    if (!formStarted) {
      trackFormStart("exit_intent_modal");
      setFormStarted(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to server-side API route (avoids CORS issues)
      // Include source for lead tracking in GoHighLevel
      await fetch("/api/submit-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: email.split("@")[0],
          email: email,
          phone: "",
          company: "",
          source: "exit_intent_modal",
        }),
      });
    } catch {
      // Graceful degradation
    }

    // Track successful form submission
    trackFormSubmission("exit_intent_modal", {
      source: "exit_intent_modal",
    });

    setSubmitted(true);
    setLoading(false);

    // Close after 3 seconds
    setTimeout(() => {
      closeModal();
      setSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 md:backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-surface border border-surface-border rounded-2xl p-8 lg:p-10 shadow-2xl mx-auto"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-surface-hover border border-surface-border hover:bg-surface flex items-center justify-center transition-colors group"
              >
                <span className="material-icons text-foreground-muted group-hover:text-foreground text-lg">
                  close
                </span>
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-6"
                    >
                      <span className="material-icons text-accent text-3xl">auto_awesome</span>
                    </motion.div>

                    {/* Headline */}
                    <h3 className="text-3xl font-heading font-bold text-foreground mb-3">
                      Wait! Don't Miss This.
                    </h3>

                    {/* Description */}
                    <p className="text-foreground-muted text-lg mb-6">
                      Get our free guide:{" "}
                      <span className="font-semibold text-foreground">
                        "10 Ways AI Voice Agents Double Your Leads"
                      </span>
                      <br />
                      Plus exclusive tips sent weekly.
                    </p>

                    {/* Benefits list */}
                    <div className="space-y-3 mb-8">
                      {[
                        "Proven strategies from 500+ businesses",
                        "Real ROI examples and case studies",
                        "Actionable tips you can implement today",
                      ].map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <span className="material-icons text-accent text-lg mt-0.5">
                            check_circle
                          </span>
                          <p className="text-foreground">{benefit}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            handleFormStart();
                            setEmail(e.target.value);
                          }}
                          placeholder="Enter your email"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-background border border-surface-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="material-icons"
                            >
                              refresh
                            </motion.span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <span className="material-icons">download</span>
                            Get My Free Guide
                          </>
                        )}
                      </button>

                      <p className="text-center text-foreground-muted text-xs">
                        No spam. Unsubscribe anytime. We respect your privacy.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    {/* Success icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-6"
                    >
                      <span className="material-icons text-accent text-5xl">check_circle</span>
                    </motion.div>

                    <h3 className="text-3xl font-heading font-bold text-foreground mb-3">
                      You're All Set!
                    </h3>
                    <p className="text-foreground-muted text-lg">
                      Check your email for your free guide.
                      <br />
                      We'll also send you exclusive tips weekly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
