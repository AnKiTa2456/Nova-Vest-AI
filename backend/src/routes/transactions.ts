import { Router, Response } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import { prisma } from '../lib/db.js'
import { createTransactionSchema } from '../lib/validations.js'
import type { AuthRequest } from '../types/index.js'

const router = Router()

// GET /api/transactions
router.get('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const userId = req.user!.sub
  const page = parseInt((req.query.page as string) ?? '1')
  const limit = parseInt((req.query.limit as string) ?? '10')
  const type = req.query.type as string | undefined

  const where: { userId: string; type?: 'BUY' | 'SELL' } = { userId }
  if (type === 'BUY' || type === 'SELL') where.type = type

  const [data, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.transaction.count({ where }),
  ])

  res.json({ data, total, page, limit })
})

// POST /api/transactions
router.post('/', requireAuth, async (req: AuthRequest, res: Response) => {
  const result = createTransactionSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors })
    return
  }

  const userId = req.user!.sub
  const { type, symbol, name, shares, price } = result.data

  const tx = await prisma.transaction.create({
    data: { userId, type, symbol, name, shares, price, total: shares * price, status: 'COMPLETED' },
  })

  res.status(201).json(tx)
})

export default router
