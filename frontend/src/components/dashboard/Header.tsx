'use client'

import { Bell, Search, ChevronDown } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  const { user } = useAuth()
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/[0.07] px-6 py-4 flex items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className={`hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 ${
          searchFocused
            ? 'bg-white/[0.07] border-indigo-500/40 w-64'
            : 'bg-white/[0.03] border-white/10 w-40'
        }`}>
          <Search size={14} className="text-gray-500 shrink-0" />
          <input
            className="bg-transparent text-sm text-white placeholder:text-gray-600 outline-none w-full"
            placeholder="Search..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl glass border border-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
        </button>

        {/* User */}
        {user && (
          <button className="flex items-center gap-2.5 px-3 py-2 rounded-xl glass border border-white/10 hover:border-white/20 transition-all group">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-white text-xs font-semibold">{user.name}</div>
              <div className="text-gray-500 text-[10px] capitalize">{user.role.toLowerCase()}</div>
            </div>
            <ChevronDown size={12} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
          </button>
        )}
      </div>
    </header>
  )
}
