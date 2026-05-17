'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts'
import type { PortfolioDataPoint } from '@/types'
import { formatCurrency } from '@/lib/utils'

const ranges = ['3M', '6M', '1Y', 'All'] as const

interface Props {
  data: PortfolioDataPoint[]
}

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number; name: string; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass border border-white/10 rounded-xl p-3 shadow-glass text-xs">
      <p className="text-gray-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-400 capitalize">{p.name}:</span>
          <span className="text-white font-semibold">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function PortfolioChart({ data }: Props) {
  const [range, setRange] = useState<typeof ranges[number]>('1Y')

  const rangeMap = { '3M': 3, '6M': 6, '1Y': 12, 'All': data.length }
  const filtered = data.slice(-rangeMap[range])

  const gain = filtered.length >= 2
    ? ((filtered[filtered.length - 1].value - filtered[0].value) / filtered[0].value) * 100
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold">Portfolio Performance</h3>
          <p className={`text-sm mt-0.5 font-medium ${gain >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {gain >= 0 ? '+' : ''}{gain.toFixed(2)}% vs. benchmark
          </p>
        </div>
        <div className="flex gap-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                range === r
                  ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/40'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={filtered} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="benchmarkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6b7280', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#9ca3af' }}
            formatter={(value) => <span className="text-gray-400 capitalize">{value}</span>}
          />
          <Area
            type="monotone"
            dataKey="benchmark"
            stroke="#a855f7"
            strokeWidth={1.5}
            fill="url(#benchmarkGradient)"
            strokeDasharray="4 4"
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#portfolioGradient)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
