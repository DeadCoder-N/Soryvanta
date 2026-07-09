'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const METRICS = [
  { icon: '✦', label: 'AI Powered',         sub: 'Claude AI at the core' },
  { icon: '◉', label: 'WhatsApp Native',     sub: 'No app installation' },
  { icon: '◎', label: 'SEO Optimized',       sub: 'Auto-indexed by Google' },
  { icon: '▲', label: 'Instant Publishing',  sub: 'Live in under 60 seconds' },
  { icon: '◈', label: 'Lead Automation',     sub: 'Captured & notified' },
  { icon: '❋', label: '24 × 7 Available',    sub: 'Always on, never sleeps' },
]

const INDUSTRIES = [
  { icon: '⬡', label: 'Real Estate' },
  { icon: '◆', label: 'Automotive' },
  { icon: '◉', label: 'Healthcare' },
  { icon: '✦', label: 'Education' },
  { icon: '◎', label: 'Hospitality' },
  { icon: '◈', label: 'Legal' },
  { icon: '▲', label: 'Finance' },
  { icon: '❋', label: 'Retail' },
]

const BADGES = [
  'Secure Authentication',
  'Privacy First',
  'Mobile Optimized',
  'Cloud Hosted',
  'Fast Performance',
  'AI Powered',
]

export default function TrustSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="trust"
      aria-labelledby="trust-heading"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem,8vw,7rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: 'clamp(30rem,60vw,70rem)', height: 'clamp(20rem,40vw,50rem)',
          background: 'radial-gradient(ellipse, rgba(201,150,14,0.05) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: 'clamp(18rem,30vw,36rem)', height: 'clamp(18rem,30vw,36rem)',
          background: 'radial-gradient(circle, rgba(21,128,61,0.04) 0%, transparent 65%)',
        }} />
      </div>

      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '0 clamp(1.25rem,4vw,2.5rem)',
        position: 'relative', zIndex: 1,
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <div
            className={visible && !reduced.current ? 'animate-fade-up' : ''}
            style={{ marginBottom: 'clamp(0.75rem,1.5vw,1rem)' }}
          >
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.5rem,0.85vw,0.58rem)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              Trusted Platform
            </span>
          </div>

          <div className="gold-divider" style={{ margin: '0 auto clamp(1rem,2vw,1.5rem)' }} />

          <h2
            id="trust-heading"
            className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
            style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(1.8rem,3.8vw,3rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              marginBottom: 'clamp(0.85rem,1.8vw,1.25rem)',
            }}
          >
            Designed for Growth.<br />
            <span style={{
              background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 60%, #F5D080 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Built for Professionals.
            </span>
          </h2>

          <p
            className={visible && !reduced.current ? 'animate-fade-up delay-200' : ''}
            style={{
              fontFamily: "'DM Sans', var(--font-sans), sans-serif",
              fontSize: 'clamp(0.85rem,1.3vw,1rem)',
              color: 'var(--text-secondary)', lineHeight: 1.8,
              maxWidth: '52ch', margin: '0 auto',
            }}
          >
            Brisvora combines AI automation, WhatsApp-native workflows, and SEO-first publishing to help businesses grow faster — with zero technical overhead.
          </p>
        </div>

        {/* ── Metrics grid ── */}
        <div
          className="trust-metrics-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(0.65rem,1.2vw,1rem)',
            marginBottom: 'clamp(3rem,6vw,5rem)',
          }}
        >
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={visible && !reduced.current ? `animate-fade-up` : ''}
              style={{ animationDelay: `${i * 70 + 200}ms` }}
            >
              <div
                className="trust-metric-card"
                style={{
                  padding: 'clamp(1.1rem,2.2vw,1.6rem) clamp(1rem,2vw,1.4rem)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex', alignItems: 'flex-start', gap: 'clamp(0.75rem,1.4vw,1rem)',
                  transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold-border)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-gold)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: 'clamp(2rem,3.5vw,2.6rem)', height: 'clamp(2rem,3.5vw,2.6rem)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 'clamp(0.75rem,1.3vw,1rem)', color: 'var(--gold)',
                }}>
                  {m.icon}
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.85rem,1.3vw,1rem)',
                    color: 'var(--text-primary)', lineHeight: 1.2,
                    marginBottom: '0.3rem',
                  }}>{m.label}</p>
                  <p style={{
                    fontSize: 'clamp(0.62rem,0.95vw,0.72rem)',
                    color: 'var(--text-muted)', lineHeight: 1.4,
                  }}>{m.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Thin divider ── */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--border), var(--gold-border), var(--border), transparent)',
          marginBottom: 'clamp(3rem,6vw,5rem)',
        }} />

        {/* ── Industry categories ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.48rem,0.78vw,0.55rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: 'clamp(1.25rem,2.5vw,2rem)',
          }}>
            Built for every industry
          </p>
          <div
            className="trust-industries"
            style={{
              display: 'flex', flexWrap: 'wrap',
              justifyContent: 'center', gap: 'clamp(0.5rem,1vw,0.75rem)',
            }}
          >
            {INDUSTRIES.map((ind, i) => (
              <div
                key={ind.label}
                className={visible && !reduced.current ? 'animate-fade-up' : ''}
                style={{ animationDelay: `${i * 50 + 300}ms` }}
              >
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  padding: 'clamp(0.4rem,0.8vw,0.55rem) clamp(0.85rem,1.6vw,1.2rem)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '2em',
                  fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                  color: 'var(--text-secondary)',
                  transition: 'border-color 0.25s, color 0.25s',
                  cursor: 'default',
                  whiteSpace: 'nowrap',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.color = 'var(--gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  <span style={{ fontSize: '0.7em', color: 'var(--gold)', opacity: 0.7 }}>{ind.icon}</span>
                  {ind.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Thin divider ── */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--border), var(--gold-border), var(--border), transparent)',
          marginBottom: 'clamp(3rem,6vw,5rem)',
        }} />

        {/* ── Product snapshot + Trust badges ── */}
        <div
          className="trust-bottom"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem,4vw,4rem)',
            alignItems: 'center',
          }}
        >
          {/* Product snapshot */}
          <div
            className={visible && !reduced.current ? 'animate-fade-up delay-200' : ''}
            style={{
              position: 'relative',
              animation: visible && !reduced.current ? 'trustFloat 5s ease-in-out infinite' : 'none',
            }}
          >
            <div style={{
              background: 'linear-gradient(145deg, var(--surface-2), var(--surface-1))',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(1.25rem,2.5vw,1.75rem)',
              boxShadow: '0 1.5rem 4rem rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)',
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Inner glow */}
              <div style={{
                position: 'absolute', top: '-30%', right: '-20%',
                width: '60%', height: '60%',
                background: 'radial-gradient(circle, rgba(201,150,14,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Snapshot header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)' }}>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.48rem,0.75vw,0.55rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Live Dashboard
                </p>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                    <span key={c} style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: c, opacity: 0.7 }} />
                  ))}
                </div>
              </div>

              {/* Stat row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(0.4rem,0.8vw,0.65rem)', marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)' }}>
                {[
                  { v: '24', l: 'Listings' },
                  { v: '138', l: 'Leads' },
                  { v: '4.2k', l: 'Views' },
                ].map(s => (
                  <div key={s.l} style={{
                    padding: 'clamp(0.5rem,1vw,0.75rem)',
                    background: 'var(--surface-3)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--gold)', lineHeight: 1, marginBottom: '0.2rem' }}>{s.v}</p>
                    <p style={{ fontSize: 'clamp(0.48rem,0.75vw,0.58rem)', color: 'var(--text-muted)' }}>{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Lead notification */}
              <div style={{
                padding: 'clamp(0.6rem,1.2vw,0.85rem) clamp(0.75rem,1.4vw,1rem)',
                background: 'rgba(21,128,61,0.07)', border: '1px solid rgba(21,128,61,0.18)',
                borderRadius: 'var(--radius-md)',
                display: 'flex', alignItems: 'center', gap: '0.65rem',
                marginBottom: 'clamp(0.5rem,1vw,0.75rem)',
              }}>
                <span style={{ fontSize: 'clamp(0.7rem,1.1vw,0.85rem)', color: '#15803D', flexShrink: 0 }}>◉</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 'clamp(0.6rem,0.95vw,0.72rem)', color: 'var(--text-primary)', marginBottom: '0.1rem' }}>New lead received</p>
                  <p style={{ fontSize: 'clamp(0.5rem,0.78vw,0.6rem)', color: 'var(--text-muted)' }}>WhatsApp · just now</p>
                </div>
                <span style={{ fontSize: 'clamp(0.48rem,0.75vw,0.58rem)', color: '#15803D', flexShrink: 0 }}>New</span>
              </div>

              {/* SEO bar */}
              <div style={{ padding: 'clamp(0.6rem,1.2vw,0.85rem) clamp(0.75rem,1.4vw,1rem)', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <p style={{ fontSize: 'clamp(0.55rem,0.85vw,0.65rem)', color: 'var(--text-secondary)' }}>SEO Score</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.65rem,1vw,0.78rem)', color: 'var(--gold)' }}>94 / 100</p>
                </div>
                <div style={{ height: '3px', background: 'var(--surface-4)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '94%', background: 'linear-gradient(90deg, #C9960E, #D4A837)', borderRadius: '2px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges + CTA */}
          <div className={visible && !reduced.current ? 'animate-fade-up delay-300' : ''}>
            <p style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.48rem,0.78vw,0.55rem)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: 'clamp(1rem,2vw,1.5rem)',
            }}>
              Platform Standards
            </p>

            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 'clamp(0.4rem,0.8vw,0.6rem)',
              marginBottom: 'clamp(1.75rem,3.5vw,2.5rem)',
            }}>
              {BADGES.map(b => (
                <span key={b} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  padding: 'clamp(0.35rem,0.7vw,0.5rem) clamp(0.7rem,1.3vw,1rem)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '2em',
                  fontSize: 'clamp(0.58rem,0.9vw,0.68rem)',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'nowrap',
                }}>
                  <span style={{ width: '0.3rem', height: '0.3rem', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                  {b}
                </span>
              ))}
            </div>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.1rem,2vw,1.5rem)',
              color: 'var(--text-primary)', lineHeight: 1.35,
              marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
            }}>
              Your business deserves<br />
              <span style={{ color: 'var(--gold)' }}>intelligent infrastructure.</span>
            </p>

            <p style={{
              fontSize: 'clamp(0.75rem,1.1vw,0.85rem)',
              color: 'var(--text-secondary)', lineHeight: 1.75,
              marginBottom: 'clamp(1.25rem,2.5vw,1.75rem)',
              maxWidth: '38ch',
            }}>
              From first message to indexed landing page — Brisvora handles every step so you can focus on closing deals.
            </p>

            <Link href="/register" className="btn-primary" style={{
              padding: 'clamp(0.7rem,1.4vw,0.9rem) clamp(1.4rem,2.8vw,1.8rem)',
              fontSize: 'clamp(0.7rem,1.05vw,0.8rem)',
            }}>
              Start for Free
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes trustFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-0.5rem); }
        }
        @media (max-width: 1024px) {
          .trust-metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          .trust-metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
          .trust-bottom { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .trust-metrics-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}
