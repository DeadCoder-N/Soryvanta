import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Webhooks — Marketing OS Real-Time Events',
  description: 'Receive real-time event notifications from Marketing OS. Connect your systems to leads, listings, and analytics events.',
}

const EVENTS = [
  { event: 'lead.created', desc: 'Fired when a new lead submits a form on any of your pages.' },
  { event: 'lead.updated', desc: 'Fired when a lead status or details are updated in the dashboard.' },
  { event: 'listing.published', desc: 'Fired when a new property or product listing goes live.' },
  { event: 'listing.updated', desc: 'Fired when a listing is edited or republished.' },
  { event: 'listing.deleted', desc: 'Fired when a listing is removed from the platform.' },
  { event: 'whatsapp.message', desc: 'Fired when a new WhatsApp message is received on your connected number.' },
  { event: 'analytics.milestone', desc: 'Fired when a page reaches a view or conversion milestone.' },
]

export default function WebhooksPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Webhooks"
        title="Real-Time"
        titleGold="Event Notifications."
        description="Subscribe to Marketing OS events and receive instant HTTP POST notifications to your endpoint. Build automations, sync CRMs, and trigger workflows in real time."
      />

      <section style={{
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>

        {/* How it works */}
        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: 'clamp(1.25rem,2.5vw,2rem)',
          }}>
            How It Works
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(0.75rem,1.5vw,1.25rem)',
          }}>
            {[
              { step: '01', title: 'Register Endpoint', desc: 'Provide your HTTPS endpoint URL in the dashboard.' },
              { step: '02', title: 'Select Events', desc: 'Choose which events you want to subscribe to.' },
              { step: '03', title: 'Receive Payloads', desc: 'Marketing OS sends a signed JSON POST to your endpoint instantly.' },
            ].map(s => (
              <div key={s.step} style={{
                padding: 'clamp(1rem,2vw,1.5rem)',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
              }}>
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(1.2rem,2vw,1.6rem)',
                  color: 'var(--gold)', opacity: 0.3,
                  marginBottom: '0.5rem',
                }}>
                  {s.step}
                </p>
                <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.92rem)', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {s.title}
                </p>
                <p style={{ fontSize: 'clamp(0.68rem,1vw,0.78rem)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Events */}
        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: 'clamp(1.25rem,2.5vw,2rem)',
          }}>
            Available Events
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {EVENTS.map((e, i) => (
              <div key={e.event} className="animate-fade-up" style={{
                animationDelay: `${i * 40}ms`,
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: 'clamp(0.85rem,1.6vw,1.1rem) clamp(1rem,2vw,1.4rem)',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <code style={{
                  fontSize: 'clamp(0.62rem,0.92vw,0.72rem)',
                  color: 'var(--gold)',
                  background: 'var(--gold-dim)',
                  border: '1px solid var(--gold-border)',
                  padding: '0.2em 0.55em', borderRadius: 'var(--radius-sm)',
                  fontFamily: 'monospace', flexShrink: 0, whiteSpace: 'nowrap',
                }}>
                  {e.event}
                </code>
                <p style={{ fontSize: 'clamp(0.68rem,1vw,0.78rem)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {e.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

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
            Webhooks are coming soon.
          </p>
          <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Join the waitlist to get early access when webhooks launch.
          </p>
          <Link href="/contact" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.8rem' }}>
            Get Early Access
          </Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
