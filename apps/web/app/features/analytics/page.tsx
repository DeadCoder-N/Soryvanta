import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Analytics — Views, Clicks & Conversions',
  description: 'Marketing OS analytics tracks every view, click, and conversion across all your pages and leads. Understand exactly what drives your business growth.',
}

const CAPABILITIES = [
  { icon: '▲', title: 'Page Analytics', desc: 'Track views, unique visitors, and time-on-page for every landing page you create.' },
  { icon: '◎', title: 'Lead Conversion Tracking', desc: 'See exactly which pages generate the most leads and what drives visitors to enquire.' },
  { icon: '◉', title: 'WhatsApp Click Tracking', desc: 'Track every WhatsApp button click. Know which pages drive the most direct conversations.' },
  { icon: '✦', title: 'SEO Performance', desc: 'Monitor your Google rankings, impressions, and click-through rates for every page.' },
  { icon: '◈', title: 'Real-time Dashboard', desc: 'Live data updated in real time. See what is happening on your pages right now.' },
  { icon: '❋', title: 'Growth Reports', desc: 'Weekly and monthly reports delivered to your dashboard. Track your growth over time.' },
]

export default function AnalyticsPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Analytics"
        title="Know Exactly What"
        titleGold="Drives Your Growth."
        description="Marketing OS tracks every view, click, lead, and conversion across all your pages. Make data-driven decisions without needing a data analyst."
        badge="Live · Available Now"
        cta={{ label: 'Start Tracking Free →', href: '/register' }}
        ctaSecondary={{ label: 'Explore All Features', href: '/features' }}
      />
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Capabilities</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400 }}>
            Data that tells you<br /><span style={{ color: 'var(--gold)' }}>what to do next</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,28vw,320px), 1fr))', gap: 'clamp(1rem,2vw,1.25rem)' }}>
          {CAPABILITIES.map((c, i) => (
            <div key={c.title} className="card animate-fade-up" style={{ padding: 'clamp(1.25rem,2.5vw,1.75rem)', animationDelay: `${i * 60}ms` }}>
              <span style={{ fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--gold)', display: 'block', marginBottom: '0.75rem' }}>{c.icon}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.9rem,1.4vw,1.05rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '0.4rem' }}>{c.title}</h3>
              <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', lineHeight: 1.65 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', padding: 'clamp(4rem,8vw,6rem) 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '1rem' }}>
            Stop guessing.<br /><span style={{ color: 'var(--gold)' }}>Start knowing.</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Every metric you need to grow your business — in one clean dashboard. Free to start.
          </p>
          <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>Start Free →</Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
