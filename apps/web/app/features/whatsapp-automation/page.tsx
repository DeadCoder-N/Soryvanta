import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'WhatsApp Automation — AI Bot for Listings & Leads',
  description: 'Brisvora WhatsApp AI bot handles enquiries, captures leads, and automates your entire WhatsApp workflow 24/7.',
}

const CAPABILITIES = [
  { icon: '◉', title: 'Natural Language Input', desc: 'Send details in any format — plain text, voice notes, or photos. AI understands and processes everything.' },
  { icon: '✦', title: '24/7 Enquiry Handling', desc: 'AI responds to customer enquiries instantly, any time of day. Never miss a lead again.' },
  { icon: '◈', title: 'Automatic Lead Capture', desc: 'Every enquiry is captured, logged, and sent to your dashboard. Leads are never lost.' },
  { icon: '▲', title: 'Instant Page Generation', desc: 'Send business details via WhatsApp. AI generates a complete landing page in under 60 seconds.' },
  { icon: '◎', title: 'Multi-language Support', desc: 'AI understands Hindi, English, and regional languages. Serve customers in their preferred language.' },
  { icon: '❋', title: 'Smart Notifications', desc: 'Get WhatsApp notifications for every new lead, enquiry, and page view. Stay informed always.' },
]

export default function WhatsAppAutomationPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="WhatsApp Automation"
        title="AI Bot That Works"
        titleGold="While You Sleep."
        description="Brisvora's WhatsApp AI bot handles enquiries, captures leads, and generates landing pages — all from your existing WhatsApp number. No new app required."
        badge="Live · Available Now"
        cta={{ label: 'Connect WhatsApp Free →', href: '/register' }}
        ctaSecondary={{ label: 'Explore All Features', href: '/features' }}
      />
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Capabilities</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400 }}>
            Your AI-powered<br /><span style={{ color: 'var(--gold)' }}>WhatsApp assistant</span>
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
            Start automating your<br /><span style={{ color: 'var(--gold)' }}>WhatsApp today.</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Connect your WhatsApp number and let AI handle the rest. Free to start.
          </p>
          <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>Start Free →</Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
