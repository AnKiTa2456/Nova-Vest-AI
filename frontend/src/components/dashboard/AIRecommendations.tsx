'use client'

import { motion } from 'framer-motion'
import { Brain, TrendingUp, TrendingDown, Minus, RefreshCw, Zap, ArrowRight } from 'lucide-react'
import type { AIRecommendation } from '@/types'
import { timeAgo } from '@/lib/utils'

const typeConfig = {
  BUY: { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/15', badge: 'badge-green' },
  SELL: { icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-500/15', badge: 'badge-red' },
  HOLD: { icon: Minus, color: 'text-yellow-400', bg: 'bg-yellow-500/15', badge: 'badge-yellow' },
  REBALANCE: { icon: RefreshCw, color: 'text-cyan-400', bg: 'bg-cyan-500/15', badge: 'badge-blue' },
}

const impactColors = {
  HIGH: 'text-red-400',
  MEDIUM: 'text-yellow-400',
  LOW: 'text-gray-400',
}

interface Props {
  recommendations: AIRecommendation[]
}

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 80 ? '#10b981' : value >= 60 ? '#6366f1' : '#f59e0b'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ delay: 0.8, duration: 0.7, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="text-xs font-semibold" style={{ color }}>{value}%</span>
    </div>
  )
}

export default function AIRecommendations({ recommendations }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Brain size={15} className="text-purple-400" />
          </div>
          <h3 className="text-white font-semibold">AI Recommendations</h3>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-[10px] font-medium">
            <Zap size={9} />
            Live
          </span>
        </div>
        <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
          All →
        </button>
      </div>

      <div className="space-y-4">
        {recommendations.slice(0, 4).map((rec, i) => {
          const config = typeConfig[rec.type]
          const Icon = config.icon

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              className="group p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon size={15} className={config.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-white text-sm font-semibold">{rec.title}</span>
                    {rec.symbol && (
                      <span className="text-xs font-medium bg-white/10 text-gray-300 px-1.5 py-0.5 rounded-md">
                        {rec.symbol}
                      </span>
                    )}
                    <span className={`text-xs font-medium ${impactColors[rec.impact]}`}>
                      {rec.impact} impact
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{rec.description}</p>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">AI Confidence</span>
                  <span className="text-gray-500">{timeAgo(rec.createdAt)}</span>
                </div>
                <ConfidenceBar value={rec.confidence} />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-1 flex-1">{rec.reasoning}</p>
                <ArrowRight size={13} className="text-gray-600 group-hover:text-gray-400 transition-colors shrink-0 ml-2" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
