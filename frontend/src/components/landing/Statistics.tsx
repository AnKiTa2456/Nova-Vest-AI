'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 2.4, suffix: 'B+', prefix: '$', label: 'Assets Under Analysis', description: 'Total AUM tracked' },
  { value: 50, suffix: 'K+', prefix: '', label: 'Active Investors', description: 'Growing every day' },
  { value: 99.9, suffix: '%', prefix: '', label: 'Platform Uptime', description: 'Enterprise reliability' },
  { value: 87, suffix: '%', prefix: '', label: 'AI Signal Accuracy', description: 'Verified backtested' },
]

function AnimatedCounter({ end, prefix, suffix, inView }: { end: number; prefix: string; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = 50
    const increment = end / (duration / step)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(parseFloat(start.toFixed(1)))
      }
    }, step)

    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <span className="text-4xl md:text-5xl font-bold text-white">
      {prefix}
      {count % 1 === 0 ? Math.floor(count) : count}
      {suffix}
    </span>
  )
}

export default function Statistics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="stats" className="py-24 px-6 relative" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-gray-400 text-lg">Numbers that reflect our commitment to excellence.</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 text-center"
            >
              <AnimatedCounter
                end={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                inView={inView}
              />
              <div className="text-white font-semibold mt-2 mb-1">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
