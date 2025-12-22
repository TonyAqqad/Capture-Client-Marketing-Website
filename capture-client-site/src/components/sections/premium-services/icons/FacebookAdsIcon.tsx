"use client";

import { motion } from "@/lib/motion";

export function FacebookAdsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="8" fill="#00C9FF" />
      <motion.circle
        cx="60"
        cy="60"
        r="20"
        stroke="#00C9FF"
        strokeWidth="2"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.circle
        cx="60"
        cy="60"
        r="32"
        stroke="#2563EB"
        strokeWidth="2"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      />
      <motion.circle
        cx="60"
        cy="60"
        r="44"
        stroke="#00C9FF"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <line x1="60" y1="10" x2="60" y2="50" stroke="#2563EB" strokeWidth="2" opacity="0.7" />
      <line x1="60" y1="70" x2="60" y2="110" stroke="#2563EB" strokeWidth="2" opacity="0.7" />
      <line x1="10" y1="60" x2="50" y2="60" stroke="#2563EB" strokeWidth="2" opacity="0.7" />
      <line x1="70" y1="60" x2="110" y2="60" stroke="#2563EB" strokeWidth="2" opacity="0.7" />
      <motion.circle
        cx="40"
        cy="40"
        r="3"
        fill="#00C9FF"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <motion.circle
        cx="80"
        cy="40"
        r="3"
        fill="#00C9FF"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <motion.circle
        cx="40"
        cy="80"
        r="3"
        fill="#2563EB"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1.2 }}
      />
      <motion.circle
        cx="80"
        cy="80"
        r="3"
        fill="#2563EB"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5, delay: 1.4 }}
      />
    </svg>
  );
}
