'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Calendar,
  Users,
  TrendingUp,
  Check,
  Clock,
  DollarSign,
  Percent,
  Calculator,
  ChefHat,
  Truck,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Feature tabs data
const featureTabs = [
  {
    id: 'orders',
    label: 'Phone Orders',
    icon: Phone,
    features: [
      'Complete menu knowledge',
      'Order accuracy & verification',
      'Intelligent upselling',
      'Special requests handling',
      'Real-time POS sync'
    ],
    description: "AI takes phone orders with perfect accuracy during your busiest hours."
  },
  {
    id: 'reservations',
    label: 'Reservations',
    icon: Calendar,
    features: [
      'Real-time availability',
      'Party size management',
      'Wait time quotes',
      'Confirmation calls',
      'OpenTable/Resy sync'
    ],
    description: "Automated reservation management that integrates with your existing systems."
  },
  {
    id: 'catering',
    label: 'Catering',
    icon: Users,
    features: [
      'Large order handling',
      'Custom quote generation',
      'Event details capture',
      'Follow-up automation',
      'Order confirmation'
    ],
    description: "Capture every catering opportunity without interrupting kitchen flow."
  },
  {
    id: 'delivery',
    label: 'Delivery',
    icon: Truck,
    features: [
      'DoorDash integration',
      'UberEats connection',
      'Grubhub sync',
      'Order status tracking',
      'Unified dashboard'
    ],
    description: "Manage all delivery platforms from one intelligent system."
  }
];

// POS Integration logos
const posIntegrations = [
  { name: 'Toast', setupTime: '60 minutes', logo: '🍞' },
  { name: 'Square', setupTime: '45 minutes', logo: '⬛' },
  { name: 'Clover', setupTime: '50 minutes', logo: '🍀' }
];

// Reservation platforms
const reservationPlatforms = [
  { name: 'OpenTable', boost: '50% more bookings', logo: '📅' },
  { name: 'Resy', boost: 'Real-time sync', logo: '🍽️' },
  { name: 'Yelp', boost: 'Review integration', logo: '⭐' }
];

// Case studies
const caseStudies = [
  {
    type: 'Pizza Shop',
    revenue: '$66K',
    roi: '1,012%',
    period: 'Annual',
    icon: '🍕'
  },
  {
    type: 'Casual Dining',
    revenue: '25% ticket increase',
    roi: '780%',
    period: '6 months',
    icon: '🍽️'
  },
  {
    type: 'QSR',
    revenue: '$47K recovered',
    roi: '890%',
    period: '6-week payback',
    icon: '🍔'
  }
];

export default function RestaurantsPageClient() {
  const [activeTab, setActiveTab] = useState('orders');
  const [calcInputs, setCalcInputs] = useState({
    dailyOrders: 50,
    missedPercent: 23,
    avgOrderValue: 35
  });

  // Calculate ROI
  const calculateROI = () => {
    const { dailyOrders, missedPercent, avgOrderValue } = calcInputs;
    const dailyMissed = dailyOrders * (missedPercent / 100);
    const dailyRevenueLost = dailyMissed * avgOrderValue;
    const annualRevenueLost = dailyRevenueLost * 365;
    const monthlyRevenueLost = dailyRevenueLost * 30;
    const aiCost = 997; // Monthly subscription
    const paybackDays = Math.ceil((aiCost / dailyRevenueLost));

    return {
      annualRevenue: Math.round(annualRevenueLost),
      monthlyRevenue: Math.round(monthlyRevenueLost),
      paybackDays,
      roi: Math.round((annualRevenueLost / (aiCost * 12)) * 100)
    };
  };

  const roi = calculateROI();
  const activeFeature = featureTabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background-dark via-[#0A0F1C] to-background-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        {/* Background aurora effect */}
        <div className="absolute inset-0 bg-aurora-animated opacity-30" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-badge mb-6"
            >
              <ChefHat className="w-4 h-4" />
              <span>Restaurant Industry Solution</span>
            </motion.div>

            {/* Hero headline - Bricolage Grotesque */}
            <h1 className="text-display-lg md:text-hero-xl font-display text-white mb-6">
              Kitchen&apos;s Busy. <br />
              Phone&apos;s Ringing. <br />
              <span className="text-gradient-gold-cyan">AI Answers.</span>
            </h1>

            {/* Subheadline - Syne */}
            <p className="text-xl md:text-2xl font-accent text-foreground-muted max-w-3xl mx-auto mb-8">
              AI Voice Ordering & Reservations for Restaurants
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10">
              {[
                { label: '23% orders lost', icon: TrendingUp },
                { label: '$47K/year cost', icon: DollarSign },
                { label: '760% ROI', icon: Percent }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-2 text-white"
                >
                  <stat.icon className="w-5 h-5 text-gold" />
                  <span className="text-lg font-semibold">{stat.label}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="tel:865-346-3339"
                className="btn-gold text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Get Restaurant Demo
              </a>
              <a
                href="#calculator"
                className="btn-gold-outline text-lg px-8 py-4 inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Your ROI
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-premium p-8 md:p-12 rounded-3xl"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-display-md font-display text-white mb-4">
                  The $47K Problem
                </h2>
                <p className="text-lg text-foreground-muted mb-6">
                  23% of phone orders go unanswered during rush hours. Those customers don&apos;t call back—they order from competitors.
                </p>
                <ul className="space-y-3">
                  {[
                    'Friday 6-8 PM: 50+ missed calls',
                    'Lunch rush: Staff too busy to answer',
                    'Customers hang up after 3 rings',
                    'Lost orders = Lost revenue'
                  ].map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 text-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2.5" />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="glass-card p-6 rounded-2xl">
                  <div className="text-center">
                    <div className="text-5xl mb-4">📞</div>
                    <div className="text-6xl font-bold text-gold mb-2">23%</div>
                    <p className="text-foreground-muted">Orders Lost During Rush</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Tabs Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display-md font-display text-white mb-4">
              Complete Restaurant <span className="text-gradient-gold-cyan">Automation</span>
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              AI handles every customer interaction while your team focuses on food quality
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {featureTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-gold text-background-dark shadow-glow-gold"
                      : "glass border border-white/10 text-foreground hover:border-gold/50"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-premium p-8 md:p-12 rounded-3xl"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-display text-white mb-4">
                  {activeFeature?.label}
                </h3>
                <p className="text-lg text-foreground-muted mb-6">
                  {activeFeature?.description}
                </p>
                <ul className="space-y-3">
                  {activeFeature?.features.map((feature, idx) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 text-foreground"
                    >
                      <Check className="w-5 h-5 text-gold flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-8xl opacity-20">
                  {activeFeature?.icon && <activeFeature.icon className="w-full h-full" />}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* POS Integration Section */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display-md font-display text-white mb-4">
              Seamless POS <span className="text-gradient-gold-cyan">Integration</span>
            </h2>
            <p className="text-xl text-foreground-muted">
              Orders go directly to your kitchen. No manual entry required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {posIntegrations.map((pos, idx) => (
              <motion.div
                key={pos.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 text-center hover-glow-gold rounded-2xl transition-all duration-300"
              >
                <div className="text-6xl mb-4">{pos.logo}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{pos.name}</h3>
                <p className="text-gold flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  {pos.setupTime} setup
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-lg text-foreground-muted">
              <Star className="w-5 h-5 inline text-gold" /> Orders sync in real-time to your POS system
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reservation Platform Integration */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display-md font-display text-white mb-4">
              Reservation Platform <span className="text-gradient-gold-cyan">Sync</span>
            </h2>
            <p className="text-xl text-foreground-muted">
              50% more bookings with AI-powered reservation management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {reservationPlatforms.map((platform, idx) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-premium p-8 text-center rounded-2xl"
              >
                <div className="text-6xl mb-4">{platform.logo}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-gold">{platform.boost}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="calculator" className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display-md font-display text-white mb-4">
              Calculate Your <span className="text-gradient-gold-cyan">Revenue Recovery</span>
            </h2>
            <p className="text-xl text-foreground-muted">
              See how much money you&apos;re losing to missed calls
            </p>
          </motion.div>

          <div className="glass-premium p-8 md:p-12 rounded-3xl">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="block text-foreground mb-2 font-semibold">
                    Daily Phone Orders
                  </label>
                  <input
                    type="number"
                    value={calcInputs.dailyOrders}
                    onChange={(e) => setCalcInputs({ ...calcInputs, dailyOrders: Number(e.target.value) })}
                    className="glass-input w-full"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-foreground mb-2 font-semibold">
                    % Missed During Rush
                  </label>
                  <input
                    type="number"
                    value={calcInputs.missedPercent}
                    onChange={(e) => setCalcInputs({ ...calcInputs, missedPercent: Number(e.target.value) })}
                    className="glass-input w-full"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-foreground mb-2 font-semibold">
                    Average Order Value ($)
                  </label>
                  <input
                    type="number"
                    value={calcInputs.avgOrderValue}
                    onChange={(e) => setCalcInputs({ ...calcInputs, avgOrderValue: Number(e.target.value) })}
                    className="glass-input w-full"
                    min="0"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="glass-gold-accent p-6 rounded-2xl space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">Your Potential Recovery</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-muted">Annual Revenue:</span>
                    <span className="text-3xl font-bold text-gold">
                      ${roi.annualRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-muted">Monthly Revenue:</span>
                    <span className="text-2xl font-bold text-white">
                      ${roi.monthlyRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground-muted">ROI:</span>
                    <span className="text-2xl font-bold text-gold">
                      {roi.roi}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/10">
                    <span className="text-foreground-muted">Payback Period:</span>
                    <span className="text-xl font-bold text-white">
                      {roi.paybackDays} days
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="tel:865-346-3339"
                className="btn-gold text-lg px-8 py-4 inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Start Recovering Revenue Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display-md font-display text-white mb-4">
              Proven <span className="text-gradient-gold-cyan">Results</span>
            </h2>
            <p className="text-xl text-foreground-muted">
              Real restaurants, real revenue recovery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, idx) => (
              <motion.div
                key={study.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:border-gold/50 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{study.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{study.type}</h3>
                <div className="text-4xl font-bold text-gold mb-2">{study.revenue}</div>
                <p className="text-foreground-muted mb-1">{study.roi} ROI</p>
                <p className="text-sm text-foreground-muted">{study.period}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rush Hour Section */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-premium p-8 md:p-12 rounded-3xl text-center"
          >
            <div className="text-6xl mb-6">🔥</div>
            <h2 className="text-display-md font-display text-white mb-6">
              Friday 6-8 PM: 200 Calls. <br />
              <span className="text-gradient-gold-cyan">Zero Missed with AI.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Before AI</h3>
                <ul className="space-y-2 text-foreground-muted">
                  <li>❌ 46 missed calls</li>
                  <li>❌ Stressed staff</li>
                  <li>❌ Burned food</li>
                  <li>❌ $1,610 lost revenue</li>
                </ul>
              </div>
              <div className="glass-gold-accent p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-4">With AI</h3>
                <ul className="space-y-2 text-white">
                  <li>✅ 200/200 calls answered</li>
                  <li>✅ Staff focused on food</li>
                  <li>✅ Perfect orders</li>
                  <li>✅ $7,000+ captured</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-cta-card text-center p-12 rounded-3xl"
          >
            <h2 className="text-display-md font-display text-white mb-6">
              Never Miss a Phone Order Again
            </h2>
            <p className="text-xl text-foreground-muted mb-8">
              Join restaurants recovering $47K+ annually with AI phone automation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:865-346-3339"
                className="btn-gold text-lg px-10 py-5 inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call 865-346-3339
              </a>
              <a
                href="/contact"
                className="btn-gold-outline text-lg px-10 py-5 inline-flex items-center justify-center gap-2"
              >
                Request Demo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
