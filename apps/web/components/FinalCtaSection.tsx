'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const TRUST_INDICATORS = [
  'AI Powered',
  'SEO Optimized',
  'WhatsApp Native',
  'Mobile First',
  'Secure',
  'Fast',
]

export default function FinalCtaSection() {
  const [visible, setVisible] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const ref = useRef<HTMLElement>(null)
  const reduced = useRef(false)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (reduced.current || !particlesRef.current) return
    const container = particlesRef.current
    const count = 18
    const particles: HTMLSpanElement[] = []

    for (let i = 0; i < count; i++) {
      const p = document.createElement('span')
      const size = 1.5 + Math.random() * 2.5
      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(201,168,76,${0.08 + Math.random() * 0.12});
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        opacity: 0;
        transition: none;
      `
      container.appendChild(p)
      particles.push(p)
    }

    let frameId: number
    const startTime = performance.now()

    function animate(time: number) {
      const elapsed = (time - startTime) / 1000
      particles.forEach((p, i) => {
        const phase = i * 0.35
        const x = (Math.sin(elapsed * 0.15 + phase) * 0.5 + 0.5) * 100
        const y = (Math.cos(elapsed * 0.12 + phase * 1.3) * 0.5 + 0.5) * 100
        const opacity = 0.3 + Math.sin(elapsed * 0.2 + phase) * 0.2
        p.style.left = `${x}%`
        p.style.top = `${y}%`
        p.style.opacity = `${Math.max(0, opacity)}`
      })
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      particles.forEach(p => p.remove())
    }
  }, [])

  useEffect(() => {
    if (reduced.current || !ref.current) return
    const section = ref.current
    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    section.addEventListener('mousemove', handleMove)
    return () => section.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      ref={ref}
      id="final-cta"
      aria-labelledby="final-cta-heading"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg)',
        overflow: 'hidden',
        padding: 'clamp(3rem,6vw,5rem) 0',
      }}
    >
      {/* ── Cinematic Background Layers ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>

        {/* Base gradient mesh */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(21,128,61,0.03) 0%, transparent 50%),
            radial-gradient(ellipse 50% 40% at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 50%)
          `,
        }} />

        {/* Animated light sweep */}
        {!reduced.current && (
          <div
            className="cta-light-sweep"
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(
                105deg,
                transparent 0%,
                transparent 35%,
                rgba(201,168,76,0.04) 45%,
                rgba(201,168,76,0.06) 50%,
                rgba(201,168,76,0.04) 55%,
                transparent 65%,
                transparent 100%
              )`,
              backgroundSize: '200% 100%',
              animation: reduced.current ? 'none' : 'sweep 8s ease-in-out infinite',
            }}
          />
        )}

        {/* AI network lines */}
        {!reduced.current && (
          <svg
            className="cta-network"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              opacity: 0.12,
            }}
          >
            <defs>
              <linearGradient id="net-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(201,168,76,0)" />
                <stop offset="50%" stopColor="rgba(201,168,76,0.3)" />
                <stop offset="100%" stopColor="rgba(201,168,76,0)" />
              </linearGradient>
            </defs>
            <g className="cta-network-lines" style={{ transformOrigin: 'center' }}>
              <line x1="200" y1="100" x2="600" y2="400" stroke="url(#net-grad)" strokeWidth="0.5" className="net-line" />
              <line x1="1000" y1="150" x2="500" y2="500" stroke="url(#net-grad)" strokeWidth="0.5" className="net-line" />
              <line x1="300" y1="700" x2="800" y2="300" stroke="url(#net-grad)" strokeWidth="0.5" className="net-line" />
              <line x1="900" y1="650" x2="400" y2="200" stroke="url(#net-grad)" strokeWidth="0.5" className="net-line" />
              <line x1="100" y1="400" x2="1100" y2="400" stroke="url(#net-grad)" strokeWidth="0.3" className="net-line" />
              <line x1="600" y1="50" x2="600" y2="750" stroke="url(#net-grad)" strokeWidth="0.3" className="net-line" />
              <circle cx="200" cy="100" r="2" fill="rgba(201,168,76,0.3)" className="net-node" />
              <circle cx="600" cy="400" r="2.5" fill="rgba(201,168,76,0.4)" className="net-node" />
              <circle cx="1000" cy="150" r="2" fill="rgba(201,168,76,0.3)" className="net-node" />
              <circle cx="500" cy="500" r="1.5" fill="rgba(201,168,76,0.25)" className="net-node" />
              <circle cx="300" cy="700" r="2" fill="rgba(201,168,76,0.3)" className="net-node" />
              <circle cx="800" cy="300" r="2.5" fill="rgba(201,168,76,0.4)" className="net-node" />
              <circle cx="900" cy="650" r="1.5" fill="rgba(201,168,76,0.25)" className="net-node" />
              <circle cx="400" cy="200" r="2" fill="rgba(201,168,76,0.3)" className="net-node" />
            </g>
          </svg>
        )}

        {/* Floating particles (JS animated) */}
        <div
          ref={particlesRef}
          style={{
            position: 'absolute', inset: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Gold spotlight that follows mouse */}
        {!reduced.current && (
          <div
            className="cta-spotlight"
            style={{
              position: 'absolute',
              width: 'clamp(20rem,40vw,50rem)',
              height: 'clamp(20rem,40vw,50rem)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 60%)',
              left: `${mousePos.x * 100}%`,
              top: `${mousePos.y * 100}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.8s cubic-bezier(0.16,1,0.3,1), top 0.8s cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: 'none',
              willChange: 'left, top',
            }}
          />
        )}

        {/* Bottom gradient fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '30%',
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Content ── */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 clamp(1.25rem,4vw,2.5rem)',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
      }}>
        {/* Small Label */}
        <div className={visible && !reduced.current ? 'animate-fade-up' : ''} style={{ marginBottom: 'clamp(0.75rem,1.4vw,1rem)' }}>
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.5rem,0.85vw,0.6rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>
            The Future Starts Here
          </span>
        </div>

        <div className="gold-divider" style={{ margin: '0 auto clamp(1rem,2vw,1.5rem)' }} />

        {/* Main Headline */}
        <h2
          id="final-cta-heading"
          className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
          style={{
            fontFamily: "'Playfair Display', var(--font-serif), serif",
            fontSize: 'clamp(2.2rem,5.5vw,4.5rem)',
            fontWeight: 400,
            lineHeight: 1.05,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: 'clamp(1rem,2vw,1.5rem)',
          }}
        >
          Build Smarter.<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 50%, var(--gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% 100%',
            animation: reduced.current ? 'none' : 'gold-shimmer 4s ease-in-out infinite',
          }}>
            Grow Faster.
          </span>
        </h2>

        {/* Description */}
        <p
          className={visible && !reduced.current ? 'animate-fade-up delay-200' : ''}
          style={{
            fontFamily: "'DM Sans', var(--font-sans), sans-serif",
            fontSize: 'clamp(0.85rem,1.3vw,1.05rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: '56ch',
            margin: '0 auto clamp(2rem,4vw,3rem)',
          }}
        >
          Launch AI-powered landing pages, automate your workflow, improve your online visibility and manage your business from one intelligent platform.
        </p>

        {/* ── CTAs ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-300' : ''}
          style={{
            display: 'flex',
            gap: 'clamp(0.65rem,1.2vw,1rem)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 'clamp(2rem,4vw,3rem)',
          }}
        >
          <Link
            href="/register"
            className="btn-primary cta-primary-btn"
            style={{
              padding: 'clamp(0.9rem,1.6vw,1.15rem) clamp(2rem,4vw,2.8rem)',
              fontSize: 'clamp(0.78rem,1.15vw,0.9rem)',
              letterSpacing: '0.02em',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Start with WhatsApp</span>
            <span className="cta-arrow" style={{
              display: 'inline-block',
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}>
              →
            </span>
          </Link>

          <Link
            href="/demo"
            className="btn-ghost cta-secondary-btn"
            style={{
              padding: 'clamp(0.9rem,1.6vw,1.15rem) clamp(2rem,4vw,2.8rem)',
              fontSize: 'clamp(0.78rem,1.15vw,0.9rem)',
              letterSpacing: '0.02em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              background: 'transparent',
              transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--gold-border)'
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'var(--gold-dim)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            <span>Book a Demo</span>
            <span style={{
              display: 'inline-block',
              transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}>
              →
            </span>
          </Link>
        </div>

        {/* ── Trust Indicators ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-400' : ''}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 'clamp(0.35rem,0.6vw,0.5rem)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          {TRUST_INDICATORS.map((label, i) => (
            <div
              key={label}
              className="cta-trust-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(0.3rem,0.5vw,0.4rem)',
                padding: 'clamp(0.35rem,0.65vw,0.5rem) clamp(0.65rem,1.2vw,0.9rem)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: '2em',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                cursor: 'default',
                animationDelay: `${i * 60 + 400}ms`,
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
                width: 'clamp(0.35rem,0.55vw,0.45rem)',
                height: 'clamp(0.35rem,0.55vw,0.45rem)',
                borderRadius: '50%',
                background: '#15803D',
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes sweep {
          0%   { background-position: 200% 0; }
          50%  { background-position: -50% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes gold-shimmer {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes net-pulse {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.6; }
        }
        .net-node {
          animation: net-pulse 3s ease-in-out infinite;
        }
        .net-node:nth-child(odd) {
          animation-delay: 1.5s;
        }
        .net-line {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: draw-line 6s ease-in-out infinite;
        }
        .net-line:nth-child(even) {
          animation-delay: 3s;
        }
        @keyframes draw-line {
          0%   { stroke-dashoffset: 800; }
          50%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 800; }
        }
        .cta-primary-btn:hover .cta-arrow {
          transform: translateX(4px);
        }
        .cta-secondary-btn:hover span:last-child {
          transform: translateX(4px);
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-light-sweep,
          .cta-network,
          .cta-spotlight,
          .net-node,
          .net-line {
            animation: none !important;
          }
          .cta-light-sweep { opacity: 0.06; }
          .cta-network { opacity: 0.08; }
        }
        @media (max-width: 480px) {
          .cta-primary-btn,
          .cta-secondary-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}