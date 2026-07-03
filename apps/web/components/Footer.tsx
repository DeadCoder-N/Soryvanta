'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', padding: '48px 0 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Image src="/Brisvora.png" alt="Brisvora" width={32} height={32} style={{ objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)' }}>Brisvora</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '220px' }}>
              AI-powered property listings for Indian real estate brokers.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Platform</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { href: '/', label: 'Browse Properties' },
                { href: '/register', label: 'List a Property' },
                { href: '/login', label: 'Broker Login' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Contact</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>support@brisvora.in</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <span style={{ fontSize: '0.68rem', color: 'var(--gold)', background: 'var(--gold-dim)', border: '1px solid var(--gold-border)', padding: '3px 10px', borderRadius: '999px' }}>
                WhatsApp First
              </span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>© 2026 Brisvora. All rights reserved.</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  )
}
