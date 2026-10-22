import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'
import HoverCard from '@/components/HoverCard'

export const metadata: Metadata = {
  title: 'Guides — Step-by-Step Tutorials for Marketing OS',
  description: 'Step-by-step guides to help you get the most out of Marketing OS. From setup to advanced automation.',
}

const GUIDES = [
  {
    icon: '◉',
    level: 'Beginner',
    title: 'Complete Setup Guide: From Zero to First Listing',
    desc: 'Everything you need to create your account, connect WhatsApp, and publish your first AI-powered listing.',
    steps: 6,
    time: '15 min',
    href: '/guides',
  },
  {
    icon: '✦',
    level: 'Beginner',
    title: 'How to Write the Perfect WhatsApp Message for AI',
    desc: 'Learn exactly what to include in your WhatsApp message to get the best AI-generated listing every time.',
    steps: 4,
    time: '8 min',
    href: '/guides',
  },
  {
    icon: '◎',
    level: 'Intermediate',
    title: 'SEO Guide: Ranking Your Listings on Google',
    desc: 'Understand how Marketing OS\'s SEO engine works and what you can do to maximize your Google rankings.',
    steps: 5,
    time: '12 min',
    href: '/guides',
  },
  {
    icon: '◈',
    level: 'Intermediate',
    title: 'Lead Management: From Capture to Conversion',
    desc: 'How to use Marketing OS\'s lead dashboard to track, organize, and convert every enquiry into a deal.',
    steps: 7,
    time: '18 min',
    href: '/guides',
  },
  {
    icon: '▲',
    level: 'Advanced',
    title: 'Analytics Deep Dive: Understanding Your Growth Data',
    desc: 'How to read your analytics dashboard, identify trends, and make data-driven decisions for your business.',
    steps: 5,
    time: '14 min',
    href: '/guides',
  },
  {
    icon: '❋',
    level: 'Advanced',
    title: 'WhatsApp Automation: Advanced Bot Configuration',
    desc: 'Configure custom responses, set up lead routing, and build advanced WhatsApp automation workflows.',
    steps: 8,
    time: '22 min',
    href: '/guides',
  },
]

const LEVEL_COLORS: Record<string, string> = {
  Beginner: 'rgba(21,128,61,0.08)',
  Intermediate: 'var(--gold-dim)',
  Advanced: 'rgba(239,68,68,0.08)',
}
const LEVEL_TEXT: Record<string, string> = {
  Beginner: '#15803D',
  Intermediate: 'var(--gold)',
  Advanced: '#f87171',
}

export default function GuidesPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Guides"
        title="Step-by-Step Tutorials to"
        titleGold="Master Marketing OS."
        description="Practical, step-by-step guides that take you from setup to advanced automation. Learn at your own pace."
        cta={{ label: 'Start with Basics →', href: '/guides' }}
        ctaSecondary={{ label: 'Read Documentation', href: '/docs' }}
      />

      <section style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px,30vw,380px), 1fr))',
          gap: 'clamp(1rem,2vw,1.5rem)',
        }}>
          {GUIDES.map((g, i) => (
            <HoverCard key={g.title} href={g.href}
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(0.75rem,1.4vw,1rem)' }}>
                <span style={{ fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--gold)' }}>{g.icon}</span>
                <span style={{
                  fontSize: 'clamp(0.48rem,0.75vw,0.56rem)',
                  letterSpacing: '0.08em',
                  color: LEVEL_TEXT[g.level],
                  background: LEVEL_COLORS[g.level],
                  padding: '0.2em 0.6em', borderRadius: '2em',
                }}>
                  {g.level}
                </span>
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                color: 'var(--text-primary)', fontWeight: 400,
                lineHeight: 1.3, marginBottom: '0.6rem', flex: 1,
              }}>
                {g.title}
              </h3>
              <p style={{
                fontSize: 'clamp(0.7rem,1.05vw,0.8rem)',
                color: 'var(--text-muted)', lineHeight: 1.65,
                marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
              }}>
                {g.desc}
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                paddingTop: 'clamp(0.65rem,1.2vw,0.9rem)',
                borderTop: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: 'clamp(0.6rem,0.9vw,0.7rem)', color: 'var(--text-muted)' }}>{g.steps} steps</span>
                <span style={{ fontSize: 'clamp(0.6rem,0.9vw,0.7rem)', color: 'var(--text-muted)' }}>{g.time}</span>
                <span style={{ marginLeft: 'auto', fontSize: 'clamp(0.65rem,1vw,0.75rem)', color: 'var(--gold)' }}>Read →</span>
              </div>
            </HoverCard>
          ))}
        </div>
      </section>
    </MarketingLayout>
  )
}
