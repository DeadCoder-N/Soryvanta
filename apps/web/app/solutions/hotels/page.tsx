import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Hotels & Resorts — AI Booking Pages & Enquiry Automation',
  description: 'Brisvora helps hotels and resorts create AI-powered booking pages, automate guest enquiries, and improve Google visibility.',
}

const FEATURES = [
  { icon: '◈', title: 'AI Booking Pages', desc: 'Generate stunning hotel landing pages from a WhatsApp message. Rooms, amenities, pricing — all structured automatically.' },
  { icon: '◉', title: 'Guest Enquiry Automation', desc: 'AI bot handles guest enquiries 24/7 via WhatsApp. Availability, pricing, and booking confirmations — automated.' },
  { icon: '✦', title: 'SEO for Local Search', desc: 'Rank for "hotels near [location]" searches. Every page is auto-optimized for Google discovery.' },
  { icon: '▲', title: 'Review Management', desc: 'Collect and showcase guest reviews. Build trust and improve conversion rates automatically.' },
  { icon: '◎', title: 'Photo Gallery', desc: 'Upload room and property photos. AI creates a premium gallery that showcases your property beautifully.' },
  { icon: '❋', title: 'Analytics Dashboard', desc: 'Track page views, enquiries, and booking conversions. Understand what drives guests to book.' },
]

export default function HotelsPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Hotels & Resorts"
        title="AI-Powered Booking Pages for"
        titleGold="Hotels & Resorts."
        description="Create stunning booking pages, automate guest enquiries, and rank on Google — all from a single WhatsApp message. Coming soon to Brisvora."
        badge="Coming Soon"
        cta={{ label: 'Join Waitlist →', href: '/register' }}
        ctaSecondary={{ label: 'View All Solutions', href: '/solutions' }}
      />

      <section style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Capabilities</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem,3.2vw,2.4rem)',
            color: 'var(--text-primary)', fontWeight: 400,
          }}>
            Everything your hotel needs<br />
            <span style={{ color: 'var(--gold)' }}>to grow online</span>
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,28vw,320px), 1fr))',
          gap: 'clamp(1rem,2vw,1.25rem)',
        }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="card animate-fade-up" style={{
              padding: 'clamp(1.25rem,2.5vw,1.75rem)',
              animationDelay: `${i * 60}ms`,
            }}>
              <span style={{ fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--gold)', display: 'block', marginBottom: '0.75rem' }}>
                {f.icon}
              </span>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.9rem,1.4vw,1.05rem)',
                color: 'var(--text-primary)', fontWeight: 400, marginBottom: '0.4rem',
              }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem,8vw,6rem) 0', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem,3.2vw,2.4rem)',
            color: 'var(--text-primary)', fontWeight: 400, marginBottom: '1rem',
          }}>
            Be first when<br /><span style={{ color: 'var(--gold)' }}>Hotels launches.</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Join the waitlist and get early access when Brisvora for Hotels goes live.
          </p>
          <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>
            Join Waitlist →
          </Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
