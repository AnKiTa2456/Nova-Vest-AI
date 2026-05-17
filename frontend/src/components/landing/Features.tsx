'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Brain, TrendingUp, Shield, BarChart3, Bell, Wallet } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Investment Intelligence',
    description: 'Our proprietary AI engine analyzes 500+ data sources to deliver actionable investment signals with confidence scores.',
    gradient: 'from-indigo-500/20 to-indigo-500/5',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/20 text-indigo-400',
    tag: 'Core Feature',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Portfolio Tracking',
    description: 'Monitor your entire portfolio across stocks, crypto, ETFs, and bonds with live price updates and P&L tracking.',
    gradient: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/20',
    iconBg: 'bg-purple-500/20 text-purple-400',
    tag: 'Live Data',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Deep-dive into performance metrics, correlation matrices, sector exposure, and risk-adjusted return analysis.',
    gradient: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
    iconBg: 'bg-cyan-500/20 text-cyan-400',
    tag: 'Analytics',
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: "Intelligent risk scoring, VaR calculations, and automatic alerts when your portfolio's risk profile changes.",
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
    tag: 'Security',
  },
  {
    icon: Bell,
    title: 'Smart Alerts & Notifications',
    description: 'Get instantly notified about price targets, AI signals, unusual volume, and market-moving events.',
    gradient: 'from-orange-500/20 to-orange-500/5',
    border: 'border-orange-500/20',
    iconBg: 'bg-orange-500/20 text-orange-400',
    tag: 'Alerts',
  },
  {
    icon: Wallet,
    title: 'Multi-Asset Support',
    description: 'Stocks, crypto, ETFs, bonds, options — manage your complete financial picture in one unified platform.',
    gradient: 'from-pink-500/20 to-pink-500/5',
    border: 'border-pink-500/20',
    iconBg: 'bg-pink-500/20 text-pink-400',
    tag: 'Multi-Asset',
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`glass-card-hover p-6 bg-gradient-to-br ${feature.gradient} border ${feature.border}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center`}>
          <feature.icon size={22} />
        </div>
        <span className="text-xs font-medium text-gray-500 bg-white/5 px-2 py-1 rounded-full border border-white/10">
          {feature.tag}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-indigo-900/20 blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-4 block">
            Everything You Need
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Built for Serious <span className="gradient-text">Investors</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A complete investment intelligence platform that combines real-time data, AI insights, and powerful analytics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
