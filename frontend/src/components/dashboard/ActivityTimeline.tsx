'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Brain, DollarSign, RefreshCw, LogIn } from 'lucide-react'
import type { ActivityItem } from '@/types'
import { timeAgo, formatCurrency } from '@/lib/utils'

const typeConfig = {
  TRADE: { icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-500/15' },
  AI_ALERT: { icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  DIVIDEND: { icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  REBALANCE: { icon: RefreshCw, color: 'text-cyan-400', bg: 'bg-cyan-500/15' },
  LOGIN: { icon: LogIn, color: 'text-gray-400', bg: 'bg-gray-500/15' },
}

interface Props {
  activity: ActivityItem[]
}

export default function ActivityTimeline({ activity }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-card p-6"
    >
      <h3 className="text-white font-semibold mb-5">Activity</h3>

      <div className="relative">
        <div className="absolute left-4 top-4 bottom-4 w-px bg-white/[0.06]" />

        <div className="space-y-4">
          {activity.map((item, i) => {
            const config = typeConfig[item.type]
            const Icon = config.icon

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="flex gap-4 relative"
              >
                <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center shrink-0 relative z-10`}>
                  <Icon size={14} className={config.color} />
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-white text-sm font-medium">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {item.amount !== undefined && (
                        <p className={`text-xs font-semibold ${item.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {item.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(item.amount))}
                        </p>
                      )}
                      <p className="text-gray-600 text-xs">{timeAgo(item.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
