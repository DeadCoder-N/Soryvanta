import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'AI Workflows — Automate Repetitive Tasks',
  description: 'Marketing OS AI Workflows automate your repetitive business tasks. From lead follow-ups to page updates — let AI handle the routine.',
}

const CAPABILITIES = [
  { icon: '❋', title: 'Lead Follow-up Automation', desc: 'AI automatically sends follow-up messages to leads who haven\'t responded. Never let a warm lead go cold.' },
  { icon: '◉', title: 'WhatsApp Trigger Workflows', desc: 'Set up workflows triggered by WhatsApp messages. AI takes action automatically based on what customers send.' },
  { icon: '✦', title: 'Page Update Automation', desc: 'Update your listings and pages via WhatsApp. AI processes the update and publishes changes instantly.' },
  { icon: '◈', title: 'Lead Routing', desc: 'Automatically route leads to the right team member based on location, property type, or enquiry category.' },
  { icon: '▲', title: 'Notification Workflows', desc: 'Get the right notification at the right time. AI decides what\'s important and when to alert you.' },
  { icon: '◎', title: 'Custom Automation Rules', desc: 'Define your own workflow rules. If this happens, AI does that — tailored to your exact business process.' },
]

export default function AIWorkflowsPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="AI Workflows"
        title="Automate the Routine."
        titleGold="Focus on What Matters."
        description="Marketing OS AI Workflows handle your repetitive tasks automatically — lead follow-ups, page updates, notifications, and routing. Set it once, let AI run it forever."
        badge="Coming Soon"
        cta={{ label: 'Join Waitlist →', href: '/register' }}
        ctaSecondary={{ label: 'Explore All Features', href: '/features' }}
      />
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Capabilities</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400 }}>
            Workflows that run<br /><span style={{ color: 'var(--gold)' }}>without you</span>
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
            Be first when<br /><span style={{ color: 'var(--gold)' }}>AI Workflows launches.</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Join the waitlist and get early access when AI Workflows goes live.
          </p>
          <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>Join Waitlist →</Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
