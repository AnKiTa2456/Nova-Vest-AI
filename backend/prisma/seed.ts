import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding NovaVest database...')

  const demoHash = await bcrypt.hash('demo1234', 10)
  const adminHash = await bcrypt.hash('admin1234', 10)

  // Demo user
  let demoUser = await prisma.user.findUnique({ where: { email: 'demo@novavest.ai' } })
  if (!demoUser) {
    demoUser = await prisma.user.create({
      data: { email: 'demo@novavest.ai', name: 'Alex Morgan', passwordHash: demoHash, role: 'USER' },
    })
    console.log('   Created demo user:', demoUser.id)
  } else {
    console.log('   Demo user already exists:', demoUser.id)
  }

  // Admin user
  const existingAdmin = await prisma.user.findUnique({ where: { email: 'admin@novavest.ai' } })
  if (!existingAdmin) {
    const admin = await prisma.user.create({
      data: { email: 'admin@novavest.ai', name: 'Admin User', passwordHash: adminHash, role: 'ADMIN' },
    })
    console.log('   Created admin user:', admin.id)
  } else {
    console.log('   Admin user already exists:', existingAdmin.id)
  }

  // Portfolio for demo user
  let portfolio = await prisma.portfolio.findUnique({ where: { userId: demoUser.id } })
  if (!portfolio) {
    portfolio = await prisma.portfolio.create({
      data: { userId: demoUser.id, totalValue: 247832.54, riskScore: 72, monthlyGain: 12398.54 },
    })
    console.log('   Created portfolio:', portfolio.id)
  } else {
    console.log('   Portfolio already exists:', portfolio.id)
  }

  // Holdings — only create if none exist
  const holdingCount = await prisma.holding.count({ where: { portfolioId: portfolio.id } })
  if (holdingCount === 0) {
    const holdingsData = [
      { symbol: 'AAPL', name: 'Apple Inc.', assetType: 'STOCK' as const, shares: 45, avgPrice: 152.3, currentPrice: 189.84, allocation: 34.4 },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', assetType: 'STOCK' as const, shares: 12, avgPrice: 420.5, currentPrice: 875.4, allocation: 42.3 },
      { symbol: 'BTC', name: 'Bitcoin', assetType: 'CRYPTO' as const, shares: 0.85, avgPrice: 38200, currentPrice: 67840, allocation: 23.2 },
      { symbol: 'ETH', name: 'Ethereum', assetType: 'CRYPTO' as const, shares: 8.2, avgPrice: 2100, currentPrice: 3580, allocation: 11.8 },
      { symbol: 'SPY', name: 'SPDR S&P 500 ETF', assetType: 'ETF' as const, shares: 30, avgPrice: 445.2, currentPrice: 524.8, allocation: 6.3 },
      { symbol: 'TSLA', name: 'Tesla Inc.', assetType: 'STOCK' as const, shares: 20, avgPrice: 198.4, currentPrice: 174.9, allocation: 1.4 },
      { symbol: 'AGG', name: 'US Aggregate Bond ETF', assetType: 'BOND' as const, shares: 85, avgPrice: 95.2, currentPrice: 96.8, allocation: 3.3 },
    ]
    for (const h of holdingsData) {
      await prisma.holding.create({ data: { portfolioId: portfolio.id, ...h } })
    }
    console.log('   Created', holdingsData.length, 'holdings')
  } else {
    console.log('   Holdings already exist:', holdingCount)
  }

  // Transactions — only create if none exist
  const txCount = await prisma.transaction.count({ where: { userId: demoUser.id } })
  if (txCount === 0) {
    const txData = [
      { type: 'BUY' as const, symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 3, price: 875.4, total: 2626.2, status: 'COMPLETED' as const, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { type: 'SELL' as const, symbol: 'TSLA', name: 'Tesla Inc.', shares: 5, price: 174.9, total: 874.5, status: 'COMPLETED' as const, createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
      { type: 'BUY' as const, symbol: 'BTC', name: 'Bitcoin', shares: 0.05, price: 67840, total: 3392, status: 'COMPLETED' as const, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
      { type: 'BUY' as const, symbol: 'AAPL', name: 'Apple Inc.', shares: 10, price: 189.84, total: 1898.4, status: 'COMPLETED' as const, createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
      { type: 'SELL' as const, symbol: 'ETH', name: 'Ethereum', shares: 1.5, price: 3580, total: 5370, status: 'COMPLETED' as const, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { type: 'BUY' as const, symbol: 'SPY', name: 'SPDR S&P 500 ETF', shares: 5, price: 524.8, total: 2624, status: 'COMPLETED' as const, createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
      { type: 'BUY' as const, symbol: 'AGG', name: 'US Aggregate Bond ETF', shares: 20, price: 96.8, total: 1936, status: 'PENDING' as const, createdAt: new Date(Date.now() - 30 * 60 * 1000) },
    ]
    for (const tx of txData) {
      await prisma.transaction.create({ data: { userId: demoUser.id, ...tx } })
    }
    console.log('   Created', txData.length, 'transactions')
  } else {
    console.log('   Transactions already exist:', txCount)
  }

  console.log('\n✅ Seed complete!')
  console.log('   Demo:  demo@novavest.ai  / demo1234')
  console.log('   Admin: admin@novavest.ai / admin1234')
}

main().catch(console.error).finally(() => prisma.$disconnect())
