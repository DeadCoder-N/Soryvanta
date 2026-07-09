import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Real Estate — AI Listings & Lead Automation',
  description: 'Brisvora helps property brokers generate AI-powered listings from WhatsApp, capture leads automatically, and rank on Google — all in under 60 seconds.',
}

const FEATURES = [
  { icon: '◉', title: 'WhatsApp to Listing', desc: 'Send property details via WhatsApp. AI generates a professional, SEO-optimized listing page instantly.' },
  { icon: '✦', title: 'AI SEO Engine', desc: 'Every listing is auto-optimized for Google. Rank for local property searches without any manual effort.' },
  { icon: '◈', title: 'Lead Capture Forms', desc: 'Built-in enquiry forms on every listing. Leads are captured and sent directly to your WhatsApp.' },
  { icon: '▲', title: 'Analytics Dashboard', desc: 'Track views, clicks, and enquiries for every property. Understand what drives results.' },
  { icon: '◎', title: 'Image Gallery', desc: 'Upload multiple property photos. AI arranges them into a premium gallery layout automatically.' },
  { icon: '❋', title: 'Shareable Links', desc: 'Every listing gets a clean, shareable URL. Share on WhatsApp, Instagram, or any platform.' },
]

const WORKFLOW = [
  { step: '01', title: 'Send a WhatsApp message', desc: 'Message our AI bot with property details — address, price, type, photos. Any format works.' },
  { step: '02', title: 'AI builds your listing', desc: 'Claude AI extracts every detail and writes a professional, SEO-optimized property description.' },
  { step: '03', title: 'Share & capture leads', desc: 'Get a premium listing page with a shareable link. Buyers contact you directly via WhatsApp.' },
]

export default function RealEstatePage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Real Estate"
        title="AI-Powered Listings for"
        titleGold="Property Brokers."
        description="Turn a WhatsApp message into a professional, SEO-optimized property listing in under 60 seconds. Capture leads automatically and grow your real estate business with AI."
        badge="Live · Available Now"
        cta={{ label: 'Start Building Free →', href: '/register' }}
        ctaSecondary={{ label: 'View Pricing', href: '/#pricing' }}
      />

      {/* Workflow */}
      <section style={{
        background: 'var(--surface-1)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(4rem,8vw,6rem) 0',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <span className="section-label">How It Works</span>
            <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem,3.2vw,2.4rem)',
              color: 'var(--text-primary)', fontWeight: 400,
            }}>
              Three steps to your<br />
              <span style={{ color: 'var(--gold)' }}>premium listing</span>
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(1rem,2vw,1.5rem)',
          }}>
            {WORKFLOW.map((w, i) => (
              <div key={w.step} className="card-glass animate-fade-up" style={{
                padding: 'clamp(1.5rem,3vw,2rem)',
                animationDelay: `${i * 100}ms`,
              }}>
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(0.5rem,0.8vw,0.58rem)',
                  letterSpacing: '0.2em', color: 'var(--gold)',
                  marginBottom: '0.75rem',
                }}>
                  STEP {w.step}
                </p>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1rem,1.6vw,1.2rem)',
                  color: 'var(--text-primary)', fontWeight: 400,
                  marginBottom: '0.6rem',
                }}>
                  {w.title}
                </h3>
                <p style={{ fontSize: 'clamp(0.75rem,1.1vw,0.85rem)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Features</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem,3.2vw,2.4rem)',
            color: 'var(--text-primary)', fontWeight: 400,
          }}>
            Everything a broker needs
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
                color: 'var(--text-primary)', fontWeight: 400,
                marginBottom: '0.4rem',
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

      {/* CTA */}
      <section style={{
        background: 'var(--surface-1)',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem,8vw,6rem) 0',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <span className="section-label">Get Started</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem,3.2vw,2.4rem)',
            color: 'var(--text-primary)', fontWeight: 400,
            marginBottom: '1rem',
          }}>
            Ready to grow your<br />
            <span style={{ color: 'var(--gold)' }}>real estate business?</span>
          </h2>
          <p style={{
            fontSize: 'clamp(0.82rem,1.2vw,0.95rem)',
            color: 'var(--text-secondary)', lineHeight: 1.75,
            marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
          }}>
            Join brokers already using Brisvora to generate listings, capture leads, and grow faster with AI.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>
              Start Free →
            </Link>
            <Link href="/#pricing" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
