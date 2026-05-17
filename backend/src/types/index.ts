export interface JWTPayload {
  sub: string
  email: string
  name: string
  role: 'USER' | 'ADMIN'
  iat?: number
  exp?: number
}

export interface Portfolio {
  totalValue: number
  monthlyGain: number
  monthlyGainPercent: number
  riskScore: number
  aiSuggestions: number
}

export interface Holding {
  symbol: string
  name: string
  assetType: 'STOCK' | 'CRYPTO' | 'ETF' | 'BOND'
  shares: number
  avgPrice: number
  currentPrice: number
  value: number
  allocation: number
  change24h: number
  changePercent24h: number
}

export interface Transaction {
  id: string
  type: 'BUY' | 'SELL'
  symbol: string
  name: string
  shares: number
  price: number
  total: number
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  createdAt: string
}

export interface AIRecommendation {
  id: string
  title: string
  description: string
  type: 'BUY' | 'SELL' | 'HOLD' | 'REBALANCE'
  symbol?: string
  confidence: number
  impact: 'HIGH' | 'MEDIUM' | 'LOW'
  reasoning: string
  createdAt: string
}

export interface PortfolioDataPoint {
  date: string
  value: number
  benchmark: number
}

export interface ActivityItem {
  id: string
  type: 'TRADE' | 'AI_ALERT' | 'DIVIDEND' | 'REBALANCE' | 'LOGIN'
  title: string
  description: string
  amount?: number
  createdAt: string
}

export interface DashboardStats {
  portfolio: Portfolio
  holdings: Holding[]
  transactions: Transaction[]
  recommendations: AIRecommendation[]
  portfolioHistory: PortfolioDataPoint[]
  activity: ActivityItem[]
}

// Express request augmentation
import { Request } from 'express'
export interface AuthRequest extends Request {
  user?: JWTPayload
}
