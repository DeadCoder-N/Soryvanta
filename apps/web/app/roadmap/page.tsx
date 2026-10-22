import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Roadmap — What We Are Building Next',
  description: 'See what the Marketing OS team is working on. Upcoming features, industry expansions, and platform improvements.',
}

const SHIPPED = [
  { icon: '✓', title: 'AI Landing Page Generation', desc: 'Generate SEO-optimized pages from WhatsApp in under 60 seconds.' },
  { icon: '✓', title: 'WhatsApp Bot Integration', desc: 'Connect your WhatsApp number and automate lead capture.' },
  { icon: '✓', title: 'Real Estate Solution', desc: 'Full AI listing workflow for property brokers.' },
  { icon: '✓', title: 'Lead Management Dashboard', desc: 'Capture, track, and organize all leads in one place.' },
  { icon: '✓', title: 'Analytics Dashboard', desc: 'Track views, clicks, and conversions for every page.' },
  { icon: '✓', title: 'AI SEO Engine', desc: 'Auto-optimized meta tags, structured data, and keywords.' },
]

const IN_PROGRESS = [
  { icon: '◉', title: 'Hotels & Resorts Solution', desc: 'AI booking pages and guest enquiry automation for hospitality businesses.' },
  { icon: '◉', title: 'Restaurants & Cafés Solution', desc: 'Menu pages, reservation automation, and Google visibility for F&B.' },
  { icon: '◉', title: 'AI Workflows', desc: 'Automated lead follow-ups, routing, and custom workflow triggers.' },
  { icon: '◉', title: 'Multi-language Support', desc: 'Hindi, Tamil, Telugu, and more regional language support for AI generation.' },
]

const PLANNED = [
  { icon: '◇', title: 'Healthcare Solution', desc: 'Appointment pages and patient enquiry automation for clinics.' },
  { icon: '◇', title: 'Education Solution', desc: 'Course pages and enrolment automation for institutes and coaches.' },
  { icon: '◇', title: 'Retail Solution', desc: 'Product showcase pages and customer automation for retail businesses.' },
  { icon: '◇', title: 'Professional Services Solution', desc: 'Portfolio pages and consultation booking for professionals.' },
  { icon: '◇', title: 'API & Webhooks', desc: 'Full REST API and webhook support for custom integrations.' },
  { icon: '◇', title: 'Team Collaboration', desc: 'Multi-user accounts with role-based access for agencies and teams.' },
  { icon: '◇', title: 'Custom Domain Support', desc: 'Publish your AI pages on your own domain.' },
  { icon: '◇', title: 'Mobile App', desc: 'Native iOS and Android app for managing your business on the go.' },
]

export default function RoadmapPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Roadmap"
        title="What We Are"
        titleGold="Building Next."
        description="A transparent look at what the Marketing OS team has shipped, what we are working on right now, and what is coming next."
      />

      <section style={{
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>

        {/* Shipped */}
        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: '#15803D',
              boxShadow: '0 0 0 3px rgba(21,128,61,0.2)',
            }} />
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.5rem,0.82vw,0.6rem)',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: '#15803D',
            }}>
              Shipped
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
            {SHIPPED.map((item, i) => (
              <div key={item.title} className="animate-fade-up" style={{
                animationDelay: `${i * 40}ms`,
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: 'clamp(0.85rem,1.6vw,1.2rem) clamp(1rem,2vw,1.4rem)',
                background: 'rgba(21,128,61,0.04)', border: '1px solid rgba(21,128,61,0.15)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <span style={{ color: '#15803D', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.92rem)', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{item.title}</p>
                  <p style={{ fontSize: 'clamp(0.68rem,1vw,0.78rem)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress */}
        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: 'var(--gold)',
              boxShadow: '0 0 0 3px var(--gold-dim)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.5rem,0.82vw,0.6rem)',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)',
            }}>
              In Progress
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
            {IN_PROGRESS.map((item, i) => (
              <div key={item.title} className="animate-fade-up" style={{
                animationDelay: `${i * 40}ms`,
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: 'clamp(0.85rem,1.6vw,1.2rem) clamp(1rem,2vw,1.4rem)',
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.92rem)', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{item.title}</p>
                  <p style={{ fontSize: 'clamp(0.68rem,1vw,0.78rem)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planned */}
        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
            <div style={{
              width: '10px', height: '10px', borderRadius: '50%',
              background: 'var(--surface-5)', border: '2px solid var(--border-md)',
            }} />
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.5rem,0.82vw,0.6rem)',
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)',
            }}>
              Planned
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
            {PLANNED.map((item, i) => (
              <div key={item.title} className="animate-fade-up" style={{
                animationDelay: `${i * 40}ms`,
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: 'clamp(0.85rem,1.6vw,1.2rem) clamp(1rem,2vw,1.4rem)',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.92rem)', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{item.title}</p>
                  <p style={{ fontSize: 'clamp(0.68rem,1vw,0.78rem)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggest */}
        <div style={{
          padding: 'clamp(1.5rem,3vw,2.5rem)',
          background: 'var(--surface-2)', border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius-xl)', textAlign: 'center',
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem,1.8vw,1.25rem)',
            color: 'var(--text-primary)', marginBottom: '0.5rem',
          }}>
            Have a feature request?
          </p>
          <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            We build what our users need. Tell us what would make Marketing OS better for you.
          </p>
          <Link href="/contact" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.8rem' }}>
            Suggest a Feature
          </Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
