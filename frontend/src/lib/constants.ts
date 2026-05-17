// Static display constants that don't need to come from the backend

export const assetAllocation = [
  { name: 'Stocks', value: 44.7, color: '#6366f1' },
  { name: 'Crypto', value: 35.1, color: '#a855f7' },
  { name: 'ETFs', value: 16.9, color: '#22d3ee' },
  { name: 'Bonds', value: 3.3, color: '#10b981' },
]

export const staticHoldings = [
  { symbol: 'AAPL', name: 'Apple Inc.', assetType: 'STOCK', shares: 45, avgPrice: 152.3, currentPrice: 189.84, value: 8542.8, allocation: 34.4, change24h: 2.34, changePercent24h: 1.25 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', assetType: 'STOCK', shares: 12, avgPrice: 420.5, currentPrice: 875.4, value: 10504.8, allocation: 42.3, change24h: 18.7, changePercent24h: 2.18 },
  { symbol: 'BTC', name: 'Bitcoin', assetType: 'CRYPTO', shares: 0.85, avgPrice: 38200, currentPrice: 67840, value: 57664, allocation: 23.2, change24h: 1240, changePercent24h: 1.86 },
  { symbol: 'ETH', name: 'Ethereum', assetType: 'CRYPTO', shares: 8.2, avgPrice: 2100, currentPrice: 3580, value: 29356, allocation: 11.8, change24h: -42, changePercent24h: -1.16 },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF', assetType: 'ETF', shares: 30, avgPrice: 445.2, currentPrice: 524.8, value: 15744, allocation: 6.3, change24h: 3.2, changePercent24h: 0.61 },
  { symbol: 'TSLA', name: 'Tesla Inc.', assetType: 'STOCK', shares: 20, avgPrice: 198.4, currentPrice: 174.9, value: 3498, allocation: 1.4, change24h: -5.4, changePercent24h: -2.99 },
  { symbol: 'AGG', name: 'US Aggregate Bond ETF', assetType: 'BOND', shares: 85, avgPrice: 95.2, currentPrice: 96.8, value: 8228, allocation: 3.3, change24h: 0.12, changePercent24h: 0.12 },
] as const
