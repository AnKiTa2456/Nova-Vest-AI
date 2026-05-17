import { redirect } from 'next/navigation'
import Header from '@/components/dashboard/Header'
import MetricCard from '@/components/dashboard/MetricCard'
import PortfolioChart from '@/components/dashboard/PortfolioChart'
import AssetAllocation from '@/components/dashboard/AssetAllocation'
import TransactionsTable from '@/components/dashboard/TransactionsTable'
import ActivityTimeline from '@/components/dashboard/ActivityTimeline'
import AIRecommendations from '@/components/dashboard/AIRecommendations'
import { serverFetch } from '@/lib/api'
import { formatCurrency, formatPercent, getRiskLabel } from '@/lib/utils'
import { DollarSign, TrendingUp, Shield, Brain } from 'lucide-react'
import type { DashboardStats } from '@/types'

async function getData(): Promise<DashboardStats> {
  try {
    return await serverFetch<DashboardStats>('/api/dashboard/stats')
  } catch {
    redirect('/session-reset')
  }
}

export default async function DashboardPage() {
  const stats = await getData()
  const { portfolio, transactions, recommendations, portfolioHistory, activity } = stats
  const risk = getRiskLabel(portfolio.riskScore)

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Dashboard"
        subtitle={`Good morning · ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`}
      />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <MetricCard
            title="Portfolio Value"
            value={formatCurrency(portfolio.totalValue)}
            change="+12.4%"
            changePositive
            subtitle="vs. last month"
            icon={<DollarSign size={20} className="text-indigo-400 bg-indigo-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={0}
          />
          <MetricCard
            title="Monthly Growth"
            value={`+${formatCurrency(portfolio.monthlyGain)}`}
            change={formatPercent(portfolio.monthlyGainPercent)}
            changePositive
            subtitle="Since June 2024"
            icon={<TrendingUp size={20} className="text-emerald-400 bg-emerald-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={1}
          />
          <MetricCard
            title="Risk Score"
            value={`${portfolio.riskScore}/100`}
            subtitle={`${risk.label} risk profile`}
            icon={<Shield size={20} className={`${risk.color} bg-yellow-500/10 w-10 h-10 p-2.5 rounded-xl`} />}
            index={2}
            extra={
              <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500"
                  style={{ width: `${portfolio.riskScore}%` }}
                />
              </div>
            }
          />
          <MetricCard
            title="AI Suggestions"
            value={`${portfolio.aiSuggestions} Active`}
            change="87% avg conf."
            changePositive
            subtitle="Updated 1h ago"
            icon={<Brain size={20} className="text-purple-400 bg-purple-500/20 w-10 h-10 p-2.5 rounded-xl" />}
            index={3}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <PortfolioChart data={portfolioHistory} />
          </div>
          <AssetAllocation />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <AIRecommendations recommendations={recommendations} />
          <ActivityTimeline activity={activity} />
        </div>

        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  )
}
