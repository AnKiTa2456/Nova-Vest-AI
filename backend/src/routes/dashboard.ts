import { Router, Response } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import { prisma } from '../lib/db.js'
import { recommendations, portfolioHistory, activity } from '../lib/dummy-data.js'
import type { AuthRequest } from '../types/index.js'

const router = Router()

// GET /api/dashboard/stats
router.get('/stats', requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.sub

  const [portfolio, transactions] = await Promise.all([
    prisma.portfolio.findUnique({
      where: { userId },
      include: { holdings: { orderBy: { allocation: 'desc' } } },
    }),
    prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ])

  const holdings = (portfolio?.holdings ?? []).map((h) => ({
    symbol: h.symbol,
    name: h.name,
    assetType: h.assetType,
    shares: h.shares,
    avgPrice: h.avgPrice,
    currentPrice: h.currentPrice,
    value: h.shares * h.currentPrice,
    allocation: h.allocation,
    change24h: h.currentPrice - h.avgPrice,
    changePercent24h: ((h.currentPrice - h.avgPrice) / h.avgPrice) * 100,
  }))

  const totalValue = portfolio?.totalValue ?? 0
  const monthlyGain = portfolio?.monthlyGain ?? 0

  res.json({
    portfolio: {
      totalValue,
      monthlyGain,
      monthlyGainPercent: totalValue > monthlyGain ? (monthlyGain / (totalValue - monthlyGain)) * 100 : 0,
      riskScore: portfolio?.riskScore ?? 50,
      aiSuggestions: recommendations.length,
    },
    holdings,
    transactions,
    recommendations,
    portfolioHistory,
    activity,
  })
})

export default router
