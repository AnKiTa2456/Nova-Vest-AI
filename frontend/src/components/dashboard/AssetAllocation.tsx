'use client'

import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { assetAllocation } from '@/lib/constants'

function CustomTooltip({ active, payload }: {
  active?: boolean
  payload?: Array<{ name: string; value: number; payload: { color: string } }>
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass border border-white/10 rounded-xl p-3 shadow-glass text-xs">
      <span className="text-white font-semibold">{payload[0].name}: </span>
      <span style={{ color: payload[0].payload.color }}>{payload[0].value}%</span>
    </div>
  )
}

export default function AssetAllocation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
    >
      <h3 className="text-white font-semibold mb-6">Asset Allocation</h3>

      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={assetAllocation}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {assetAllocation.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {assetAllocation.map((asset) => (
            <div key={asset.name}>
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: asset.color }} />
                  <span className="text-gray-400">{asset.name}</span>
                </div>
                <span className="text-white font-semibold">{asset.value}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${asset.value}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: asset.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
