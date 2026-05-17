import { jwtVerify } from 'jose'
import type { JWTPayload } from '@/types'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'novavest-demo-secret-key-32chars-min'
)

export const COOKIE_NAME = 'novavest-token'

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}
