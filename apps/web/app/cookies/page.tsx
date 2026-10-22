import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'
import { getContactEmails } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Cookie Policy — Marketing OS',
  description: 'How Marketing OS uses cookies and similar tracking technologies on the platform.',
}

const COOKIE_TYPES = [
  {
    type: 'Essential Cookies',
    required: true,
    desc: 'These cookies are necessary for the platform to function. They enable core features like authentication, session management, and security. You cannot opt out of essential cookies.',
    examples: ['Session token', 'CSRF protection token', 'Authentication state'],
  },
  {
    type: 'Analytics Cookies',
    required: false,
    desc: 'These cookies help us understand how users interact with the platform. We use this data to improve features, fix issues, and optimize the user experience.',
    examples: ['Page view tracking', 'Feature usage analytics', 'Error reporting'],
  },
  {
    type: 'Preference Cookies',
    required: false,
    desc: 'These cookies remember your settings and preferences so you do not have to reconfigure them on every visit.',
    examples: ['Theme preference', 'Language setting', 'Dashboard layout'],
  },
  {
    type: 'Marketing Cookies',
    required: false,
    desc: 'These cookies are used to measure the effectiveness of our marketing campaigns and to show relevant content. We do not use third-party advertising cookies.',
    examples: ['Campaign attribution', 'Referral source tracking'],
  },
]

export default function CookiesPage() {
  const { privacy } = getContactEmails()
  return (
    <MarketingLayout>
      <PageHero
        label="Legal"
        title="Cookie"
        titleGold="Policy."
        description="Last updated: July 2026. This policy explains how Marketing OS uses cookies and how you can control them."
      />

      <section style={{
        maxWidth: '800px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>

        <div style={{ marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <p style={{
            fontSize: 'clamp(0.75rem,1.1vw,0.85rem)',
            color: 'var(--text-secondary)', lineHeight: 1.8,
          }}>
            Cookies are small text files stored on your device when you visit a website. Marketing OS uses cookies to keep you signed in, remember your preferences, and understand how the platform is used. You can control non-essential cookies through your browser settings.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem,2vw,1.5rem)' }}>
          {COOKIE_TYPES.map((cookie, i) => (
            <div key={cookie.type} className="animate-fade-up" style={{
              animationDelay: `${i * 60}ms`,
              padding: 'clamp(1.25rem,2.5vw,1.75rem)',
              background: 'var(--surface-2)',
              border: `1px solid ${cookie.required ? 'var(--gold-border)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-xl)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(0.9rem,1.4vw,1.05rem)',
                  color: 'var(--text-primary)', fontWeight: 400,
                }}>
                  {cookie.type}
                </h2>
                <span style={{
                  fontSize: 'clamp(0.45rem,0.7vw,0.52rem)',
                  letterSpacing: '0.1em',
                  padding: '0.2em 0.65em', borderRadius: '2em',
                  background: cookie.required ? 'var(--gold-dim)' : 'var(--surface-3)',
                  color: cookie.required ? 'var(--gold)' : 'var(--text-muted)',
                  border: `1px solid ${cookie.required ? 'var(--gold-border)' : 'var(--border)'}`,
                }}>
                  {cookie.required ? 'Always Active' : 'Optional'}
                </span>
              </div>
              <p style={{
                fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
                color: 'var(--text-secondary)', lineHeight: 1.7,
                marginBottom: '0.85rem',
              }}>
                {cookie.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {cookie.examples.map(ex => (
                  <span key={ex} style={{
                    fontSize: 'clamp(0.55rem,0.82vw,0.65rem)',
                    color: 'var(--text-muted)',
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    padding: '0.2em 0.6em', borderRadius: '2em',
                  }}>
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 'clamp(3rem,6vw,5rem)',
          padding: 'clamp(1.25rem,2.5vw,1.75rem)',
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
        }}>
          <p style={{
            fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            color: 'var(--text-muted)', lineHeight: 1.7,
          }}>
            To manage cookies, adjust your browser settings or contact us at{' '}
            <a href={`mailto:${privacy}`} style={{ color: 'var(--gold)', textDecoration: 'none' }}>
              {privacy}
            </a>
          </p>
        </div>
      </section>
    </MarketingLayout>
  )
}