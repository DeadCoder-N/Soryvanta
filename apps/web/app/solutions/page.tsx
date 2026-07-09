import type { Metadata } from 'next'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'
import HoverCard from '@/components/HoverCard'

export const metadata: Metadata = {
  title: 'Solutions — AI for Every Industry',
  description: 'Brisvora adapts its AI workflows, landing pages, and automation to match your industry. Real Estate, Hotels, Restaurants, Healthcare, Education, Retail, and more.',
}

const INDUSTRIES = [
  { href: '/solutions/real-estate', icon: '⬡', label: 'Real Estate', desc: 'AI listings, WhatsApp leads, SEO pages for property brokers.', status: 'Live' },
  { href: '/solutions/hotels', icon: '◈', label: 'Hotels & Resorts', desc: 'Booking pages, reviews, and enquiry automation.', status: 'Soon' },
  { href: '/solutions/restaurants', icon: '◉', label: 'Restaurants & Cafés', desc: 'Menu pages, reservations, and Google visibility.', status: 'Soon' },
  { href: '/solutions/healthcare', icon: '◎', label: 'Healthcare Clinics', desc: 'Appointments, patient enquiries, and SEO ranking.', status: 'Soon' },
  { href: '/solutions/education', icon: '✦', label: 'Education & Coaching', desc: 'Course pages, enrolments, and lead automation.', status: 'Soon' },
  { href: '/solutions/retail', icon: '◆', label: 'Retail & E-commerce', desc: 'Product pages, orders, and customer automation.', status: 'Soon' },
  { href: '/solutions/professional-services', icon: '▲', label: 'Professional Services', desc: 'Service pages, consultations, and lead capture.', status: 'Soon' },
]

export default function SolutionsPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Solutions"
        title="Built for Every Business"
        titleGold="Ready to Grow."
        description="Every industry has different challenges. Brisvora adapts its AI workflows, landing pages, automation and analytics to match each business type."
        cta={{ label: 'Start Free →', href: '/register' }}
        ctaSecondary={{ label: 'View Features', href: '/features' }}
      />

      <section style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 clamp(1.25rem,4vw,2.5rem) clamp(5rem,10vw,8rem)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px,28vw,340px), 1fr))',
          gap: 'clamp(1rem,2vw,1.5rem)',
        }}>
          {INDUSTRIES.map((ind, i) => (
            <HoverCard
              key={ind.href}
              href={ind.href}
              className="animate-fade-up"
              style={{
                animationDelay: `${i * 60}ms`,
                display: 'flex', flexDirection: 'column',
                padding: 'clamp(1.25rem,2.5vw,1.75rem)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-xl)',
                textDecoration: 'none',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              <div style={{
                width: 'clamp(2.5rem,4vw,3rem)', height: 'clamp(2.5rem,4vw,3rem)',
                borderRadius: 'var(--radius-md)',
                background: ind.status === 'Live' ? 'rgba(21,128,61,0.08)' : 'var(--gold-dim)',
                border: `1px solid ${ind.status === 'Live' ? 'rgba(21,128,61,0.22)' : 'var(--gold-border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(1rem,1.8vw,1.3rem)',
                color: ind.status === 'Live' ? '#15803D' : 'var(--gold)',
                marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
                flexShrink: 0,
              }}>
                {ind.icon}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(0.95rem,1.5vw,1.1rem)',
                  color: 'var(--text-primary)', lineHeight: 1.2,
                }}>
                  {ind.label}
                </p>
                <span style={{
                  fontSize: 'clamp(0.4rem,0.62vw,0.48rem)',
                  color: ind.status === 'Live' ? '#15803D' : 'var(--text-muted)',
                  background: ind.status === 'Live' ? 'rgba(21,128,61,0.08)' : 'var(--surface-3)',
                  border: `1px solid ${ind.status === 'Live' ? 'rgba(21,128,61,0.2)' : 'var(--border)'}`,
                  padding: '0.15em 0.5em', borderRadius: '2em',
                  letterSpacing: '0.06em',
                }}>
                  {ind.status}
                </span>
              </div>

              <p style={{
                fontSize: 'clamp(0.72rem,1.1vw,0.82rem)',
                color: 'var(--text-muted)', lineHeight: 1.6,
                flex: 1,
              }}>
                {ind.desc}
              </p>

              <div style={{
                marginTop: 'clamp(1rem,2vw,1.25rem)',
                fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                color: 'var(--gold)',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
              }}>
                Learn more →
              </div>
            </HoverCard>
          ))}
        </div>
      </section>
    </MarketingLayout>
  )
}
