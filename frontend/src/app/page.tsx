import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import Features from '@/components/landing/Features'
import Statistics from '@/components/landing/Statistics'
import Testimonials from '@/components/landing/Testimonials'
import Pricing from '@/components/landing/Pricing'
import FAQ from '@/components/landing/FAQ'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="bg-dark-bg text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
