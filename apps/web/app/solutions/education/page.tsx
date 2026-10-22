import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Education & Coaching — AI Course Pages & Enrolment Automation',
  description: 'Marketing OS helps education institutes and coaches create AI-powered course pages, automate enrolments, and rank on Google.',
}

const FEATURES = [
  { icon: '✦', title: 'AI Course Pages', desc: 'Generate professional course landing pages from WhatsApp. Curriculum, fees, schedule — structured automatically.' },
  { icon: '◉', title: 'Enrolment Automation', desc: 'AI bot handles student enquiries and enrolment requests 24/7 via WhatsApp.' },
  { icon: '◎', title: 'Local SEO', desc: 'Rank for "coaching classes near me" and subject-specific searches. Auto-optimized for Google.' },
  { icon: '◈', title: 'Faculty Showcase', desc: 'Highlight your teachers, qualifications, and success stories. Build credibility before enrolment.' },
  { icon: '▲', title: 'Student Testimonials', desc: 'Collect and display student success stories. Social proof that converts enquiries into enrolments.' },
  { icon: '❋', title: 'Enrolment Analytics', desc: 'Track page visits, enquiries, and enrolment conversions. Understand what drives students to join.' },
]

export default function EducationPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Education & Coaching"
        title="AI-Powered Course Pages for"
        titleGold="Educators & Coaches."
        description="Create professional course pages, automate enrolment enquiries, and rank on Google — all from a single WhatsApp message. Coming soon to Marketing OS."
        badge="Coming Soon"
        cta={{ label: 'Join Waitlist →', href: '/register' }}
        ctaSecondary={{ label: 'View All Solutions', href: '/solutions' }}
      />
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,4vw,2.5rem)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <span className="section-label">Capabilities</span>
          <div className="gold-divider" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400 }}>
            Everything educators need<br /><span style={{ color: 'var(--gold)' }}>to grow enrolments</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px,28vw,320px), 1fr))', gap: 'clamp(1rem,2vw,1.25rem)' }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className="card animate-fade-up" style={{ padding: 'clamp(1.25rem,2.5vw,1.75rem)', animationDelay: `${i * 60}ms` }}>
              <span style={{ fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--gold)', display: 'block', marginBottom: '0.75rem' }}>{f.icon}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.9rem,1.4vw,1.05rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '0.4rem' }}>{f.title}</h3>
              <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: 'var(--text-muted)', lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', padding: 'clamp(4rem,8vw,6rem) 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 clamp(1.25rem,4vw,2.5rem)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem,3.2vw,2.4rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '1rem' }}>
            Be first when<br /><span style={{ color: 'var(--gold)' }}>Education launches.</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.82rem,1.2vw,0.95rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2rem' }}>
            Join the waitlist and get early access when Marketing OS for Education goes live.
          </p>
          <Link href="/register" className="btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '0.82rem' }}>Join Waitlist →</Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
