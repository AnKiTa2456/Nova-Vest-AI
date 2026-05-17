'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change?: string
  changePositive?: boolean
  subtitle?: string
  icon: React.ReactNode
  index?: number
  extra?: React.ReactNode
}

export default function MetricCard({
  title, value, change, changePositive, subtitle, icon, index = 0, extra,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass-card-hover p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            changePositive
              ? 'bg-emerald-500/15 text-emerald-400'
              : 'bg-red-500/15 text-red-400'
          }`}>
            {changePositive
              ? <TrendingUp size={11} strokeWidth={3} />
              : <TrendingDown size={11} strokeWidth={3} />
            }
            {change}
          </span>
        )}
      </div>

      <div className="metric-label mb-1">{title}</div>
      <div className="metric-value mb-1">{value}</div>
      {subtitle && <p className="text-xs text-gray-600">{subtitle}</p>}
      {extra}
    </motion.div>
  )
}
