import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'AI Landing Pages — Generate Pages from WhatsApp',
  description: 'Marketing OS generates SEO-optimized landing pages from a single WhatsApp message in under 60 seconds. No design skills, no technical knowledge required.',
}

const CAPABILITIES = [
  { icon: '◉', title: 'WhatsApp to Page', desc: 'Send property or business details via WhatsApp. AI extracts every detail and builds a complete landing page.' },
  { icon: '✦', title: 'SEO-Optimized by Default', desc: 'Every generated page includes proper meta tags, structured data, and keyword-optimized content automatically.' },
  { icon: '◈', title: 'Premium Design', desc: 'Pages are designed to look premium and professional. No templates — every page feels intentionally crafted.' },
  { icon: '▲', title: 'Mobile-First', desc: 'Every page is optimized for mobile first. Looks perfect on every device from the moment it is generated.' },
  { icon: '◎', title: 'Instant Publishing', desc: 'Pages go live in under 60 seconds. Share the link immediately via WhatsApp, Instagram, or any platform.' },
  { icon: '❋', title: 'Lead Capture Built-In', desc: 'Every page includes an enquiry form. Leads are captured and sent directly to your WhatsApp.' },
]

export default function AILandingPagesPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="AI Landing Pages"
        title="Generate Pages from"
        titleGold="a Single WhatsApp Message."
        description="Send your business details via WhatsApp. Marketing OS AI builds a professional, SEO-optimized landing page in under 60 seconds — no design skills required."
        badge="Live · Available Now"
        cta={{ label: 'Start Building Free →', href: '/register' }}
        ctaSecondary={{ label: 'Explore All Features', href: '/features' }}
      />

      <section style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(4rem,8vw,6rem) 0',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <span className="section-label">How It Works</span>
            <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400 }}>
              From message to live page<br /><span style={{ color: 'var(--gold)' }}>in under 60 seconds</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'clamp(1rem,2vw,1.5rem)', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { step: '01', title: 'Send a message', desc: 'Message our WhatsApp bot with your business details, photos, and pricing.' },
              { step: '02', title: 'AI builds the page', desc: 'Claude AI extracts every detail and generates a professional, SEO-optimized page.' },
              { step: '03', title: 'Share your link', desc: 'Get a clean, shareable URL. Your page is live and indexed by Google immediately.' },
            ].map((w, i) => (
              <div key={w.step} className="card-glass animate-fade-up" style={{ padding: 'clamp(1.5rem,3vw,2rem)', animationDelay: `${i * 100}ms` }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.5rem,0.8vw,0.58rem)', letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '0.75rem' }}>STEP {w.step}</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem,1.6vw,1.2rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '0.6rem' }}>{w.title}</h3>
                <p style={{ fontSize: 'clamp(0.75rem,1.1vw,0.85rem)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Capabilities</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400 }}>
            Everything built in,<br /><span style={{ color: 'var(--gold)' }}>nothing to configure</span>
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
            Ready to generate your<br /><span style={{ color: 'var(--gold)' }}>first AI landing page?</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Start free. No credit card required. Your first page is live in under 60 seconds.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>Start Free →</Link>
            <Link href="/docs" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>Read Docs</Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
