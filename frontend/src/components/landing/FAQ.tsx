'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'How does NovaVest AI generate investment recommendations?',
    answer: "Our AI engine processes 500+ data sources including price data, earnings reports, SEC filings, social sentiment, macro indicators, and on-chain metrics. Using ensemble machine learning models, we generate confidence-scored signals with detailed reasoning for every recommendation.",
  },
  {
    question: 'Is my financial data secure?',
    answer: 'Absolutely. We use bank-level 256-bit AES encryption for data at rest and TLS 1.3 in transit. We are SOC 2 Type II certified, FINRA compliant, and never sell your data to third parties. Two-factor authentication is available for all accounts.',
  },
  {
    question: 'Do you have access to my brokerage accounts?',
    answer: "NovaVest AI operates in read-only analysis mode by default. We can connect to brokerages via OAuth for portfolio sync, but we never have withdrawal or trading permissions. You maintain full control of your accounts at all times.",
  },
  {
    question: 'What assets does NovaVest AI support?',
    answer: 'We support US and international equities, ETFs, mutual funds, cryptocurrencies (800+), forex, commodities, and fixed income instruments. Coverage is continuously expanding based on user demand.',
  },
  {
    question: 'How accurate are the AI recommendations?',
    answer: 'Our backtested accuracy rate for directional signals is 87% over 3-year rolling windows. However, past performance does not guarantee future results. All recommendations include confidence scores and reasoning to help you make informed decisions.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel at any time with no penalties. Your subscription remains active until the end of the billing period. We also offer a 14-day free trial for all paid plans, no credit card required.',
  },
  {
    question: 'Is NovaVest AI suitable for beginners?',
    answer: 'Absolutely. Our platform is designed for all experience levels. Beginners benefit from AI-guided recommendations with plain-English explanations, while advanced investors can dive deep into our analytics suite and customize their experience.',
  },
]

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07 }}
      className="glass-card border-white/10 overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-medium text-white pr-4">{question}</span>
        <span className={`shrink-0 w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-gray-400 transition-all ${open ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400' : ''}`}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="faq" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to know before getting started.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.question} {...faq} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 mt-10 text-sm"
        >
          Still have questions?{' '}
          <a href="mailto:support@novavest.ai" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Contact our support team
          </a>
        </motion.p>
      </div>
    </section>
  )
}
