'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Shield, Palette, Key, CreditCard } from 'lucide-react'
import Header from '@/components/dashboard/Header'
import { toast } from 'sonner'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'api', label: 'API Keys', icon: Key },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

function ProfileSection() {
  const [name, setName] = useState('Alex Morgan')
  const [email, setEmail] = useState('demo@novavest.ai')

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-white font-semibold mb-5">Personal Information</h3>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            A
          </div>
          <div>
            <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Change avatar
            </button>
            <p className="text-gray-500 text-xs mt-0.5">PNG, JPG max 2MB</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-dark"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-dark"
              type="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Currency</label>
            <select className="input-dark">
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Risk Tolerance</label>
            <select className="input-dark" defaultValue="MEDIUM">
              <option value="LOW">Conservative (Low Risk)</option>
              <option value="MEDIUM">Moderate (Medium Risk)</option>
              <option value="HIGH">Aggressive (High Risk)</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => toast.success('Profile updated!')}
            className="glow-button px-6 py-2.5 rounded-xl text-sm font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

function NotificationsSection() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    pushNotifications: true,
    smsAlerts: false,
    aiSignals: true,
    priceAlerts: true,
    weeklyReport: true,
    marketNews: false,
  })

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-white font-semibold mb-5">Notification Preferences</h3>
      {Object.entries(settings).map(([key, val]) => {
        const labels: Record<string, { label: string; desc: string }> = {
          emailAlerts: { label: 'Email Alerts', desc: 'Receive alerts via email' },
          pushNotifications: { label: 'Push Notifications', desc: 'Browser and mobile push' },
          smsAlerts: { label: 'SMS Alerts', desc: 'Critical alerts via SMS' },
          aiSignals: { label: 'AI Signals', desc: 'New AI investment recommendations' },
          priceAlerts: { label: 'Price Alerts', desc: 'Asset price target notifications' },
          weeklyReport: { label: 'Weekly Report', desc: 'Portfolio performance summary' },
          marketNews: { label: 'Market News', desc: 'Daily market news digest' },
        }
        const info = labels[key]
        return (
          <div key={key} className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
            <div>
              <p className="text-white text-sm font-medium">{info.label}</p>
              <p className="text-gray-500 text-xs">{info.desc}</p>
            </div>
            <button
              onClick={() => setSettings((s) => ({ ...s, [key]: !val }))}
              className={`relative w-10 h-5.5 rounded-full transition-all duration-200 ${val ? 'bg-indigo-500' : 'bg-white/10'}`}
              style={{ height: 22, width: 40 }}
            >
              <span
                className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white transition-all duration-200 shadow ${val ? 'right-0.5' : 'left-0.5'}`}
                style={{ width: 18, height: 18 }}
              />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Settings" subtitle="Manage your account preferences" />
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <nav className="lg:w-48 shrink-0">
            <div className="glass-card p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && <ProfileSection />}
              {activeTab === 'notifications' && <NotificationsSection />}
              {activeTab !== 'profile' && activeTab !== 'notifications' && (
                <div className="glass-card p-12 text-center">
                  <p className="text-gray-500">
                    {tabs.find((t) => t.id === activeTab)?.label} settings coming soon.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
