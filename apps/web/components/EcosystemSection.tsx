'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const MODULES = [
  { id: 'listing',    icon: '⬡', label: 'AI Listing Generator',    desc: 'WhatsApp to live listing in seconds.',     status: 'available',    angle: 270 },
  { id: 'landing',    icon: '◈', label: 'AI Landing Page Builder',  desc: 'Custom pages generated automatically.',    status: 'coming-soon',  angle: 330 },
  { id: 'website',    icon: '◎', label: 'AI Website Builder',       desc: 'Full business websites, zero code.',       status: 'coming-soon',  angle: 30  },
  { id: 'seo',        icon: '▲', label: 'AI SEO Engine',            desc: 'Rank higher without manual effort.',       status: 'coming-soon',  angle: 90  },
  { id: 'crm',        icon: '◆', label: 'AI CRM Assistant',         desc: 'Manage leads and follow-ups with AI.',     status: 'coming-soon',  angle: 150 },
  { id: 'analytics',  icon: '✦', label: 'AI Analytics',             desc: 'Understand growth with intelligent data.', status: 'coming-soon',  angle: 210 },
  { id: 'campaign',   icon: '❋', label: 'AI Campaign Generator',    desc: 'Launch campaigns from one message.',       status: 'coming-soon',  angle: 255 },
  { id: 'social',     icon: '◉', label: 'AI Social Media',          desc: 'Auto-publish across every platform.',      status: 'coming-soon',  angle: 305 },
  { id: 'email',      icon: '◇', label: 'AI Email Marketing',       desc: 'Personalised emails at scale.',            status: 'coming-soon',  angle: 355 },
  { id: 'workflow',   icon: '⟡', label: 'AI Workflow Automation',   desc: 'Connect every tool, automate every task.', status: 'coming-soon',  angle: 45  },
]

const BENEFITS = [
  { icon: '◈', label: 'One Platform',         desc: 'Every tool in one place.' },
  { icon: '✦', label: 'Unified Data',          desc: 'All insights connected.' },
  { icon: '◉', label: 'AI Automation',         desc: 'Less work, more output.' },
  { icon: '▲', label: 'Scalable Growth',       desc: 'Grows with your business.' },
  { icon: '◎', label: 'Zero Complexity',       desc: 'No technical knowledge needed.' },
  { icon: '❋', label: 'Business Intelligence', desc: 'Decisions backed by data.' },
]

// Radial position helper
function radialPos(angleDeg: number, radiusPct: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    left: `${parseFloat((50 + radiusPct * Math.cos(rad)).toFixed(4))}%`,
    top:  `${parseFloat((50 + radiusPct * Math.sin(rad)).toFixed(4))}%`,
  }
}

export default function EcosystemSection() {
  const [visible,  setVisible]  = useState(false)
  const [hovered,  setHovered]  = useState<string | null>(null)
  const [activeIdx, setActive]  = useState(0)
  const ref     = useRef<HTMLElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.06 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || reduced.current) return
    const id = setInterval(() => setActive(i => (i + 1) % MODULES.length), 2000)
    return () => clearInterval(id)
  }, [visible])

  return (
    <section
      ref={ref}
      id="ecosystem"
      aria-labelledby="eco-heading"
      style={{
        position: 'relative',
        background: 'var(--surface-1)',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem,8vw,7rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Ambient */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 'clamp(30rem,55vw,70rem)', height: 'clamp(30rem,55vw,70rem)',
          background: 'radial-gradient(circle, rgba(201,150,14,0.055) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '-5%',
          width: 'clamp(18rem,28vw,36rem)', height: 'clamp(18rem,28vw,36rem)',
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
          <div className={visible && !reduced.current ? 'animate-fade-up' : ''} style={{ marginBottom: 'clamp(0.65rem,1.2vw,0.9rem)' }}>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.5rem,0.85vw,0.58rem)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>AI Ecosystem</span>
          </div>
          <div className="gold-divider" style={{ margin: '0 auto clamp(0.85rem,1.6vw,1.2rem)' }} />
          <h2
            id="eco-heading"
            className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
            style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(1.8rem,3.8vw,3rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: 'var(--text-primary)', letterSpacing: '-0.01em',
              marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
            }}
          >
            Everything Your Business Needs.<br />
            <span style={{
              background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 55%, #F5D080 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Powered by AI.</span>
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
            Instead of juggling disconnected tools, Brisvora brings every AI-powered workflow into one intelligent platform — built to grow with your business.
          </p>
        </div>

        {/* ── Radial ecosystem — desktop ── */}
        <div
          className="eco-radial"
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '72%',
            marginBottom: 'clamp(3rem,6vw,5rem)',
          }}
        >
          {/* SVG connection lines */}
          <svg
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 100 72"
            preserveAspectRatio="xMidYMid meet"
          >
            {MODULES.map((m) => {
              const rad = (m.angle - 90) * (Math.PI / 180)
              const r   = 30
              const x2  = parseFloat((50 + r * Math.cos(rad)).toFixed(4))
              const y2  = parseFloat((36 + r * Math.sin(rad)).toFixed(4))
              const isHov = hovered === m.id
              const isAct = MODULES[activeIdx].id === m.id
              return (
                <line
                  key={m.id}
                  x1="50" y1="36"
                  x2={x2} y2={y2}
                  stroke={isHov || isAct ? 'rgba(201,150,14,0.5)' : 'rgba(201,150,14,0.12)'}
                  strokeWidth={isHov || isAct ? '0.3' : '0.15'}
                  strokeDasharray={m.status === 'coming-soon' ? '0.8 1.2' : 'none'}
                  style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
                />
              )
            })}
          </svg>

          {/* AI Core */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
          }}>
            <div style={{
              width: 'clamp(5rem,9vw,7.5rem)', height: 'clamp(5rem,9vw,7.5rem)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--surface-3), var(--surface-2))',
              border: '1px solid var(--gold-border)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.2rem',
              boxShadow: '0 0 0 1px var(--gold-border), 0 0 2rem rgba(201,150,14,0.12)',
              animation: visible && !reduced.current ? 'ecoCorePulse 3s ease-in-out infinite' : 'none',
            }}>
              <span style={{ fontSize: 'clamp(1.2rem,2.2vw,1.8rem)', color: 'var(--gold)' }}>✦</span>
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.38rem,0.65vw,0.5rem)',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--gold)', textAlign: 'center', lineHeight: 1.3,
              }}>Brisvora<br />AI</p>
            </div>
          </div>

          {/* Module cards */}
          {MODULES.map((m, i) => {
            const pos     = radialPos(m.angle, 30)
            const isAct   = MODULES[activeIdx].id === m.id
            const isHov   = hovered === m.id
            const avail   = m.status === 'available'
            return (
              <div
                key={m.id}
                style={{
                  position: 'absolute',
                  ...pos,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  width: 'clamp(7rem,12vw,10rem)',
                }}
                onMouseEnter={() => setHovered(m.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={visible && !reduced.current ? 'animate-fade-up' : ''}
                  style={{ animationDelay: `${i * 60 + 200}ms` }}
                >
                  <div style={{
                    padding: 'clamp(0.6rem,1.1vw,0.85rem)',
                    background: isHov || isAct
                      ? avail ? 'rgba(21,128,61,0.07)' : 'var(--gold-dim)'
                      : 'var(--surface-2)',
                    border: `1px solid ${isHov || isAct
                      ? avail ? 'rgba(21,128,61,0.25)' : 'var(--gold-border)'
                      : 'var(--border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    transform: isHov ? 'translateY(-3px) scale(1.03)' : 'none',
                    boxShadow: isHov ? '0 0.5rem 1.5rem rgba(0,0,0,0.2)' : 'none',
                    cursor: 'default',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontSize: 'clamp(0.9rem,1.6vw,1.2rem)',
                      color: avail ? '#15803D' : 'var(--text-muted)',
                      marginBottom: '0.3rem',
                      transition: 'color 0.3s',
                    }}>{m.icon}</div>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.55rem,0.85vw,0.68rem)',
                      color: 'var(--text-primary)', lineHeight: 1.25,
                      marginBottom: '0.3rem',
                    }}>{m.label}</p>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                      fontSize: 'clamp(0.4rem,0.62vw,0.48rem)',
                      letterSpacing: '0.08em',
                      color: avail ? '#15803D' : 'var(--text-muted)',
                      background: avail ? 'rgba(21,128,61,0.08)' : 'var(--surface-3)',
                      border: `1px solid ${avail ? 'rgba(21,128,61,0.2)' : 'var(--border)'}`,
                      padding: '0.15em 0.5em', borderRadius: '2em',
                    }}>
                      <span style={{
                        width: '0.25rem', height: '0.25rem', borderRadius: '50%',
                        background: avail ? '#15803D' : 'var(--text-muted)',
                        animation: avail && !reduced.current ? 'ecoDot 2s infinite' : 'none',
                      }} />
                      {avail ? 'Available' : 'Soon'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Mobile card list ── */}
        <div
          className="eco-mobile-list"
          style={{
            display: 'none',
            flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)',
            marginBottom: 'clamp(2.5rem,5vw,4rem)',
          }}
        >
          {MODULES.map((m, i) => {
            const avail = m.status === 'available'
            return (
              <div
                key={m.id}
                className={visible && !reduced.current ? 'animate-fade-up' : ''}
                style={{ animationDelay: `${i * 50 + 150}ms` }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem,1.5vw,1rem)',
                  padding: 'clamp(0.75rem,1.5vw,1rem) clamp(0.85rem,1.6vw,1.1rem)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'border-color 0.25s',
                }}>
                  <span style={{ fontSize: 'clamp(0.9rem,1.6vw,1.1rem)', color: avail ? '#15803D' : 'var(--text-muted)', flexShrink: 0 }}>{m.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.78rem,1.2vw,0.9rem)', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{m.label}</p>
                    <p style={{ fontSize: 'clamp(0.6rem,0.9vw,0.7rem)', color: 'var(--text-muted)', lineHeight: 1.4 }}>{m.desc}</p>
                  </div>
                  <span style={{
                    flexShrink: 0,
                    fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                    letterSpacing: '0.08em',
                    color: avail ? '#15803D' : 'var(--text-muted)',
                    background: avail ? 'rgba(21,128,61,0.08)' : 'var(--surface-3)',
                    border: `1px solid ${avail ? 'rgba(21,128,61,0.2)' : 'var(--border)'}`,
                    padding: '0.2em 0.6em', borderRadius: '2em',
                    whiteSpace: 'nowrap',
                  }}>
                    {avail ? 'Available' : 'Coming Soon'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Benefits ── */}
        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <p
            className={visible && !reduced.current ? 'animate-fade-up' : ''}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-muted)', textAlign: 'center',
              marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
            }}
          >
            Platform Advantages
          </p>
          <div
            className="eco-benefits"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(0.65rem,1.2vw,1rem)',
            }}
          >
            {BENEFITS.map((b, i) => (
              <div
                key={b.label}
                className={visible && !reduced.current ? 'animate-fade-up' : ''}
                style={{ animationDelay: `${i * 60 + 150}ms` }}
              >
                <div style={{
                  padding: 'clamp(1rem,2vw,1.4rem)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  transition: 'border-color 0.25s, transform 0.25s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <span style={{
                    fontSize: 'clamp(0.75rem,1.2vw,0.9rem)',
                    color: 'var(--gold)', flexShrink: 0, marginTop: '0.1rem',
                  }}>{b.icon}</span>
                  <div>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.78rem,1.2vw,0.9rem)',
                      color: 'var(--text-primary)', marginBottom: '0.2rem',
                    }}>{b.label}</p>
                    <p style={{
                      fontSize: 'clamp(0.6rem,0.9vw,0.7rem)',
                      color: 'var(--text-muted)', lineHeight: 1.5,
                    }}>{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-300' : ''}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            height: '1px', width: 'clamp(3rem,8vw,6rem)',
            background: 'linear-gradient(90deg, transparent, var(--gold-border), transparent)',
            margin: '0 auto clamp(1.5rem,3vw,2.5rem)',
          }} />
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" className="btn-primary" style={{
              padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
              fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            }}>
              Explore the Platform
            </Link>
            <Link href="/roadmap" className="btn-secondary" style={{
              padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
              fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            }}>
              See Product Roadmap
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ecoCorePulse {
          0%,100% { box-shadow: 0 0 0 1px var(--gold-border), 0 0 2rem rgba(201,150,14,0.10); }
          50%      { box-shadow: 0 0 0 1px var(--gold-border), 0 0 3.5rem rgba(201,150,14,0.18); }
        }
        @keyframes ecoDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        @media (max-width: 1024px) {
          .eco-radial       { display: none !important; }
          .eco-mobile-list  { display: flex !important; }
          .eco-benefits     { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .eco-benefits { grid-template-columns: 1fr !important; }
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
