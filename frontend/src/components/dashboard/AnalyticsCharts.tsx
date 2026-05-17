'use client'

import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { staticHoldings as holdings } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

const monthlyPnL = [
  { month: 'Jun', pnl: 4200, positive: true },
  { month: 'Jul', pnl: 6940, positive: true },
  { month: 'Aug', pnl: -1520, positive: false },
  { month: 'Sep', pnl: 12330, positive: true },
  { month: 'Oct', pnl: 13280, positive: true },
  { month: 'Nov', pnl: 13330, positive: true },
  { month: 'Dec', pnl: 7130, positive: true },
  { month: 'Jan', pnl: -6550, positive: false },
  { month: 'Feb', pnl: 12330, positive: true },
  { month: 'Mar', pnl: 7240, positive: true },
  { month: 'Apr', pnl: -3490, positive: false },
  { month: 'May', pnl: 12410, positive: true },
]

const sectorData = [
  { sector: 'Technology', allocation: 52, return: 24.8 },
  { sector: 'Crypto', allocation: 35, return: 18.2 },
  { sector: 'ETF', allocation: 17, return: 12.1 },
  { sector: 'Bonds', allocation: 3, return: 3.2 },
]

function CustomTooltip({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass border border-white/10 rounded-xl p-3 shadow-glass text-xs">
      <p className="text-gray-400 mb-1 font-medium">{label}</p>
      <p className={`font-semibold ${(payload[0].value ?? 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
        {(payload[0].value ?? 0) >= 0 ? '+' : ''}{formatCurrency(payload[0].value ?? 0)}
      </p>
    </div>
  )
}

export default function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      {/* Monthly P&L */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <h3 className="text-white font-semibold mb-5">Monthly P&L</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthlyPnL} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${Math.abs(v / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
              {monthlyPnL.map((entry, i) => (
                <Cell key={i} fill={entry.positive ? '#6366f1' : '#ef4444'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Holdings table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h3 className="text-white font-semibold mb-5">Holdings Overview</h3>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Asset', 'Type', 'Shares', 'Avg Cost', 'Current', 'Value', 'Alloc.', '24h'].map((h) => (
                  <th key={h} className="text-left py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider pr-4 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {holdings.map((h) => (
                <tr key={h.symbol} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 pr-4">
                    <div>
                      <div className="text-white text-sm font-semibold">{h.symbol}</div>
                      <div className="text-gray-500 text-xs">{h.name}</div>
                    </div>
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      h.assetType === 'STOCK' ? 'bg-indigo-500/20 text-indigo-400' :
                      h.assetType === 'CRYPTO' ? 'bg-purple-500/20 text-purple-400' :
                      h.assetType === 'ETF' ? 'bg-cyan-500/20 text-cyan-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {h.assetType}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-sm text-gray-300">{h.shares}</td>
                  <td className="py-3.5 pr-4 text-sm text-gray-400">{formatCurrency(h.avgPrice)}</td>
                  <td className="py-3.5 pr-4 text-sm text-white font-medium">{formatCurrency(h.currentPrice)}</td>
                  <td className="py-3.5 pr-4 text-sm text-white font-semibold">{formatCurrency(h.value)}</td>
                  <td className="py-3.5 pr-4 text-sm text-gray-400">{h.allocation}%</td>
                  <td className="py-3.5">
                    <span className={`text-sm font-semibold ${h.changePercent24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {h.changePercent24h >= 0 ? '+' : ''}{h.changePercent24h.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Sector returns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h3 className="text-white font-semibold mb-5">Sector Performance</h3>
        <div className="space-y-4">
          {sectorData.map((s) => (
            <div key={s.sector}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="text-gray-300 font-medium">{s.sector}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-xs">{s.allocation}% of portfolio</span>
                  <span className="text-emerald-400 font-semibold">+{s.return}%</span>
                </div>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.return / 30) * 100}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
