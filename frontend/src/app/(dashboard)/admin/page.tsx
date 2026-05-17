'use client'

import { motion } from 'framer-motion'
import { Users, Activity, TrendingUp, ShieldCheck, Server, Cpu } from 'lucide-react'
import Header from '@/components/dashboard/Header'
import MetricCard from '@/components/dashboard/MetricCard'
import { formatNumber } from '@/lib/utils'

const users = [
  { id: 1, name: 'Alex Morgan', email: 'demo@novavest.ai', role: 'USER', joined: '2023-09-01', portfolioValue: '$247,832' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@example.com', role: 'USER', joined: '2023-10-15', portfolioValue: '$89,450' },
  { id: 3, name: 'Marcus Williams', email: 'marcus@example.com', role: 'USER', joined: '2023-11-03', portfolioValue: '$2,145,000' },
  { id: 4, name: 'Priya Patel', email: 'priya@example.com', role: 'USER', joined: '2024-01-20', portfolioValue: '$567,230' },
  { id: 5, name: 'Admin User', email: 'admin@novavest.ai', role: 'ADMIN', joined: '2023-01-01', portfolioValue: 'N/A' },
]

const systemHealth = [
  { name: 'API Server', status: 'operational', uptime: '99.98%', latency: '23ms' },
  { name: 'AI Engine', status: 'operational', uptime: '99.95%', latency: '142ms' },
  { name: 'Database', status: 'operational', uptime: '99.99%', latency: '8ms' },
  { name: 'WebSocket', status: 'degraded', uptime: '98.2%', latency: '52ms' },
]

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Admin Panel" subtitle="Platform management and monitoring" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard
            title="Total Users"
            value={formatNumber(52847)}
            change="+1,248 this week"
            changePositive
            subtitle="Active accounts"
            icon={<Users size={20} className="text-indigo-400 bg-indigo-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={0}
          />
          <MetricCard
            title="Total AUM"
            value="$2.4B"
            change="+$180M"
            changePositive
            subtitle="Assets under analysis"
            icon={<TrendingUp size={20} className="text-emerald-400 bg-emerald-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={1}
          />
          <MetricCard
            title="Daily Transactions"
            value="18,432"
            change="+12%"
            changePositive
            subtitle="Last 24 hours"
            icon={<Activity size={20} className="text-cyan-400 bg-cyan-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={2}
          />
          <MetricCard
            title="Active AI Signals"
            value="2,847"
            change="87% avg conf."
            changePositive
            subtitle="Across all users"
            icon={<Cpu size={20} className="text-purple-400 bg-purple-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={3}
          />
        </div>

        {/* System health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Server size={16} className="text-gray-400" />
            <h3 className="text-white font-semibold">System Health</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {systemHealth.map((svc) => (
              <div key={svc.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm font-medium">{svc.name}</span>
                  <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                    svc.status === 'operational'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-yellow-500/15 text-yellow-400'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {svc.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Uptime</span>
                    <p className="text-white font-semibold">{svc.uptime}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Latency</span>
                    <p className="text-white font-semibold">{svc.latency}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-gray-400" />
              <h3 className="text-white font-semibold">User Management</h3>
            </div>
            <button className="glow-button px-4 py-2 rounded-xl text-xs font-semibold">
              + Invite User
            </button>
          </div>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {['User', 'Role', 'Status', 'Joined', 'Portfolio', 'Actions'].map((h) => (
                    <th key={h} className="text-left py-2.5 text-xs font-medium text-gray-500 uppercase tracking-wider pr-4 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">{user.name}</div>
                          <div className="text-gray-500 text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        user.role === 'ADMIN'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-indigo-500/20 text-indigo-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="badge-green">Active</span>
                    </td>
                    <td className="py-3.5 pr-4 text-sm text-gray-400">{user.joined}</td>
                    <td className="py-3.5 pr-4 text-sm text-white font-medium">{user.portfolioValue}</td>
                    <td className="py-3.5">
                      <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
