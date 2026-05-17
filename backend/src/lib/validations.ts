import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const profileUpdateSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
})

export const createTransactionSchema = z.object({
  type: z.enum(['BUY', 'SELL']),
  symbol: z.string().min(1).max(10).toUpperCase(),
  name: z.string().min(1),
  shares: z.number().positive(),
  price: z.number().positive(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
