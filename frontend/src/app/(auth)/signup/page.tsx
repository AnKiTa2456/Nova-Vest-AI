'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2, Check } from 'lucide-react'
import { toast } from 'sonner'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const passwordRequirements = [
    { label: '8+ characters', met: form.password.length >= 8 },
    { label: 'One number', met: /\d/.test(form.password) },
    { label: 'One letter', met: /[a-zA-Z]/.test(form.password) },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    if (!form.name) return setErrors({ name: 'Name is required' })
    if (!form.email) return setErrors({ email: 'Email is required' })
    if (form.password.length < 8) return setErrors({ password: 'Password must be at least 8 characters' })
    if (form.password !== form.confirmPassword) return setErrors({ confirmPassword: "Passwords don't match" })

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error ?? 'Signup failed')
        if (data.details) {
          const fieldErrors: Record<string, string> = {}
          Object.entries(data.details).forEach(([k, v]) => {
            fieldErrors[k] = (v as string[])[0]
          })
          setErrors(fieldErrors)
        }
      } else {
        toast.success('Account created! Welcome to NovaVest AI.')
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
      <p className="text-gray-400 mb-8">Start your free 14-day trial. No credit card required.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`input-dark pl-10 ${errors.name ? 'border-red-500/60' : ''}`}
              placeholder="Alex Morgan"
            />
          </div>
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

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
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`input-dark pl-10 pr-10 ${errors.password ? 'border-red-500/60' : ''}`}
              placeholder="Min. 8 characters"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
          {form.password && (
            <div className="flex gap-3 mt-2">
              {passwordRequirements.map((req) => (
                <span key={req.label} className={`flex items-center gap-1 text-xs ${req.met ? 'text-emerald-400' : 'text-gray-600'}`}>
                  <Check size={10} strokeWidth={3} />
                  {req.label}
                </span>
              ))}
            </div>
          )}
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Confirm Password</label>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className={`input-dark pl-10 ${errors.confirmPassword ? 'border-red-500/60' : ''}`}
              placeholder="Repeat password"
            />
          </div>
          {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full glow-button py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-gray-600 text-xs mt-6 leading-relaxed">
        By signing up you agree to our{' '}
        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
        {' '}and{' '}
        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>.
      </p>

      <p className="text-center text-gray-500 text-sm mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </motion.div>
  )
}
