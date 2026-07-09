import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'About — The Story Behind Brisvora',
  description: 'Brisvora is an AI-powered growth platform built for businesses that want to grow faster with less effort. Learn about our mission and team.',
}

const VALUES = [
  { icon: '✦', title: 'AI-First', desc: 'We believe AI should do the heavy lifting. Every feature we build starts with the question: can AI handle this better than a human?' },
  { icon: '◉', title: 'WhatsApp Native', desc: 'India runs on WhatsApp. We built Brisvora to work where your customers already are — no new apps, no friction.' },
  { icon: '◎', title: 'Radical Simplicity', desc: 'The best tool is the one you actually use. We obsess over making complex things feel effortless.' },
  { icon: '◈', title: 'Built for India', desc: 'We understand the Indian market — the languages, the workflows, the way business actually gets done here.' },
  { icon: '▲', title: 'Transparent', desc: 'No hidden fees, no dark patterns, no lock-in. We earn trust by being honest about what we are and what we are not.' },
  { icon: '❋', title: 'Customer Obsessed', desc: 'Every feature on our roadmap came from a real customer need. We build what you need, not what looks good in a demo.' },
]

const STATS = [
  { value: '2026', label: 'Founded' },
  { value: 'India', label: 'Headquarters' },
  { value: 'AI', label: 'Powered by Claude' },
  { value: '∞', label: 'Ambition' },
]

export default function AboutPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="About Brisvora"
        title="Built for Businesses That"
        titleGold="Refuse to Stay Small."
        description="Brisvora started with a simple observation: small business owners in India spend hours on tasks that AI can handle in seconds. We built the platform to fix that."
      />

      {/* Mission */}
      <section style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(4rem,8vw,6rem) 0',
      }}>
        <div style={{
          maxWidth: '800px', margin: '0 auto',
          padding: '0 clamp(1.25rem,4vw,2.5rem)',
          textAlign: 'center',
        }}>
          <span className="section-label">Our Mission</span>
          <div className="gold-divider" style={{ margin: '0 auto 1.5rem' }} />
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.2rem,2.5vw,1.8rem)',
            color: 'var(--text-primary)', lineHeight: 1.5, fontWeight: 400,
            marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
          }}>
            "To give every business owner in India access to the same AI-powered growth tools that only large companies could afford before."
          </p>
          <p style={{
            fontSize: 'clamp(0.85rem,1.3vw,1rem)',
            color: 'var(--text-secondary)', lineHeight: 1.8,
            maxWidth: '60ch', margin: '0 auto',
          }}>
            A property broker in Pune should be able to generate a professional, SEO-optimized listing page as easily as a Fortune 500 company. A restaurant owner in Chennai should be able to automate their customer enquiries without hiring a developer. That is what Brisvora is for.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 'clamp(1rem,2vw,1.5rem)',
          marginBottom: 'clamp(4rem,8vw,6rem)',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} className="stat-card animate-fade-up" style={{ animationDelay: `${i * 60}ms`, textAlign: 'center' }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.5rem,3vw,2.2rem)',
                color: 'var(--gold)', lineHeight: 1, marginBottom: '0.4rem',
              }}>
                {s.value}
              </p>
              <p style={{ fontSize: 'clamp(0.62rem,0.95vw,0.72rem)', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Our Values</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem,3.2vw,2.4rem)',
            color: 'var(--text-primary)', fontWeight: 400,
          }}>
            What we believe in
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,28vw,320px), 1fr))',
          gap: 'clamp(1rem,2vw,1.25rem)',
        }}>
          {VALUES.map((v, i) => (
            <div key={v.title} className="card animate-fade-up" style={{
              padding: 'clamp(1.25rem,2.5vw,1.75rem)',
              animationDelay: `${i * 60}ms`,
            }}>
              <span style={{ fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--gold)', display: 'block', marginBottom: '0.75rem' }}>
                {v.icon}
              </span>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.9rem,1.4vw,1.05rem)',
                color: 'var(--text-primary)', fontWeight: 400, marginBottom: '0.4rem',
              }}>
                {v.title}
              </h3>
              <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem,8vw,6rem) 0', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.6rem,3.2vw,2.4rem)',
            color: 'var(--text-primary)', fontWeight: 400, marginBottom: '1rem',
          }}>
            Ready to grow your<br /><span style={{ color: 'var(--gold)' }}>business with AI?</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Join businesses already using Brisvora to generate listings, capture leads, and grow faster.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>
              Start Free →
            </Link>
            <Link href="/contact" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}
