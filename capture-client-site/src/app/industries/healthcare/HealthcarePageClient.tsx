"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Trust Badge Component
interface TrustBadgeProps {
  icon: string;
  label: string;
}

function TrustBadge({ icon, label }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
      <span className="material-icons text-accent text-lg">{icon}</span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}

// Animated Counter Component
interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (end - startValue) + startValue);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Practice Type Interface
interface PracticeType {
  id: string;
  label: string;
  icon: string;
  useCases: string[];
  benefits: string[];
}

const practiceTypes: PracticeType[] = [
  {
    id: "dental",
    label: "Dental",
    icon: "sentiment_satisfied",
    useCases: [
      "Schedule cleanings, fillings, and emergency appointments",
      "Send appointment reminders and recall notices",
      "Answer insurance and billing questions",
      "Handle after-hours emergency triage",
    ],
    benefits: [
      "80% reduction in missed appointment calls",
      "72% decrease in no-shows with automated reminders",
      "2+ hours saved per day for front desk staff",
    ],
  },
  {
    id: "medical",
    label: "Medical",
    icon: "local_hospital",
    useCases: [
      "Schedule patient appointments across multiple providers",
      "Verify insurance eligibility before visits",
      "Handle prescription refill requests",
      "Triage urgent vs. routine care needs",
    ],
    benefits: [
      "27% of calls no longer go unanswered",
      "Instant insurance verification reduces claim denials",
      "Seamless Epic/Cerner integration",
    ],
  },
  {
    id: "urgent-care",
    label: "Urgent Care",
    icon: "emergency",
    useCases: [
      "Provide real-time wait times and directions",
      "Pre-register patients before arrival",
      "Answer common questions about services",
      "Route critical cases to 911 when needed",
    ],
    benefits: [
      "Faster patient throughput with pre-registration",
      "24/7 availability for late-night calls",
      "Reduced lobby wait times",
    ],
  },
  {
    id: "mental-health",
    label: "Mental Health",
    icon: "psychology",
    useCases: [
      "Schedule therapy sessions with empathy",
      "Send gentle appointment reminders",
      "Handle crisis line overflow (redirects to hotlines)",
      "Manage cancellations and rescheduling",
    ],
    benefits: [
      "Compassionate, patient-first conversations",
      "Reduced no-show rates with empathetic follow-up",
      "Privacy-focused, HIPAA-compliant",
    ],
  },
  {
    id: "chiropractic",
    label: "Chiropractic",
    icon: "accessibility_new",
    useCases: [
      "Book initial consultations and adjustments",
      "Answer questions about treatment plans",
      "Send reminders for recurring visits",
      "Handle payment and insurance inquiries",
    ],
    benefits: [
      "Increased patient retention with automated recalls",
      "More time for patient care, less admin work",
      "Improved patient satisfaction scores",
    ],
  },
];

// EHR Integration Logos
const ehrIntegrations = [
  { name: "Epic", logo: "medical_services" },
  { name: "Cerner", logo: "health_and_safety" },
  { name: "Athenahealth", logo: "monitor_heart" },
  { name: "eClinicalWorks", logo: "vaccines" },
  { name: "OpenDental", logo: "sentiment_satisfied" },
  { name: "Dentrix", logo: "dental_services" },
];

// Feature Card Interface
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-accent/30 hover:shadow-glow transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300">
        <span className="material-icons text-accent text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-heading font-bold text-foreground mb-2">{title}</h3>
      <p className="text-foreground-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}

// ROI Calculator Component
function ROICalculator() {
  const [missedCalls, setMissedCalls] = useState(50);
  const [patientValue, setPatientValue] = useState(500);

  const conversionRate = 0.2; // 20% conversion
  const monthlyRevenue = missedCalls * conversionRate * patientValue;
  const annualRevenue = monthlyRevenue * 12;

  return (
    <div className="glass-premium p-8 rounded-3xl">
      <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
        Calculate Your Revenue Recovery
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Monthly Missed Calls
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={missedCalls}
            onChange={(e) => setMissedCalls(Number(e.target.value))}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="text-2xl font-bold text-accent mt-2">{missedCalls} calls</div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Average Patient Value
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="50"
            value={patientValue}
            onChange={(e) => setPatientValue(Number(e.target.value))}
            className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <div className="text-2xl font-bold text-accent mt-2">${patientValue}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
        <div>
          <div className="text-sm text-foreground-muted mb-1">Monthly Revenue Recovered</div>
          <div className="text-3xl font-bold text-accent">${monthlyRevenue.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-sm text-foreground-muted mb-1">Annual Revenue Recovered</div>
          <div className="text-3xl font-bold text-accent">${annualRevenue.toLocaleString()}</div>
        </div>
      </div>

      <p className="text-sm text-foreground-muted mt-4">
        * Based on industry average 20% conversion rate from qualified calls
      </p>
    </div>
  );
}

// Testimonial Interface
interface TestimonialProps {
  quote: string;
  author: string;
  practice: string;
  location: string;
  results: string;
}

function TestimonialCard({ quote, author, practice, location, results }: TestimonialProps) {
  return (
    <div className="glass-premium p-8 rounded-2xl">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
          <span className="material-icons text-accent text-xl">person</span>
        </div>
        <div>
          <div className="font-semibold text-foreground">{author}</div>
          <div className="text-sm text-foreground-muted">{practice}</div>
          <div className="text-xs text-foreground-muted">{location}</div>
        </div>
      </div>
      <p className="text-foreground-muted italic mb-4">&quot;{quote}&quot;</p>
      <div className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
        <div className="text-sm font-semibold text-accent">{results}</div>
      </div>
    </div>
  );
}

export default function HealthcarePageClient() {
  const [activeTab, setActiveTab] = useState("dental");
  const activePractice = practiceTypes.find((p) => p.id === activeTab) || practiceTypes[0];

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-background-dark">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full opacity-40"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-full h-full bg-gradient-radial from-cyan-500/30 via-cyan-500/10 to-transparent blur-3xl" />
          </motion.div>

          <motion.div
            className="absolute bottom-0 right-0 w-[900px] h-[900px] rounded-full opacity-30"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <div className="w-full h-full bg-gradient-radial from-accent/25 to-transparent blur-3xl" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <TrustBadge icon="verified_user" label="HIPAA Compliant" />
              <TrustBadge icon="security" label="SOC 2 Type II" />
              <TrustBadge icon="gavel" label="BAA Available" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight"
            >
              Never Miss a{" "}
              <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Patient Call
              </span>{" "}
              Again
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl font-accent text-foreground-muted mb-8 max-w-3xl mx-auto"
            >
              HIPAA-Compliant AI Voice Agents for Healthcare Practices
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="tel:865-346-3339"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-primary font-semibold text-background hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <span className="material-icons">phone</span>
                Get HIPAA-Compliant Demo
                <span className="material-icons group-hover:translate-x-1 transition-transform duration-300">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="#calculator"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 font-semibold text-foreground hover:border-accent/30 hover:shadow-glow transition-all duration-300"
              >
                <span className="material-icons">calculate</span>
                Calculate ROI
              </Link>
            </motion.div>

            {/* Contact info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-sm text-foreground-muted mt-6"
            >
              Call us:{" "}
              <a href="tel:865-346-3339" className="text-accent hover:underline font-semibold">
                865-346-3339
              </a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* ==================== PROBLEM STATS SECTION ==================== */}
      <section className="section bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                The Hidden Cost of{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Missed Calls
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-premium p-8 rounded-2xl text-center">
                <div className="text-6xl font-bold text-accent mb-2">
                  <AnimatedCounter end={27} suffix="%" />
                </div>
                <div className="text-foreground font-semibold mb-2">Healthcare calls go unanswered</div>
                <div className="text-sm text-foreground-muted">
                  Patients calling after hours or during busy times
                </div>
              </div>

              <div className="glass-premium p-8 rounded-2xl text-center">
                <div className="text-6xl font-bold text-accent mb-2">
                  <AnimatedCounter end={85} suffix="%" />
                </div>
                <div className="text-foreground font-semibold mb-2">Patients won&apos;t call back</div>
                <div className="text-sm text-foreground-muted">
                  One missed call = one lost patient to competitors
                </div>
              </div>

              <div className="glass-premium p-8 rounded-2xl text-center">
                <div className="text-6xl font-bold text-accent mb-2">
                  <AnimatedCounter end={72} suffix="%" />
                </div>
                <div className="text-foreground font-semibold mb-2">No-show reduction</div>
                <div className="text-sm text-foreground-muted">
                  With automated appointment reminders
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRACTICE TYPE TABS ==================== */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Built for Your{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Practice Type
                </span>
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {practiceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === type.id
                      ? "bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 text-foreground shadow-glow"
                      : "bg-white/5 backdrop-blur-xl border border-white/10 text-foreground-muted hover:border-accent/20"
                  }`}
                >
                  <span className="material-icons">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="glass-premium p-8 sm:p-12 rounded-3xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="material-icons text-accent text-3xl">{activePractice.icon}</span>
                    {activePractice.label} Practices
                  </h3>

                  <h4 className="text-lg font-semibold text-foreground mb-4">Use Cases:</h4>
                  <ul className="space-y-3 mb-8">
                    {activePractice.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="material-icons text-accent text-xl flex-shrink-0">check_circle</span>
                        <span className="text-foreground-muted">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">Key Benefits:</h4>
                  <div className="space-y-4">
                    {activePractice.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20"
                      >
                        <p className="text-foreground font-semibold">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== EHR INTEGRATION SHOWCASE ==================== */}
      <section className="section bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Integrates with Your{" "}
              <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Existing Systems
              </span>
            </h2>
            <p className="text-lg text-foreground-muted mb-12 max-w-3xl mx-auto">
              Seamless integration with leading EHR and practice management systems
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {ehrIntegrations.map((ehr, idx) => (
                <motion.div
                  key={ehr.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-premium p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:shadow-glow hover:border-accent/30 transition-all duration-300"
                >
                  <span className="material-icons text-accent text-4xl">{ehr.logo}</span>
                  <span className="text-sm font-semibold text-foreground">{ehr.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES GRID ==================== */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Powerful Features for{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Healthcare
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon="schedule"
                title="24/7 Patient Scheduling"
                description="Let patients book appointments anytime, day or night. AI checks provider availability and confirms in real-time."
                delay={0}
              />
              <FeatureCard
                icon="verified"
                title="Insurance Verification"
                description="Automatically verify patient insurance eligibility before appointments to reduce claim denials."
                delay={0.1}
              />
              <FeatureCard
                icon="notifications_active"
                title="Appointment Reminders"
                description="Automated SMS and voice reminders reduce no-shows by 72% with personalized messages."
                delay={0.2}
              />
              <FeatureCard
                icon="nightlight"
                title="After-Hours Triage"
                description="Route urgent cases to on-call staff, schedule routine visits, and direct emergencies to 911."
                delay={0.3}
              />
              <FeatureCard
                icon="person_add"
                title="New Patient Intake"
                description="Collect patient information, insurance details, and medical history before their first visit."
                delay={0.4}
              />
              <FeatureCard
                icon="history"
                title="Recall Management"
                description="Automatically remind patients about due cleanings, checkups, and follow-up appointments."
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ROI CALCULATOR ==================== */}
      <section id="calculator" className="section bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Calculate Your{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Revenue Recovery
                </span>
              </h2>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                See how much revenue your practice is losing to missed calls
              </p>
            </div>

            <ROICalculator />
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-premium opacity-30" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Trusted by{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  Healthcare Providers
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard
                quote="We were losing patients to competitors because we couldn't answer calls during procedures. Capture Client's AI handles everything perfectly. Our no-show rate dropped 65% in the first month."
                author="Dr. Sarah Mitchell"
                practice="Bright Smiles Dental"
                location="Nashville, TN"
                results="65% reduction in no-shows, 40+ hours saved monthly"
              />
              <TestimonialCard
                quote="The HIPAA compliance and Epic integration were crucial for us. Now every call is answered, insurance is verified instantly, and our front desk can focus on patient care instead of the phone."
                author="Dr. James Chen"
                practice="Riverside Family Medicine"
                location="Knoxville, TN"
                results="80% fewer missed calls, $45K additional revenue/month"
              />
              <TestimonialCard
                quote="As a solo practitioner, I was overwhelmed by after-hours calls. The AI triages perfectly - urgent cases get routed to me, routine appointments are scheduled automatically. Game changer."
                author="Dr. Emily Rodriguez"
                practice="Mind & Body Therapy"
                location="Chattanooga, TN"
                results="100% after-hours coverage, 2+ hours saved per day"
              />
              <TestimonialCard
                quote="Our chiropractic office doubled our patient volume without hiring more staff. The AI handles all scheduling, reminders, and recalls. Patients love the 24/7 availability."
                author="Dr. Michael Thompson"
                practice="Spine Health Chiropractic"
                location="Memphis, TN"
                results="2x patient growth, zero additional staff costs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HIPAA COMPLIANCE SECTION ==================== */}
      <section className="section bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="glass-premium p-8 sm:p-12 rounded-3xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 mb-6">
                  <span className="material-icons text-accent">verified_user</span>
                  <span className="font-semibold text-foreground">Enterprise-Grade Security</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  HIPAA Compliance{" "}
                  <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                    You Can Trust
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons text-accent text-3xl">gavel</span>
                    <h3 className="text-xl font-heading font-bold text-foreground">
                      Business Associate Agreement
                    </h3>
                  </div>
                  <p className="text-foreground-muted leading-relaxed">
                    We sign a BAA with every healthcare customer, ensuring full HIPAA compliance and
                    clear liability protection for your practice.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons text-accent text-3xl">security</span>
                    <h3 className="text-xl font-heading font-bold text-foreground">
                      SOC 2 Type II Certified
                    </h3>
                  </div>
                  <p className="text-foreground-muted leading-relaxed">
                    Independently audited security controls ensure your patient data is protected with
                    enterprise-grade infrastructure.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons text-accent text-3xl">lock</span>
                    <h3 className="text-xl font-heading font-bold text-foreground">
                      256-Bit Encryption
                    </h3>
                  </div>
                  <p className="text-foreground-muted leading-relaxed">
                    All patient data is encrypted at rest and in transit using military-grade AES-256
                    encryption standards.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-icons text-accent text-3xl">visibility_off</span>
                    <h3 className="text-xl font-heading font-bold text-foreground">
                      Zero-Retention Modes
                    </h3>
                  </div>
                  <p className="text-foreground-muted leading-relaxed">
                    Optional zero-retention mode ensures no voice recordings or transcripts are stored
                    after processing.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 backdrop-blur-xl font-semibold text-foreground hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 group"
                >
                  <span className="material-icons">download</span>
                  Request BAA & Compliance Docs
                  <span className="material-icons group-hover:translate-x-1 transition-transform duration-300">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA SECTION ==================== */}
      <section className="section bg-background-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background to-background-dark" />
          <div className="absolute inset-0 bg-mesh-premium opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-accent/20 via-primary/15 to-transparent blur-3xl animate-pulse-glow" />
        </div>

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
                Start Your{" "}
                <span className="text-gradient bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  HIPAA-Compliant Trial
                </span>
              </h2>
              <p className="text-xl text-foreground-muted mb-12 max-w-2xl mx-auto">
                Join hundreds of healthcare practices reducing missed calls, eliminating no-shows, and
                recovering lost revenue with AI voice agents.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="tel:865-346-3339"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-primary font-semibold text-background hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <span className="material-icons">phone</span>
                  Call 865-346-3339
                  <span className="material-icons group-hover:translate-x-1 transition-transform duration-300">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 font-semibold text-foreground hover:border-accent/30 hover:shadow-glow transition-all duration-300"
                >
                  <span className="material-icons">email</span>
                  Request Demo
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground-muted">
                <div className="flex items-center gap-2">
                  <span className="material-icons text-accent text-lg">check_circle</span>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-accent text-lg">check_circle</span>
                  48-hour setup
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-icons text-accent text-lg">check_circle</span>
                  Cancel anytime
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
