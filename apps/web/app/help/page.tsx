import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'
import HoverCard from '@/components/HoverCard'

export const metadata: Metadata = {
  title: 'Help Center — Support & FAQs',
  description: 'Find answers to common questions, troubleshoot issues, and get support from the Marketing OS team.',
}

const TOPICS = [
  { icon: '◉', title: 'Getting Started', desc: 'Account setup, WhatsApp connection, and first listing.', href: '/help' },
  { icon: '✦', title: 'AI Landing Pages', desc: 'Generating, editing, and publishing pages.', href: '/help' },
  { icon: '◈', title: 'WhatsApp Bot', desc: 'Bot setup, commands, and troubleshooting.', href: '/help' },
  { icon: '◎', title: 'Leads & CRM', desc: 'Managing leads, notifications, and follow-ups.', href: '/help' },
  { icon: '▲', title: 'Billing & Plans', desc: 'Subscriptions, payments, and plan changes.', href: '/help' },
  { icon: '❋', title: 'Account & Security', desc: 'Profile, password, and account settings.', href: '/help' },
]

const FAQS = [
  { q: 'How do I connect my WhatsApp number?', a: 'Go to your Dashboard → Settings → WhatsApp. Follow the QR code scan process. Your number will be connected in under 2 minutes.' },
  { q: 'How long does it take to generate a listing?', a: 'AI generates your listing page in under 60 seconds from the moment you send the WhatsApp message.' },
  { q: 'Can I edit a page after it is generated?', a: 'Yes. You can edit any generated page from your Dashboard → Listings. Changes are published instantly.' },
  { q: 'How do I receive lead notifications?', a: 'Lead notifications are sent directly to your WhatsApp number. You can also view all leads in your Dashboard → Leads.' },
  { q: 'What happens if I cancel my subscription?', a: 'Your account moves to the free Starter plan. Your existing listings remain live. You can resubscribe at any time.' },
  { q: 'Is my data secure?', a: 'Yes. All data is encrypted in transit and at rest. We follow industry-standard security practices and never sell your data.' },
]

export default function HelpPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Help Center"
        title="How Can We"
        titleGold="Help You?"
        description="Find answers to common questions, browse help topics, or contact our support team directly."
      />

      {/* Search */}
      <div style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(1.5rem,3vw,2.5rem) 0',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)', fontSize: '1rem', pointerEvents: 'none',
            }}>⌕</span>
            <input type="search" placeholder="Search help articles..." className="input-modern"
              style={{ paddingLeft: '44px', paddingTop: '14px', paddingBottom: '14px' }} />
          </div>
        </div>
      </div>

      {/* Topics */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)' }}>
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-muted)',
          marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
        }}>
          Browse by Topic
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(220px,26vw,300px), 1fr))',
          gap: 'clamp(0.75rem,1.5vw,1.25rem)',
          marginBottom: 'clamp(3rem,6vw,5rem)',
        }}>
          {TOPICS.map((t, i) => (
            <HoverCard key={t.title} href={t.href}
              className="animate-fade-up"
              style={{
                animationDelay: `${i * 50}ms`,
                display: 'flex', alignItems: 'center', gap: '0.85rem',
                padding: 'clamp(1rem,2vw,1.4rem)',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', textDecoration: 'none',
                transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
              }}
              hoverStyle={{ borderColor: 'var(--gold-border)', transform: 'translateY(-2px)' }}
            >
              <div style={{
                width: 'clamp(2rem,3.2vw,2.5rem)', height: 'clamp(2rem,3.2vw,2.5rem)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(0.8rem,1.3vw,1rem)', color: 'var(--gold)', flexShrink: 0,
              }}>
                {t.icon}
              </div>
              <div>
                <p style={{ fontSize: 'clamp(0.8rem,1.2vw,0.9rem)', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{t.title}</p>
                <p style={{ fontSize: 'clamp(0.62rem,0.95vw,0.72rem)', color: 'var(--text-muted)' }}>{t.desc}</p>
              </div>
            </HoverCard>
          ))}
        </div>

        {/* FAQs */}
        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
          letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-muted)',
          marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
        }}>
          Frequently Asked Questions
        </p>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)',
          maxWidth: '800px',
        }}>
          {FAQS.map((faq, i) => (
            <div key={faq.q} className="animate-fade-up" style={{
              animationDelay: `${i * 50}ms`,
              padding: 'clamp(1rem,2vw,1.4rem) clamp(1.25rem,2.5vw,1.75rem)',
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.85rem,1.3vw,1rem)',
                color: 'var(--text-primary)', marginBottom: '0.5rem',
              }}>
                {faq.q}
              </p>
              <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact support */}
      <section style={{
        background: 'var(--surface-1)', borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem,6vw,5rem) 0', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.1rem,2vw,1.4rem)',
            color: 'var(--text-primary)', marginBottom: '0.75rem',
          }}>
            Still need help?
          </p>
          <p style={{ fontSize: 'clamp(0.78rem,1.1vw,0.88rem)', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Our support team typically responds within 2 hours.
          </p>
          <Link href="/contact" className="btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '0.8rem' }}>
            Contact Support
          </Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
