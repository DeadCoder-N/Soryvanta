'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const ACTIVE_INTEGRATIONS = [
  {
    id: 'whatsapp', label: 'WhatsApp', icon: '◉', angle: 270,
    purpose: 'Receive business info, generate listings, lead conversations.',
    status: 'active',
  },
  {
    id: 'google', label: 'Google Search', icon: '◎', angle: 330,
    purpose: 'SEO, organic visibility, automatic indexing.',
    status: 'active',
  },
  {
    id: 'cloudinary', label: 'Cloudinary', icon: '⬡', angle: 30,
    purpose: 'Image optimisation and fast media delivery.',
    status: 'active',
  },
  {
    id: 'supabase', label: 'Supabase', icon: '◆', angle: 90,
    purpose: 'Secure database and real-time business data.',
    status: 'active',
  },
  {
    id: 'vercel', label: 'Vercel', icon: '▲', angle: 150,
    purpose: 'Fast global deployment and hosting.',
    status: 'active',
  },
  {
    id: 'email', label: 'Email', icon: '✦', angle: 210,
    purpose: 'Lead alerts, notifications and automated emails.',
    status: 'active',
  },
]

const COMING_SOON = [
  'Google Business', 'Meta', 'Instagram', 'LinkedIn',
  'Google Analytics', 'Stripe', 'Razorpay', 'HubSpot',
  'Salesforce', 'Calendly', 'Zapier', 'n8n',
  'Twilio', 'YouTube', 'PhonePe', 'Microsoft 365',
]

const BENEFITS = [
  { icon: '◈', label: 'Everything Connected',   desc: 'All tools in one workflow.' },
  { icon: '▲', label: 'Central Dashboard',       desc: 'One place for all data.' },
  { icon: '◉', label: 'Automatic Sync',          desc: 'Real-time data across tools.' },
  { icon: '✦', label: 'AI Powered',              desc: 'Intelligence at every step.' },
  { icon: '◎', label: 'Future Ready',            desc: 'New integrations added continuously.' },
  { icon: '❋', label: 'Enterprise Architecture', desc: 'Built to scale without limits.' },
]

function radialPos(angleDeg: number, rPct: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    left: `${parseFloat((50 + rPct * Math.cos(rad)).toFixed(4))}%`,
    top:  `${parseFloat((50 + rPct * Math.sin(rad)).toFixed(4))}%`,
  }
}

export default function IntegrationsSection() {
  const [visible,  setVisible]  = useState(false)
  const [hovered,  setHovered]  = useState<string | null>(null)
  const [active,   setActive]   = useState(0)
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
    const id = setInterval(() => setActive(i => (i + 1) % ACTIVE_INTEGRATIONS.length), 2200)
    return () => clearInterval(id)
  }, [visible])

  const focused = hovered
    ? ACTIVE_INTEGRATIONS.find(i => i.id === hovered)
    : ACTIVE_INTEGRATIONS[active]

  return (
    <section
      ref={ref}
      id="integrations"
      aria-labelledby="int-heading"
      style={{
        position: 'relative',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: 'clamp(4rem,8vw,7rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Ambient */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
          width: 'clamp(28rem,50vw,65rem)', height: 'clamp(28rem,50vw,65rem)',
          background: 'radial-gradient(circle, rgba(201,150,14,0.05) 0%, transparent 60%)',
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
            }}>Integrations</span>
          </div>
          <div className="gold-divider" style={{ margin: '0 auto clamp(0.85rem,1.6vw,1.2rem)' }} />
          <h2
            id="int-heading"
            className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
            style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(1.8rem,3.8vw,3rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: 'var(--text-primary)', letterSpacing: '-0.01em',
              marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
            }}
          >
            Everything Works<br />
            <span style={{
              background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 55%, #F5D080 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Better Together.</span>
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
            Marketing OS connects communication, AI, websites, analytics and marketing into one seamless workflow — without replacing the tools you already use.
          </p>
        </div>

        {/* ── Radial hub — desktop ── */}
        <div
          className="int-radial"
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '60%',
            marginBottom: 'clamp(3rem,6vw,5rem)',
          }}
        >
          {/* SVG lines */}
          <svg
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 100 60"
            preserveAspectRatio="xMidYMid meet"
          >
            {ACTIVE_INTEGRATIONS.map(int => {
              const rad = (int.angle - 90) * (Math.PI / 180)
              const r   = 24
              const x2  = parseFloat((50 + r * Math.cos(rad)).toFixed(4))
              const y2  = parseFloat((30 + r * Math.sin(rad)).toFixed(4))
              const isHov = hovered === int.id
              const isAct = ACTIVE_INTEGRATIONS[active].id === int.id && !hovered
              return (
                <line
                  key={int.id}
                  x1="50" y1="30" x2={x2} y2={y2}
                  stroke={isHov || isAct ? 'rgba(21,128,61,0.55)' : 'rgba(201,150,14,0.14)'}
                  strokeWidth={isHov || isAct ? '0.35' : '0.15'}
                  style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
                />
              )
            })}
          </svg>

          {/* Center hub */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', zIndex: 3,
          }}>
            <div style={{
              width: 'clamp(5rem,9vw,7rem)', height: 'clamp(5rem,9vw,7rem)',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--surface-3), var(--surface-2))',
              border: '1px solid var(--gold-border)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '0.2rem',
              boxShadow: '0 0 0 1px var(--gold-border), 0 0 2rem rgba(201,150,14,0.12)',
              animation: visible && !reduced.current ? 'intCorePulse 3s ease-in-out infinite' : 'none',
            }}>
              <span style={{ fontSize: 'clamp(1rem,1.8vw,1.4rem)', color: 'var(--gold)' }}>✦</span>
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.36rem,0.58vw,0.44rem)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--gold)', textAlign: 'center', lineHeight: 1.3,
              }}>Marketing OS</p>
            </div>
          </div>

          {/* Integration cards */}
          {ACTIVE_INTEGRATIONS.map((int, i) => {
            const pos    = radialPos(int.angle, 24)
            const isHov  = hovered === int.id
            const isAct  = ACTIVE_INTEGRATIONS[active].id === int.id && !hovered
            return (
              <button
                key={int.id}
                aria-label={int.label}
                style={{
                  position: 'absolute', ...pos,
                  transform: `translate(-50%, -50%) ${isHov ? 'scale(1.06) translateY(-3px)' : 'scale(1)'}`,
                  zIndex: 2,
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={() => setHovered(int.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(int.id)}
                onBlur={() => setHovered(null)}
              >
                <div
                  className={visible && !reduced.current ? 'animate-fade-up' : ''}
                  style={{ animationDelay: `${i * 70 + 200}ms` }}
                >
                  <div style={{
                    padding: 'clamp(0.55rem,1vw,0.8rem) clamp(0.65rem,1.2vw,0.95rem)',
                    background: isHov || isAct ? 'rgba(21,128,61,0.07)' : 'var(--surface-2)',
                    border: `1px solid ${isHov || isAct ? 'rgba(21,128,61,0.28)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    boxShadow: isHov ? '0 0.5rem 1.5rem rgba(0,0,0,0.18)' : 'none',
                    textAlign: 'center', minWidth: 'clamp(4.5rem,8vw,6.5rem)',
                    animation: visible && !reduced.current ? `intFloat${i % 3} ${4 + i * 0.3}s ease-in-out ${i * 0.4}s infinite` : 'none',
                  }}>
                    <div style={{
                      fontSize: 'clamp(0.85rem,1.5vw,1.1rem)',
                      color: isHov || isAct ? '#15803D' : 'var(--text-muted)',
                      marginBottom: '0.3rem', transition: 'color 0.3s',
                    }}>{int.icon}</div>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.52rem,0.82vw,0.62rem)',
                      color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '0.25rem',
                    }}>{int.label}</p>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
                      fontSize: 'clamp(0.36rem,0.56vw,0.44rem)',
                      color: '#15803D', background: 'rgba(21,128,61,0.08)',
                      border: '1px solid rgba(21,128,61,0.2)',
                      padding: '0.12em 0.4em', borderRadius: '2em',
                    }}>
                      <span style={{
                        width: '0.22rem', height: '0.22rem', borderRadius: '50%', background: '#15803D',
                        animation: !reduced.current ? 'intDot 2s infinite' : 'none',
                      }} />
                      Active
                    </span>
                  </div>
                </div>
              </button>
            )
          })}

          {/* Detail panel — bottom center */}
          {focused && (
            <div style={{
              position: 'absolute', bottom: '2%', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 4,
              width: 'clamp(14rem,28vw,22rem)',
            }}>
              <div style={{
                padding: 'clamp(0.75rem,1.4vw,1rem) clamp(0.85rem,1.6vw,1.2rem)',
                background: 'linear-gradient(145deg, var(--surface-2), var(--surface-1))',
                border: '1px solid rgba(21,128,61,0.25)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 1rem 2.5rem rgba(0,0,0,0.25)',
                display: 'flex', alignItems: 'flex-start', gap: '0.65rem',
              }}>
                <span style={{ fontSize: 'clamp(0.85rem,1.4vw,1rem)', color: '#15803D', flexShrink: 0, marginTop: '0.1rem' }}>{focused.icon}</span>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.72rem,1.1vw,0.85rem)', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{focused.label}</p>
                  <p style={{ fontSize: 'clamp(0.58rem,0.88vw,0.68rem)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{focused.purpose}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Coming soon strip ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-200' : ''}
          style={{ marginBottom: 'clamp(3rem,6vw,5rem)', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.45rem,0.72vw,0.54rem)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: 'clamp(1rem,2vw,1.5rem)',
          }}>
            Coming Soon
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: 'clamp(0.4rem,0.8vw,0.6rem)',
          }}>
            {COMING_SOON.map((name, i) => (
              <span
                key={name}
                className={visible && !reduced.current ? 'animate-fade-up' : ''}
                style={{
                  animationDelay: `${i * 35 + 200}ms`,
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  padding: 'clamp(0.3rem,0.6vw,0.45rem) clamp(0.65rem,1.2vw,0.9rem)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '2em',
                  fontSize: 'clamp(0.58rem,0.88vw,0.68rem)',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ width: '0.25rem', height: '0.25rem', borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.4 }} />
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* ── Mobile flat list ── */}
        <div
          className="int-mobile-list"
          style={{
            display: 'none',
            flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)',
            marginBottom: 'clamp(2.5rem,5vw,4rem)',
          }}
        >
          {ACTIVE_INTEGRATIONS.map((int, i) => (
            <div
              key={int.id}
              className={visible && !reduced.current ? 'animate-fade-up' : ''}
              style={{ animationDelay: `${i * 50 + 150}ms` }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: 'clamp(0.75rem,1.5vw,1rem)',
                padding: 'clamp(0.75rem,1.5vw,1rem) clamp(0.85rem,1.6vw,1.1rem)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <span style={{ fontSize: 'clamp(0.9rem,1.6vw,1.1rem)', color: '#15803D', flexShrink: 0 }}>{int.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.78rem,1.2vw,0.9rem)', color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{int.label}</p>
                  <p style={{ fontSize: 'clamp(0.6rem,0.9vw,0.7rem)', color: 'var(--text-muted)', lineHeight: 1.4 }}>{int.purpose}</p>
                </div>
                <span style={{
                  flexShrink: 0,
                  fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                  color: '#15803D', background: 'rgba(21,128,61,0.08)',
                  border: '1px solid rgba(21,128,61,0.2)',
                  padding: '0.2em 0.6em', borderRadius: '2em',
                }}>Active</span>
              </div>
            </div>
          ))}
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
            Why It Matters
          </p>
          <div
            className="int-benefits"
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
                  <span style={{ fontSize: 'clamp(0.75rem,1.2vw,0.9rem)', color: 'var(--gold)', flexShrink: 0, marginTop: '0.1rem' }}>{b.icon}</span>
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.78rem,1.2vw,0.9rem)', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{b.label}</p>
                    <p style={{ fontSize: 'clamp(0.6rem,0.9vw,0.7rem)', color: 'var(--text-muted)', lineHeight: 1.5 }}>{b.desc}</p>
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
              View Integrations
            </Link>
            <Link href="/docs" className="btn-secondary" style={{
              padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
              fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            }}>
              API Documentation
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes intCorePulse {
          0%,100% { box-shadow: 0 0 0 1px var(--gold-border), 0 0 2rem rgba(201,150,14,0.10); }
          50%      { box-shadow: 0 0 0 1px var(--gold-border), 0 0 3.5rem rgba(201,150,14,0.18); }
        }
        @keyframes intDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        @keyframes intFloat0 {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-0.35rem); }
        }
        @keyframes intFloat1 {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(0.3rem); }
        }
        @keyframes intFloat2 {
          0%,100% { transform: translateY(0) translateX(0); }
          50%      { transform: translateY(-0.25rem) translateX(0.15rem); }
        }
        @media (max-width: 1024px) {
          .int-radial       { display: none !important; }
          .int-mobile-list  { display: flex !important; }
          .int-benefits     { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 480px) {
          .int-benefits { grid-template-columns: 1fr !important; }
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
