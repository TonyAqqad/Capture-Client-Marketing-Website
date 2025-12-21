"use client";

import { motion } from "@/lib/motion";
import {
  CheckCircle2,
  TrendingUp,
  Target,
  User,
  Phone,
  Wrench,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import type { ScenarioOutcome as ScenarioOutcomeType } from "./data/scenarios";

// ============================================
// SCENARIO OUTCOME - Victory Display
// ============================================

interface ScenarioOutcomeProps {
  outcome: ScenarioOutcomeType;
  animate?: boolean;
}

export function ScenarioOutcome({ outcome, animate = true }: ScenarioOutcomeProps) {
  // Score color based on value
  const getScoreConfig = (score: number) => {
    if (score >= 8) return { color: "text-emerald-600", bg: "bg-emerald-500", label: "Excellent" };
    if (score >= 5) return { color: "text-amber-600", bg: "bg-amber-500", label: "Good" };
    return { color: "text-red-600", bg: "bg-red-500", label: "Low" };
  };

  const scoreConfig = getScoreConfig(outcome.leadScore);
  const scorePercentage = (outcome.leadScore / 10) * 100;

  return (
    <motion.div
      className="space-y-6"
      initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Success Header */}
      <motion.div
        className="text-center"
        initial={animate ? { opacity: 0, y: -20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.1 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
          initial={animate ? { scale: 0 } : undefined}
          animate={animate ? { scale: 1 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
        >
          <CheckCircle2 className="w-8 h-8 text-white" />
        </motion.div>
        <h3
          className="text-xl font-bold text-slate-900 mb-1"
          style={{ fontFamily: 'var(--font-bricolage-grotesque)' }}
        >
          {outcome.actionTaken}
        </h3>
        <p className="text-sm text-slate-500">Call completed successfully</p>
      </motion.div>

      {/* Lead Score Gauge */}
      <motion.div
        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className={`w-5 h-5 ${scoreConfig.color}`} />
            <span className="font-medium text-slate-700">Lead Score</span>
          </div>
          <span className={`text-sm font-semibold ${scoreConfig.color}`}>
            {scoreConfig.label}
          </span>
        </div>

        {/* Score Display */}
        <div className="flex items-end gap-4 mb-4">
          <motion.span
            className={`text-5xl font-bold ${scoreConfig.color}`}
            initial={animate ? { opacity: 0, scale: 0.5 } : undefined}
            animate={animate ? { opacity: 1, scale: 1 } : undefined}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.4 }}
          >
            {outcome.leadScore}
          </motion.span>
          <span className="text-2xl text-slate-400 mb-1">/10</span>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${scoreConfig.bg} rounded-full`}
            initial={animate ? { width: 0 } : undefined}
            animate={animate ? { width: `${scorePercentage}%` } : undefined}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>

      {/* Intent Badge */}
      <motion.div
        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-slate-700">Detected Intent</span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-blue-700 capitalize">
            {outcome.intent.replace("_", " ")}
          </span>
        </div>
      </motion.div>

      {/* CRM Fields Extracted */}
      <motion.div
        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span className="font-medium text-slate-700">Data Captured</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {outcome.crmFields.name && (
            <CRMTag icon={User} label="Name" value={outcome.crmFields.name} delay={0.7} animate={animate} />
          )}
          {outcome.crmFields.phone && (
            <CRMTag icon={Phone} label="Phone" value={outcome.crmFields.phone} delay={0.75} animate={animate} />
          )}
          {outcome.crmFields.service && (
            <CRMTag icon={Wrench} label="Service" value={outcome.crmFields.service} delay={0.8} animate={animate} />
          )}
          {outcome.crmFields.urgency && (
            <CRMTag
              icon={AlertCircle}
              label="Urgency"
              value={outcome.crmFields.urgency}
              delay={0.85}
              animate={animate}
              urgency={outcome.crmFields.urgency}
            />
          )}
          {outcome.crmFields.appointmentTime && (
            <CRMTag icon={Clock} label="Appointment" value={outcome.crmFields.appointmentTime} delay={0.9} animate={animate} />
          )}
        </div>
      </motion.div>

      {/* CTA Hint */}
      <motion.div
        className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
        initial={animate ? { opacity: 0, y: 20 } : undefined}
        animate={animate ? { opacity: 1, y: 0 } : undefined}
        transition={{ delay: 0.9 }}
      >
        <p className="text-sm text-blue-700">
          <span className="font-semibold">This could be your business.</span>{" "}
          AI handling calls 24/7, capturing every lead.
        </p>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// CRM TAG COMPONENT
// ============================================

interface CRMTagProps {
  icon: React.ElementType;
  label: string;
  value: string;
  delay: number;
  animate: boolean;
  urgency?: "low" | "medium" | "high";
}

function CRMTag({ icon: Icon, label, value, delay, animate, urgency }: CRMTagProps) {
  const urgencyColors = {
    low: "bg-emerald-50 border-emerald-200 text-emerald-700",
    medium: "bg-amber-50 border-amber-200 text-amber-700",
    high: "bg-red-50 border-red-200 text-red-700",
  };

  const colorClass = urgency ? urgencyColors[urgency] : "bg-slate-50 border-slate-200 text-slate-700";

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${colorClass}`}
      initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
    >
      <Icon className="w-4 h-4 opacity-60" />
      <span className="text-xs font-medium uppercase opacity-60">{label}:</span>
      <span className="text-sm font-semibold capitalize">{value}</span>
    </motion.div>
  );
}
