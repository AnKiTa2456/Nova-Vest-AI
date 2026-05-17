'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (res.ok) {
        const data = await res.json()
        setState({ user: data.user, loading: false, error: null })
      } else {
        setState({ user: null, loading: false, error: null })
      }
    } catch {
      setState({ user: null, loading: false, error: null })
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setState({ user: null, loading: false, error: null })
    router.push('/login')
  }, [router])

  return { ...state, logout, refetch: fetchUser }
}
