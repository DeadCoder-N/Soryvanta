import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Changelog — What\'s New in Marketing OS',
  description: 'Every update, improvement, and new feature shipped by the Marketing OS team.',
}

const ENTRIES = [
  {
    version: 'v2.4.1',
    date: 'July 2026',
    type: 'improvement',
    title: 'Faster AI Generation',
    changes: [
      'Reduced average page generation time from 90s to under 45s',
      'Improved AI accuracy for property descriptions',
      'Better image processing for WhatsApp photo uploads',
    ],
  },
  {
    version: 'v2.4.0',
    date: 'July 2026',
    type: 'feature',
    title: 'Analytics Dashboard v2',
    changes: [
      'New real-time analytics dashboard with live visitor tracking',
      'Added conversion funnel visualization',
      'WhatsApp click tracking for all listing pages',
      'Weekly growth reports delivered to dashboard',
    ],
  },
  {
    version: 'v2.3.0',
    date: 'June 2026',
    type: 'feature',
    title: 'Lead Management System',
    changes: [
      'Unified lead inbox for all channels',
      'Lead scoring based on engagement signals',
      'Automated follow-up reminders',
      'Lead export to CSV',
    ],
  },
  {
    version: 'v2.2.0',
    date: 'June 2026',
    type: 'feature',
    title: 'AI SEO Engine',
    changes: [
      'Automatic meta tag generation for every page',
      'JSON-LD structured data for rich Google results',
      'Local SEO optimization for city-based searches',
      'Automatic sitemap generation and submission',
    ],
  },
  {
    version: 'v2.1.0',
    date: 'June 2026',
    type: 'feature',
    title: 'WhatsApp Bot v2',
    changes: [
      'Multi-language support for Hindi and English',
      'Improved intent detection for property details',
      'Automatic lead notification via WhatsApp',
      'Voice note transcription support',
    ],
  },
  {
    version: 'v2.0.0',
    date: 'June 2026',
    type: 'launch',
    title: 'Marketing OS Platform Launch',
    changes: [
      'AI-powered landing page generation from WhatsApp',
      'Real Estate solution with full listing workflow',
      'Dashboard with listings, leads, and analytics',
      'Starter, Professional, Business, and Enterprise plans',
    ],
  },
]

const TYPE_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  feature: { bg: 'var(--gold-dim)', color: 'var(--gold)', label: 'New Feature' },
  improvement: { bg: 'rgba(21,128,61,0.08)', color: '#15803D', label: 'Improvement' },
  launch: { bg: 'rgba(139,92,246,0.08)', color: '#a78bfa', label: 'Launch' },
  fix: { bg: 'rgba(239,68,68,0.08)', color: '#f87171', label: 'Bug Fix' },
}

export default function ChangelogPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Changelog"
        title="Every Update We"
        titleGold="Ship."
        description="A transparent record of every feature, improvement, and fix shipped by the Marketing OS team. Updated with every release."
      />

      <section style={{
        maxWidth: '800px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem,4vw,3rem)' }}>
          {ENTRIES.map((entry, i) => {
            const style = TYPE_STYLES[entry.type]
            return (
              <div key={entry.version} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                {/* Header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  flexWrap: 'wrap',
                  marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
                }}>
                  <span style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(0.5rem,0.8vw,0.58rem)',
                    letterSpacing: '0.12em',
                    color: 'var(--text-muted)',
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    padding: '0.2em 0.6em', borderRadius: '2em',
                  }}>
                    {entry.version}
                  </span>
                  <span style={{
                    fontSize: 'clamp(0.5rem,0.78vw,0.58rem)',
                    color: style.color,
                    background: style.bg,
                    padding: '0.2em 0.6em', borderRadius: '2em',
                    letterSpacing: '0.06em',
                  }}>
                    {style.label}
                  </span>
                  <span style={{ fontSize: 'clamp(0.6rem,0.9vw,0.7rem)', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                    {entry.date}
                  </span>
                </div>

                {/* Card */}
                <div style={{
                  padding: 'clamp(1.25rem,2.5vw,1.75rem)',
                  background: 'var(--surface-2)',
                  border: `1px solid ${entry.type === 'launch' ? 'var(--gold-border)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-xl)',
                }}>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1rem,1.6vw,1.2rem)',
                    color: 'var(--text-primary)', fontWeight: 400,
                    marginBottom: 'clamp(0.75rem,1.4vw,1rem)',
                  }}>
                    {entry.title}
                  </h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none' }}>
                    {entry.changes.map(change => (
                      <li key={change} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                        fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
                        color: 'var(--text-secondary)', lineHeight: 1.6,
                      }}>
                        <span style={{ color: style.color, flexShrink: 0, marginTop: '0.15rem', fontSize: '0.7em' }}>◆</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </MarketingLayout>
  )
}
