'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BarChart3, Settings, ShieldCheck,
  TrendingUp, Zap, ChevronLeft, ChevronRight, Bell,
  LogOut, User
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/admin', icon: ShieldCheck, label: 'Admin', adminOnly: true },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const visibleItems = navItems.filter(
    (item) => !item.adminOnly || user?.role === 'ADMIN'
  )

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative h-screen sticky top-0 glass border-r border-white/[0.07] flex flex-col overflow-hidden shrink-0"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.07]">
        <div className="relative shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-neon-blue">
            <TrendingUp size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 flex items-center justify-center">
            <Zap size={8} className="text-dark-bg" strokeWidth={3} />
          </div>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-sm font-bold text-white whitespace-nowrap"
            >
              NovaVest<span className="gradient-text"> AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
        <AnimatePresence>
          {!collapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="section-header px-2 mb-2"
            >
              Menu
            </motion.p>
          )}
        </AnimatePresence>

        {visibleItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`sidebar-link ${active ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`}
            >
              <item.icon size={18} className={active ? 'text-indigo-400' : ''} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500 rounded-r"
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-white/[0.07] space-y-1">
        <button
          className={`sidebar-link w-full ${collapsed ? 'justify-center px-0' : ''}`}
          title={collapsed ? 'Notifications' : undefined}
        >
          <Bell size={18} />
          <AnimatePresence>
            {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Notifications</motion.span>}
          </AnimatePresence>
          {!collapsed && (
            <span className="ml-auto w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
              3
            </span>
          )}
        </button>

        {user && (
          <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                  <div className="text-white text-xs font-semibold truncate">{user.name}</div>
                  <div className="text-gray-500 text-[10px] truncate">{user.email}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <button
          onClick={logout}
          className={`sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 ${collapsed ? 'justify-center px-0' : ''}`}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={18} />
          <AnimatePresence>
            {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Sign Out</motion.span>}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full glass border border-white/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-all z-10 shadow-glass"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  )
}
