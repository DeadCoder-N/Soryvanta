'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const WORKFLOW = [
  { id: 'biz',      icon: '◈', label: 'Business',      sub: 'Owner',          color: '#C9960E' },
  { id: 'wa',       icon: '◉', label: 'WhatsApp',      sub: 'Message',        color: '#15803D' },
  { id: 'ai',       icon: '✦', label: 'Brisvora AI',   sub: 'Processing',     color: '#C9960E', pulse: true },
  { id: 'page',     icon: '⬡', label: 'Landing Page',  sub: 'Generated',      color: '#C9960E' },
  { id: 'seo',      icon: '◎', label: 'Google',        sub: 'Indexed',        color: '#15803D' },
  { id: 'leads',    icon: '◆', label: 'Leads',         sub: 'Captured',       color: '#C9960E' },
  { id: 'analytics',icon: '▲', label: 'Analytics',     sub: 'Updated',        color: '#C9960E' },
  { id: 'growth',   icon: '❋', label: 'Growth',        sub: 'Achieved',       color: '#15803D' },
]

const TRANSFORMS = [
  { before: 'Manual Listings',  after: 'AI Generated',      icon: '✦' },
  { before: 'Lost Leads',       after: 'Lead Management',   icon: '◆' },
  { before: 'No Website',       after: 'Landing Pages',     icon: '⬡' },
  { before: 'Poor SEO',         after: 'Google Optimized',  icon: '◎' },
  { before: 'Manual Replies',   after: 'AI Automation',     icon: '◉' },
  { before: 'No Analytics',     after: 'Growth Dashboard',  icon: '▲' },
]

export default function SolutionSection() {
  const [visible, setVisible]   = useState(false)
  const [activeStep, setActive] = useState(0)
  const [flipped, setFlipped]   = useState<number | null>(null)
  const ref     = useRef<HTMLElement>(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || reduced.current) return
    const id = setInterval(() => setActive(s => (s + 1) % WORKFLOW.length), 1500)
    return () => clearInterval(id)
  }, [visible])

  return (
    <section
      ref={ref}
      id="features"
      aria-labelledby="solution-heading"
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
          position: 'absolute', top: '-15%', right: '-8%',
          width: 'clamp(26rem,42vw,54rem)', height: 'clamp(26rem,42vw,54rem)',
          background: 'radial-gradient(circle, rgba(201,150,14,0.06) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: 'clamp(20rem,32vw,40rem)', height: 'clamp(20rem,32vw,40rem)',
          background: 'radial-gradient(circle, rgba(21,128,61,0.045) 0%, transparent 65%)',
        }} />
      </div>

      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '0 clamp(1.25rem,4vw,2.5rem)',
        position: 'relative', zIndex: 1,
      }}>

        {/* ── Header ── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4.5rem)' }}>
          <div className={visible && !reduced.current ? 'animate-fade-up' : ''} style={{ marginBottom: 'clamp(0.65rem,1.2vw,0.9rem)' }}>
            <span style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.5rem,0.85vw,0.58rem)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              The Solution
            </span>
          </div>

          <div className="gold-divider" style={{ margin: '0 auto clamp(0.85rem,1.6vw,1.2rem)' }} />

          <h2
            id="solution-heading"
            className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
            style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(1.8rem,3.8vw,3rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em',
              marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
            }}
          >
            Grow Your Business<br />
            <span style={{
              background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 55%, #F5D080 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Without Growing Your Workload.
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
            Send one WhatsApp message. Brisvora AI builds your landing page, optimizes it for Google, captures leads, and delivers analytics — all automatically.
          </p>
        </div>

        {/* ── Workflow ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-200' : ''}
          style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}
        >
          <div style={{
            background: 'linear-gradient(145deg, var(--surface-2), var(--surface-1))',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'clamp(1.5rem,3vw,2.5rem)',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 1.5rem 4rem rgba(0,0,0,0.3)',
          }}>
            {/* Inner glow */}
            <div aria-hidden="true" style={{
              position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
              width: '60%', height: '60%',
              background: 'radial-gradient(ellipse, rgba(201,150,14,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(1.25rem,2.5vw,2rem)' }}>
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.48rem,0.75vw,0.56rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.25rem' }}>
                  AI Growth Workflow
                </p>
                <p style={{ fontSize: 'clamp(0.62rem,0.95vw,0.72rem)', color: 'var(--text-muted)' }}>
                  From message to growth — fully automated
                </p>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.3em 0.85em',
                background: 'rgba(21,128,61,0.08)', border: '1px solid rgba(21,128,61,0.2)',
                borderRadius: '2em',
              }}>
                <span style={{
                  width: '0.3rem', height: '0.3rem', borderRadius: '50%', background: '#15803D',
                  animation: visible && !reduced.current ? 'solPulse 2s infinite' : 'none',
                }} />
                <span style={{ fontSize: 'clamp(0.48rem,0.72vw,0.56rem)', color: '#15803D', letterSpacing: '0.08em' }}>LIVE</span>
              </div>
            </div>

            {/* Nodes */}
            <div className="sol-workflow" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: 'clamp(0.3rem,0.6vw,0.5rem)',
              position: 'relative',
            }}>
              {WORKFLOW.map((step, i) => {
                const isActive = activeStep === i
                const isPast   = i < activeStep
                return (
                  <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', position: 'relative' }}>
                    {/* Connector line */}
                    {i < WORKFLOW.length - 1 && (
                      <div aria-hidden="true" style={{
                        position: 'absolute',
                        top: 'clamp(1rem,2vw,1.4rem)',
                        left: '50%', right: '-50%',
                        height: '1px',
                        background: isPast
                          ? 'linear-gradient(90deg, var(--gold), rgba(201,150,14,0.3))'
                          : 'var(--border)',
                        transition: 'background 0.5s ease',
                        zIndex: 0,
                      }} />
                    )}
                    {/* Node */}
                    <div style={{
                      position: 'relative', zIndex: 1,
                      width: 'clamp(2rem,3.5vw,2.8rem)', height: 'clamp(2rem,3.5vw,2.8rem)',
                      borderRadius: '50%',
                      background: isActive ? 'var(--gold-dim)' : isPast ? 'rgba(21,128,61,0.08)' : 'var(--surface-3)',
                      border: `1px solid ${isActive ? 'var(--gold-border)' : isPast ? 'rgba(21,128,61,0.2)' : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 'clamp(0.65rem,1.1vw,0.85rem)',
                      color: isActive ? step.color : isPast ? '#15803D' : 'var(--text-muted)',
                      transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                      animation: isActive && step.pulse && !reduced.current ? 'solNodePulse 1.5s ease-in-out infinite' : 'none',
                      flexShrink: 0,
                    }}>
                      {step.icon}
                    </div>
                    <p style={{
                      fontSize: 'clamp(0.45rem,0.7vw,0.55rem)',
                      color: isActive ? 'var(--gold)' : isPast ? '#15803D' : 'var(--text-muted)',
                      textAlign: 'center', lineHeight: 1.3,
                      transition: 'color 0.4s',
                      fontWeight: isActive ? 500 : 400,
                    }}>{step.label}</p>
                    <p style={{
                      fontSize: 'clamp(0.4rem,0.62vw,0.48rem)',
                      color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.2,
                    }}>{step.sub}</p>
                  </div>
                )
              })}
            </div>

            {/* Progress bar */}
            <div style={{ height: '2px', background: 'var(--surface-3)', borderRadius: '2px', marginTop: 'clamp(1.25rem,2.5vw,2rem)', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${((activeStep + 1) / WORKFLOW.length) * 100}%`,
                background: 'linear-gradient(90deg, #C9960E, #D4A837)',
                borderRadius: '2px',
                transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1)',
                boxShadow: '0 0 0.5rem rgba(201,150,14,0.4)',
              }} />
            </div>
          </div>
        </div>

        {/* ── Transformation cards ── */}
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
            Before → After
          </p>

          <div
            className="sol-cards"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(0.65rem,1.2vw,1rem)',
            }}
          >
            {TRANSFORMS.map((t, i) => (
              <div
                key={t.before}
                className={visible && !reduced.current ? 'animate-fade-up' : ''}
                style={{ animationDelay: `${i * 70 + 150}ms` }}
              >
                <div
                  className="sol-card"
                  style={{
                    padding: 'clamp(1rem,2vw,1.5rem)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(21,128,61,0.3)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 0.5rem 2rem rgba(0,0,0,0.2), 0 0 0 1px rgba(21,128,61,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Before */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: 'clamp(0.5rem,1vw,0.7rem)',
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'clamp(0.5rem,1vw,0.75rem)',
                  }}>
                    <span style={{ fontSize: 'clamp(0.55rem,0.85vw,0.65rem)', color: 'var(--text-muted)', opacity: 0.6 }}>{t.icon}</span>
                    <p style={{ fontSize: 'clamp(0.62rem,0.95vw,0.72rem)', color: 'var(--text-muted)', textDecoration: 'line-through', opacity: 0.6 }}>
                      {t.before}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div style={{ textAlign: 'center', marginBottom: 'clamp(0.5rem,1vw,0.75rem)' }}>
                    <span style={{
                      fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
                      color: 'var(--gold)', opacity: 0.6,
                    }}>↓</span>
                  </div>

                  {/* After */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: 'clamp(0.5rem,1vw,0.7rem)',
                    background: 'rgba(21,128,61,0.06)',
                    border: '1px solid rgba(21,128,61,0.18)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <span style={{ fontSize: 'clamp(0.55rem,0.85vw,0.65rem)', color: '#15803D' }}>{t.icon}</span>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.72rem,1.1vw,0.85rem)',
                      color: 'var(--text-primary)',
                    }}>
                      {t.after}
                    </p>
                    <span style={{
                      marginLeft: 'auto', flexShrink: 0,
                      width: '0.3rem', height: '0.3rem', borderRadius: '50%',
                      background: '#15803D',
                      animation: visible && !reduced.current ? 'solPulse 2s ease-in-out infinite' : 'none',
                    }} />
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
              Start Building
            </Link>
            <Link href="/#how-it-works" className="btn-secondary" style={{
              padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
              fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            }}>
              See How It Works
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes solPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }
        @keyframes solNodePulse {
          0%   { box-shadow: 0 0 0 0 rgba(201,150,14,0); }
          50%  { box-shadow: 0 0 0 0.5rem rgba(201,150,14,0.12), 0 0 1.5rem rgba(201,150,14,0.1); }
          100% { box-shadow: 0 0 0 0 rgba(201,150,14,0); }
        }
        @media (max-width: 1024px) {
          .sol-workflow { grid-template-columns: repeat(4,1fr) !important; }
          .sol-cards    { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .sol-workflow { grid-template-columns: repeat(4,1fr) !important; }
          .sol-cards    { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 400px) {
          .sol-workflow { grid-template-columns: repeat(2,1fr) !important; }
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
