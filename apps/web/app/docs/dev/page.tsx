import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Developer Docs — Marketing OS',
  description: 'Technical documentation for developers integrating with the Marketing OS platform. API reference, authentication, and guides.',
}

const SECTIONS = [
  {
    title: 'Getting Started',
    icon: '◆',
    links: [
      { label: 'Introduction', href: '/docs' },
      { label: 'Authentication', href: '/docs' },
      { label: 'Making Your First Request', href: '/docs' },
      { label: 'Rate Limits', href: '/docs' },
    ],
  },
  {
    title: 'Core APIs',
    icon: '◈',
    links: [
      { label: 'Listings API', href: '/docs' },
      { label: 'Leads API', href: '/docs' },
      { label: 'Analytics API', href: '/docs' },
      { label: 'WhatsApp API', href: '/docs' },
    ],
  },
  {
    title: 'Integrations',
    icon: '◉',
    links: [
      { label: 'Webhooks', href: '/webhooks' },
      { label: 'SDKs', href: '/sdks' },
      { label: 'REST API Reference', href: '/docs' },
      { label: 'Postman Collection', href: '/docs' },
    ],
  },
  {
    title: 'Guides',
    icon: '◇',
    links: [
      { label: 'Embed a Lead Form', href: '/guides' },
      { label: 'Automate Lead Follow-ups', href: '/guides' },
      { label: 'Custom Domain Setup', href: '/guides' },
      { label: 'Analytics Integration', href: '/guides' },
    ],
  },
]

export default function DevDocsPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Developer Docs"
        title="Build On"
        titleGold="Marketing OS."
        description="Everything you need to integrate, extend, and automate with the Marketing OS platform. APIs, SDKs, webhooks, and step-by-step guides."
      />

      <section style={{
        maxWidth: '1000px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(1rem,2vw,1.5rem)',
          marginBottom: 'clamp(3rem,6vw,5rem)',
        }}>
          {SECTIONS.map((section, i) => (
            <div key={section.title} className="animate-fade-up" style={{
              animationDelay: `${i * 60}ms`,
              padding: 'clamp(1.25rem,2.5vw,1.75rem)',
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: 'clamp(1rem,2vw,1.25rem)' }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>{section.icon}</span>
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(0.5rem,0.8vw,0.6rem)',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}>
                  {section.title}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {section.links.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)' }}
                  >
                    <span style={{ opacity: 0.3, fontSize: '0.6em' }}>▶</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          padding: 'clamp(1.5rem,3vw,2.5rem)',
          background: 'var(--surface-2)', border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius-xl)', textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem,1.8vw,1.25rem)',
            color: 'var(--text-primary)', marginBottom: '0.5rem',
          }}>
            Need help with your integration?
          </p>
          <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Our team is available to help you get up and running quickly.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.8rem' }}>
              Full Documentation
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.8rem' }}>
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
