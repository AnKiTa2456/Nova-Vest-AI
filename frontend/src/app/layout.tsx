import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NovaVest AI — AI-Powered Investment Intelligence',
  description: 'Next-generation investment intelligence platform powered by artificial intelligence. Make smarter financial decisions with real-time AI insights.',
  keywords: ['investment', 'AI', 'portfolio', 'fintech', 'trading', 'analytics'],
  openGraph: {
    title: 'NovaVest AI',
    description: 'AI-Powered Investment Intelligence Platform',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(10, 15, 44, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              backdropFilter: 'blur(12px)',
            },
          }}
        />
      </body>
    </html>
  )
}
