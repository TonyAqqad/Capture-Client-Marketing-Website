"use client";

import { motion } from "@/lib/motion";
import { Phone, CheckCircle, Bot, Sparkles } from "lucide-react";

// ============================================
// PHONE DEMO CARD - Premium Transformation
// Billion-dollar aesthetic with glass morphism
// ============================================

export default function PhoneDemoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Ambient glow effect */}
        <div
          className="absolute -inset-4 rounded-[2.5rem] opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.15) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Main card */}
        <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-slate-200/60 shadow-xl shadow-slate-900/[0.04] overflow-hidden">
          {/* Decorative gradient mesh background */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 right-0 w-40 h-40 opacity-30"
              style={{
                background: "radial-gradient(circle at center, rgba(14, 165, 233, 0.12) 0%, transparent 60%)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-32 h-32 opacity-20"
              style={{
                background: "radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, transparent 60%)",
                filter: "blur(30px)",
              }}
            />
          </div>

          {/* Header */}
          <div className="relative flex justify-between items-start mb-8">
            <div>
              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/60 mb-3"
              >
                <Sparkles className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                  Live Demo
                </span>
              </motion.div>

              <h2
                className="text-2xl font-bold text-slate-900"
                style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
              >
                Experience It{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Yourself
                </span>
              </h2>
            </div>

            {/* Premium AI Online Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/60 shadow-sm"
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span className="text-xs font-semibold text-emerald-700">AI Online</span>
            </motion.div>
          </div>

          {/* Phone Demo Area */}
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gradient-to-br from-slate-50/80 to-white rounded-2xl p-6 border border-slate-200/60 mb-6 overflow-hidden group shadow-inner shadow-slate-100"
          >
            {/* Hover glow effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.06) 0%, transparent 60%)",
              }}
            />

            {/* Phone Info */}
            <div className="flex items-center gap-4 mb-5 relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25"
              >
                <Phone className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <div className="text-sm text-slate-500 flex items-center gap-2 mb-0.5">
                  <span className="font-medium">Incoming Call Agent</span>
                  <Bot className="w-4 h-4 text-blue-500" />
                </div>
                <a
                  href="tel:865-346-6111"
                  className="text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors duration-300 tracking-tight"
                  style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
                >
                  (865) 346-6111
                </a>
              </div>
            </div>

            {/* Premium Audio Visualizer */}
            <div className="flex justify-center items-center gap-1.5 h-14 mb-3 px-4">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-full shadow-sm"
                  animate={{
                    height: ["16%", "90%", "16%"],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.12,
                  }}
                />
              ))}
            </div>

            {/* Status text with typing animation */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs font-medium text-slate-400 tracking-wide"
            >
              Listening
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ...
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Call to Action */}
          <div className="relative space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Try it now:
              </span>{" "}
              Call the number above to speak with our AI. It answers in 3 rings.
              No setup needed.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-xs font-medium text-slate-600">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                24/7 Available
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 text-xs font-medium text-slate-600">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Instant Response
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
