'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'

interface HeroProps { isLoggedIn: boolean }

const STEPS = [
  { id: 'biz',      icon: '◈', label: 'Business',        sub: 'Owner sends request',      color: '#C9960E' },
  { id: 'wa',       icon: '◉', label: 'WhatsApp',        sub: 'Message received',          color: '#15803D' },
  { id: 'ai',       icon: '✦', label: 'AI Analysis',     sub: 'Processing intent',         color: '#C9960E' },
  { id: 'page',     icon: '⬡', label: 'Landing Page',    sub: 'Generated instantly',       color: '#C9960E' },
  { id: 'seo',      icon: '◎', label: 'Google Index',    sub: 'SEO optimized',             color: '#15803D' },
  { id: 'lead',     icon: '◆', label: 'Lead Captured',   sub: 'Notification sent',         color: '#C9960E' },
  { id: 'dash',     icon: '▲', label: 'Dashboard',       sub: 'Analytics updated',         color: '#C9960E' },
  { id: 'growth',   icon: '❋', label: 'Growth',          sub: 'Business scales',           color: '#15803D' },
]

const TRUST = [
  { val: '< 60s',  label: 'AI Generated' },
  { val: 'SEO',    label: 'Auto-Optimized' },
  { val: 'WA',     label: 'WhatsApp Native' },
  { val: '24×7',   label: 'Always On' },
]

export default function Hero({ isLoggedIn }: HeroProps) {
  const [step, setStep]       = useState(0)
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const reduced = useRef(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return
    const id = setInterval(() => setStep(s => (s + 1) % STEPS.length), 1600)
    return () => clearInterval(id)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (reduced.current) return
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
  }, [])

  const px = (mousePos.x - 0.5) * 18
  const py = (mousePos.y - 0.5) * 12

  return (
    <section
      ref={sectionRef}
      aria-label="Brisvora — AI Growth Operating System"
      onMouseMove={onMouseMove}
      style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--bg)' }}
    >
      {/* ── Background ── */}
      <Background mounted={mounted} reduced={reduced.current} />

      {/* ── Main grid ── */}
      <div style={{
        maxWidth: '1440px', margin: '0 auto', width: '100%',
        padding: 'clamp(6rem,12vw,9rem) clamp(1.25rem,4vw,2.5rem) clamp(4rem,8vw,6rem)',
        position: 'relative', zIndex: 1,
      }}>
        <div className="hero-layout" style={{
          display: 'grid',
          gridTemplateColumns: '42fr 58fr',
          gap: 'clamp(2.5rem,5vw,6rem)',
          alignItems: 'center',
        }}>

          {/* ── LEFT ── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Badge */}
            <div className="animate-fade-up" style={{ marginBottom: 'clamp(1.25rem,2.5vw,1.75rem)' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.5rem,0.9vw,0.6rem)',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--gold)', border: '1px solid var(--gold-border)',
                padding: '0.4em 1.1em', borderRadius: '2em',
                background: 'var(--gold-dim)',
              }}>
                <span style={{
                  width: '0.35rem', height: '0.35rem', borderRadius: '50%',
                  background: 'var(--gold)', flexShrink: 0,
                  animation: mounted && !reduced.current ? 'pulseDot 2s ease-in-out infinite' : 'none',
                }} />
                AI Powered Growth OS
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up delay-100" style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(2.2rem,4.8vw,3.8rem)',
              fontWeight: 400, lineHeight: 1.08,
              letterSpacing: '-0.015em',
              color: 'var(--text-primary)',
              marginBottom: 'clamp(1rem,2vw,1.4rem)',
            }}>
              One Message.<br />
              <span style={{
                background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 50%, #F5D080 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Unlimited Growth.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-up delay-200" style={{
              fontFamily: "'DM Sans', var(--font-sans), sans-serif",
              fontSize: 'clamp(0.88rem,1.4vw,1.05rem)',
              color: 'var(--text-secondary)', lineHeight: 1.75,
              maxWidth: '38ch',
              marginBottom: 'clamp(1.75rem,3.5vw,2.5rem)',
            }}>
              Send a WhatsApp message — AI builds your SEO landing page, automates lead capture, and grows your business instantly.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300" style={{
              display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center',
              marginBottom: 'clamp(2rem,4vw,3rem)',
            }}>
              <Link
                href={isLoggedIn ? '/dashboard' : '/register'}
                className="btn-primary hero-cta-primary"
              >
                {isLoggedIn ? 'Go to Dashboard' : 'Start Building'}
              </Link>
              <Link href="/demo" className="btn-secondary hero-cta-secondary">
                Watch Demo
              </Link>
            </div>

            {/* Trust strip */}
            <div className="animate-fade-up delay-400 hero-trust" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.6rem',
            }}>
              {TRUST.map(t => (
                <div key={t.label} className="hero-trust-card" style={{
                  padding: 'clamp(0.6rem,1.2vw,0.9rem) clamp(0.5rem,1vw,0.75rem)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  transition: 'border-color 0.25s, transform 0.25s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.85rem,1.5vw,1.1rem)',
                    color: 'var(--gold)', lineHeight: 1, marginBottom: '0.25rem',
                  }}>{t.val}</p>
                  <p style={{
                    fontSize: 'clamp(0.5rem,0.8vw,0.6rem)',
                    color: 'var(--text-muted)', letterSpacing: '0.04em',
                    lineHeight: 1.3,
                  }}>{t.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div
            className="animate-scale-smooth delay-200 hero-right"
            style={{
              position: 'relative',
              transform: mounted && !reduced.current ? `translate(${px * 0.3}px, ${py * 0.3}px)` : 'none',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              willChange: 'transform',
            }}
          >
            <WorkflowPanel step={step} mounted={mounted} reduced={reduced.current} />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      {mounted && (
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          opacity: 0.3,
          animation: !reduced.current ? 'scrollBob 2.8s ease-in-out infinite' : 'none',
        }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.45rem', letterSpacing: '0.25em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '1px', height: '2.2rem', background: 'linear-gradient(to bottom, var(--gold), transparent)' }} />
        </div>
      )}

      <HeroStyles />
    </section>
  )
}

// ── Background ──────────────────────────────────────────────────
function Background({ mounted, reduced }: { mounted: boolean; reduced: boolean }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Gold radial — top right */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-8%',
        width: 'clamp(28rem,45vw,55rem)', height: 'clamp(28rem,45vw,55rem)',
        background: 'radial-gradient(circle, rgba(201,150,14,0.08) 0%, transparent 60%)',
        animation: mounted && !reduced ? 'bgGold 12s ease-in-out infinite' : 'none',
      }} />
      {/* Green radial — bottom left */}
      <div style={{
        position: 'absolute', bottom: '-15%', left: '-5%',
        width: 'clamp(20rem,35vw,42rem)', height: 'clamp(20rem,35vw,42rem)',
        background: 'radial-gradient(circle, rgba(21,128,61,0.055) 0%, transparent 60%)',
        animation: mounted && !reduced ? 'bgGreen 16s ease-in-out infinite reverse' : 'none',
      }} />
      {/* Faint grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)`,
        backgroundSize: '5rem 5rem',
        maskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)',
      }} />
      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)',
      }} />
    </div>
  )
}

// ── Workflow Panel ───────────────────────────────────────────────
function WorkflowPanel({ step, mounted, reduced }: { step: number; mounted: boolean; reduced: boolean }) {
  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(145deg, var(--surface-2) 0%, var(--surface-1) 100%)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-2xl)',
      padding: 'clamp(1.25rem,2.5vw,2rem)',
      overflow: 'hidden',
      boxShadow: '0 2rem 5rem rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
    }}>
      {/* Inner glow */}
      <div style={{
        position: 'absolute', top: '-25%', right: '-15%',
        width: '55%', height: '55%',
        background: 'radial-gradient(circle, rgba(201,150,14,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Panel header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(1rem,2vw,1.5rem)' }}>
        <div>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.5rem,0.8vw,0.58rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.25rem' }}>
            AI Growth Workflow
          </p>
          <p style={{ fontSize: 'clamp(0.65rem,1vw,0.75rem)', color: 'var(--text-muted)' }}>
            Automated · Real-time · Intelligent
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.3em 0.85em',
          background: 'rgba(21,128,61,0.08)', border: '1px solid rgba(21,128,61,0.2)',
          borderRadius: '2em',
        }}>
          <span style={{
            width: '0.32rem', height: '0.32rem', borderRadius: '50%', background: '#15803D',
            animation: mounted && !reduced ? 'pulseDot 2s infinite' : 'none',
          }} />
          <span style={{ fontSize: 'clamp(0.5rem,0.75vw,0.58rem)', color: '#15803D', letterSpacing: '0.08em' }}>LIVE</span>
        </div>
      </div>

      {/* Step nodes — 4×2 grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'clamp(0.4rem,0.8vw,0.65rem)',
        marginBottom: 'clamp(0.75rem,1.5vw,1.25rem)',
      }}>
        {STEPS.map((s, i) => {
          const isActive = step === i
          const isPast   = i < step
          return (
            <div key={s.id} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem',
              padding: 'clamp(0.6rem,1.2vw,0.9rem) clamp(0.3rem,0.6vw,0.5rem)',
              background: isActive ? 'var(--gold-dim)' : isPast ? 'rgba(21,128,61,0.06)' : 'var(--surface-3)',
              border: `1px solid ${isActive ? 'var(--gold-border)' : isPast ? 'rgba(21,128,61,0.18)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
              animation: isActive && mounted && !reduced ? 'nodeGlow 1.6s ease-in-out' : 'none',
            }}>
              <span style={{
                fontSize: 'clamp(0.9rem,1.6vw,1.2rem)', lineHeight: 1,
                color: isActive ? s.color : isPast ? '#15803D' : 'var(--text-muted)',
                transition: 'color 0.4s',
              }}>{s.icon}</span>
              <span style={{
                fontSize: 'clamp(0.48rem,0.75vw,0.58rem)',
                color: isActive ? 'var(--gold)' : isPast ? '#15803D' : 'var(--text-muted)',
                textAlign: 'center', lineHeight: 1.3, letterSpacing: '0.02em',
                transition: 'color 0.4s',
              }}>{s.label}</span>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div style={{ height: '2px', background: 'var(--surface-3)', borderRadius: '2px', marginBottom: 'clamp(0.75rem,1.5vw,1.25rem)', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${((step + 1) / STEPS.length) * 100}%`,
          background: 'linear-gradient(90deg, #C9960E, #D4A837)',
          borderRadius: '2px',
          transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: '0 0 0.5rem rgba(201,150,14,0.5)',
        }} />
      </div>

      {/* Active step card */}
      <div style={{
        padding: 'clamp(0.75rem,1.5vw,1rem) clamp(0.85rem,1.6vw,1.1rem)',
        background: 'var(--surface-3)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        minHeight: '4rem',
      }}>
        <div style={{
          width: 'clamp(1.8rem,3vw,2.2rem)', height: 'clamp(1.8rem,3vw,2.2rem)',
          borderRadius: '50%', background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, fontSize: 'clamp(0.75rem,1.2vw,0.95rem)', color: 'var(--gold)',
        }}>
          {STEPS[step].icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.48rem,0.75vw,0.58rem)', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            Step {step + 1} / {STEPS.length}
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.78rem,1.2vw,0.9rem)', color: 'var(--text-primary)' }}>
            {STEPS[step].label}
          </p>
          <p style={{ fontSize: 'clamp(0.6rem,0.9vw,0.7rem)', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
            {STEPS[step].sub}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', flexShrink: 0 }}>
          {[0, 1, 2].map(d => (
            <span key={d} style={{
              width: '0.25rem', height: '0.25rem', borderRadius: '50%', background: 'var(--gold)',
              animation: mounted && !reduced ? `pulseDot 1.2s ease-in-out ${d * 0.2}s infinite` : 'none',
              opacity: 0.7,
            }} />
          ))}
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(0.4rem,0.8vw,0.65rem)', marginTop: 'clamp(0.65rem,1.2vw,0.9rem)' }}>
        {[{ v: '< 2min', d: 'Full Setup' }, { v: 'AI', d: 'Powered' }, { v: '∞', d: 'Scalable' }].map(s => (
          <div key={s.d} style={{
            textAlign: 'center', padding: 'clamp(0.5rem,1vw,0.75rem)',
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
          }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.85rem,1.4vw,1.05rem)', color: 'var(--gold)', lineHeight: 1, marginBottom: '0.2rem' }}>{s.v}</p>
            <p style={{ fontSize: 'clamp(0.48rem,0.75vw,0.58rem)', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────────
function HeroStyles() {
  return (
    <style>{`
      @keyframes bgGold {
        0%,100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(-3%,5%) scale(1.07); }
      }
      @keyframes bgGreen {
        0%,100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(4%,-4%) scale(1.09); }
      }
      @keyframes pulseDot {
        0%,100% { opacity: 1; }
        50%      { opacity: 0.35; }
      }
      @keyframes nodeGlow {
        0%   { box-shadow: 0 0 0 0 rgba(201,150,14,0); }
        50%  { box-shadow: 0 0 0 0.4rem rgba(201,150,14,0.12), 0 0 1.5rem rgba(201,150,14,0.12); }
        100% { box-shadow: 0 0 0 0 rgba(201,150,14,0); }
      }
      @keyframes scrollBob {
        0%,100% { transform: translateX(-50%) translateY(0); }
        50%      { transform: translateX(-50%) translateY(0.4rem); }
      }
      .hero-cta-primary {
        padding: clamp(0.75rem,1.5vw,0.95rem) clamp(1.5rem,3vw,2rem);
        font-size: clamp(0.72rem,1.1vw,0.82rem);
        min-height: 2.75rem;
      }
      .hero-cta-secondary {
        padding: clamp(0.75rem,1.5vw,0.95rem) clamp(1.5rem,3vw,2rem);
        font-size: clamp(0.72rem,1.1vw,0.82rem);
        min-height: 2.75rem;
      }
      /* Mobile recompose */
      @media (max-width: 768px) {
        .hero-layout {
          grid-template-columns: 1fr !important;
          gap: clamp(2rem,6vw,3rem) !important;
        }
        .hero-right { order: 2; }
        .hero-trust { grid-template-columns: repeat(2,1fr) !important; }
      }
      @media (max-width: 480px) {
        .hero-trust { grid-template-columns: repeat(2,1fr) !important; }
      }
      @media (min-width: 1728px) {
        .hero-layout { gap: 7rem !important; }
      }
      @media (min-width: 1920px) {
        .hero-layout { gap: 8rem !important; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  )
}
