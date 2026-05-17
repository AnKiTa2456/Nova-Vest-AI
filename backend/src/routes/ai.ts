import { Router, Response } from 'express'
import { requireAuth } from '../middleware/requireAuth.js'
import { recommendations } from '../lib/dummy-data.js'
import type { AuthRequest } from '../types/index.js'

const router = Router()

// GET /api/ai/recommendations
router.get('/recommendations', requireAuth, (_req: AuthRequest, res: Response) => {
  res.json({
    recommendations,
    generatedAt: new Date().toISOString(),
    modelVersion: 'NovaVest-AI v2.1',
  })
})

export default router
