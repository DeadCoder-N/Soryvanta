import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'
import PricingSection from '@/components/PricingSection'

export const metadata: Metadata = {
  title: 'Pricing — Brisvora Plans & Features',
  description: 'Simple, transparent pricing for every stage of growth. Start free, scale as you grow. No hidden fees. Cancel anytime.',
  openGraph: {
    title: 'Brisvora Pricing — Start Free, Scale Without Limits',
    description: 'Choose the plan that fits your brokerage. From solo brokers to large agencies.',
    url: 'https://brisvora.vercel.app/pricing',
  },
}

export default function PricingPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Pricing"
        title="Start Small."
        titleGold="Scale Without Limits."
        description="Transparent pricing for every stage of growth. Start free, upgrade when you're ready. No hidden fees, no lock-in."
        cta={{ label: 'Start Free', href: '/register' }}
        ctaSecondary={{ label: 'Talk to Sales', href: '/#contact' }}
        badge="14-day free trial on all paid plans"
      />
      <PricingSection />
    </MarketingLayout>
  )
}
