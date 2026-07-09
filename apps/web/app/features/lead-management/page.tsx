import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Lead Management — Capture, Track & Organize Every Lead',
  description: 'Brisvora captures every lead from every channel and organizes them in one intelligent dashboard. Never lose a lead again.',
}

const CAPABILITIES = [
  { icon: '◈', title: 'Unified Lead Inbox', desc: 'Every lead from WhatsApp, landing pages, and enquiry forms flows into one organized dashboard.' },
  { icon: '◉', title: 'Instant Notifications', desc: 'Get WhatsApp notifications the moment a new lead arrives. Respond while interest is highest.' },
  { icon: '✦', title: 'Lead Tracking', desc: 'Track every lead from first contact to conversion. Know exactly where each lead is in your pipeline.' },
  { icon: '▲', title: 'Lead Scoring', desc: 'AI scores leads based on engagement and intent. Focus your time on the highest-value prospects.' },
  { icon: '◎', title: 'Contact Management', desc: 'Store and organize all lead contact information. Search, filter, and segment your leads easily.' },
  { icon: '❋', title: 'Follow-up Automation', desc: 'Set automated follow-up reminders. Never let a warm lead go cold due to missed follow-ups.' },
]

export default function LeadManagementPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Lead Management"
        title="Every Lead Captured."
        titleGold="None Ever Lost."
        description="Brisvora captures leads from every channel — WhatsApp, landing pages, and enquiry forms — and organizes them in one intelligent dashboard."
        badge="Live · Available Now"
        cta={{ label: 'Start Managing Leads Free →', href: '/register' }}
        ctaSecondary={{ label: 'Explore All Features', href: '/features' }}
      />
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Capabilities</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400 }}>
            Your complete<br /><span style={{ color: 'var(--gold)' }}>lead management system</span>
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
            Stop losing leads.<br /><span style={{ color: 'var(--gold)' }}>Start closing more deals.</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Every lead captured, organized, and followed up — automatically. Free to start.
          </p>
          <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>Start Free →</Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
