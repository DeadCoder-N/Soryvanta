import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'
import HoverCard from '@/components/HoverCard'

export const metadata: Metadata = {
  title: 'Features — AI Capabilities Built for Growth',
  description: 'Explore all Brisvora features: AI Landing Pages, WhatsApp Automation, SEO Engine, Lead Management, Analytics, and AI Workflows.',
}

const FEATURES = [
  { href: '/features/ai-landing-pages', icon: '⬡', label: 'AI Landing Pages', desc: 'Generate SEO-optimized landing pages from a WhatsApp message in under 60 seconds.' },
  { href: '/features/whatsapp-automation', icon: '◉', label: 'WhatsApp Automation', desc: 'AI bot that handles enquiries, captures leads, and automates your WhatsApp workflow.' },
  { href: '/features/seo-engine', icon: '◎', label: 'AI SEO Engine', desc: 'Every page auto-optimized for Google. Rank for local searches without any manual effort.' },
  { href: '/features/lead-management', icon: '◈', label: 'Lead Management', desc: 'Capture, track, and organize every lead from every channel in one intelligent dashboard.' },
  { href: '/features/analytics', icon: '▲', label: 'Analytics', desc: 'Track views, clicks, and conversions. Understand exactly what drives your business growth.' },
  { href: '/features/ai-workflows', icon: '❋', label: 'AI Workflows', desc: 'Automate repetitive tasks. Let AI handle the routine so you can focus on closing deals.' },
]

export default function FeaturesPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Features"
        title="Every Tool You Need to"
        titleGold="Grow Your Business."
        description="Brisvora combines AI, automation, SEO, and analytics into one intelligent platform. Everything works together — from first message to closed deal."
        cta={{ label: 'Start Free →', href: '/register' }}
        ctaSecondary={{ label: 'View Pricing', href: '/#pricing' }}
      />

      <section style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 clamp(1.25rem,4vw,2.5rem) clamp(5rem,10vw,8rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px,28vw,340px), 1fr))',
          gap: 'clamp(1rem,2vw,1.5rem)',
        }}>
          {FEATURES.map((f, i) => (
            <HoverCard
              key={f.href}
              href={f.href}
              className="animate-fade-up"
              style={{
                animationDelay: `${i * 60}ms`,
                display: 'flex', flexDirection: 'column',
                padding: 'clamp(1.25rem,2.5vw,1.75rem)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                textDecoration: 'none',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div style={{
                width: 'clamp(2.5rem,4vw,3rem)', height: 'clamp(2.5rem,4vw,3rem)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--gold)',
                marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)', flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                color: 'var(--text-primary)', lineHeight: 1.2,
                marginBottom: '0.4rem',
              }}>
                {f.label}
              </p>
              <p style={{
                fontSize: 'clamp(0.72rem,1.1vw,0.82rem)',
                color: 'var(--text-muted)', lineHeight: 1.6, flex: 1,
              }}>
                {f.desc}
              </p>
              <div style={{
                marginTop: 'clamp(1rem,2vw,1.25rem)',
                fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                color: 'var(--gold)',
              }}>
                Learn more →
              </div>
            </HoverCard>
          ))}
        </div>
      </section>
    </MarketingLayout>
  )
}
