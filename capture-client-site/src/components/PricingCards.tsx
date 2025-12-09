'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from '@/lib/motion';
import { useInView } from '@/hooks/useInView';
import { Check, ArrowRight } from 'lucide-react';

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
    price: '$97',
    features: [
      '1 AI Voice Agent',
      '50 calls/month',
      'Basic CRM access',
      'Email support',
      'Analytics dashboard',
    ],
    ctaText: 'Get Started',
    ctaLink: '/pricing/starter-package',
  },
  {
    name: 'Growth',
    price: '$997',
    features: [
      '2 AI Voice Agents',
      'Unlimited calls',
      'Full CRM & unified inbox',
      'Facebook Ads Management',
      'Priority support',
      'Advanced analytics',
    ],
    isPopular: true,
    ctaText: 'Get Started',
    ctaLink: '/pricing/growth-package',
  },
  {
    name: 'Enterprise',
    price: '$2,997',
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
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
  const [isMobile, setIsMobile] = useState(true); // Default to true for SSR

  // Disable 3D effects on mobile/tablet to prevent GPU memory issues
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

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
      transition={{ delay: index * 0.15, duration: 0.7, type: 'spring', stiffness: 100 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`${plan.isPopular ? 'lg:-mt-6 lg:mb-6' : ''}`}
    >
      <motion.div
        animate={{
          scale: isHovered && !isMobile ? 1.03 : 1,
          ...(isMobile ? {} : { rotateX, rotateY }),
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className={`relative group h-full min-h-[580px] rounded-3xl ${plan.isPopular ? '' : 'overflow-hidden'}`}
        style={
          isMobile
            ? {}
            : {
                transformStyle: 'preserve-3d',
              }
        }
      >
        {/* Popular badge - GLOWING */}
        {plan.isPopular && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 max-w-full px-2"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
                boxShadow: [
                  '0 0 20px rgba(0, 201, 255, 0.5)',
                  '0 0 35px rgba(0, 201, 255, 0.8)',
                  '0 0 20px rgba(0, 201, 255, 0.5)',
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="relative px-4 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00C9FF] via-[#4A69E2] to-[#00C9FF] bg-[length:200%_100%] backdrop-blur-md"
            >
              <motion.div
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] rounded-full"
              />
              <div className="relative inline-flex items-start sm:items-center gap-2 max-w-full">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="text-base sm:text-lg flex-shrink-0"
                >
                  ⭐
                </motion.span>
                <span className="font-bold text-xs sm:text-sm tracking-wider text-[#030303] uppercase whitespace-nowrap">
                  Most Popular
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Layered glass background effect */}
        <div className="absolute inset-0">
          {/* Deep space black base */}
          <div className="absolute inset-0 bg-[#030303]" />

          {/* Mesh gradient overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: plan.isPopular
                ? `
                  radial-gradient(ellipse 80% 80% at 20% 20%, #00C9FF10 0%, transparent 50%),
                  radial-gradient(ellipse 80% 80% at 80% 80%, #4A69E210 0%, transparent 50%)
                `
                : `
                  radial-gradient(ellipse 80% 80% at 20% 20%, #FFFFFF05 0%, transparent 50%)
                `,
            }}
          />

          {/* Glassmorphism layer */}
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl" />

          {/* Animated gradient border */}
          <div
            className={`absolute inset-0 rounded-3xl ${
              plan.isPopular
                ? 'bg-gradient-to-r from-[#00C9FF]/50 via-[#4A69E2]/50 to-[#00C9FF]/50 p-[2px]'
                : 'bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-[1px]'
            }`}
          >
            <div className="absolute inset-[1px] rounded-3xl bg-[#030303]" />
          </div>

          {/* Hover glow effect */}
          {plan.isPopular && (
            <motion.div
              className="absolute -inset-[2px] bg-gradient-to-r from-[#00C9FF] via-[#4A69E2] to-[#00C9FF] rounded-3xl opacity-0 blur-xl"
              animate={{
                opacity: isHovered ? 0.6 : 0,
              }}
              transition={{ duration: 0.4 }}
            />
          )}

          {/* Floating orbs for popular plan */}
          {plan.isPopular && (
            <>
              <motion.div
                className="absolute top-20 right-10 w-32 h-32 bg-[#00C9FF]/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute bottom-20 left-10 w-40 h-40 bg-[#4A69E2]/15 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.15, 0.3, 0.15],
                  y: [0, -25, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              />
            </>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            {/* Plan name */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: index * 0.15 + 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`text-2xl lg:text-3xl mb-6 tracking-tight ${
                plan.isPopular
                  ? 'bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] bg-clip-text text-transparent'
                  : 'text-white font-extralight'
              }`}
              style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: plan.isPopular ? 800 : 200
              }}
            >
              {plan.name}
            </motion.h3>

            {/* Price - BOLD and eye-catching */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-2"
            >
              <div className="flex items-baseline gap-2">
                <span
                  className={`text-6xl lg:text-7xl leading-none tracking-tight ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-[#00C9FF] to-[#4A69E2] bg-clip-text text-transparent'
                      : plan.price === 'Custom'
                      ? 'bg-gradient-to-br from-amber-400 to-amber-600 bg-clip-text text-transparent'
                      : 'text-white'
                  }`}
                  style={{
                    fontFamily: 'var(--font-bricolage-grotesque)',
                    fontWeight: 800
                  }}
                >
                  {plan.price}
                </span>
                {plan.price !== 'Custom' && (
                  <span className="text-white/40 text-lg" style={{ fontWeight: 200 }}>/mo</span>
                )}
              </div>
            </motion.div>

            {/* Subtitle */}
            {plan.subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: index * 0.15 + 0.4 }}
                className="text-white/50 text-sm"
              >
                {plan.subtitle}
              </motion.p>
            )}
          </div>

          {/* Features - Scannable with good spacing */}
          <ul className="space-y-4 mb-8 flex-grow">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.15 + 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-3 group/feature"
              >
                <motion.div
                  animate={
                    isHovered && !isMobile
                      ? {
                          scale: [1, 1.3, 1],
                          rotate: [0, 360],
                        }
                      : {}
                  }
                  transition={{
                    delay: i * 0.1,
                    duration: 0.6,
                  }}
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                    plan.isPopular
                      ? 'bg-gradient-to-br from-[#00C9FF] to-[#4A69E2]'
                      : 'bg-white/10'
                  }`}
                >
                  <Check
                    className={`w-4 h-4 flex-shrink-0 ${
                      plan.isPopular ? 'text-[#030303]' : 'text-[#00C9FF]'
                    }`}
                  />
                </motion.div>
                <span
                  className={`text-base leading-relaxed ${
                    plan.isPopular ? 'text-white font-medium' : 'text-white/60'
                  }`}
                >
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button - Premium hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: index * 0.15 + 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20"
            style={{ pointerEvents: 'auto' }}
          >
            <Link
              href={plan.ctaLink}
              className={`relative block w-full text-center py-4 min-h-[56px] rounded-2xl text-lg overflow-hidden group/cta transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                plan.isPopular
                  ? 'bg-gradient-to-r from-[#00C9FF] via-[#4A69E2] to-[#00C9FF] bg-[length:200%_100%]'
                  : plan.price === 'Custom'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                  : 'bg-white/5 border-2 border-white/20 hover:bg-white/10 hover:border-white/30'
              }`}
              style={{
                fontFamily: 'var(--font-bricolage-grotesque)',
                fontWeight: 600,
                pointerEvents: 'auto'
              }}
            >
              {/* Shimmer effect */}
              {plan.isPopular && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                  animate={{
                    x: ['-200%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: 'linear',
                  }}
                />
              )}

              <span
                className={`relative z-10 flex items-center justify-center gap-2 ${
                  plan.isPopular || plan.price === 'Custom'
                    ? 'text-[#030303]'
                    : 'text-white'
                }`}
              >
                {plan.ctaText}
                <span
                  className={`inline-block transition-transform duration-300 ${
                    isHovered ? 'translate-x-1' : ''
                  }`}
                >
                  <ArrowRight className="w-5 h-5" />
                </span>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Shine effect on hover - Premium touch */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? ['0%', '200%'] : '0%',
          }}
          transition={{
            opacity: { duration: 0.3 },
            x: { duration: 1.5, repeat: Infinity, repeatDelay: 0.5 },
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
          style={
            isMobile
              ? {}
              : {
                  transform: 'translateZ(40px) skewX(-15deg)',
                }
          }
        />
      </motion.div>
    </motion.div>
  );
}
