import Link from 'next/link'
import { TrendingUp, Zap } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-bg flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-600/25 blur-[100px]" />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-purple-600/25 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-md">
          <Link href="/" className="flex items-center gap-2.5 mb-12">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-neon-blue">
                <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400 flex items-center justify-center">
                <Zap className="w-2 h-2 text-dark-bg" strokeWidth={3} />
              </div>
            </div>
            <span className="text-xl font-bold text-white">
              NovaVest<span className="gradient-text"> AI</span>
            </span>
          </Link>

          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Your AI-Powered<br />
            <span className="gradient-text">Investment Edge</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Join 50,000+ investors using AI to make smarter financial decisions every day.
          </p>

          <div className="space-y-4">
            {[
              { value: '$2.4B+', label: 'Assets under analysis', color: 'text-indigo-400' },
              { value: '87%', label: 'AI signal accuracy', color: 'text-purple-400' },
              { value: '5 min', label: 'Average setup time', color: 'text-cyan-400' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 glass-card p-4">
                <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <TrendingUp size={14} className="text-white" />
            </div>
            <span className="text-base font-bold text-white">NovaVest<span className="gradient-text"> AI</span></span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}
