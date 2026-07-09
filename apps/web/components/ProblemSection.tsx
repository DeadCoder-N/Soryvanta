'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const PROBLEMS = [
  { icon: '◈', title: 'Manual Listings',    desc: 'Create the same listing repeatedly across every platform.' },
  { icon: '◉', title: 'Lost Leads',         desc: 'Customer enquiries disappear before you can respond.' },
  { icon: '◎', title: 'No SEO',             desc: 'Your listings never rank. Buyers never find you.' },
  { icon: '⬡', title: 'Multiple Platforms', desc: 'Posting everywhere wastes hours every single day.' },
  { icon: '◆', title: 'Poor Branding',      desc: 'Every listing looks different. No consistent identity.' },
  { icon: '▲', title: 'No Analytics',       desc: "You don't know what works or where leads come from." },
  { icon: '✦', title: 'Slow Response',      desc: 'Leads go cold before you even see the notification.' },
  { icon: '❋', title: 'Too Many Tools',     desc: 'Everything lives in different apps. Nothing connects.' },
]

const CHAOS_NODES = [
  { label: 'WhatsApp',  x: '12%',  y: '18%', warn: true  },
  { label: 'Excel',     x: '72%',  y: '10%', warn: false },
  { label: 'Email',     x: '80%',  y: '52%', warn: true  },
  { label: 'Photos',    x: '8%',   y: '62%', warn: false },
  { label: 'Website',   x: '55%',  y: '78%', warn: true  },
  { label: 'CRM',       x: '30%',  y: '82%', warn: false },
  { label: 'Google',    x: '68%',  y: '30%', warn: true  },
  { label: 'Notes',     x: '22%',  y: '40%', warn: false },
]

export default function ProblemSection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
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

  return (
    <section
      ref={ref}
      id="problem"
      aria-labelledby="problem-heading"
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
          position: 'absolute', top: '-10%', left: '-5%',
          width: 'clamp(24rem,40vw,52rem)', height: 'clamp(24rem,40vw,52rem)',
          background: 'radial-gradient(circle, rgba(201,150,14,0.045) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: 'clamp(18rem,30vw,38rem)', height: 'clamp(18rem,30vw,38rem)',
          background: 'radial-gradient(circle, rgba(239,68,68,0.025) 0%, transparent 65%)',
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
              Today's Reality
            </span>
          </div>

          <div className="gold-divider" style={{ margin: '0 auto clamp(0.85rem,1.6vw,1.2rem)' }} />

          <h2
            id="problem-heading"
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
            Growth Shouldn't Depend<br />
            <span style={{
              background: 'linear-gradient(120deg, rgba(201,150,14,0.9) 0%, rgba(212,168,55,0.8) 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              on Manual Work.
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
            Most businesses still rely on scattered tools, manual processes, and missed opportunities. Time spent on repetitive tasks is time not spent growing.
          </p>
        </div>

        {/* ── Two-column body ── */}
        <div
          className="problem-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem,4vw,5rem)',
            alignItems: 'start',
            marginBottom: 'clamp(3rem,6vw,5rem)',
          }}
        >
          {/* ── LEFT — Chaos illustration ── */}
          <div
            className={`problem-illustration ${visible && !reduced.current ? 'animate-fade-up delay-100' : ''}`}
            style={{ position: 'relative' }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '100%',
              background: 'linear-gradient(145deg, var(--surface-2), var(--surface-1))',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
            }}>
              {/* SVG broken lines */}
              <svg
                aria-hidden="true"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Broken connection lines */}
                <line x1="200" y1="200" x2="55"  y2="80"  stroke="rgba(201,150,14,0.12)" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="200" y1="200" x2="295" y2="50"  stroke="rgba(201,150,14,0.10)" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="200" y1="200" x2="330" y2="215" stroke="rgba(201,150,14,0.12)" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="200" y1="200" x2="40"  y2="250" stroke="rgba(201,150,14,0.10)" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="200" y1="200" x2="225" y2="320" stroke="rgba(201,150,14,0.12)" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="200" y1="200" x2="120" y2="330" stroke="rgba(201,150,14,0.10)" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="200" y1="200" x2="275" y2="125" stroke="rgba(201,150,14,0.12)" strokeWidth="1" strokeDasharray="4 6" />
                <line x1="200" y1="200" x2="90"  y2="165" stroke="rgba(201,150,14,0.10)" strokeWidth="1" strokeDasharray="4 6" />
                {/* Center glow */}
                <circle cx="200" cy="200" r="28" fill="rgba(201,150,14,0.06)" stroke="rgba(201,150,14,0.18)" strokeWidth="1" />
                <circle cx="200" cy="200" r="16" fill="rgba(201,150,14,0.08)" stroke="rgba(201,150,14,0.25)" strokeWidth="1" />
              </svg>

              {/* Center node — business owner */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'clamp(2.8rem,6vw,3.8rem)', height: 'clamp(2.8rem,6vw,3.8rem)',
                borderRadius: '50%',
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'clamp(0.9rem,1.8vw,1.3rem)', color: 'var(--gold)',
                zIndex: 2,
                animation: visible && !reduced.current ? 'chaosCenter 4s ease-in-out infinite' : 'none',
              }}>
                ◈
              </div>

              {/* Floating chaos nodes */}
              {CHAOS_NODES.map((node, i) => (
                <div
                  key={node.label}
                  style={{
                    position: 'absolute',
                    left: node.x, top: node.y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    animation: visible && !reduced.current
                      ? `chaosFloat${i % 3} ${3.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`
                      : 'none',
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    padding: 'clamp(0.25rem,0.5vw,0.35rem) clamp(0.5rem,1vw,0.7rem)',
                    background: 'var(--surface-3)',
                    border: `1px solid ${node.warn ? 'rgba(239,68,68,0.2)' : 'var(--border)'}`,
                    borderRadius: '2em',
                    whiteSpace: 'nowrap',
                  }}>
                    {node.warn && (
                      <span style={{ width: '0.3rem', height: '0.3rem', borderRadius: '50%', background: '#ef4444', flexShrink: 0, opacity: 0.7 }} />
                    )}
                    <span style={{
                      fontSize: 'clamp(0.48rem,0.8vw,0.6rem)',
                      color: node.warn ? 'rgba(239,68,68,0.7)' : 'var(--text-muted)',
                      letterSpacing: '0.03em',
                    }}>
                      {node.label}
                    </span>
                  </div>
                </div>
              ))}

              {/* Subtle inner label */}
              <div style={{
                position: 'absolute', bottom: 'clamp(0.75rem,1.5vw,1.2rem)', left: 0, right: 0,
                textAlign: 'center',
              }}>
                <span style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(0.42rem,0.7vw,0.52rem)',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--text-muted)', opacity: 0.6,
                }}>
                  Disconnected tools · Wasted time
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Problem cards ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(0.6rem,1.1vw,0.85rem)',
            alignContent: 'start',
          }}>
            {PROBLEMS.map((p, i) => (
              <div
                key={p.title}
                className={visible && !reduced.current ? 'animate-fade-up' : ''}
                style={{ animationDelay: `${i * 60 + 150}ms` }}
              >
                <div
                  className="problem-card"
                  style={{
                    padding: 'clamp(0.85rem,1.6vw,1.2rem)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                    cursor: 'default',
                    height: '100%',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--gold-border)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 0.5rem 1.5rem rgba(0,0,0,0.2), 0 0 0 1px rgba(201,150,14,0.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div style={{
                    width: 'clamp(1.6rem,2.8vw,2rem)', height: 'clamp(1.6rem,2.8vw,2rem)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-3)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 'clamp(0.6rem,1vw,0.78rem)', color: 'var(--text-muted)',
                    marginBottom: 'clamp(0.5rem,1vw,0.75rem)',
                  }}>
                    {p.icon}
                  </div>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.78rem,1.2vw,0.9rem)',
                    color: 'var(--text-primary)', lineHeight: 1.2,
                    marginBottom: '0.3rem',
                  }}>
                    {p.title}
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.6rem,0.9vw,0.7rem)',
                    color: 'var(--text-muted)', lineHeight: 1.55,
                  }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Transition statement ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-400' : ''}
          style={{ textAlign: 'center' }}
        >
          <div style={{
            display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(0.75rem,1.5vw,1.1rem)',
          }}>
            <div style={{
              height: '1px', width: 'clamp(3rem,8vw,6rem)',
              background: 'linear-gradient(90deg, transparent, var(--gold-border), transparent)',
            }} />
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1rem,1.8vw,1.35rem)',
              color: 'var(--text-secondary)', fontStyle: 'italic',
              letterSpacing: '0.01em',
            }}>
              There has to be a better way.
            </p>
            <div style={{
              height: '1px', width: 'clamp(3rem,8vw,6rem)',
              background: 'linear-gradient(90deg, transparent, var(--gold-border), transparent)',
            }} />
            <Link href="/#features" style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold)', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              transition: 'opacity 0.2s',
              opacity: 0.7,
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
            >
              This is why Brisvora exists
              <span style={{ fontSize: '0.8em' }}>↓</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes chaosCenter {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,150,14,0); }
          50%      { box-shadow: 0 0 0 0.6rem rgba(201,150,14,0.08), 0 0 2rem rgba(201,150,14,0.06); }
        }
        @keyframes chaosFloat0 {
          0%,100% { transform: translate(-50%,-50%) translateY(0); }
          50%      { transform: translate(-50%,-50%) translateY(-0.4rem); }
        }
        @keyframes chaosFloat1 {
          0%,100% { transform: translate(-50%,-50%) translateY(0); }
          50%      { transform: translate(-50%,-50%) translateY(0.35rem); }
        }
        @keyframes chaosFloat2 {
          0%,100% { transform: translate(-50%,-50%) translateY(0) translateX(0); }
          50%      { transform: translate(-50%,-50%) translateY(-0.3rem) translateX(0.2rem); }
        }
        @media (max-width: 1024px) {
          .problem-grid { grid-template-columns: 1fr !important; }
          .problem-illustration { max-width: 28rem; margin: 0 auto; }
        }
        @media (max-width: 480px) {
          .problem-grid > div:last-child { grid-template-columns: 1fr !important; }
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
