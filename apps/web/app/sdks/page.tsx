import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'SDKs — Brisvora Developer Tools',
  description: 'Official Brisvora SDKs for JavaScript, Python, and more. Integrate Brisvora into your application in minutes.',
}

const SDKS = [
  {
    lang: 'JavaScript / TypeScript',
    status: 'coming-soon',
    icon: '⬡',
    desc: 'Full-featured SDK for Node.js and browser environments. Supports all Brisvora API endpoints with TypeScript types included.',
    install: 'npm install @brisvora/sdk',
  },
  {
    lang: 'Python',
    status: 'coming-soon',
    icon: '⬡',
    desc: 'Python SDK for server-side integrations. Ideal for data pipelines, automation scripts, and backend services.',
    install: 'pip install brisvora',
  },
  {
    lang: 'REST API',
    status: 'available',
    icon: '◆',
    desc: 'Use the Brisvora REST API directly from any language or platform. Full documentation with request and response examples.',
    install: null,
  },
]

export default function SdksPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="SDKs"
        title="Build With"
        titleGold="Brisvora."
        description="Official client libraries and developer tools to integrate Brisvora into your application. REST API available now — language SDKs coming soon."
      />

      <section style={{
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem,2vw,1.5rem)' }}>
          {SDKS.map((sdk, i) => (
            <div key={sdk.lang} className="animate-fade-up" style={{
              animationDelay: `${i * 60}ms`,
              padding: 'clamp(1.25rem,2.5vw,1.75rem)',
              background: 'var(--surface-2)',
              border: `1px solid ${sdk.status === 'available' ? 'var(--gold-border)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-xl)',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>{sdk.icon}</span>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                  color: 'var(--text-primary)', fontWeight: 400,
                }}>
                  {sdk.lang}
                </p>
                <span style={{
                  fontSize: 'clamp(0.48rem,0.75vw,0.56rem)',
                  letterSpacing: '0.1em',
                  padding: '0.2em 0.65em', borderRadius: '2em',
                  background: sdk.status === 'available' ? 'var(--gold-dim)' : 'var(--surface-3)',
                  color: sdk.status === 'available' ? 'var(--gold)' : 'var(--text-muted)',
                  border: `1px solid ${sdk.status === 'available' ? 'var(--gold-border)' : 'var(--border)'}`,
                }}>
                  {sdk.status === 'available' ? 'Available' : 'Coming Soon'}
                </span>
              </div>
              <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {sdk.desc}
              </p>
              {sdk.install && (
                <code style={{
                  display: 'inline-block',
                  padding: '0.5rem 0.85rem',
                  background: 'var(--surface-3)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'clamp(0.65rem,0.95vw,0.75rem)',
                  color: 'var(--text-muted)',
                  fontFamily: 'monospace',
                }}>
                  {sdk.install}
                </code>
              )}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 'clamp(3rem,6vw,5rem)',
          padding: 'clamp(1.5rem,3vw,2.5rem)',
          background: 'var(--surface-2)', border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius-xl)', textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem,1.8vw,1.25rem)',
            color: 'var(--text-primary)', marginBottom: '0.5rem',
          }}>
            Ready to integrate?
          </p>
          <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Start with the REST API today. Full SDK support is on the roadmap.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.8rem' }}>
              View API Docs
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.8rem' }}>
              Talk to Us
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
