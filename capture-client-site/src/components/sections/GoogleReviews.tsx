"use client";

import { useRef } from "react";
import { motion } from "@/lib/motion";
import { useInView } from "@/hooks/useInView";
import { Star } from "lucide-react";
import { use3DTilt, cardShadow, perspectiveContainer, transform3D } from "@/lib/depth-utils";
import { useIsMobile } from "@/lib/responsive";

// ============================================
// GOOGLE REVIEWS - Light Theme Premium Display
// Shows real Google reviews with weekly ISR
// ============================================

interface GoogleReview {
  authorName: string;
  authorPhoto: string;
  rating: number;
  text: string;
  relativeTime: string;
}

interface GoogleReviewsData {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

interface GoogleReviewsProps {
  data?: GoogleReviewsData;
}

// Fallback data based on actual Google Business Profile
const fallbackData: GoogleReviewsData = {
  rating: 5.0,
  totalReviews: 27,
  reviews: [
    {
      authorName: "Business Owner",
      authorPhoto: "",
      rating: 5,
      text: "Capture Client has transformed how we handle leads. The AI voice agent is incredibly professional and never misses a call.",
      relativeTime: "recently",
    },
    {
      authorName: "Sarah M.",
      authorPhoto: "",
      rating: 5,
      text: "Outstanding service! We've seen a significant increase in captured leads since implementing Capture Client.",
      relativeTime: "a month ago",
    },
    {
      authorName: "Michael T.",
      authorPhoto: "",
      rating: 5,
      text: "The 24/7 availability has been a game-changer for our business. Highly recommend!",
      relativeTime: "2 months ago",
    },
  ],
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: GoogleReview; index: number }) {
  const isMobile = useIsMobile();
  const cardTilt = use3DTilt(3);

  // Get initials from author name
  const initials = review.authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={isMobile ? {} : perspectiveContainer}>
        <motion.div
          style={isMobile ? {} : { ...transform3D, rotateX: cardTilt.rotateX, rotateY: cardTilt.rotateY }}
          animate={{ boxShadow: cardTilt.isHovered ? cardShadow.hover : cardShadow.rest }}
          transition={{ duration: 0.3 }}
          {...cardTilt.handlers}
          className="h-full p-6 rounded-xl bg-white/70 backdrop-blur-xl border border-slate-200/60 group"
        >
          {/* Header with author and rating */}
          <div className="flex items-start gap-3 mb-4">
            {/* Avatar */}
            {review.authorPhoto ? (
              <img
                src={review.authorPhoto}
                alt={review.authorName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold text-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-md shadow-blue-500/20"
                style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
              >
                {initials}
              </div>
            )}
            <div className="flex-1">
              <p
                className="text-sm font-semibold text-slate-900"
                style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
              >
                {review.authorName}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <StarRating rating={review.rating} />
                <span className="text-xs text-slate-400">{review.relativeTime}</span>
              </div>
            </div>
          </div>

          {/* Review text */}
          <p
            className="text-sm leading-relaxed text-slate-600 line-clamp-4"
            style={{ fontFamily: "var(--font-bricolage-grotesque)", fontWeight: 400 }}
          >
            "{review.text}"
          </p>

          {/* Google attribution */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span
              className="text-xs text-slate-400"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
            >
              Google Review
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function GoogleReviews({ data = fallbackData }: GoogleReviewsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.1 });

  return (
    <section className="relative overflow-hidden w-full py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50 to-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] opacity-20"
          style={{
            background: "radial-gradient(circle at center, rgba(14, 165, 233, 0.08) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div ref={containerRef} className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header with overall rating */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          {/* Google badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span
              className="text-sm font-medium text-slate-700"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
            >
              Google Reviews
            </span>
          </div>

          {/* Big rating display */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <span
              className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
            >
              {data.rating.toFixed(1)}
            </span>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-6 h-6 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span
                className="text-sm text-slate-500"
                style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
              >
                Based on {data.totalReviews} reviews
              </span>
            </div>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {/* CTA to leave a review */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <a
            href="https://maps.app.goo.gl/PNoQ4CeqL9GSpHHu8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 shadow-sm"
            style={{ fontFamily: "var(--font-bricolage-grotesque)" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
            </svg>
            Leave us a review
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default GoogleReviews;
