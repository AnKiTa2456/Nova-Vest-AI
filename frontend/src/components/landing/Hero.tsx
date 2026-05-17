'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, TrendingUp, Brain, Shield, Zap } from 'lucide-react'

const floatingBadges = [
  { icon: TrendingUp, text: '+24.8% this month', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', x: '-left-4', y: 'top-1/4' },
  { icon: Brain, text: 'AI Signal: BUY NVDA', color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20', x: '-right-4', y: 'top-1/3' },
  { icon: Shield, text: 'Risk Score: 72/100', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', x: '-left-8', y: 'bottom-1/4' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-600/20 blur-[120px] animate-pulse-glow animate-delay-200" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-cyan-600/15 blur-[100px] animate-float" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-sm text-indigo-300 mb-8"
        >
          <Zap size={14} className="text-indigo-400" />
          <span>Powered by NovaVest AI Engine v2.1</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
        >
          <span className="text-white">Invest Smarter</span>
          <br />
          <span className="gradient-text">with AI Insights</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          NovaVest AI analyzes markets in real-time, delivers personalized investment signals,
          and optimizes your portfolio — all powered by cutting-edge artificial intelligence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/signup"
            className="glow-button px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2 group"
          >
            Start Free Today
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 text-base font-semibold text-gray-300 hover:text-white hover:border-white/20 transition-all"
          >
            <Play size={16} />
            View Demo Dashboard
          </Link>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Floating badges */}
          {floatingBadges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.15 }}
              className={`absolute ${badge.x} ${badge.y} hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl glass border ${badge.bg} text-xs font-medium ${badge.color} whitespace-nowrap z-10 shadow-glass`}
            >
              <badge.icon size={12} />
              {badge.text}
            </motion.div>
          ))}

          {/* Mock dashboard */}
          <div className="glass-card p-1 shadow-glass">
            <div className="rounded-xl overflow-hidden bg-dark-bg/80">
              {/* Browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 mx-4 bg-white/5 rounded-md h-5 flex items-center px-3">
                  <span className="text-gray-500 text-xs">app.novavest.ai/dashboard</span>
                </div>
              </div>

              {/* Dashboard content preview */}
              <div className="flex h-72">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/5 p-4 hidden sm:block">
                  <div className="space-y-1">
                    {['Dashboard', 'Analytics', 'Portfolio', 'Settings'].map((item, i) => (
                      <div
                        key={item}
                        className={`px-3 py-2 rounded-lg text-xs font-medium ${
                          i === 0 ? 'bg-indigo-500/20 text-indigo-400' : 'text-gray-500'
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4">
                  {/* Metric cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Portfolio Value', value: '$247,832', change: '+12.4%', color: 'text-emerald-400' },
                      { label: 'Monthly P&L', value: '+$12,398', change: '+5.2%', color: 'text-indigo-400' },
                      { label: 'AI Signals', value: '5 Active', change: '87% conf.', color: 'text-purple-400' },
                    ].map((card) => (
                      <div key={card.label} className="glass rounded-lg p-3">
                        <div className="text-gray-500 text-[10px] mb-1">{card.label}</div>
                        <div className="text-white text-sm font-bold">{card.value}</div>
                        <div className={`text-[10px] font-medium ${card.color}`}>{card.change}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder */}
                  <div className="glass rounded-lg p-3 h-32 flex items-end gap-1">
                    {[40, 55, 45, 65, 75, 60, 80, 70, 85, 90, 82, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background: `linear-gradient(to top, rgba(99,102,241,0.8), rgba(168,85,247,0.4))`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom glow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-indigo-600/20 blur-2xl rounded-full" />
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm"
        >
          {['SOC 2 Certified', 'Bank-Level Encryption', '99.9% Uptime SLA', 'FINRA Compliant'].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
