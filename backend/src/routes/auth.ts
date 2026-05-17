import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { signToken, verifyToken, buildAuthCookie, clearAuthCookie } from '../lib/auth.js'
import { loginSchema, signupSchema } from '../lib/validations.js'
import { prisma } from '../lib/db.js'
import type { AuthRequest } from '../types/index.js'

const router = Router()
const isProduction = process.env.NODE_ENV === 'production'

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors })
    return
  }

  const { email, password } = result.data
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }

  const token = await signToken({ sub: user.id, email: user.email, name: user.name, role: user.role })
  res.setHeader('Set-Cookie', buildAuthCookie(token, isProduction))
  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
})

// POST /api/auth/signup
router.post('/signup', async (req: Request, res: Response) => {
  const result = signupSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors })
    return
  }

  const { name, email, password } = result.data
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    res.status(409).json({ error: 'Email already registered' })
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role: 'USER' },
  })

  // Create an empty portfolio for the new user
  await prisma.portfolio.create({
    data: { userId: user.id, totalValue: 0, riskScore: 50, monthlyGain: 0 },
  })

  const token = await signToken({ sub: user.id, email: user.email, name: user.name, role: user.role })
  res.setHeader('Set-Cookie', buildAuthCookie(token, isProduction))
  res.status(201).json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
})

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response) => {
  res.setHeader('Set-Cookie', clearAuthCookie(isProduction))
  res.json({ success: true })
})

// GET /api/auth/me
router.get('/me', async (req: Request, res: Response) => {
  const token =
    (req as AuthRequest).cookies?.['novavest-token'] ??
    req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  const payload = await verifyToken(token)
  if (!payload) {
    res.status(401).json({ error: 'Invalid token' })
    return
  }
  res.json({ user: { id: payload.sub, email: payload.email, name: payload.name, role: payload.role } })
})

export default router
