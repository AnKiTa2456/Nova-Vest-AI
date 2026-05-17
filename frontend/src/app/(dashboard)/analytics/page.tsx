import { redirect } from 'next/navigation'
import Header from '@/components/dashboard/Header'
import AnalyticsCharts from '@/components/dashboard/AnalyticsCharts'
import MetricCard from '@/components/dashboard/MetricCard'
import { BarChart3, Target, Award, TrendingUp } from 'lucide-react'
import { serverFetch } from '@/lib/api'
import type { DashboardStats } from '@/types'

async function ensureAuth() {
  try {
    await serverFetch<DashboardStats>('/api/dashboard/stats')
  } catch {
    redirect('/session-reset')
  }
}

export default async function AnalyticsPage() {
  await ensureAuth()

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Analytics" subtitle="Deep portfolio performance analysis" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard
            title="Total Return"
            value="+$69,412"
            change="+38.9%"
            changePositive
            subtitle="Since inception"
            icon={<TrendingUp size={20} className="text-emerald-400 bg-emerald-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={0}
          />
          <MetricCard
            title="Sharpe Ratio"
            value="1.84"
            change="+0.12"
            changePositive
            subtitle="Risk-adjusted return"
            icon={<Award size={20} className="text-indigo-400 bg-indigo-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={1}
          />
          <MetricCard
            title="Win Rate"
            value="68.4%"
            change="+2.1%"
            changePositive
            subtitle="47 total trades"
            icon={<Target size={20} className="text-cyan-400 bg-cyan-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={2}
          />
          <MetricCard
            title="Max Drawdown"
            value="-8.2%"
            change="-1.3%"
            changePositive={false}
            subtitle="Peak to trough"
            icon={<BarChart3 size={20} className="text-yellow-400 bg-yellow-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={3}
          />
        </div>
        <AnalyticsCharts />
      </div>
    </div>
  )
}
