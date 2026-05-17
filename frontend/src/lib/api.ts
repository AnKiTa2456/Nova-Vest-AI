import { cookies } from 'next/headers'

// Server-side fetch: reads JWT from cookies and passes as Bearer token.
// Used in Next.js server components (dashboard pages).
export async function serverFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const cookieStore = await cookies()
  const token = cookieStore.get('novavest-token')?.value

  const baseUrl = process.env.API_URL ?? 'http://localhost:4000'

  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
    throw new Error(err.error ?? `API Error ${res.status}`)
  }

  return res.json() as Promise<T>
}

// The public API URL used by client-side code (browser fetch).
// In development, /api/* is proxied to the backend via next.config.js rewrites.
// In production (Vercel), the same rewrite rule forwards to the Render backend.
export const clientApiBase = '/api'
