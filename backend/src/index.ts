import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import transactionRoutes from './routes/transactions.js'
import profileRoutes from './routes/profile.js'
import aiRoutes from './routes/ai.js'

const app = express()
const PORT = parseInt(process.env.PORT ?? '4000', 10)
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:3000'

// CORS — allow frontend origin with credentials (cookies)
const ALLOWED_ORIGINS = [
  FRONTEND_URL,
  'https://nova-vest-ai.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true)
      } else {
        callback(null, true) // allow all origins for demo deployment
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Handle preflight requests
app.options('*', cors())

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'NovaVest API', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/ai', aiRoutes)

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Error]', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`✅ NovaVest Backend running on http://localhost:${PORT}`)
  console.log(`   Accepting requests from: ${FRONTEND_URL}`)
  console.log(`   Environment: ${process.env.NODE_ENV ?? 'development'}`)
})

export default app
