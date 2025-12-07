"use client";

import { motion } from "@/lib/motion";
import { Lock, ShieldCheck, Shield, Award, BadgeCheck, Trophy, CheckCircle2, Eye } from "lucide-react";

export default function SecurityBadges() {
  const badges = [
    {
      Icon: Lock,
      label: "256-Bit SSL Encryption",
      description: "Bank-level security",
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/20",
    },
    {
      Icon: Eye,
      label: "GDPR Compliant",
      description: "Your data protected",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20",
    },
    {
      Icon: ShieldCheck,
      label: "SOC 2 Certified",
      description: "Audited security",
      color: "text-[#D4AF37]",
      bgColor: "bg-[#D4AF37]/10",
      borderColor: "border-[#D4AF37]/20",
    },
    {
      Icon: Shield,
      label: "Data Backup",
      description: "Never lose data",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20",
    },
  ];

  const certifications = [
    { Icon: Award, text: "Google Ads Partner", color: "text-primary" },
    { Icon: BadgeCheck, text: "Meta Business Partner", color: "text-accent" },
    { Icon: Trophy, text: "BBB A+ Rated", color: "text-yellow-400" },
    { Icon: ShieldCheck, text: "ISO 27001 Compliant", color: "text-green-400" },
  ];

  return (
    <div className="space-y-8">
      {/* Security badges grid */}
      <div>
        <p className="text-sm uppercase tracking-widest text-foreground-muted mb-4 text-center">
          Enterprise-Grade Security
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${badge.bgColor} border ${badge.borderColor} rounded-xl p-4 text-center transition-all duration-300 hover:shadow-lg min-h-[120px] sm:min-h-[130px] flex flex-col items-center justify-center`}
            >
              <badge.Icon className={`${badge.color} w-8 h-8 mb-2`} />
              <p className="text-sm font-bold text-foreground mb-1 leading-tight">
                {badge.label}
              </p>
              <p className="text-xs text-foreground-muted">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust statement with guarantees */}
      <div className="bg-gradient-to-r from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center">
              <ShieldCheck className="text-green-400 w-8 h-8" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-xl sm:text-lg font-bold text-foreground mb-2">
              Your Data is Safe & Secure
            </h4>
            <p className="text-base sm:text-sm text-foreground-muted leading-relaxed">
              We use enterprise-grade encryption and security protocols. Your business data is
              backed up daily, and we never share your information with third parties. Period.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full min-h-[44px]">
              <CheckCircle2 className="text-green-400 w-4 h-4" />
              <span className="text-sm font-semibold text-green-400">100% Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications row */}
      <div>
        <p className="text-sm uppercase tracking-widest text-foreground-muted mb-4 text-center">
          Industry Certifications
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-surface/30 border border-surface-border rounded-full hover:border-accent/30 transition-all duration-300 min-h-[44px]"
            >
              <cert.Icon className={`${cert.color} w-5 h-5`} />
              <span className="text-sm font-semibold text-foreground">{cert.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Privacy statement */}
      <div className="text-center bg-surface/20 border border-surface-border rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-foreground-muted">
          <Eye className="text-accent w-5 h-5" />
          <span className="text-center">
            We respect your privacy.{" "}
            <span className="text-accent font-semibold">No spam, ever.</span> Unsubscribe
            anytime.
          </span>
        </div>
      </div>
    </div>
  );
}
