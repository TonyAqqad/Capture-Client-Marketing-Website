"use client";

import { motion } from "@/lib/motion";

export function VoiceAIIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 30C55 30 51 34 51 39V60C51 65 55 69 60 69C65 69 69 65 69 60V39C69 34 65 30 60 30Z"
        fill="url(#voiceGradient)"
        opacity="0.9"
      />
      <path
        d="M45 57C45 57 45 60 45 63C45 73.5 52.5 82 62 83V90H54V96H66V96H66H78V90H70V83C79.5 82 87 73.5 87 63C87 60 87 57 87 57"
        stroke="url(#voiceGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      <motion.path
        d="M30 60 Q35 50 40 60 T50 60"
        stroke="#00C9FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M70 60 Q75 50 80 60 T90 60"
        stroke="#2563EB"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.path
        d="M25 60 Q27 55 30 60"
        stroke="#00C9FF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <defs>
        <linearGradient id="voiceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C9FF" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );
}
