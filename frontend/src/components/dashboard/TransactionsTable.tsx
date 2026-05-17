'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react'
import type { Transaction } from '@/types'
import { formatCurrency, timeAgo } from '@/lib/utils'

interface Props {
  transactions: Transaction[]
}

function StatusBadge({ status }: { status: Transaction['status'] }) {
  const map = {
    COMPLETED: 'badge-green',
    PENDING: 'badge-yellow',
    FAILED: 'badge-red',
  }
  return <span className={map[status]}>{status.toLowerCase()}</span>
}

export default function TransactionsTable({ transactions }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-white font-semibold">Recent Transactions</h3>
        <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
          View all →
        </button>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Asset', 'Type', 'Shares', 'Price', 'Total', 'Status', 'Time'].map((h) => (
                <th key={h} className="text-left py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider pr-4 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {transactions.slice(0, 7).map((tx) => (
              <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      tx.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {tx.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{tx.symbol}</div>
                      <div className="text-gray-500 text-xs truncate max-w-[120px]">{tx.name}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 pr-4">
                  <span className={`flex items-center gap-1 text-xs font-semibold w-fit ${
                    tx.type === 'BUY' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {tx.type === 'BUY'
                      ? <ArrowDownLeft size={12} strokeWidth={3} />
                      : <ArrowUpRight size={12} strokeWidth={3} />
                    }
                    {tx.type}
                  </span>
                </td>
                <td className="py-3.5 pr-4 text-sm text-gray-300">{tx.shares}</td>
                <td className="py-3.5 pr-4 text-sm text-gray-300">{formatCurrency(tx.price)}</td>
                <td className="py-3.5 pr-4">
                  <span className={`text-sm font-semibold ${tx.type === 'BUY' ? 'text-white' : 'text-white'}`}>
                    {formatCurrency(tx.total)}
                  </span>
                </td>
                <td className="py-3.5 pr-4">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="py-3.5 text-xs text-gray-500 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Clock size={11} />
                    {timeAgo(tx.createdAt)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
