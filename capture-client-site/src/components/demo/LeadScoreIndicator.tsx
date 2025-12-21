"use client";

import { motion } from "@/lib/motion";

interface LeadScoreIndicatorProps {
  score: number;
  animate?: boolean;
}

export function LeadScoreIndicator({ score, animate = true }: LeadScoreIndicatorProps) {
  // Determine color based on score
  const getScoreColor = () => {
    if (score <= 3) return { bg: "bg-red-500", text: "text-red-600", label: "Low" };
    if (score <= 6) return { bg: "bg-amber-500", text: "text-amber-600", label: "Medium" };
    return { bg: "bg-emerald-500", text: "text-emerald-600", label: "High" };
  };

  const { bg, text, label } = getScoreColor();
  const percentage = (score / 10) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700">Lead Score</span>
        <div className="flex items-center gap-2">
          <motion.span
            className={`text-2xl font-bold ${text}`}
            initial={animate ? { scale: 0.5, opacity: 0 } : undefined}
            animate={animate ? { scale: 1, opacity: 1 } : undefined}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          >
            {score}
          </motion.span>
          <span className="text-sm text-slate-500">/10</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 ${bg} rounded-full`}
          initial={animate ? { width: 0 } : undefined}
          animate={animate ? { width: `${percentage}%` } : undefined}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-y-0 left-0 ${bg} rounded-full blur-sm opacity-50`}
          initial={animate ? { width: 0 } : undefined}
          animate={animate ? { width: `${percentage}%` } : undefined}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Label */}
      <motion.div
        className="flex justify-end"
        initial={animate ? { opacity: 0, y: 5 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.5 }}
      >
        <span className={`text-xs font-semibold ${text} uppercase tracking-wide`}>
          {label} Quality Lead
        </span>
      </motion.div>
    </div>
  );
}
