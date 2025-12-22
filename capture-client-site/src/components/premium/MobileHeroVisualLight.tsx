"use client";

import { Bot, Zap, User, Clock } from "lucide-react";

export function MobileHeroVisualLight() {
  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* Phone Mockup */}
      <div className="relative">
        {/* Phone frame with notch */}
        <div className="relative bg-gradient-to-b from-slate-200 to-slate-300 rounded-[2.5rem] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-3xl z-10" />

          {/* Screen */}
          <div className="relative bg-white rounded-[2rem] overflow-hidden min-h-[440px] p-6">
            {/* Call header with status */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-ring" />
                  <span className="text-sm font-medium text-emerald-600">Active Call</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-sm font-mono">0:47</span>
              </div>
            </div>

            {/* Caller avatar with pulsing rings */}
            <div className="relative flex justify-center mb-6">
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-32 h-32 rounded-full border-2 border-blue-400/30 pulse-ring"
                  style={{ animationDelay: "0s" }}
                />
              </div>
              {/* Middle pulsing ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-28 h-28 rounded-full border-2 border-cyan-400/20 pulse-ring"
                  style={{ animationDelay: "0.3s" }}
                />
              </div>
              {/* Avatar */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <User className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </div>

            {/* Caller info */}
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">John Anderson</h3>
              <p className="text-sm text-slate-500">+1 (555) 123-4567</p>
            </div>

            {/* AI response bubble */}
            <div className="relative mb-6">
              <div className="bg-white/90 border border-blue-200/60 rounded-2xl rounded-tl-sm p-4 shadow-sm">
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-600 mb-1">Capture AI</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "Thanks for calling! I can help you schedule an appointment. What day works
                      best for you?"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio waveform */}
            <div className="flex items-center justify-center gap-1 mb-6 h-10">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="waveform-bar w-1 rounded-full bg-gradient-to-t from-blue-600 to-cyan-500"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0.3 + (Math.sin(i) * 0.3 + 0.3),
                  }}
                />
              ))}
            </div>

            {/* AI status badge */}
            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/60 rounded-full">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">AI Answering</span>
                <div className="flex items-center gap-1">
                  <div
                    className="typing-dot w-1.5 h-1.5 rounded-full bg-blue-600"
                    style={{ animationDelay: "0s" }}
                  />
                  <div
                    className="typing-dot w-1.5 h-1.5 rounded-full bg-blue-600"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="typing-dot w-1.5 h-1.5 rounded-full bg-blue-600"
                    style={{ animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* "Live Now" floating badge */}
        <div className="absolute -top-3 -right-3 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-50 pulse-ring" />
            <div className="relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-white pulse-ring" />
              <span className="text-sm font-semibold">Live Now</span>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations using styled-jsx */}
      <style jsx>{`
        /* Pulse ring animation */
        .pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
        @keyframes pulse-ring {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.15);
          }
        }

        /* Waveform bars */
        .waveform-bar {
          animation: waveform 1.2s ease-in-out infinite;
        }
        @keyframes waveform {
          0%,
          100% {
            height: 8px;
          }
          50% {
            height: 36px;
          }
        }

        /* Typing dots */
        .typing-dot {
          animation: dot-pulse 1.5s ease-in-out infinite;
        }
        @keyframes dot-pulse {
          0%,
          60%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          30% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .pulse-ring,
          .waveform-bar,
          .typing-dot {
            animation: none;
          }
          .waveform-bar {
            height: 24px;
          }
        }
      `}</style>
    </div>
  );
}
