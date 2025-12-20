"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useSimulationState } from "@/hooks/useSimulationState";
import { useTypewriter } from "@/hooks/useTypewriter";
import { presets, ctaButton, stageTransitions, EASING } from "@/lib/simulator-animations";
import AudioWaveform from "./AudioWaveform";
import CRMCard from "./CRMCard";
import { PhoneIncoming, PhoneCall, Headset, Bot, RefreshCw, Lock, CloudCheck, CheckCircle, Rocket, RotateCcw } from "lucide-react";

// ============================================================================
// CONSTANTS
// ============================================================================

const AI_TRANSCRIPT =
  "Thanks for calling Titan Fitness! I can definitely help you with membership pricing. Are you looking to join today?";

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function LeadRescueSimulator() {
  const { state, controls } = useSimulationState();
  const { stage, callState, isTyping, crmFields } = state;
  const { startSimulation, resetSimulation } = controls;

  // Typewriter hook for AI transcript
  const transcript = useTypewriter({
    text: AI_TRANSCRIPT,
    isActive: isTyping,
    speed: 40,
  });

  // Convert CRM fields to match CRMCard interface
  const crmCardFields = crmFields.map((field) => ({
    label: field.label,
    value: field.value,
    filled: field.isFilled,
    urgent: field.isUrgent,
  }));

  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Gradient orbs - mobile optimized */}
        <div className="absolute top-1/4 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#4A69E2]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/8 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 max-w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {/* ========================================== */}
          {/* STAGE 1: SETUP (The Hook) */}
          {/* ========================================== */}
          {stage === "setup" && (
            <motion.div
              key="setup"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={stageTransitions.stage1Exit}
              className="max-w-3xl mx-auto text-center px-2"
            >
              {/* Badge */}
              <motion.div
                variants={presets.fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-100 border border-slate-200 backdrop-blur-sm mb-6 sm:mb-8"
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-cyan-400"
                />
                <span className="text-cyan-600 text-sm font-medium tracking-wide">
                  Live Demo
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                variants={presets.fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight tracking-tight px-2"
              >
                Stop Losing New Members
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-[#2563EB]">
                  to Voicemail.
                </span>
              </motion.h2>

              {/* Subheadline */}
              <motion.p
                variants={presets.fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed px-2"
              >
                See what happens when AI answers your gym phone 24/7.
              </motion.p>

              {/* CTA Button - Premium Glow Effect - Mobile Optimized */}
              <motion.button
                variants={ctaButton.variants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(34, 211, 238, 0.3), 0 0 30px rgba(99, 102, 241, 0.2)",
                    "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(99, 102, 241, 0.3)",
                    "0 0 15px rgba(34, 211, 238, 0.3), 0 0 30px rgba(99, 102, 241, 0.2)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                onClick={startSimulation}
                className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-semibold text-white text-base sm:text-lg overflow-hidden w-full max-w-md mx-auto min-h-[56px] touch-manipulation"
              >
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-cyan-400 to-[#4A69E2]" />

                {/* Animated shimmer overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={{
                    backgroundPosition: ["200% 0", "-200% 0"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <PhoneIncoming className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="whitespace-nowrap">Simulate New Member Call</span>
                </span>
              </motion.button>

              {/* Trust text */}
              <motion.p
                variants={presets.fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.6 }}
                className="mt-8 text-sm text-slate-500"
              >
                No signup required. See real AI in action.
              </motion.p>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* STAGE 2: SIMULATION (The Wow Factor) */}
          {/* ========================================== */}
          {stage === "simulation" && (
            <motion.div
              key="simulation"
              variants={stageTransitions.stage2Enter}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-6xl mx-auto px-2"
            >
              {/* Status Header */}
              <div className="text-center mb-6 sm:mb-8">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-sm ${
                    callState === "ringing"
                      ? "bg-orange-500/10 border-orange-500/30"
                      : "bg-cyan-500/10 border-cyan-500/30"
                  }`}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className={`w-2.5 h-2.5 rounded-full ${
                      callState === "ringing" ? "bg-orange-500" : "bg-cyan-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-mono font-semibold tracking-wider ${
                      callState === "ringing" ? "text-orange-600" : "text-cyan-600"
                    }`}
                  >
                    {callState === "ringing" ? "INCOMING CALL..." : "AI AGENT CONNECTED"}
                  </span>
                </motion.div>
              </div>

              {/* Split View - Mobile Stacked, Desktop Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {/* Left Side: Voice Core */}
                <motion.div
                  variants={presets.slideInLeft}
                  initial="hidden"
                  animate="visible"
                  className="backdrop-blur-xl bg-white/70 border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl"
                >
                  {/* Phone Header - Mobile Optimized */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <motion.div
                        animate={
                          callState === "ringing"
                            ? { rotate: [0, -10, 10, -10, 10, 0] }
                            : {}
                        }
                        transition={{ duration: 0.5, repeat: callState === "ringing" ? Infinity : 0, repeatDelay: 0.5 }}
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          callState === "ringing"
                            ? "bg-orange-500/20 border border-orange-500/30"
                            : "bg-cyan-500/20 border border-cyan-500/30"
                        }`}
                      >
                        {callState === "ringing" ? (
                          <PhoneCall className={`w-5 h-5 sm:w-6 sm:h-6 text-orange-400`} />
                        ) : (
                          <Headset className={`w-5 h-5 sm:w-6 sm:h-6 text-cyan-400`} />
                        )}
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <p className="text-slate-900 font-semibold text-base sm:text-lg truncate">+1 (555) 892-4231</p>
                        <p className="text-slate-600 text-xs sm:text-sm">Potential Member</p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right w-full sm:w-auto flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 justify-between sm:justify-start">
                      <p className="font-mono text-slate-500 text-xs uppercase tracking-wider">
                        Duration
                      </p>
                      <SimulationTimer isRunning={callState === "connected"} />
                    </div>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="mb-6 sm:mb-8 py-4 sm:py-6 px-3 sm:px-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <AudioWaveform
                      isActive={callState === "connected"}
                      color={callState === "ringing" ? "orange" : "cyan"}
                    />
                  </div>

                  {/* Transcript */}
                  <div className="backdrop-blur-sm bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-[#4A69E2]/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-h-[60px] sm:min-h-[70px]">
                        <p className="text-cyan-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2">
                          AI Voice Agent
                        </p>
                        <p className="font-mono text-xs sm:text-sm text-slate-900 leading-relaxed">
                          {transcript.displayText}
                          {isTyping && !transcript.isComplete && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle"
                            />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side: CRM Card */}
                <motion.div
                  variants={presets.slideInRight}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col"
                >
                  <CRMCard fields={crmCardFields} />

                  {/* Integration badges - Mobile Optimized */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-slate-600 text-xs"
                  >
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-500/50" />
                      Real-time sync
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Lock className="w-3.5 h-3.5 text-cyan-500/50" />
                      Encrypted
                    </span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <CloudCheck className="w-3.5 h-3.5 text-cyan-500/50" />
                      Auto-saved
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* ========================================== */}
          {/* STAGE 3: PAYOFF (The ROI) */}
          {/* ========================================== */}
          {stage === "payoff" && (
            <motion.div
              key="payoff"
              variants={stageTransitions.stage3Enter}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-2xl mx-auto text-center px-2"
            >
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.8 }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 sm:mb-10"
              >
                {/* Outer glow ring */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/30 to-[#4A69E2]/30 blur-xl"
                />
                {/* Icon container */}
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 to-[#4A69E2]/20 border border-cyan-500/40 flex items-center justify-center">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle className="w-12 h-12 text-cyan-400" />
                  </motion.span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h3
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: EASING.smooth }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6 tracking-tight px-2"
              >
                New Member Captured.
              </motion.h3>

              {/* Value Card */}
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6, ease: EASING.smooth }}
                className="backdrop-blur-xl bg-white/70 border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 shadow-2xl"
              >
                <p className="text-slate-600 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 px-2">
                  While your front desk was busy, our AI just captured a
                </p>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 150 }}
                  className="px-2"
                >
                  <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-[#2563EB]">
                    $1,200
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl text-slate-600 font-medium">/yr</span>
                </motion.div>
                <p className="text-slate-600 text-sm sm:text-base lg:text-lg mt-2 sm:mt-3">membership</p>

                {/* Stats row - Mobile Optimized */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="grid grid-cols-3 gap-3 sm:gap-6 mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200"
                >
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-cyan-400">8s</p>
                    <p className="text-slate-600 text-[10px] sm:text-xs uppercase tracking-wider mt-1">
                      Response Time
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-[#2563EB]">100%</p>
                    <p className="text-slate-600 text-[10px] sm:text-xs uppercase tracking-wider mt-1">
                      Data Captured
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold text-cyan-400">24/7</p>
                    <p className="text-slate-600 text-[10px] sm:text-xs uppercase tracking-wider mt-1">
                      Availability
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* CTAs - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 px-2"
              >
                <a
                  href="/contact"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-[#4A69E2] hover:from-cyan-400 hover:to-[#2563EB] transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25 overflow-hidden min-h-[56px] touch-manipulation"
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background:
                        "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)",
                    }}
                  />
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                  <span className="relative z-10 text-sm sm:text-base">Get This for My Business</span>
                </a>
                <button
                  onClick={resetSimulation}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl font-semibold text-slate-900 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-all duration-300 hover:scale-105 min-h-[56px] touch-manipulation active:scale-95"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Replay Simulation</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================================
// TIMER COMPONENT
// ============================================================================

function SimulationTimer({ isRunning }: { isRunning: boolean }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <p className="font-mono text-xl sm:text-2xl text-slate-900 tracking-wider">
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </p>
  );
}
