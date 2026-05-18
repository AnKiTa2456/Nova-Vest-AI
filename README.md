# NovaVest AI — AI-Powered Investment Intelligence Platform

A full-stack fintech SaaS platform built with Next.js 14, Express, and MongoDB Atlas. Features a glassmorphism dark UI, JWT authentication, real-time dashboard, and AI investment recommendations.

🌐 **Live Demo:** [https://nova-vest-ai.vercel.app](https://nova-vest-ai.vercel.app)
🔧 **Backend API:** [https://nova-vest-ai.onrender.com](https://nova-vest-ai.onrender.com)
📦 **GitHub:** [https://github.com/AnKiTa2456/Nova-Vest-AI](https://github.com/AnKiTa2456/Nova-Vest-AI)
🗄️ **Database:** MongoDB Atlas (cluster0.oplgq.mongodb.net)

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| User | `demo@novavest.ai` | `demo1234` |
| Admin | `admin@novavest.ai` | `admin1234` |

---

## Screenshots

### Live App (Deployed on Vercel)

| Landing Page | Login |
|---|---|
| ![Landing](snaps_nova%20vest%20ai/deployed/01_landing_hero.png) | ![Login](snaps_nova%20vest%20ai/deployed/02_login_page.png) |

| Dashboard (Demo User — $247K Portfolio) | AI Recommendations + Activity Feed |
|---|---|
| ![Dashboard](snaps_nova%20vest%20ai/deployed/12_dashboard_demo_user_alex_morgan.png) | ![AI Recs](snaps_nova%20vest%20ai/localhost/11_dashboard_ai_recommendations_activity_feed.png) |

| Analytics — Metrics & Monthly P&L | Analytics — Holdings Table |
|---|---|
| ![Analytics](snaps_nova%20vest%20ai/deployed/08_analytics_metrics_admin_user.png) | ![Holdings](snaps_nova%20vest%20ai/deployed/09_analytics_holdings_table.png) |

| Analytics — Sector Performance | Admin Panel |
|---|---|
| ![Sector](snaps_nova%20vest%20ai/deployed/10_analytics_sector_performance.png) | ![Admin](snaps_nova%20vest%20ai/deployed/06_admin_panel_user_management.png) |

| Settings | MongoDB Atlas — Database |
|---|---|
| ![Settings](snaps_nova%20vest%20ai/deployed/07_settings_profile_admin_user.png) | ![Atlas](snaps_nova%20vest%20ai/atlas/01_database_overview_all_collections.png) |

---

## Features

- **Landing Page** — Hero, Features, Statistics, Testimonials, Pricing, FAQ, Footer with smooth animations
- **Authentication** — JWT login/signup with httpOnly cookies and protected routes
- **Dashboard** — Portfolio value, monthly growth, risk score, AI suggestions, charts, transactions
- **Analytics** — Sharpe ratio, win rate, drawdown analysis with Recharts
- **Settings** — Profile, notifications, security preferences
- **Admin Panel** — User management and system health (admin role only)
- **AI Recommendations** — Investment signals with confidence scores
- **MongoDB Atlas** — Cloud database with Prisma ORM

---

## Project Structure

```
novavest-ai/
├── frontend/                 ← Next.js 14 (deployed on Vercel)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/       ← login, signup pages
│   │   │   ├── (dashboard)/  ← dashboard, analytics, settings, admin
│   │   │   ├── session-reset/ ← cookie cleanup route handler
│   │   │   └── page.tsx      ← landing page
│   │   ├── components/
│   │   │   ├── landing/      ← Navbar, Hero, Features, Pricing, FAQ, Footer
│   │   │   └── dashboard/    ← Sidebar, Header, Charts, Tables, Cards
│   │   ├── hooks/            ← useAuth
│   │   ├── lib/              ← api, auth, utils, constants
│   │   ├── middleware.ts      ← Edge Runtime route protection
│   │   └── types/
│   └── next.config.js        ← Rewrites /api/* → backend
│
├── backend/                  ← Express.js (deployed on Render)
│   ├── src/
│   │   ├── index.ts          ← Express entry point (port 4000)
│   │   ├── routes/           ← auth, dashboard, transactions, profile, ai
│   │   ├── middleware/        ← requireAuth (JWT + cookie/Bearer)
│   │   └── lib/              ← auth, db (Prisma), validations, dummy-data
│   ├── prisma/
│   │   ├── schema.prisma     ← MongoDB schema
│   │   └── seed.ts           ← Demo data seeder
│   └── package.json
│
└── package.json              ← Root: runs both servers with concurrently
```

---

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB (local) or MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/AnKiTa2456/Nova-Vest-AI.git
cd Nova-Vest-AI
```

### 2. Install dependencies

```bash
# Install all at once
npm run install:all

# Or manually
cd backend && npm install
cd ../frontend && npm install
```

### 3. Configure environment variables

**`backend/.env`**
```env
DATABASE_URL="mongodb://localhost:27017/novavest"
JWT_SECRET="novavest-demo-secret-key-32chars-min"
PORT=4000
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

**`frontend/.env.local`**
```env
API_URL="http://localhost:4000"
JWT_SECRET="novavest-demo-secret-key-32chars-min"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set up database

```bash
cd backend

# Push schema to MongoDB
npm run db:push

# Seed demo data
npm run db:seed
```

### 5. Start both servers

```bash
# From root directory
npm run dev

# Backend → http://localhost:4000
# Frontend → http://localhost:3000
```

---

## Architecture

### Frontend ↔ Backend Communication

Next.js rewrites proxy all `/api/*` requests to the backend — same origin for cookies, no CORS issues:

```
Browser → vercel.app/api/auth/login
        → (Next.js rewrite) → render.com/api/auth/login
        ← JWT cookie set under vercel.app domain
```

### Auth Flow

```
1. POST /api/auth/login → Express validates credentials
2. bcrypt.compare(password, hash) → verify against MongoDB
3. jose.SignJWT() → create JWT token
4. Set-Cookie: novavest-token (httpOnly, SameSite=Lax)
5. Next.js middleware.ts verifies JWT on every protected route
6. Server components use Bearer token for direct backend calls
```

### Route Protection

| Route | Protection |
|---|---|
| `/dashboard`, `/analytics`, `/settings` | JWT required → redirect to `/login` |
| `/admin` | JWT + ADMIN role required |
| `/login`, `/signup` | Redirect to `/dashboard` if already logged in |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 App Router, TypeScript, Tailwind CSS |
| **UI/Animation** | Framer Motion, Lucide Icons, Recharts |
| **Backend** | Node.js, Express.js, TypeScript |
| **Validation** | Zod |
| **Auth** | JWT (`jose`), bcryptjs, httpOnly cookies |
| **Database** | MongoDB Atlas, Prisma ORM |
| **Deployment** | Vercel + Render + MongoDB Atlas |

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | — | Health check |
| POST | `/api/auth/login` | — | Login, sets JWT cookie |
| POST | `/api/auth/signup` | — | Register, creates user + portfolio |
| POST | `/api/auth/logout` | — | Clear JWT cookie |
| GET | `/api/auth/me` | ✓ | Get current user from token |
| GET | `/api/dashboard/stats` | ✓ | Portfolio, holdings, transactions, AI recs |
| GET | `/api/transactions` | ✓ | Paginated transactions (filter by type) |
| POST | `/api/transactions` | ✓ | Create new transaction |
| GET | `/api/profile` | ✓ | User profile + trade stats |
| PATCH | `/api/profile` | ✓ | Update name/email |
| GET | `/api/ai/recommendations` | ✓ | AI investment signals |

---

## Database Schema

```
User
  _id          ObjectId
  email        String (unique)
  name         String
  passwordHash String
  role         USER | ADMIN
  createdAt    DateTime

Portfolio
  _id          ObjectId
  userId       ObjectId → User
  totalValue   Float
  riskScore    Int (0-100)
  monthlyGain  Float

Holding
  _id           ObjectId
  portfolioId   ObjectId → Portfolio
  symbol        String (AAPL, BTC...)
  assetType     STOCK | CRYPTO | ETF | BOND
  shares        Float
  avgPrice      Float
  currentPrice  Float
  allocation    Float (%)

Transaction
  _id       ObjectId
  userId    ObjectId → User
  type      BUY | SELL
  symbol    String
  shares    Float
  price     Float
  total     Float
  status    PENDING | COMPLETED | FAILED
  createdAt DateTime
```

---

## Deployment

### Backend → Render

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start` |

**Environment Variables:**
```
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/novavest
JWT_SECRET=your-32-char-secret
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

### Frontend → Vercel

| Setting | Value |
|---|---|
| Root Directory | `frontend` |
| Framework | Next.js |

**Environment Variables:**
```
API_URL=https://your-backend.onrender.com
JWT_SECRET=your-32-char-secret
```

### Database → MongoDB Atlas

1. Create free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Add `0.0.0.0/0` to Network Access
3. Get connection string and set as `DATABASE_URL`
4. Run `npm run db:push && npm run db:seed`

---

## Architecture Decisions & Tradeoffs

| Decision | Choice | Reason |
|---|---|---|
| Separate backend | Express on Render | Independent scaling, clean separation |
| Next.js rewrites proxy | `/api/*` → backend | No CORS issues, cookies stay same-origin |
| JWT in httpOnly cookie | vs localStorage | XSS-proof, auto-sent on every request |
| Prisma + MongoDB | vs Mongoose | Type-safe queries, schema validation |
| Edge middleware | for route protection | No flash of unauthenticated content |
| Server components | for dashboard fetch | Data fetched at render time, no loading spinner |

### Assumptions
- One portfolio per user (1:1 relationship)
- Transactions are append-only
- AI recommendations are pre-computed (no live ML inference)
- Risk score is managed server-side

---

## Future Improvements

- Real-time price data via Polygon.io WebSocket
- OAuth login (Google, GitHub)
- Brokerage integration via Plaid
- Live AI model for investment analysis
- PDF/CSV report export
- Email verification and 2FA
- Mobile app (React Native)
