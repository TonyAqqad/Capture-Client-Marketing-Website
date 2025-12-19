"use client";

import { Clock, User, Bot, Brain, Phone } from "lucide-react";

/**
 * MobileHeroVisual - Premium Mobile-Optimized Hero Visual
 *
 * Performance-first approach:
 * - CSS animations only (no heavy Framer Motion)
 * - No backdrop-blur on mobile
 * - Respects prefers-reduced-motion
 * - Hardware-accelerated transforms
 */

export function MobileHeroVisual() {
  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      {/* Phone Mockup with AI Call Simulation */}
      <div className="relative">
        {/* Phone frame */}
        <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-3xl z-10" />

          {/* Screen content */}
          <div className="relative bg-slate-50 rounded-[2rem] overflow-hidden min-h-[480px]">
            {/* Call header */}
            <div className="absolute top-0 left-0 right-0 pt-8 px-6 pb-4 bg-gradient-to-b from-background-dark/95 to-transparent z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                  </span>
                  <span className="text-xs font-bold text-green-400 uppercase tracking-wider">Active Call</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">
                  <Clock className="text-white/60 w-3.5 h-3.5" />
                  <span className="text-xs font-mono text-white/80 call-timer">2:47</span>
                </div>
              </div>
            </div>

            {/* Caller avatar with animated ring */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10">
              <div className="relative">
                {/* Pulsing ring animation (CSS only) */}
                <div className="absolute inset-0 -m-4">
                  <div className="w-full h-full rounded-full border-4 border-cyan-400/30 pulse-ring" />
                </div>
                <div className="absolute inset-0 -m-6">
                  <div className="w-full h-full rounded-full border-4 border-cyan-400/20 pulse-ring-delayed" />
                </div>

                {/* Avatar */}
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500 via-[#D4AF37] to-[#D4AF37]/80 flex items-center justify-center shadow-[0_8px_32px_rgba(0,201,255,0.4)]">
                  <User className="text-white w-12 h-12" />
                </div>
              </div>
            </div>

            {/* Caller name */}
            <div className="absolute top-60 left-0 right-0 text-center px-6">
              <h3 className="text-xl font-bold text-white mb-1">Sarah Martinez</h3>
              <p className="text-sm text-white/60">Home Services Lead</p>
            </div>

            {/* AI Response bubble */}
            <div className="absolute bottom-32 left-4 right-4 z-10">
              <div className="glass-premium-mobile p-4 border-cyan-500/20 slide-up-fade">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-[#D4AF37] flex items-center justify-center flex-shrink-0">
                    <Bot className="text-white w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-cyan-400 font-bold mb-1.5">AI AGENT</p>
                    <p className="text-sm text-white/90 leading-relaxed">
                      "Perfect! I can schedule you for Tuesday at 2pm. Does that work?"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Waveform animation at bottom */}
            <div className="absolute bottom-16 left-0 right-0 px-8">
              <div className="flex items-end justify-center gap-1.5 h-12">
                <div className="w-1 bg-gradient-to-t from-cyan-400 to-cyan-500 rounded-full waveform-bar" style={{ animationDelay: '0ms' }} />
                <div className="w-1 bg-gradient-to-t from-cyan-400 to-cyan-500 rounded-full waveform-bar" style={{ animationDelay: '100ms' }} />
                <div className="w-1 bg-gradient-to-t from-[#D4AF37] to-[#D4AF37] rounded-full waveform-bar" style={{ animationDelay: '200ms' }} />
                <div className="w-1 bg-gradient-to-t from-[#D4AF37] to-[#D4AF37] rounded-full waveform-bar" style={{ animationDelay: '300ms' }} />
                <div className="w-1 bg-gradient-to-t from-cyan-400 to-cyan-500 rounded-full waveform-bar" style={{ animationDelay: '400ms' }} />
                <div className="w-1 bg-gradient-to-t from-[#D4AF37] to-[#D4AF37] rounded-full waveform-bar" style={{ animationDelay: '500ms' }} />
                <div className="w-1 bg-gradient-to-t from-cyan-400 to-cyan-500 rounded-full waveform-bar" style={{ animationDelay: '600ms' }} />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              <div className="glass-badge flex items-center gap-2 px-3 py-2">
                <Brain className="text-cyan-400 w-3.5 h-3.5" />
                <span className="text-xs font-semibold text-cyan-400">AI Answering</span>
                <span className="flex items-center gap-0.5 typing-dots">
                  <span className="w-1 h-1 bg-cyan-400 rounded-full dot-1" />
                  <span className="w-1 h-1 bg-cyan-400 rounded-full dot-2" />
                  <span className="w-1 h-1 bg-cyan-400 rounded-full dot-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-radial from-cyan-500/20 to-transparent blur-2xl float-slow" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-gradient-radial from-[#D4AF37]/20 to-transparent blur-2xl float-slow-delayed" />

        {/* LIVE NOW badge - floating on phone */}
        <div className="absolute -top-2 -right-2 z-20">
          <div className="relative glass-badge px-3 py-1.5 shadow-[0_4px_20px_rgba(212,175,55,0.4)]">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              </span>
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wide">Live Now</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust stats bar */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-2xl">📞</span>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-[#D4AF37] bg-clip-text text-transparent">4,273</span>
          </div>
          <p className="text-xs text-white/60 font-medium">Calls Today</p>
        </div>

        <div className="w-px h-10 bg-white/10" />

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="text-2xl">🎯</span>
            <span className="text-xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">1,847</span>
          </div>
          <p className="text-xs text-white/60 font-medium">Leads Captured</p>
        </div>
      </div>

      {/* Try Our AI Live CTA Section */}
      <div className="relative mt-6">
        {/* Glow ring */}
        <div className="absolute inset-0 -m-1 rounded-2xl bg-gradient-to-r from-[#D4AF37]/30 via-cyan-500/30 to-[#D4AF37]/30 blur-xl glow-pulse" />

        {/* CTA Container */}
        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-[#D4AF37] via-cyan-400 to-[#D4AF37] bg-clip-text text-transparent mb-2 gradient-shimmer">
              Try Our AI Live!
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              </span>
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">AI Agent Online</span>
            </div>
          </div>

          {/* Phone Number */}
          <a
            href="tel:865-346-6111"
            className="block text-center mb-4 group"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-[#D4AF37] bg-clip-text text-transparent group-active:scale-95 transition-transform">
              (865) 346-6111
            </div>
          </a>

          {/* Call Button */}
          <a
            href="tel:865-346-6111"
            className="relative block w-full"
          >
            {/* Pulsing ring around button */}
            <div className="absolute inset-0 -m-1 rounded-xl bg-gradient-to-r from-cyan-500 to-[#D4AF37] opacity-50 pulse-ring-button" />

            <button className="relative w-full bg-gradient-to-r from-cyan-500 to-[#D4AF37] text-white font-bold py-3.5 px-6 rounded-xl shadow-[0_4px_20px_rgba(0,201,255,0.4)] active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </button>
          </a>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        /* Pulse ring animation */
        .pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .pulse-ring-delayed {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 0.5s;
        }

        @keyframes pulse-ring {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.15);
          }
        }

        /* Slow ping for active indicator */
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Waveform bars */
        .waveform-bar {
          animation: waveform 1.2s ease-in-out infinite;
          height: 8px;
        }

        @keyframes waveform {
          0%, 100% {
            height: 8px;
          }
          50% {
            height: 40px;
          }
        }

        /* Typing dots */
        .typing-dots .dot-1 {
          animation: dot-pulse 1.5s ease-in-out infinite;
        }

        .typing-dots .dot-2 {
          animation: dot-pulse 1.5s ease-in-out infinite;
          animation-delay: 0.2s;
        }

        .typing-dots .dot-3 {
          animation: dot-pulse 1.5s ease-in-out infinite;
          animation-delay: 0.4s;
        }

        @keyframes dot-pulse {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          30% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Slide up fade animation */
        .slide-up-fade {
          animation: slide-up-fade 0.6s ease-out;
        }

        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Floating animation */
        .float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .float-slow-delayed {
          animation: float-slow 6s ease-in-out infinite;
          animation-delay: 1s;
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.05);
          }
        }

        /* Call timer increment simulation (visual only) */
        @keyframes timer-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .call-timer {
          animation: timer-pulse 1s ease-in-out infinite;
        }

        /* Glow pulse for CTA section */
        .glow-pulse {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }

        /* Pulse ring for button */
        .pulse-ring-button {
          animation: pulse-ring-button 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse-ring-button {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        /* Gradient shimmer */
        .gradient-shimmer {
          background-size: 200% auto;
          animation: gradient-shimmer 3s linear infinite;
        }

        @keyframes gradient-shimmer {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        /* Disable animations for reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .pulse-ring,
          .pulse-ring-delayed,
          .animate-ping-slow,
          .waveform-bar,
          .typing-dots span,
          .slide-up-fade,
          .float-slow,
          .float-slow-delayed,
          .call-timer,
          .glow-pulse,
          .pulse-ring-button,
          .gradient-shimmer {
            animation: none !important;
          }

          .waveform-bar {
            height: 24px;
          }

          .typing-dots span {
            opacity: 1;
          }

          .glow-pulse {
            opacity: 0.5;
          }

          .pulse-ring-button {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
