'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started with AI-powered investing.',
    badge: null,
    features: [
      'Portfolio tracking (up to $50K)',
      '3 AI recommendations/month',
      'Basic analytics dashboard',
      'Market news feed',
      'Email alerts',
    ],
    cta: 'Get Started Free',
    href: '/signup',
    featured: false,
    gradient: 'from-white/[0.04] to-white/[0.01]',
    border: 'border-white/10',
  },
  {
    name: 'Pro',
    price: 29,
    period: 'per month',
    description: 'For serious investors who want AI-driven edge.',
    badge: 'Most Popular',
    features: [
      'Unlimited portfolio value',
      'Unlimited AI recommendations',
      'Advanced analytics & charts',
      'Risk management tools',
      'Real-time alerts (SMS + push)',
      'Portfolio backtesting',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    href: '/signup',
    featured: true,
    gradient: 'from-indigo-500/20 to-purple-500/10',
    border: 'border-indigo-500/40',
  },
  {
    name: 'Enterprise',
    price: 99,
    period: 'per month',
    description: 'For professional fund managers and institutions.',
    badge: null,
    features: [
      'Everything in Pro',
      'Multi-portfolio management',
      'White-label options',
      'Custom AI model tuning',
      'API access',
      'Dedicated account manager',
      'SOC 2 compliance reports',
    ],
    cta: 'Contact Sales',
    href: '/signup',
    featured: false,
    gradient: 'from-purple-500/10 to-pink-500/5',
    border: 'border-purple-500/20',
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="pricing" className="py-24 px-6 relative">
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-indigo-900/20 blur-[120px]" />
      <div className="max-w-6xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4 block">
            Simple Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Choose Your <span className="gradient-text">Growth Plan</span>
          </h2>
          <p className="text-gray-400 text-lg">All plans include a 14-day free trial. No credit card required.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl border p-8 bg-gradient-to-br ${plan.gradient} ${plan.border} ${
                plan.featured ? 'ring-2 ring-indigo-500/50 shadow-neon-blue scale-[1.03]' : ''
              } transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/30`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-neon-blue">
                  <Zap size={10} />
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">
                    {plan.price === 0 ? 'Free' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-gray-500 text-sm">/{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      plan.featured ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/10 text-gray-400'
                    }`}>
                      <Check size={11} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.featured
                    ? 'glow-button'
                    : 'glass border border-white/10 text-gray-300 hover:text-white hover:border-white/20'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
