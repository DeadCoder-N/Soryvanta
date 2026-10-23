'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const NAV_PLATFORM = [
  { href: '/features', label: 'Features' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/docs', label: 'Documentation' },
  { href: '/api', label: 'API' },
  { href: '/dashboard', label: 'Dashboard' },
]

const NAV_COMPANY = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/contact#careers', label: 'Careers' },
  { href: '/contact#partners', label: 'Partners' },
  { href: '/contact#press', label: 'Press' },
]

const NAV_RESOURCES = [
  { href: '/blog', label: 'Blog' },
  { href: '/guides', label: 'Guides' },
  { href: '/help', label: 'Help Center' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/changelog', label: 'Changelog' },
]

const NAV_DEVELOPERS = [
  { href: '/api', label: 'API Reference' },
  { href: 'https://github.com/DeadCoder-N/BRISVORA', label: 'GitHub' },
  { href: '/sdks', label: 'SDKs' },
  { href: '/webhooks', label: 'Webhooks' },
  { href: '/docs/dev', label: 'Developer Docs' },
]

const TRUST_BADGES = [
  'AI Powered',
  'SEO Ready',
  'Mobile First',
  'WhatsApp Native',
  'Secure Infrastructure',
  'Accessible',
  'Production Ready',
]

const SOCIALS = [
  { label: '𝕏', href: 'https://x.com/marketingos' },
  { label: 'in', href: 'https://linkedin.com/company/marketingos' },
  { label: '◐', href: 'https://instagram.com/marketingos' },
  { label: '▶', href: 'https://youtube.com/@marketingos' },
  { label: '⌂', href: 'https://github.com/DeadCoder-N/BRISVORA' },
]

export default function Footer() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer
      ref={ref}
      id="footer"
      aria-labelledby="footer-heading"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(3rem,6vw,5rem) 0 0',
        overflow: 'hidden',
      }}
    >
      {/* ── Decorative Background ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Metallic gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(201,168,76,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 50% 30% at 20% 100%, rgba(21,128,61,0.02) 0%, transparent 50%),
            radial-gradient(ellipse 40% 30% at 80% 100%, rgba(201,168,76,0.02) 0%, transparent 50%)
          `,
        }} />

        {/* Subtle gold light sweep */}
        {!reduced.current && (
          <div
            className="footer-sweep"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(105deg, transparent 0%, transparent 40%, rgba(201,168,76,0.03) 48%, rgba(201,168,76,0.04) 50%, rgba(201,168,76,0.03) 52%, transparent 60%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'footer-sweep 10s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Top gold line */}
        <div style={{
          position: 'absolute', top: 0, left: '5%',
          width: '90%', height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold-border), transparent)',
        }} />
      </div>

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 clamp(1.25rem,4vw,2.5rem)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* ── Main Grid ── */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1.2fr',
            gap: 'clamp(1.5rem,3vw,3rem)',
            paddingBottom: 'clamp(2.5rem,5vw,4rem)',
            borderBottom: '1px solid var(--border)',
          }}
        >
{/* ── Brand Column ── */}
          <div className={visible && !reduced.current ? 'animate-fade-up' : ''}>
            <span style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(0.95rem,1.5vw,1.15rem)',
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
            }}>
              Marketing OS
              <span style={{
                color: 'var(--gold)',
                fontSize: '0.5rem',
                verticalAlign: 'super',
                marginLeft: '2px',
              }}>
                ™
              </span>
            </span>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(0.72rem,1.1vw,0.85rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: 'clamp(0.65rem,1.2vw,0.85rem)',
              maxWidth: '280px',
            }}>
              Your AI-Powered Growth Operating System.
            </p>

            <p style={{
              fontSize: 'clamp(0.62rem,0.95vw,0.72rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              maxWidth: '300px',
              marginBottom: 'clamp(1rem,2vw,1.5rem)',
            }}>
              Marketing OS brings AI, automation, SEO and business growth together into one intelligent platform built for modern businesses.
            </p>

            {/* Product Status */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'clamp(0.4rem,0.7vw,0.55rem)',
              padding: 'clamp(0.35rem,0.65vw,0.5rem) clamp(0.65rem,1.2vw,0.9rem)',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: '2em',
              marginBottom: 'clamp(1rem,2vw,1.5rem)',
            }}>
              <span style={{
                width: '6px', height: '6px',
                borderRadius: '50%',
                background: '#15803D',
                display: 'block',
                animation: reduced.current ? 'none' : 'status-pulse 2s ease-in-out infinite',
              }} />
              <span style={{
                fontSize: 'clamp(0.5rem,0.78vw,0.6rem)',
                color: 'var(--text-muted)',
                fontFamily: "'Cinzel', serif",
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                All Systems Operational
              </span>
              <span style={{
                fontSize: 'clamp(0.4rem,0.65vw,0.5rem)',
                color: 'var(--text-muted)',
                opacity: 0.4,
              }}>
                v2.4.1
              </span>
            </div>
          </div>

          {/* ── Platform ── */}
          <div className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}>
            <p style={{
              fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontFamily: "'Cinzel', serif",
              marginBottom: 'clamp(0.85rem,1.6vw,1.1rem)',
            }}>
              Platform
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,0.9vw,0.65rem)' }}>
              {NAV_PLATFORM.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="footer-link"
                  style={{
                    fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, padding-left 0.2s',
                    display: 'inline-block',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.paddingLeft = '4px' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.paddingLeft = '0' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Company ── */}
          <div className={visible && !reduced.current ? 'animate-fade-up delay-150' : ''}>
            <p style={{
              fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontFamily: "'Cinzel', serif",
              marginBottom: 'clamp(0.85rem,1.6vw,1.1rem)',
            }}>
              Company
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,0.9vw,0.65rem)' }}>
              {NAV_COMPANY.map(l => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="footer-link"
                  style={{
                    fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, padding-left 0.2s',
                    display: 'inline-block',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.paddingLeft = '4px' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.paddingLeft = '0' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Resources ── */}
          <div className={visible && !reduced.current ? 'animate-fade-up delay-200' : ''}>
            <p style={{
              fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontFamily: "'Cinzel', serif",
              marginBottom: 'clamp(0.85rem,1.6vw,1.1rem)',
            }}>
              Resources
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,0.9vw,0.65rem)' }}>
              {NAV_RESOURCES.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="footer-link"
                  style={{
                    fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, padding-left 0.2s',
                    display: 'inline-block',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.paddingLeft = '4px' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.paddingLeft = '0' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Newsletter + Developers ── */}
          <div className={visible && !reduced.current ? 'animate-fade-up delay-250' : ''}>
            {/* Developers */}
            <p style={{
              fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontFamily: "'Cinzel', serif",
              marginBottom: 'clamp(0.85rem,1.6vw,1.1rem)',
            }}>
              Developers
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,0.9vw,0.65rem)', marginBottom: 'clamp(1.5rem,3vw,2.5rem)' }}>
              {NAV_DEVELOPERS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="footer-link"
                  style={{
                    fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, padding-left 0.2s',
                    display: 'inline-block',
                    width: 'fit-content',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.paddingLeft = '4px' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.paddingLeft = '0' }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <p style={{
              fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontFamily: "'Cinzel', serif",
              marginBottom: 'clamp(0.5rem,0.9vw,0.65rem)',
            }}>
              Stay Updated
            </p>
            <p style={{
              fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: 'clamp(0.65rem,1.2vw,0.85rem)',
            }}>
              Receive product updates, new AI features and launch announcements.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.4rem' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                aria-label="Email for newsletter"
                required
                style={{
                  flex: 1,
                  padding: 'clamp(0.5rem,0.9vw,0.65rem) clamp(0.65rem,1.2vw,0.85rem)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(0.58rem,0.9vw,0.68rem)',
                  outline: 'none',
                  transition: 'border-color 0.25s',
                  minWidth: 0,
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold-border)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{
                  padding: 'clamp(0.5rem,0.9vw,0.65rem) clamp(0.75rem,1.4vw,1rem)',
                  fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {subscribed ? '✓ Sent' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* ── Trust Bar ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-200' : ''}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(0.35rem,0.6vw,0.5rem)',
            padding: 'clamp(1.25rem,2.5vw,2rem) 0',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {TRUST_BADGES.map((badge, i) => (
            <div
              key={badge}
              className="footer-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(0.3rem,0.5vw,0.4rem)',
                padding: 'clamp(0.3rem,0.55vw,0.45rem) clamp(0.6rem,1.1vw,0.8rem)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '2em',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold-border)'
                e.currentTarget.style.background = 'var(--gold-dim)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'var(--surface-2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{
                width: 'clamp(0.3rem,0.5vw,0.4rem)',
                height: 'clamp(0.3rem,0.5vw,0.4rem)',
                borderRadius: '50%',
                background: '#15803D',
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: 'clamp(0.5rem,0.78vw,0.6rem)',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}>
                {badge}
              </span>
            </div>
          ))}
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-300' : ''}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(0.75rem,1.5vw,1.25rem)',
            padding: 'clamp(1.25rem,2.5vw,2rem) 0',
          }}
        >
          {/* Social */}
          <div style={{ display: 'flex', gap: 'clamp(0.4rem,0.7vw,0.55rem)' }}>
            {SOCIALS.map(s => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="footer-social"
                style={{
                  width: 'clamp(2rem,3.2vw,2.4rem)',
                  height: 'clamp(2rem,3.2vw,2.4rem)',
                  borderRadius: '50%',
                  border: '1px solid var(--border)',
                  background: 'var(--surface-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'clamp(0.6rem,0.95vw,0.72rem)',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold-border)'
                  e.currentTarget.style.color = 'var(--gold)'
                  e.currentTarget.style.background = 'var(--gold-dim)'
                  e.currentTarget.style.transform = 'translateY(-2px) rotate(8deg)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-muted)'
                  e.currentTarget.style.background = 'var(--surface-2)'
                  e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'
                }}
              >
                {s.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.65rem,1.2vw,1rem)',
            flexWrap: 'wrap',
          }}>
            {['Privacy Policy', 'Terms', 'Cookies', 'Licenses', 'Security'].map((legal, i) => (
              <Link
                key={legal}
                href={`/${legal.toLowerCase().replace(/\s+/g, '-')}`}
                className="footer-link"
                style={{
                  fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)' }}
              >
                {legal}
                {i < 4 && (
                  <span style={{ marginLeft: 'clamp(0.65rem,1.2vw,1rem)', opacity: 0.2 }}>|</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Copyright ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-350' : ''}
          style={{
            borderTop: '1px solid var(--border)',
            padding: 'clamp(0.85rem,1.6vw,1.1rem) 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <p style={{
            fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
            color: 'var(--text-muted)',
          }}>
            © 2026 Marketing OS Technologies. Built for businesses that grow.
          </p>
          <p style={{
            fontSize: 'clamp(0.5rem,0.78vw,0.6rem)',
            color: 'var(--text-muted)',
            opacity: 0.5,
            letterSpacing: '0.04em',
          }}>
            Made in India 🇮🇳 · Developed by{' '}
            <a
              href="https://github.com/DeadCoder-N"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', opacity: 0.7 }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = 'var(--gold)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.color = 'inherit' }}
            >
              DeadCoder-N
            </a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes footer-sweep {
          0%   { background-position: 200% 0; }
          50%  { background-position: -50% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes status-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(21,128,61,0.4); }
          50%      { opacity: 0.7; box-shadow: 0 0 0 4px rgba(21,128,61,0); }
        }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1.5fr 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-sweep { animation: none !important; opacity: 0.04; }
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </footer>
  )
}