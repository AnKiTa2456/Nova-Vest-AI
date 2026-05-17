import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, compact = false): string {
  if (compact && Math.abs(value) >= 1_000_000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function getRiskLabel(score: number): { label: string; color: string } {
  if (score < 30) return { label: 'Low', color: 'text-emerald-400' }
  if (score < 60) return { label: 'Medium', color: 'text-yellow-400' }
  if (score < 80) return { label: 'High', color: 'text-orange-400' }
  return { label: 'Very High', color: 'text-red-400' }
}

export function getAssetColor(type: string): string {
  const colors: Record<string, string> = {
    STOCK: '#6366f1',
    CRYPTO: '#a855f7',
    ETF: '#22d3ee',
    BOND: '#10b981',
  }
  return colors[type] ?? '#6b7280'
}
