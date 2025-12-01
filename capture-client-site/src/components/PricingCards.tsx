'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

interface PricingPlan {
  name: string;
  price: string;
  subtitle?: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  ctaLink: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$999',
    features: [
      '1 AI Voice Agent',
      'Up to 50 calls/month',
      'Basic CRM access',
      'Email support',
      'Analytics dashboard',
    ],
    ctaText: 'Get Started',
    ctaLink: '/pricing/starter-package',
  },
  {
    name: 'Growth',
    price: '$2,195',
    features: [
      '2 AI Voice Agents',
      'Up to 200+ calls/month',
      'Full CRM & unified inbox',
      'Google & Facebook Ads setup',
      'Priority support',
      'Advanced analytics',
    ],
    isPopular: true,
    ctaText: 'Get Started',
    ctaLink: '/pricing/growth-package',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    subtitle: 'Tailored to your needs',
    features: [
      'Unlimited AI agents',
      'Unlimited calls',
      'Multi-location support',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
    ],
    ctaText: 'Contact Sales',
    ctaLink: '/pricing/enterprise-package',
  },
];

export default function PricingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { threshold: 0.2 });

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {plans.map((plan, index) => (
        <PricingCard key={plan.name} plan={plan} index={index} isInView={isInView} />
      ))}
    </div>
  );
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  isInView: boolean;
}

function PricingCard({ plan, index, isInView }: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Disable 3D effects on mobile/tablet
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotateX(rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.1, duration: 0.6, type: 'spring' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <motion.div
        animate={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          scale: isHovered && !isMobile ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`card relative ${
          plan.isPopular ? 'border-accent/50 shadow-glow' : ''
        } h-full min-h-[520px] md:min-h-[580px]`}
        style={{
          transformStyle: isMobile ? 'flat' : 'preserve-3d',
        }}
      >
        {/* Popular badge */}
        {plan.isPopular && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-10 w-max max-w-[85%] sm:max-w-[90%]"
          >
            <motion.div
              animate={{
                y: isMobile ? 0 : [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="bg-gradient-to-r from-accent via-primary to-accent bg-[length:200%_100%] text-background-dark px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-bold shadow-lg whitespace-nowrap"
            >
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                style={{
                  background: 'linear-gradient(90deg, #00C9FF, #6366F1, #00C9FF)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Most Popular
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Gradient overlay on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-br from-accent via-primary to-transparent rounded-2xl pointer-events-none"
          style={{
            transform: 'translateZ(20px)',
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-foreground mb-2 sm:mb-3">
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none ${
                  plan.isPopular ? 'text-accent' : 'text-foreground'
                }`}
              >
                {plan.price}
              </motion.span>
              {plan.price !== 'Custom' && (
                <span className="text-foreground-muted text-xs sm:text-sm md:text-base">/month</span>
              )}
            </div>
            {plan.subtitle && (
              <p className="text-foreground-muted text-xs sm:text-sm md:text-base mt-1.5 sm:mt-2">{plan.subtitle}</p>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-2.5 sm:space-y-3 md:space-y-4 mb-5 sm:mb-6 md:mb-8 flex-grow">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 + 0.4 + i * 0.05, duration: 0.4 }}
                className="flex items-start gap-2 sm:gap-2.5 md:gap-3 py-0.5 sm:py-1"
              >
                <motion.span
                  animate={
                    isHovered && !isMobile
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, 0],
                        }
                      : {}
                  }
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                  }}
                  className="material-icons text-accent text-base sm:text-lg md:text-xl mt-0.5 flex-shrink-0"
                >
                  check
                </motion.span>
                <span
                  className={`text-xs sm:text-sm md:text-base leading-relaxed ${plan.isPopular ? 'text-foreground' : 'text-foreground-muted'}`}
                >
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link
            href={plan.ctaLink}
            className={`block w-full text-center py-3 sm:py-3.5 md:py-4 min-h-[48px] sm:min-h-[52px] md:min-h-[56px] flex items-center justify-center text-sm sm:text-base md:text-lg font-bold rounded-xl touch-manipulation ${
              plan.isPopular ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            <motion.span
              whileHover={{ scale: isMobile ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block"
            >
              {plan.ctaText}
            </motion.span>
          </Link>
        </div>

        {/* Shine effect on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? ['0%', '200%'] : '0%',
          }}
          transition={{
            opacity: { duration: 0.3 },
            x: { duration: 1, repeat: Infinity, repeatDelay: 1 },
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none rounded-2xl"
          style={{
            transform: 'translateZ(30px) skewX(-10deg)',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
