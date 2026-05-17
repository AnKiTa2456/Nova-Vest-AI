'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Portfolio Manager',
    company: 'Apex Capital',
    avatar: 'SC',
    content:
      'NovaVest AI completely transformed how I manage client portfolios. The AI recommendations have been uncannily accurate — I\'ve seen a 34% improvement in risk-adjusted returns since switching.',
    rating: 5,
    result: '+34% Risk-Adjusted Returns',
  },
  {
    name: 'Marcus Williams',
    role: 'Independent Investor',
    company: 'Self-managed $2.1M',
    avatar: 'MW',
    content:
      "I was skeptical about AI investing tools, but NovaVest proved me wrong. The signal quality is exceptional — especially the crypto analysis. Best platform I've used in 15 years of investing.",
    rating: 5,
    result: '+$280K Portfolio Growth',
  },
  {
    name: 'Priya Patel',
    role: 'Quant Analyst',
    company: 'Meridian Hedge Fund',
    avatar: 'PP',
    content:
      'The analytics depth here rivals institutional-grade tools at a fraction of the cost. The correlation analysis and sector exposure views are particularly powerful for our strategy.',
    rating: 5,
    result: '3x Faster Analysis',
  },
]

const extraTestimonials = [
  {
    name: 'David Kim',
    role: 'Retail Investor',
    company: 'Tech Professional',
    avatar: 'DK',
    content: 'Finally, a platform that makes complex portfolio analysis accessible. The UI is beautiful and the AI signals are genuinely useful.',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'Financial Advisor',
    company: 'BlueSky Wealth',
    avatar: 'ET',
    content: 'My clients love the transparent AI reasoning behind each recommendation. It builds trust and helps them understand why we take certain positions.',
    rating: 5,
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="testimonials" className="py-24 px-6 relative">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-900/20 blur-[120px]" />
      <div className="max-w-7xl mx-auto relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-4 block">
            Social Proof
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Loved by <span className="gradient-text">Smart Investors</span>
          </h2>
          <p className="text-gray-400 text-lg">Join thousands of investors already growing their wealth with NovaVest AI.</p>
        </motion.div>

        {/* Main testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-6 flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">"{t.content}"</p>
              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role} · {t.company}</div>
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                  {t.result}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {extraTestimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass-card p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                {t.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-sm">{t.name}</span>
                  <span className="text-gray-500 text-xs">· {t.role}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">"{t.content}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
