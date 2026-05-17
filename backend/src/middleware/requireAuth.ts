import { Response, NextFunction } from 'express'
import { verifyToken } from '../lib/auth.js'
import type { AuthRequest } from '../types/index.js'

const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id)

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token =
    req.cookies?.['novavest-token'] ??
    req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const payload = await verifyToken(token)
  if (!payload || !isValidObjectId(payload.sub)) {
    res.status(401).json({ error: 'Invalid or expired token' })
    return
  }

  req.user = payload
  next()
}

export async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  await requireAuth(req, res, () => {
    if (req.user?.role !== 'ADMIN') {
      res.status(403).json({ error: 'Forbidden: Admins only' })
      return
    }
    next()
  })
}
