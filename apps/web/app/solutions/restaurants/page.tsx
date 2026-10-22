import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Restaurants & Cafés — AI Menu Pages & Reservation Automation',
  description: 'Marketing OS helps restaurants and cafés create AI-powered menu pages, automate reservations, and improve Google visibility.',
}

const FEATURES = [
  { icon: '◉', title: 'AI Menu Pages', desc: 'Generate beautiful menu landing pages from WhatsApp. Dishes, prices, photos — structured and SEO-optimized automatically.' },
  { icon: '◈', title: 'Reservation Automation', desc: 'AI bot handles table reservations via WhatsApp 24/7. Confirmations and reminders sent automatically.' },
  { icon: '✦', title: 'Google Visibility', desc: 'Rank for "restaurants near me" searches. Every page is optimized for local Google discovery.' },
  { icon: '▲', title: 'Customer Reviews', desc: 'Collect and showcase customer reviews. Build social proof and drive more walk-ins.' },
  { icon: '◎', title: 'Daily Specials', desc: 'Update daily specials via WhatsApp. AI updates your page instantly — no technical skills needed.' },
  { icon: '❋', title: 'Order Analytics', desc: 'Track page views, reservation requests, and popular menu items. Understand your customers better.' },
]

export default function RestaurantsPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Restaurants & Cafés"
        title="AI-Powered Menu Pages for"
        titleGold="Restaurants & Cafés."
        description="Create stunning menu pages, automate reservations, and rank on Google — all from a single WhatsApp message. Coming soon to Marketing OS."
        badge="Coming Soon"
        cta={{ label: 'Join Waitlist →', href: '/register' }}
        ctaSecondary={{ label: 'View All Solutions', href: '/solutions' }}
      />
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Capabilities</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400 }}>
            Everything your restaurant needs<br /><span style={{ color: 'var(--gold)' }}>to fill more tables</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,28vw,320px), 1fr))', gap: 'clamp(1rem,2vw,1.25rem)' }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="card animate-fade-up" style={{ padding: 'clamp(1.25rem,2.5vw,1.75rem)', animationDelay: `${i * 60}ms` }}>
              <span style={{ fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--gold)', display: 'block', marginBottom: '0.75rem' }}>{f.icon}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.9rem,1.4vw,1.05rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '0.4rem' }}>{f.title}</h3>
              <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', padding: 'clamp(4rem,8vw,6rem) 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '1rem' }}>
            Be first when<br /><span style={{ color: 'var(--gold)' }}>Restaurants launches.</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Join the waitlist and get early access when Marketing OS for Restaurants goes live.
          </p>
          <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>Join Waitlist →</Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
