"use client";

import { motion } from "framer-motion";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface ProofCard {
  type: "review" | "metric" | "video" | "badge";
  content: {
    [key: string]: string | number;
  };
}

// ============================================================================
// PROOF DATA
// ============================================================================

const PROOF_ITEMS: ProofCard[] = [
  // Google Reviews
  {
    type: "review",
    content: {
      name: "Mike Henderson",
      business: "Henderson HVAC",
      rating: 5,
      text: "Capture Client's AI answered 47 calls while we were on jobs last week. That's 47 potential customers we would've lost to voicemail. ROI paid for itself in 3 days.",
      date: "2 weeks ago",
    },
  },
  {
    type: "review",
    content: {
      name: "Sarah Chen",
      business: "Elite Fitness Studio",
      rating: 5,
      text: "We went from 12 missed calls per day to ZERO. The AI books membership tours 24/7 and our conversion rate jumped 85%. Best investment we've made.",
      date: "1 month ago",
    },
  },
  {
    type: "review",
    content: {
      name: "Robert Martinez",
      business: "Martinez Law Group",
      rating: 5,
      text: "As attorneys, our time is expensive. This AI handles initial consultations and only sends us qualified leads. We're closing 3x more cases with the same team size.",
      date: "3 weeks ago",
    },
  },

  // Metrics
  {
    type: "metric",
    content: {
      value: "2,847",
      label: "Leads Captured",
      period: "This Month",
      trend: "+127%",
    },
  },
  {
    type: "metric",
    content: {
      value: "< 30s",
      label: "Avg Response Time",
      period: "24/7 Coverage",
      trend: "95% Faster",
    },
  },
  {
    type: "metric",
    content: {
      value: "$180K",
      label: "Revenue Generated",
      period: "Per Client/Year",
      trend: "Avg Impact",
    },
  },

  // Video Testimonials
  {
    type: "video",
    content: {
      name: "James Cooper",
      business: "Cooper Plumbing",
      thumbnail: "🎥",
      duration: "2:15",
      title: "How AI 3x'd Our Emergency Bookings",
    },
  },
  {
    type: "video",
    content: {
      name: "Linda Thompson",
      business: "Bright Smiles Dental",
      thumbnail: "🎥",
      duration: "3:42",
      title: "From 60% No-Shows to 98% Fill Rate",
    },
  },

  // Trust Badges
  {
    type: "badge",
    content: {
      title: "Google Partner",
      subtitle: "Certified Since 2020",
      icon: "verified",
    },
  },
  {
    type: "badge",
    content: {
      title: "Meta Business Partner",
      subtitle: "Official Partner",
      icon: "campaign",
    },
  },
  {
    type: "badge",
    content: {
      title: "SOC 2 Certified",
      subtitle: "Enterprise Security",
      icon: "shield",
    },
  },
  {
    type: "badge",
    content: {
      title: "HIPAA Compliant",
      subtitle: "Healthcare Ready",
      icon: "health_and_safety",
    },
  },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function SocialProofWall() {
  return (
    <section className="section bg-background-dark relative overflow-hidden">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold uppercase tracking-widest text-accent mb-4"
          >
            Trusted by Hundreds
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            Real Results. Real Businesses.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            See what business owners are saying about Capture Client
          </motion.p>
        </div>

        {/* Masonry grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PROOF_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {item.type === "review" && <ReviewCard content={item.content} />}
              {item.type === "metric" && <MetricCard content={item.content} />}
              {item.type === "video" && <VideoCard content={item.content} />}
              {item.type === "badge" && <BadgeCard content={item.content} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CARD COMPONENTS
// ============================================================================

function ReviewCard({ content }: { content: { [key: string]: string | number } }) {
  const stars = Array(Number(content.rating)).fill(0);

  return (
    <div className="card p-6 hover:bg-surface-hover transition-colors duration-300">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {stars.map((_, i) => (
          <span key={i} className="material-icons text-yellow-400 text-lg">
            star
          </span>
        ))}
      </div>

      {/* Review text */}
      <p className="text-foreground mb-4 leading-relaxed">{content.text as string}</p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
          <span className="text-accent font-bold text-sm">
            {(content.name as string).charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-foreground font-semibold text-sm">{content.name as string}</p>
          <p className="text-foreground-muted text-xs">{content.business as string}</p>
        </div>
      </div>

      {/* Date */}
      <p className="text-foreground-muted text-xs mt-4">{content.date as string}</p>
    </div>
  );
}

function MetricCard({ content }: { content: { [key: string]: string | number } }) {
  return (
    <div className="card p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20 hover:border-accent/40 transition-colors duration-300">
      <p className="text-5xl font-bold text-accent mb-2">{content.value as string}</p>
      <p className="text-foreground font-semibold mb-1">{content.label as string}</p>
      <p className="text-foreground-muted text-sm">{content.period as string}</p>
      <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 border border-accent/30">
        <span className="material-icons text-accent text-sm">trending_up</span>
        <span className="text-accent text-xs font-bold">{content.trend as string}</span>
      </div>
    </div>
  );
}

function VideoCard({ content }: { content: { [key: string]: string | number } }) {
  return (
    <div className="card p-0 overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <span className="text-6xl">{content.thumbnail as string}</span>
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="material-icons text-primary text-3xl">play_arrow</span>
          </div>
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/70 backdrop-blur-sm">
          <p className="text-white text-xs font-mono">{content.duration as string}</p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-foreground font-semibold mb-2">{content.title as string}</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-primary font-bold text-xs">
              {(content.name as string).charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-foreground text-xs">{content.name as string}</p>
            <p className="text-foreground-muted text-xs">{content.business as string}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgeCard({ content }: { content: { [key: string]: string | number } }) {
  return (
    <div className="card p-6 flex items-center gap-4 hover:bg-surface-hover transition-colors duration-300">
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
        <span className="material-icons text-primary text-2xl">{content.icon as string}</span>
      </div>
      <div>
        <p className="text-foreground font-semibold">{content.title as string}</p>
        <p className="text-foreground-muted text-sm">{content.subtitle as string}</p>
      </div>
    </div>
  );
}
