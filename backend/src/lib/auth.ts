import { SignJWT, jwtVerify } from 'jose'
import type { JWTPayload } from '../types/index.js'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'novavest-demo-secret-key-32chars-min'
)
const COOKIE_NAME = 'novavest-token'
const EXPIRY = '7d'

export async function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(EXPIRY)
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export function buildAuthCookie(token: string, isProduction: boolean) {
  const maxAge = 60 * 60 * 24 * 7
  const sameSite = isProduction ? 'None' : 'Lax'
  const cookieParts = [
    `${COOKIE_NAME}=${token}`,
    'Path=/',
    `Max-Age=${maxAge}`,
    'HttpOnly',
    `SameSite=${sameSite}`,
  ]
  if (isProduction) cookieParts.push('Secure')
  return cookieParts.join('; ')
}

export function clearAuthCookie(isProduction: boolean) {
  const sameSite = isProduction ? 'None' : 'Lax'
  const parts = [
    `${COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
    'HttpOnly',
    `SameSite=${sameSite}`,
  ]
  if (isProduction) parts.push('Secure')
  return parts.join('; ')
}

export const DEMO_USER = {
  id: 'demo-user-001',
  email: 'demo@novavest.ai',
  name: 'Alex Morgan',
  role: 'USER' as const,
  passwordHash: '$2a$10$placeholder.hash.demo',
}

export const DEMO_ADMIN = {
  id: 'admin-user-001',
  email: 'admin@novavest.ai',
  name: 'Admin User',
  role: 'ADMIN' as const,
  passwordHash: '$2a$10$placeholder.hash.admin',
}

export const DEMO_PASSWORD = 'demo1234'
export const ADMIN_PASSWORD = 'admin1234'
