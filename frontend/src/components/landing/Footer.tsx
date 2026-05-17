'use client'

import Link from 'next/link'
import { TrendingUp, Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react'

const links = {
  Product: ['Features', 'Pricing', 'Analytics', 'AI Engine', 'Security'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Compliance'],
  Resources: ['Documentation', 'API Reference', 'Help Center', 'Community', 'Status'],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <TrendingUp className="w-4.5 h-4.5 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 flex items-center justify-center">
                  <Zap className="w-1.5 h-1.5 text-dark-bg" strokeWidth={3} />
                </div>
              </div>
              <span className="text-lg font-bold text-white">
                NovaVest<span className="gradient-text"> AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              AI-powered investment intelligence platform for the modern investor.
              Make smarter decisions with real-time AI insights.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} NovaVest AI, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-600 text-sm">All systems operational</span>
          </div>
          <p className="text-gray-600 text-xs text-center sm:text-right max-w-xs">
            Not financial advice. Investments involve risk. Past performance does not guarantee future results.
          </p>
        </div>
      </div>
    </footer>
  )
}
