'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    if (!form.email) return setErrors({ email: 'Email is required' })
    if (!form.password) return setErrors({ password: 'Password is required' })

    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error ?? 'Login failed')
        setErrors({ form: data.error })
      } else {
        toast.success(`Welcome back, ${data.user.name}!`)
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function fillDemo(role: 'user' | 'admin') {
    setForm({
      email: role === 'admin' ? 'admin@novavest.ai' : 'demo@novavest.ai',
      password: role === 'admin' ? 'admin1234' : 'demo1234',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
      <p className="text-gray-400 mb-8">Sign in to your NovaVest AI account</p>

      {/* Demo shortcuts */}
      <div className="flex gap-3 mb-6">
        <button
          type="button"
          onClick={() => fillDemo('user')}
          className="flex-1 py-2.5 rounded-xl glass border border-indigo-500/30 text-indigo-400 text-xs font-medium hover:border-indigo-500/60 transition-all"
        >
          Demo User
        </button>
        <button
          type="button"
          onClick={() => fillDemo('admin')}
          className="flex-1 py-2.5 rounded-xl glass border border-purple-500/30 text-purple-400 text-xs font-medium hover:border-purple-500/60 transition-all"
        >
          Demo Admin
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`input-dark pl-10 ${errors.email ? 'border-red-500/60' : ''}`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-gray-400">Password</label>
            <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`input-dark pl-10 pr-10 ${errors.password ? 'border-red-500/60' : ''}`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>

        {errors.form && (
          <div className="py-3 px-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {errors.form}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full glow-button py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Create one free
        </Link>
      </p>
    </motion.div>
  )
}
