"use client";

import { motion } from "@/lib/motion";

export function LeadGenIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 25 L90 25 L75 55 L45 55 Z" fill="url(#funnelGradient1)" opacity="0.8" />
      <path d="M45 55 L75 55 L68 75 L52 75 Z" fill="url(#funnelGradient2)" opacity="0.9" />
      <path d="M52 75 L68 75 L64 95 L56 95 Z" fill="url(#funnelGradient3)" />
      <motion.circle cx="60" cy="30" r="2.5" fill="#00C9FF" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2, repeat: Infinity, ease: "easeIn", delay: 0 }} />
      <motion.circle cx="50" cy="30" r="2.5" fill="#2563EB" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeIn", delay: 0.3 }} />
      <motion.circle cx="70" cy="30" r="2.5" fill="#00C9FF" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeIn", delay: 0.6 }} />
      <motion.circle cx="55" cy="30" r="2" fill="#2563EB" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.1, repeat: Infinity, ease: "easeIn", delay: 0.9 }} />
      <motion.circle cx="65" cy="30" r="2" fill="#00C9FF" initial={{ cy: 30, opacity: 1 }} animate={{ cy: 95, opacity: 0 }} transition={{ duration: 2.3, repeat: Infinity, ease: "easeIn", delay: 1.2 }} />
      <defs>
        <linearGradient id="funnelGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="funnelGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="funnelGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00C9FF" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
