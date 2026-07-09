import type { Metadata } from 'next'
import Link from 'next/link'
import MarketingLayout from '@/components/MarketingLayout'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Security — Brisvora',
  description: 'How Brisvora protects your data and platform security practices.',
}

const PRACTICES = [
  {
    icon: '◆',
    title: 'Encryption in Transit',
    desc: 'All data transmitted between your browser and Brisvora is encrypted using TLS 1.3. We enforce HTTPS across all endpoints with no fallback to HTTP.',
  },
  {
    icon: '◆',
    title: 'Encryption at Rest',
    desc: 'Your data is encrypted at rest using AES-256 on our cloud infrastructure. Database backups are also encrypted.',
  },
  {
    icon: '◆',
    title: 'Authentication Security',
    desc: 'Passwords are hashed using bcrypt with a high work factor. We support secure session management with short-lived JWT tokens and automatic expiry.',
  },
  {
    icon: '◆',
    title: 'Infrastructure Security',
    desc: 'Brisvora runs on AWS and Supabase infrastructure with network isolation, private VPCs, and restricted access controls. Production systems are not accessible from the public internet.',
  },
  {
    icon: '◆',
    title: 'Access Controls',
    desc: 'Role-based access control (RBAC) ensures users can only access data they are authorized to see. Admin, broker, and user roles are strictly enforced at the API level.',
  },
  {
    icon: '◆',
    title: 'Dependency Management',
    desc: 'We regularly audit and update third-party dependencies to patch known vulnerabilities. Our CI pipeline includes automated security scanning.',
  },
]

export default function SecurityPage() {
  return (
    <MarketingLayout>
      <PageHero
        label="Security"
        title="Built Secure"
        titleGold="From Day One."
        description="Security is not an afterthought at Brisvora. Every layer of the platform is designed with your data protection in mind."
      />

      <section style={{
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,4vw,2.5rem)',
      }}>

        {/* Status */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: 'clamp(0.85rem,1.6vw,1.1rem) clamp(1rem,2vw,1.4rem)',
          background: 'rgba(21,128,61,0.04)', border: '1px solid rgba(21,128,61,0.2)',
          borderRadius: 'var(--radius-lg)', marginBottom: 'clamp(2.5rem,5vw,4rem)',
        }}>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: '#15803D', flexShrink: 0,
            boxShadow: '0 0 0 3px rgba(21,128,61,0.2)',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          <p style={{ fontSize: 'clamp(0.72rem,1.05vw,0.82rem)', color: '#15803D' }}>
            All systems operational — No active security incidents
          </p>
        </div>

        {/* Practices */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(0.75rem,1.5vw,1.25rem)',
          marginBottom: 'clamp(3rem,6vw,5rem)',
        }}>
          {PRACTICES.map((p, i) => (
            <div key={p.title} className="animate-fade-up" style={{
              animationDelay: `${i * 50}ms`,
              padding: 'clamp(1.25rem,2.5vw,1.75rem)',
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
            }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.75rem', display: 'block', marginBottom: '0.6rem' }}>
                {p.icon}
              </span>
              <p style={{
                fontSize: 'clamp(0.82rem,1.2vw,0.92rem)',
                color: 'var(--text-primary)', marginBottom: '0.5rem',
              }}>
                {p.title}
              </p>
              <p style={{ fontSize: 'clamp(0.68rem,1vw,0.78rem)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Responsible Disclosure */}
        <div style={{
          padding: 'clamp(1.5rem,3vw,2.5rem)',
          background: 'var(--surface-2)', border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius-xl)',
        }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '0.75rem',
          }}>
            Responsible Disclosure
          </p>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1rem,1.6vw,1.15rem)',
            color: 'var(--text-primary)', fontWeight: 400,
            marginBottom: '0.75rem',
          }}>
            Found a security vulnerability?
          </p>
          <p style={{
            fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            color: 'var(--text-secondary)', lineHeight: 1.7,
            marginBottom: '1.25rem',
          }}>
            We take security reports seriously. If you discover a vulnerability in Brisvora, please report it responsibly. Do not publicly disclose the issue until we have had a chance to investigate and resolve it.
          </p>
          <Link
            href="mailto:security@brisvora.com"
            className="btn-primary"
            style={{ padding: '0.85rem 1.75rem', fontSize: '0.8rem', display: 'inline-block' }}
          >
            Report a Vulnerability
          </Link>
        </div>
      </section>
    </MarketingLayout>
  )
}
