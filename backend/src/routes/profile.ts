import { Router, Response } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import { profileUpdateSchema } from '../lib/validations.js'
import { prisma } from '../lib/db.js'
import type { AuthRequest } from '../types/index.js'

const router = Router()

// GET /api/profile
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.sub

  const [user, txCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true, avatar: true, createdAt: true },
    }),
    prisma.transaction.count({ where: { userId } }),
  ])

  if (!user) {
    res.status(404).json({ error: 'User not found' })
    return
  }

  const monthsOld = Math.max(1, Math.floor((Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30)))

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    preferences: { currency: 'USD', riskTolerance: 'MEDIUM', notifications: true, twoFactor: false },
    stats: {
      accountAge: monthsOld === 1 ? '1 month' : `${monthsOld} months`,
      totalTrades: txCount,
      winRate: 68.4,
    },
  })
})

// PATCH /api/profile
router.patch('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const result = profileUpdateSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors })
    return
  }

  const userId = req.user!.sub
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(result.data.name && { name: result.data.name }),
      ...(result.data.email && { email: result.data.email }),
    },
    select: { id: true, email: true, name: true, role: true },
  })

  res.json(updated)
})

export default router
