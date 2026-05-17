# NovaVest AI — AI-Powered Investment Intelligence Platform

A full-stack fintech SaaS platform with a clean **frontend / backend separation** for independent deployment.

---

## Project Structure

```
novavest-ai/
├── frontend/           ← Next.js 14 → deploy to Vercel
│   ├── src/
│   │   ├── app/        ← Pages (landing, auth, dashboard, analytics, settings, admin)
│   │   ├── components/ ← UI components (landing, dashboard)
│   │   ├── hooks/      ← useAuth hook
│   │   ├── lib/        ← API client, JWT verify, utils, constants
│   │   ├── middleware.ts ← Route protection (Edge Runtime)
│   │   └── types/      ← TypeScript interfaces
│   ├── package.json
│   └── next.config.js  ← Rewrites /api/* → backend (dev + prod)
│
├── backend/            ← Express.js → deploy to Render / Railway
│   ├── src/
│   │   ├── index.ts    ← Express app entry point (port 4000)
│   │   ├── routes/     ← auth, dashboard, transactions, profile, ai
│   │   ├── middleware/  ← requireAuth (JWT + cookie/Bearer)
│   │   └── lib/        ← auth, db (Prisma), dummy-data, validations
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
└── package.json        ← Root: `npm run dev` starts both servers
```

---

## Quick Start (Local Development)

### 1. Install all dependencies

```bash
npm run install:all
# or manually:
# cd backend && npm install
# cd frontend && npm install
```

### 2. Configure environment variables

```bash
cp backend/.env.example backend/.env.local
cp frontend/.env.example frontend/.env.local
```

**`backend/.env.local`**
```
DATABASE_URL="mongodb://localhost:27017/novavest"
JWT_SECRET="novavest-demo-secret-key-32chars-min"
PORT=4000
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

**`frontend/.env.local`**
```
API_URL="http://localhost:4000"
JWT_SECRET="novavest-demo-secret-key-32chars-min"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

> **Seed demo data** (first time only):
> ```bash
> cd backend && npm run db:seed
> ```
> This creates `demo@novavest.ai` / `demo1234` and `admin@novavest.ai` / `admin1234` in MongoDB.

### 3. Start both servers

```bash
npm run dev
# Backend → http://localhost:4000
# Frontend → http://localhost:3000
```

Or start separately:
```bash
npm run dev:backend     # port 4000
npm run dev:frontend    # port 3000
```

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| User | `demo@novavest.ai` | `demo1234` |
| Admin | `admin@novavest.ai` | `admin1234` |

---

## Architecture

### How Frontend ↔ Backend Communicate

The frontend's `next.config.js` uses **Next.js rewrites** to proxy all `/api/*` requests to the backend:

```
Browser → localhost:3000/api/auth/login
       → (Next.js rewrite) → localhost:4000/api/auth/login
       ← response + Set-Cookie (stored under localhost:3000)
```

This eliminates CORS issues in both development and production. On Vercel, the rewrite forwards to your Render backend URL.

### Auth Flow

1. Browser POSTs to `/api/auth/login` (goes through Next.js → Express)
2. Express validates credentials, signs JWT with `jose`
3. Express sets `httpOnly` cookie — stored by browser under the **frontend** domain (due to rewrite proxy)
4. Next.js `middleware.ts` verifies the JWT on every protected route using `jose`
5. Dashboard server components call the backend directly with `Authorization: Bearer <token>` from cookies

---

## Deployment

### Backend → Render (or Railway)

1. Push `backend/` folder to GitHub
2. Create a new **Web Service** on Render
3. Set build command: `npm install && npm run build`
4. Set start command: `node dist/index.js`
5. Add environment variables:
   ```
   DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/novavest
   JWT_SECRET=your-32-char-secret
   FRONTEND_URL=https://your-app.vercel.app
   NODE_ENV=production
   PORT=4000
   ```
6. Note your backend URL: `https://novavest-api.onrender.com`

### Database → MongoDB Atlas

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Get the connection string: `mongodb+srv://user:pass@cluster.mongodb.net/novavest`
3. Push schema and seed:
```bash
cd backend
DATABASE_URL="mongodb+srv://..." npx prisma db push
DATABASE_URL="mongodb+srv://..." npm run db:seed
```

### Frontend → Vercel

1. Push `frontend/` folder to GitHub (or the whole monorepo)
2. Import project in Vercel dashboard
3. Set **Root Directory** to `frontend`
4. Add environment variables:
   ```
   API_URL=https://novavest-api.onrender.com
   JWT_SECRET=your-32-char-secret   # same as backend
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```
5. Deploy

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Recharts |
| **Backend** | Node.js, Express, TypeScript, Zod, bcryptjs |
| **Auth** | JWT (`jose`), httpOnly cookies, Next.js Edge middleware |
| **Database** | Prisma ORM + MongoDB |
| **Deployment** | Vercel (frontend) + Render/Railway (backend) + MongoDB Atlas |

---

## API Endpoints

All routes are on the backend (port 4000). The frontend proxies them via `/api/*`.

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/health` | — | Health check |
| POST | `/api/auth/login` | — | Login, sets cookie |
| POST | `/api/auth/signup` | — | Register new user |
| POST | `/api/auth/logout` | — | Clear cookie |
| GET | `/api/auth/me` | ✓ | Current user |
| GET | `/api/dashboard/stats` | ✓ | Full dashboard data |
| GET | `/api/transactions` | ✓ | Paginated transactions |
| POST | `/api/transactions` | ✓ | Create transaction |
| GET | `/api/profile` | ✓ | User profile |
| PATCH | `/api/profile` | ✓ | Update profile |
| GET | `/api/ai/recommendations` | ✓ | AI signals |

---

## Database Schema (Prisma)

```
User          id, email, name, passwordHash, role (USER|ADMIN)
Portfolio     userId, totalValue, riskScore, monthlyGain
Holding       portfolioId, symbol, assetType, shares, avgPrice, currentPrice
Transaction   userId, type (BUY|SELL), symbol, shares, price, status
```

---

## Architecture Decisions & Tradeoffs

| Decision | Choice | Why |
|---|---|---|
| **Separate backend** | Express on Render vs Next.js API Routes | Independent scaling, cleaner separation of concerns, easier to add microservices later |
| **Next.js rewrites proxy** | `/api/*` proxied to backend | Eliminates CORS; cookies stay same-origin; single domain in production |
| **JWT in httpOnly cookie** | vs localStorage | XSS-proof; auto-sent on every request; cleared on logout |
| **Prisma + MongoDB** | vs Mongoose | Type-safe queries, schema validation, migration support |
| **MongoDB replica set** | Enabled locally | Required by Prisma 5.x for all write operations |
| **Edge middleware** | for route protection | Runs before page render, no flash of unauthenticated content |
| **Server components** | for dashboard data fetch | No loading spinner; data fetched at render time; SEO-friendly |

### Assumptions
- Users have one portfolio each (1:1 User → Portfolio)
- Transactions are append-only (no edits/deletes)
- AI recommendations are pre-computed (no real-time ML inference)
- Risk score is managed server-side, not user-editable

---

## Future Improvements

- Real-time price data (Polygon.io WebSocket)
- OAuth (Google, GitHub)
- Brokerage integration (Plaid)
- Production AI pipeline
- Export reports (PDF/CSV)
- Email verification and 2FA
