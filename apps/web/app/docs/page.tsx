import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'
import DocLink from './DocLink'

export const metadata: Metadata = {
  title: 'Documentation — Marketing OS Developer & User Docs',
  description: 'Everything you need to get started with Marketing OS. Guides, API reference, WhatsApp setup, and integration documentation.',
}

const SECTIONS = [
  {
    icon: '◉',
    title: 'Getting Started',
    desc: 'Set up your account, connect WhatsApp, and generate your first AI landing page.',
    links: [
      { label: 'Quick Start Guide', href: '/docs' },
      { label: 'Connect WhatsApp', href: '/docs' },
      { label: 'Create Your First Listing', href: '/docs' },
      { label: 'Dashboard Overview', href: '/docs' },
    ],
  },
  {
    icon: '✦',
    title: 'AI Landing Pages',
    desc: 'Learn how to generate, customize, and publish AI-powered landing pages.',
    links: [
      { label: 'How AI Generation Works', href: '/docs' },
      { label: 'Supported Formats', href: '/docs' },
      { label: 'Customizing Pages', href: '/docs' },
      { label: 'Publishing & Sharing', href: '/docs' },
    ],
  },
  {
    icon: '◈',
    title: 'WhatsApp Automation',
    desc: 'Configure your WhatsApp bot, set up triggers, and manage automated responses.',
    links: [
      { label: 'WhatsApp Bot Setup', href: '/docs' },
      { label: 'Supported Commands', href: '/docs' },
      { label: 'Lead Capture Flow', href: '/docs' },
      { label: 'Notification Settings', href: '/docs' },
    ],
  },
  {
    icon: '◎',
    title: 'SEO & Analytics',
    desc: 'Understand how Marketing OS optimizes your pages for Google and tracks performance.',
    links: [
      { label: 'SEO Optimization Guide', href: '/docs' },
      { label: 'Analytics Dashboard', href: '/docs' },
      { label: 'Google Search Console', href: '/docs' },
      { label: 'Performance Reports', href: '/docs' },
    ],
  },
  {
    icon: '▲',
    title: 'API Reference',
    desc: 'Integrate Marketing OS into your own systems using our REST API.',
    links: [
      { label: 'Authentication', href: '/api' },
      { label: 'Listings API', href: '/api' },
      { label: 'Leads API', href: '/api' },
      { label: 'Webhooks', href: '/api' },
    ],
  },
  {
    icon: '❋',
    title: 'Account & Billing',
    desc: 'Manage your account, subscription, team members, and billing settings.',
    links: [
      { label: 'Account Settings', href: '/docs' },
      { label: 'Plan & Billing', href: '/docs' },
      { label: 'Team Management', href: '/docs' },
      { label: 'Data & Privacy', href: '/docs' },
    ],
  },
]

export default function DocsPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Documentation"
        title="Everything You Need to"
        titleGold="Build with Marketing OS."
        description="Guides, API reference, and tutorials to help you get the most out of Marketing OS. From first setup to advanced automation."
        cta={{ label: 'Quick Start →', href: '/docs' }}
        ctaSecondary={{ label: 'API Reference', href: '/api' }}
      />

      {/* Search bar */}
      <div style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(1.5rem,3vw,2.5rem) 0',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)', fontSize: '1rem', pointerEvents: 'none',
            }}>⌕</span>
            <input
              type="search"
              placeholder="Search documentation..."
              className="input-modern"
              style={{ paddingLeft: '44px', paddingTop: '14px', paddingBottom: '14px' }}
            />
          </div>
        </div>
      </div>

      {/* Doc sections */}
      <section style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px,30vw,360px), 1fr))',
          gap: 'clamp(1rem,2vw,1.5rem)',
        }}>
          {SECTIONS.map((s, i) => (
            <div key={s.title} className="card animate-fade-up" style={{
              padding: 'clamp(1.25rem,2.5vw,1.75rem)',
              animationDelay: `${i * 60}ms`,
            }}>
              <div style={{
                width: 'clamp(2.2rem,3.5vw,2.8rem)', height: 'clamp(2.2rem,3.5vw,2.8rem)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(0.9rem,1.5vw,1.1rem)', color: 'var(--gold)',
                marginBottom: 'clamp(0.75rem,1.4vw,1rem)',
              }}>
                {s.icon}
              </div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                color: 'var(--text-primary)', fontWeight: 400,
                marginBottom: '0.4rem',
              }}>
                {s.title}
              </h3>
              <p style={{
                fontSize: 'clamp(0.7rem,1.05vw,0.8rem)',
                color: 'var(--text-muted)', lineHeight: 1.6,
                marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
              }}>
                {s.desc}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {s.links.map(l => (
                  <DocLink key={l.label} href={l.href} label={l.label} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Help CTA */}
      <section style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem,6vw,5rem) 0', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.1rem,2vw,1.4rem)',
            color: 'var(--text-primary)', marginBottom: '0.75rem',
          }}>
            Can't find what you're looking for?
          </p>
          <p style={{ fontSize: 'clamp(0.78rem,1.1vw,0.88rem)', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Our support team is here to help.
          </p>
          <DocLink href="/help" label="Visit Help Center" />
        </div>
      </section>
    </MarketingLayout>
  )
}
