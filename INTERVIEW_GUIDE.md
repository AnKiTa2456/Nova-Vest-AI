# NovaVest AI — Complete Technical Interview Guide

> Full Q&A reference for every part of the project. Covers setup, architecture, APIs, database, frontend, backend, and scenario-based interview questions.

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Tech Stack — Why Each Tool](#2-tech-stack--why-each-tool)
3. [Folder Structure Explained](#3-folder-structure-explained)
4. [Setup Commands — Every Single One](#4-setup-commands--every-single-one)
5. [Database — MongoDB + Prisma](#5-database--mongodb--prisma)
6. [Backend — Express APIs](#6-backend--express-apis)
7. [Middleware Explained](#7-middleware-explained)
8. [Authentication — JWT Flow](#8-authentication--jwt-flow)
9. [Frontend — Next.js](#9-frontend--nextjs)
10. [How Frontend Connects to Backend](#10-how-frontend-connects-to-backend)
11. [Recharts — How It Works](#11-recharts--how-it-works)
12. [Framer Motion — Animations](#12-framer-motion--animations)
13. [What Data Is Stored in DB](#13-what-data-is-stored-in-db)
14. [Interview Questions & Answers](#14-interview-questions--answers)
15. [Scenario-Based Questions](#15-scenario-based-questions)

---

## 1. Project Overview

**Q: What is NovaVest AI?**

A: NovaVest AI is a full-stack AI-powered investment intelligence platform. It is a fintech SaaS application that allows users to:
- View their investment portfolio with real-time metrics
- Get AI-generated investment recommendations
- Track buy/sell transactions
- Analyze portfolio performance with charts
- Manage account settings

**Q: What type of application is this?**

A: It is a **monorepo** with two independent deployable services:
- **Frontend** → Next.js 14 (deployed on Vercel)
- **Backend** → Node.js + Express (deployed on Render)
- **Database** → MongoDB Atlas (cloud)

**Q: What is the live URL?**

A:
- Frontend: https://nova-vest-ai.vercel.app
- Backend: https://nova-vest-ai.onrender.com
- GitHub: https://github.com/AnKiTa2456/Nova-Vest-AI

---

## 2. Tech Stack — Why Each Tool

**Q: Why Next.js 14 for frontend?**

A: Next.js 14 provides:
- **App Router** — file-based routing with layouts
- **Server Components** — fetch data on server, no loading spinner
- **Edge Middleware** — protect routes before page renders
- **API Rewrites** — proxy `/api/*` to backend, eliminating CORS
- **TypeScript support** out of the box

**Q: Why Express.js for backend instead of Next.js API Routes?**

A: Separate Express backend gives:
- Independent deployment and scaling
- Cleaner separation of concerns
- Can be consumed by mobile apps, other clients
- Easier to add WebSocket, queues, microservices later

**Q: Why MongoDB instead of PostgreSQL?**

A: MongoDB suits this project because:
- Flexible schema for investment data (different asset types)
- Native JSON documents match TypeScript interfaces
- Atlas free tier available
- Prisma supports MongoDB with type safety

**Q: Why Prisma instead of Mongoose?**

A: Prisma provides:
- Full TypeScript type safety — auto-generated types from schema
- Schema validation at compile time
- Better IDE autocomplete
- Easier migrations with `prisma db push`

**Q: Why JWT instead of sessions?**

A: JWT is stateless:
- No server-side session storage needed
- Works across multiple servers
- Can be verified in Edge Runtime (Next.js middleware)
- Stored in httpOnly cookie — XSS proof

**Q: Why Zod for validation?**

A: Zod provides runtime type validation:
- Validates request body before processing
- Returns detailed field-level errors
- TypeScript types inferred from schema automatically

---

## 3. Folder Structure Explained

```
Nova-Vest-AI/
│
├── frontend/                        ← Next.js 14 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/              ← Route group (no layout effect)
│   │   │   │   ├── layout.tsx       ← Auth pages shared layout
│   │   │   │   ├── login/page.tsx   ← /login route
│   │   │   │   └── signup/page.tsx  ← /signup route
│   │   │   │
│   │   │   ├── (dashboard)/         ← Protected route group
│   │   │   │   ├── layout.tsx       ← Sidebar + main layout
│   │   │   │   ├── dashboard/page.tsx
│   │   │   │   ├── analytics/page.tsx
│   │   │   │   ├── settings/page.tsx
│   │   │   │   └── admin/page.tsx
│   │   │   │
│   │   │   ├── session-reset/
│   │   │   │   └── route.ts         ← Clears auth cookie + redirect
│   │   │   │
│   │   │   ├── page.tsx             ← / (Landing page)
│   │   │   ├── layout.tsx           ← Root layout (fonts, providers)
│   │   │   └── globals.css          ← Global styles + Tailwind
│   │   │
│   │   ├── components/
│   │   │   ├── landing/             ← Navbar, Hero, Features, etc.
│   │   │   └── dashboard/           ← Sidebar, Charts, Tables, etc.
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.ts           ← Client-side auth state hook
│   │   │
│   │   ├── lib/
│   │   │   ├── api.ts               ← serverFetch() for server components
│   │   │   ├── auth.ts              ← verifyToken() using jose
│   │   │   ├── utils.ts             ← formatCurrency, formatPercent
│   │   │   └── constants.ts         ← Static display data
│   │   │
│   │   ├── middleware.ts             ← Edge Runtime route guard
│   │   └── types/index.ts           ← TypeScript interfaces
│   │
│   ├── next.config.js               ← API proxy rewrites
│   ├── tailwind.config.ts           ← Custom colors, animations
│   └── .env.local                   ← API_URL, JWT_SECRET
│
├── backend/                         ← Express.js API
│   ├── src/
│   │   ├── index.ts                 ← App entry, CORS, routes mount
│   │   │
│   │   ├── routes/                  ← Route handlers (controllers)
│   │   │   ├── auth.ts              ← /api/auth/*
│   │   │   ├── dashboard.ts         ← /api/dashboard/*
│   │   │   ├── transactions.ts      ← /api/transactions/*
│   │   │   ├── profile.ts           ← /api/profile/*
│   │   │   └── ai.ts               ← /api/ai/*
│   │   │
│   │   ├── middleware/
│   │   │   └── requireAuth.ts       ← JWT verification middleware
│   │   │
│   │   └── lib/
│   │       ├── auth.ts              ← signToken, verifyToken, cookie helpers
│   │       ├── db.ts               ← Prisma client singleton
│   │       ├── validations.ts       ← Zod schemas
│   │       ├── dummy-data.ts        ← Static data (charts, AI recs)
│   │       └── types/index.ts       ← TypeScript types
│   │
│   ├── prisma/
│   │   ├── schema.prisma            ← MongoDB models
│   │   └── seed.ts                  ← Demo data seeder
│   │
│   ├── .env                         ← DATABASE_URL, JWT_SECRET
│   └── tsconfig.json
│
└── package.json                     ← Root scripts (dev, install:all)
```

**Q: What is a Route Group in Next.js?**

A: Folders wrapped in `()` like `(auth)` and `(dashboard)` are route groups. They:
- Do NOT affect the URL path
- Allow different layouts for different sections
- `(auth)` has a centered card layout
- `(dashboard)` has sidebar + main content layout

---

## 4. Setup Commands — Every Single One

**Q: How do you set up this project from scratch?**

```bash
# 1. Clone repo
git clone https://github.com/AnKiTa2456/Nova-Vest-AI.git
cd Nova-Vest-AI

# 2. Install all dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Set up backend env
# Create backend/.env with:
DATABASE_URL="mongodb://localhost:27017/novavest"
JWT_SECRET="novavest-demo-secret-key-32chars-min"
PORT=4000
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"

# 4. Set up frontend env
# Create frontend/.env.local with:
API_URL="http://localhost:4000"
JWT_SECRET="novavest-demo-secret-key-32chars-min"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# 5. Start local MongoDB (if using local)
brew services start mongodb-community@7.0

# 6. Push schema to MongoDB
cd backend && npm run db:push

# 7. Seed demo data
npm run db:seed

# 8. Start backend (port 4000)
npm run dev

# 9. Start frontend (port 3000) — new terminal
cd frontend && npm run dev
```

**Q: What does each npm script do?**

| Script | Command | What it does |
|---|---|---|
| `npm run dev` | `tsx watch src/index.ts` | Start backend with hot reload |
| `npm run build` | `prisma generate && tsc` | Generate Prisma client + compile TS |
| `npm run start` | `node dist/index.js` | Run compiled production server |
| `npm run db:push` | `prisma db push` | Sync schema to MongoDB |
| `npm run db:seed` | `tsx prisma/seed.ts` | Insert demo data |
| `npm run db:studio` | `prisma studio` | Open visual DB browser at :5555 |

---

## 5. Database — MongoDB + Prisma

**Q: What is Prisma?**

A: Prisma is an ORM (Object Relational Mapper) — it lets you write TypeScript code instead of raw MongoDB queries. It auto-generates TypeScript types from your schema.

**Q: Where is the Prisma schema defined?**

A: `backend/prisma/schema.prisma`

**Q: Explain each model in the schema.**

```prisma
// User — stores account credentials
model User {
  id           String        @id @default(auto()) @map("_id") @db.ObjectId
  email        String        @unique
  name         String
  passwordHash String        // bcrypt hash, never plain text
  role         Role          @default(USER)  // USER or ADMIN
  avatar       String?       // optional profile picture URL
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  portfolio    Portfolio?    // one user → one portfolio
  transactions Transaction[] // one user → many transactions
}

// Portfolio — user's investment portfolio
model Portfolio {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  userId      String    @unique @db.ObjectId  // foreign key to User
  totalValue  Float     @default(0)           // total portfolio value in USD
  riskScore   Int       @default(50)          // 0-100 risk rating
  monthlyGain Float     @default(0)           // gain this month in USD
  holdings    Holding[]                        // one portfolio → many holdings
}

// Holding — individual asset in portfolio
model Holding {
  id           String    @id @default(auto()) @map("_id") @db.ObjectId
  portfolioId  String    @db.ObjectId
  symbol       String    // e.g. AAPL, BTC, SPY
  name         String    // e.g. Apple Inc.
  assetType    AssetType // STOCK | CRYPTO | ETF | BOND
  shares       Float     // number of shares/coins owned
  avgPrice     Float     // average purchase price
  currentPrice Float     // current market price
  allocation   Float     // % of portfolio this asset represents
}

// Transaction — buy/sell records
model Transaction {
  id        String          @id @default(auto()) @map("_id") @db.ObjectId
  userId    String          @db.ObjectId
  type      TransactionType // BUY | SELL
  symbol    String
  name      String
  shares    Float
  price     Float           // price per share at time of trade
  total     Float           // shares × price
  status    TxStatus        @default(COMPLETED) // PENDING | COMPLETED | FAILED
  createdAt DateTime        @default(now())
}
```

**Q: Why use `@default(auto()) @map("_id") @db.ObjectId`?**

A: This is MongoDB-specific Prisma syntax:
- `@default(auto())` — MongoDB auto-generates a 24-char hex ObjectId
- `@map("_id")` — maps to MongoDB's `_id` field
- `@db.ObjectId` — tells Prisma this is a MongoDB ObjectId type

**Q: How does Prisma connect to MongoDB?**

A: Via `backend/src/lib/db.ts`:
```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ['error', 'warn'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

The singleton pattern prevents creating multiple connections in development (hot reload creates new instances).

**Q: What data is stored in MongoDB?**

| Collection | What's stored | Example |
|---|---|---|
| `User` | Login credentials, name, role | `{email: "demo@novavest.ai", passwordHash: "$2a$...", role: "USER"}` |
| `Portfolio` | Portfolio value, risk score | `{totalValue: 247832.54, riskScore: 72}` |
| `Holding` | Asset positions | `{symbol: "AAPL", shares: 45, avgPrice: 152.3}` |
| `Transaction` | Trade history | `{type: "BUY", symbol: "NVDA", shares: 3, price: 875.4}` |

---

## 6. Backend — Express APIs

**Q: Where are the APIs written?**

A: In `backend/src/routes/` — one file per resource:

| File | Routes | Purpose |
|---|---|---|
| `auth.ts` | POST /login, /signup, /logout, GET /me | Authentication |
| `dashboard.ts` | GET /stats | Portfolio + holdings + transactions |
| `transactions.ts` | GET /, POST / | List and create transactions |
| `profile.ts` | GET /, PATCH / | User profile |
| `ai.ts` | GET /recommendations | AI investment signals |

**Q: How are routes mounted in Express?**

A: In `backend/src/index.ts`:
```typescript
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/ai', aiRoutes)
```
So `authRoutes` handles everything under `/api/auth/*`.

**Q: Walk me through the login API.**

```typescript
// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  // 1. Validate input with Zod
  const result = loginSchema.safeParse(req.body)
  if (!result.success) {
    res.status(400).json({ error: 'Validation failed', details: result.error.flatten().fieldErrors })
    return
  }

  // 2. Find user in MongoDB
  const { email, password } = result.data
  const user = await prisma.user.findUnique({ where: { email } })

  // 3. Verify password with bcrypt
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }

  // 4. Create JWT token
  const token = await signToken({ sub: user.id, email: user.email, name: user.name, role: user.role })

  // 5. Set httpOnly cookie
  res.setHeader('Set-Cookie', buildAuthCookie(token, isProduction))

  // 6. Return user data
  res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } })
})
```

**Q: Walk me through the signup API.**

```typescript
// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  // 1. Validate with Zod (name, email, password, confirmPassword)
  // 2. Check email not already taken → 409 if exists
  // 3. Hash password: bcrypt.hash(password, 10)
  // 4. Create User in MongoDB: prisma.user.create()
  // 5. Create empty Portfolio for user: prisma.portfolio.create()
  // 6. Sign JWT → set cookie → return user
})
```

**Q: How does the dashboard API work?**

```typescript
// GET /api/dashboard/stats
router.get('/stats', requireAuth, async (req, res) => {
  const userId = req.user.sub  // from JWT

  // Parallel queries to MongoDB
  const [portfolio, transactions] = await Promise.all([
    prisma.portfolio.findUnique({
      where: { userId },
      include: { holdings: { orderBy: { allocation: 'desc' } } }
    }),
    prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10
    })
  ])

  // Return combined response
  res.json({ portfolio, holdings, transactions, recommendations, portfolioHistory })
})
```

---

## 7. Middleware Explained

**Q: What is middleware in Express?**

A: Middleware is a function that runs between the request and the response. It has access to `req`, `res`, and `next`.

**Q: What middleware does this project use?**

| Middleware | Purpose |
|---|---|
| `cors()` | Allow cross-origin requests from frontend |
| `cookieParser()` | Parse cookies from request headers |
| `express.json()` | Parse JSON request body |
| `requireAuth` | Verify JWT before protected routes |

**Q: Explain the `requireAuth` middleware.**

```typescript
// backend/src/middleware/requireAuth.ts
const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id)

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  // 1. Get token from cookie OR Authorization header
  const token =
    req.cookies?.['novavest-token'] ??
    req.headers.authorization?.replace('Bearer ', '')

  // 2. No token → 401
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  // 3. Verify JWT signature + expiry
  const payload = await verifyToken(token)

  // 4. Check payload exists and sub is valid MongoDB ObjectId
  if (!payload || !isValidObjectId(payload.sub)) {
    res.status(401).json({ error: 'Invalid or expired token' })
    return
  }

  // 5. Attach user to request object
  req.user = payload

  // 6. Pass to next handler
  next()
}
```

**Q: Why does requireAuth accept both cookie and Bearer token?**

A: Two different callers:
- **Browser** sends the httpOnly cookie automatically
- **Server components** (Next.js) can't read httpOnly cookies directly, so they read the cookie server-side and pass it as a `Authorization: Bearer <token>` header

**Q: What is the `requireAdmin` middleware?**

```typescript
export async function requireAdmin(req, res, next) {
  await requireAuth(req, res, () => {
    if (req.user?.role !== 'ADMIN') {
      res.status(403).json({ error: 'Forbidden: Admins only' })
      return
    }
    next()
  })
}
```
It first runs `requireAuth`, then additionally checks `role === 'ADMIN'`.

---

## 8. Authentication — JWT Flow

**Q: How does JWT authentication work in this project?**

```
SIGNUP:
User fills form → POST /api/auth/signup
→ Validate with Zod
→ Hash password with bcrypt (cost factor 10)
→ prisma.user.create() → saves to MongoDB
→ prisma.portfolio.create() → empty portfolio
→ jose.SignJWT({ sub: userId, email, name, role })
→ Set-Cookie: novavest-token=<JWT>; HttpOnly
→ Redirect to /dashboard

LOGIN:
User fills form → POST /api/auth/login
→ prisma.user.findUnique({ where: { email } })
→ bcrypt.compare(password, user.passwordHash)
→ Sign JWT → Set cookie → Redirect to /dashboard

EVERY PROTECTED REQUEST:
Browser sends cookie automatically
→ requireAuth reads cookie
→ jose.jwtVerify() checks signature + expiry
→ Attaches payload to req.user
→ Route handler uses req.user.sub as userId

LOGOUT:
POST /api/auth/logout
→ Set-Cookie: novavest-token=; Max-Age=0 (clears cookie)
→ Redirect to /login
```

**Q: Where is the JWT secret stored?**

A: In environment variables:
- `backend/.env` → `JWT_SECRET`
- `frontend/.env.local` → `JWT_SECRET` (for middleware verification)
- Never committed to GitHub (in `.gitignore`)

**Q: What is inside the JWT payload?**

```typescript
{
  sub: "6a09bb2f2f1e9c58699f2006",  // MongoDB ObjectId (user ID)
  email: "demo@novavest.ai",
  name: "Alex Morgan",
  role: "USER",
  iat: 1779024349,  // issued at (Unix timestamp)
  exp: 1779629149   // expires at (7 days later)
}
```

**Q: How does Next.js middleware protect routes?**

```typescript
// frontend/src/middleware.ts
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('novavest-token')?.value

  // Protected routes need valid token
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verify token signature
  const payload = await verifyToken(token)
  if (!payload) {
    const res = NextResponse.redirect(new URL('/login', request.url))
    res.cookies.delete('novavest-token')  // clear bad cookie
    return res
  }

  // Admin-only routes
  if (pathname.startsWith('/admin') && payload.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
}
```

This runs on **Edge Runtime** — before the page even renders.

---

## 9. Frontend — Next.js

**Q: What is the App Router in Next.js 14?**

A: The App Router uses the `app/` directory. Each folder with a `page.tsx` becomes a route:
- `app/page.tsx` → `/`
- `app/(auth)/login/page.tsx` → `/login`
- `app/(dashboard)/dashboard/page.tsx` → `/dashboard`

**Q: What is the difference between Server and Client components?**

| Server Component | Client Component |
|---|---|
| Default in App Router | Needs `'use client'` at top |
| Runs on server | Runs in browser |
| Can fetch data directly | Uses hooks (useState, useEffect) |
| Cannot use browser APIs | Can use browser APIs |
| Cannot use state/effects | Can handle user interactions |

**Q: Which components are Server vs Client in this project?**

| Component | Type | Reason |
|---|---|---|
| `dashboard/page.tsx` | Server | Fetches data from backend on render |
| `analytics/page.tsx` | Server | Fetches auth check |
| `settings/page.tsx` | Client | Uses useState for tabs |
| `admin/page.tsx` | Client | Uses useState |
| `login/page.tsx` | Client | Uses form state |
| `Sidebar.tsx` | Client | Uses useAuth hook |
| `Header.tsx` | Client | Uses useAuth hook |

**Q: How does `serverFetch` work?**

```typescript
// frontend/src/lib/api.ts
export async function serverFetch<T>(path: string): Promise<T> {
  // Read JWT cookie on server side
  const cookieStore = await cookies()
  const token = cookieStore.get('novavest-token')?.value

  // Direct call to backend (bypasses Next.js proxy)
  const res = await fetch(`${process.env.API_URL}${path}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,  // pass as Bearer
    }
  })

  if (!res.ok) throw new Error(`API Error ${res.status}`)
  return res.json()
}
```

**Q: What is `useAuth` hook?**

```typescript
// frontend/src/hooks/useAuth.ts
export function useAuth() {
  const [state, setState] = useState({ user: null, loading: true })

  useEffect(() => {
    // Call /api/auth/me to get current user
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => setState({ user: data?.user, loading: false }))
  }, [])

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return { ...state, logout }
}
```

Used in `Sidebar.tsx` and `Header.tsx` to show user name and handle logout.

---

## 10. How Frontend Connects to Backend

**Q: How does the frontend connect to the backend?**

A: Via **Next.js Rewrites** — configured in `frontend/next.config.js`:

```javascript
async rewrites() {
  const backendUrl = process.env.API_URL ?? 'http://localhost:4000'
  return [
    {
      source: '/api/:path*',
      destination: `${backendUrl}/api/:path*`,
    }
  ]
}
```

**Q: What happens when the browser calls `/api/auth/login`?**

```
Browser
  → POST https://nova-vest-ai.vercel.app/api/auth/login
  
Vercel (Next.js rewrite)
  → forwards to https://nova-vest-ai.onrender.com/api/auth/login
  
Render (Express)
  → validates → queries MongoDB → signs JWT
  → returns: { user: {...} } + Set-Cookie header
  
Vercel
  → forwards response back to browser
  → browser stores cookie under vercel.app domain
```

**Q: Why use a proxy instead of calling the backend directly from browser?**

A: Direct browser → Render calls would have:
- **CORS issues** — browser blocks cross-origin requests
- **Cookie issues** — cookies set by Render would be under `onrender.com` domain, not `vercel.app` — browsers block third-party cookies

The proxy makes everything appear **same-origin** to the browser.

**Q: How does the environment variable `API_URL` work?**

| Environment | `API_URL` value |
|---|---|
| Local development | `http://localhost:4000` |
| Vercel production | `https://nova-vest-ai.onrender.com` |

The Next.js rewrite uses `API_URL` to know where to proxy requests.

---

## 11. Recharts — How It Works

**Q: What is Recharts?**

A: Recharts is a React charting library built on D3.js. It provides declarative chart components.

**Q: How is the Portfolio Chart built?**

```typescript
// frontend/src/components/dashboard/PortfolioChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Data format expected by Recharts
const data = [
  { date: 'Jun 23', value: 178420, benchmark: 175000 },
  { date: 'Jul 23', value: 185340, benchmark: 178200 },
  // ...
]

export default function PortfolioChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"        // which key from data object to plot
          stroke="#6366f1"       // line color
          strokeWidth={2}
          dot={false}            // no dots on data points
        />
        <Line
          dataKey="benchmark"
          stroke="#22d3ee"
          strokeDasharray="5 5"  // dashed line for benchmark
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
```

**Q: How is the Asset Allocation (donut) chart built?**

```typescript
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Stocks', value: 44.7, color: '#6366f1' },
  { name: 'Crypto', value: 35.1, color: '#a855f7' },
  { name: 'ETFs',   value: 16.9, color: '#22d3ee' },
  { name: 'Bonds',  value: 3.3,  color: '#10b981' },
]

<PieChart>
  <Pie
    data={data}
    innerRadius={60}    // makes it a donut
    outerRadius={80}
    dataKey="value"
  >
    {data.map((entry, index) => (
      <Cell key={index} fill={entry.color} />  // color each segment
    ))}
  </Pie>
  <Tooltip />
</PieChart>
```

**Q: Where does the chart data come from?**

A:
- **Portfolio Chart** (line chart) → `portfolioHistory` array from `/api/dashboard/stats` response
- **Asset Allocation** (donut) → static data in `frontend/src/lib/constants.ts`
- **Analytics Charts** → static data in `AnalyticsCharts.tsx`

---

## 12. Framer Motion — Animations

**Q: What is Framer Motion?**

A: Framer Motion is a React animation library. It adds smooth enter/exit animations, hover effects, and scroll animations.

**Q: How is it used in this project?**

```typescript
import { motion } from 'framer-motion'

// Fade in + slide up on page load
<motion.div
  initial={{ opacity: 0, y: 20 }}   // start state
  animate={{ opacity: 1, y: 0 }}    // end state
  transition={{ duration: 0.5 }}    // animation duration
>
  Content here
</motion.div>

// Stagger children animations
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div variants={{ hidden: { y: 20 }, visible: { y: 0 } }}>
      {item}
    </motion.div>
  ))}
</motion.div>

// Hover animation
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

---

## 13. What Data Is Stored in DB

**Q: What exactly is stored in MongoDB Atlas?**

### User Collection
```json
{
  "_id": "6a09bb2f2f1e9c58699f2006",
  "email": "demo@novavest.ai",
  "name": "Alex Morgan",
  "passwordHash": "$2a$10$hashedpassword...",
  "role": "USER",
  "avatar": null,
  "createdAt": "2026-05-17T11:38:00.000Z",
  "updatedAt": "2026-05-17T11:38:00.000Z"
}
```

### Portfolio Collection
```json
{
  "_id": "6a09bb2f2f1e9c58699f2008",
  "userId": "6a09bb2f2f1e9c58699f2006",
  "totalValue": 247832.54,
  "riskScore": 72,
  "monthlyGain": 12398.54,
  "createdAt": "2026-05-17T11:38:00.000Z",
  "updatedAt": "2026-05-17T11:38:00.000Z"
}
```

### Holding Collection
```json
{
  "_id": "6a09bb2f...",
  "portfolioId": "6a09bb2f2f1e9c58699f2008",
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "assetType": "STOCK",
  "shares": 45,
  "avgPrice": 152.3,
  "currentPrice": 189.84,
  "allocation": 34.4
}
```

### Transaction Collection
```json
{
  "_id": "6a09bb2f...",
  "userId": "6a09bb2f2f1e9c58699f2006",
  "type": "BUY",
  "symbol": "NVDA",
  "name": "NVIDIA Corp.",
  "shares": 3,
  "price": 875.4,
  "total": 2626.2,
  "status": "COMPLETED",
  "createdAt": "2026-05-17T09:38:00.000Z"
}
```

**Q: What data is NOT stored in DB (static/dummy)?**

| Data | Location | Reason |
|---|---|---|
| AI Recommendations | `dummy-data.ts` | No real AI model |
| Portfolio history chart | `dummy-data.ts` | No historical price tracking |
| Activity timeline | `dummy-data.ts` | Would need event sourcing |
| Asset allocation chart | `constants.ts` | Derived from holdings (static for now) |

---

## 14. Interview Questions & Answers

**Q: Explain your project in 2 minutes.**

A: NovaVest AI is a fintech SaaS platform that simulates an AI investment dashboard. It has a Next.js 14 frontend on Vercel and an Express.js backend on Render, connected to MongoDB Atlas. Users can sign up, log in with JWT auth, view their portfolio with charts and metrics, see AI investment recommendations, and track buy/sell transactions. The admin role has access to a user management panel. I built it as a full-stack assignment covering frontend, backend, database, auth, and deployment.

**Q: How did you handle authentication?**

A: I used JWT stored in httpOnly cookies. When a user logs in, the Express backend validates credentials against bcrypt-hashed passwords in MongoDB, signs a JWT with jose, and sets it as an httpOnly cookie. On every protected page, Next.js Edge middleware verifies the JWT before rendering. Server components read the cookie and pass it as a Bearer token to the backend. This approach is XSS-safe because JavaScript can't access httpOnly cookies.

**Q: What is the difference between `httpOnly` and regular cookies?**

A: Regular cookies can be accessed via `document.cookie` in JavaScript — vulnerable to XSS attacks. `httpOnly` cookies are automatically sent with requests but cannot be read by JavaScript, making them safe for storing sensitive tokens.

**Q: What is CORS and how did you handle it?**

A: CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests from one domain to another. I solved it by using Next.js rewrites to proxy all `/api/*` calls through the frontend server — so the browser only ever talks to `vercel.app`, not `onrender.com` directly. This makes everything same-origin from the browser's perspective.

**Q: What is the difference between `authentication` and `authorization`?**

A:
- **Authentication** = verifying WHO you are (login with email/password)
- **Authorization** = verifying WHAT you can do (admin can access `/admin`, users cannot)

This project uses both: JWT verifies identity, and `role` field controls access to admin routes.

**Q: How does bcrypt work?**

A: bcrypt is a password hashing function:
```
bcrypt.hash('password123', 10)  → "$2a$10$randomsalt...hashedvalue"
bcrypt.compare('password123', hash)  → true/false
```
The `10` is the cost factor — higher = slower = more secure. The salt is automatically included in the hash, so two identical passwords produce different hashes.

**Q: What is Zod and why use it?**

A: Zod is a TypeScript-first schema validation library. Instead of writing manual `if (!email)` checks, you define a schema:
```typescript
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
const result = loginSchema.safeParse(req.body)
if (!result.success) return res.status(400).json({ errors: result.error.flatten() })
```
It validates AND gives you typed data back. If validation passes, `result.data` is fully typed.

**Q: What is the difference between `find`, `findUnique`, and `findFirst` in Prisma?**

| Method | Returns | Use case |
|---|---|---|
| `findMany` | Array | Get multiple records |
| `findUnique` | Single or null | Query by unique field (id, email) |
| `findFirst` | Single or null | Query with any filter, returns first match |

**Q: What is `Promise.all` and why do you use it?**

A: `Promise.all` runs multiple async operations in parallel:
```typescript
// Sequential — takes 200ms + 150ms = 350ms
const portfolio = await prisma.portfolio.findUnique(...)
const transactions = await prisma.transaction.findMany(...)

// Parallel with Promise.all — takes max(200ms, 150ms) = 200ms
const [portfolio, transactions] = await Promise.all([
  prisma.portfolio.findUnique(...),
  prisma.transaction.findMany(...)
])
```

**Q: What is Server-Side Rendering vs Client-Side Rendering?**

A:
- **SSR** — page rendered on server, HTML sent to browser (good for SEO, no loading flash)
- **CSR** — blank HTML sent, JavaScript renders in browser (shows loading states)

The dashboard uses SSR (server components) — data is fetched on the server, so users see data immediately without a loading spinner.

**Q: How do you handle errors in Express?**

A: With a global error handler at the end of `index.ts`:
```typescript
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Error]', err.message)
  res.status(500).json({ error: 'Internal server error' })
})
```
Route-level errors use try/catch and return appropriate status codes (400, 401, 404, 409).

**Q: What HTTP status codes do you use and why?**

| Code | Meaning | When used |
|---|---|---|
| 200 | OK | Successful GET |
| 201 | Created | Successful POST (signup, create transaction) |
| 400 | Bad Request | Validation failed |
| 401 | Unauthorized | No/invalid token |
| 403 | Forbidden | Valid token but wrong role |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Email already registered |
| 500 | Server Error | Unexpected error |

---

## 15. Scenario-Based Questions

**Q: A user signs up but gets logged out immediately. What's wrong?**

A: Possible causes:
1. JWT cookie not being set — check `Set-Cookie` header in response
2. Cookie `SameSite` mismatch — in production needs `SameSite=None; Secure`
3. The API proxy rewrite not forwarding the `Set-Cookie` header
4. JWT_SECRET mismatch between backend (signs) and frontend (verifies)

**Q: Dashboard shows no data after login. How do you debug?**

A: Step by step:
1. Open DevTools → Network → check `/api/dashboard/stats` response
2. If 401 → token not being passed correctly
3. If 500 → backend error — check Render logs
4. If 200 but empty → user has no portfolio — run db:seed
5. Check that `API_URL` env var is set on Vercel

**Q: Production login works but localhost login doesn't. What do you check?**

A:
1. Is the backend running on port 4000? (`curl http://localhost:4000/health`)
2. Is `API_URL=http://localhost:4000` in `frontend/.env.local`?
3. Is local MongoDB running? (`brew services list | grep mongo`)
4. Does the user exist in local DB? (run `npm run db:seed`)
5. Clear browser cookies and try again

**Q: How would you add a "forgot password" feature?**

A:
1. User enters email → POST `/api/auth/forgot-password`
2. Generate a time-limited reset token (crypto.randomBytes)
3. Store token hash in DB with expiry
4. Send email with reset link (Nodemailer/Resend)
5. User clicks link → POST `/api/auth/reset-password` with token + new password
6. Verify token → hash new password → update in DB → clear token

**Q: How would you add real-time stock prices?**

A:
1. Integrate Polygon.io or Yahoo Finance API
2. On dashboard load, fetch current prices for each holding's symbol
3. Update `currentPrice` in DB or calculate on the fly
4. For real-time updates, use WebSocket connection
5. Or use SWR/React Query with polling every 30 seconds

**Q: The app is slow. How would you optimize it?**

A:
1. **Database** — add indexes on `userId` fields in Transaction and Portfolio
2. **Caching** — cache dashboard stats with Redis (invalidate on new transaction)
3. **Frontend** — use Next.js `generateStaticParams` for static pages
4. **Images** — use `next/image` for automatic optimization
5. **Bundle** — analyze with `next build --analyze` and code-split heavy components
6. **API** — paginate all list endpoints (already done for transactions)

**Q: How would you add a second user role (e.g. "ANALYST")?**

A:
1. Add `ANALYST` to the `Role` enum in `schema.prisma`
2. Run `prisma db push`
3. Add ANALYST check in `requireAdmin` middleware
4. Create new middleware `requireAnalyst`
5. Update frontend middleware to handle ANALYST routes
6. Add "Analyst" option in admin user management

**Q: If you had more time, what would you improve?**

A:
1. Real AI model integration (OpenAI API for investment analysis)
2. Real-time price data from financial APIs
3. Email verification on signup
4. OAuth (Google/GitHub) login
5. Export portfolio as PDF/CSV
6. Push notifications for price alerts
7. Unit and integration tests (Jest + Supertest)
8. Rate limiting on auth endpoints
9. Request logging (Morgan + Winston)
10. CI/CD pipeline with GitHub Actions

---

*Built with Next.js 14 · Express · MongoDB Atlas · Prisma · JWT · Vercel · Render*
