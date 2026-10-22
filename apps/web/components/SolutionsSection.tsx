'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const INDUSTRIES = [
  {
    id: 'realestate',
    icon: '⬡',
    label: 'Real Estate',
    status: 'available',
    desc: 'AI listings, WhatsApp leads, SEO pages.',
    flows: ['WhatsApp Message', 'AI Listing', 'Landing Page', 'Lead Capture', 'Analytics'],
  },
  {
    id: 'hotels',
    icon: '◈',
    label: 'Hotels & Resorts',
    status: 'coming-soon',
    desc: 'Booking pages, reviews, enquiry automation.',
    flows: ['Booking Page', 'SEO Visibility', 'Guest Reviews', 'Enquiries', 'Dashboard'],
  },
  {
    id: 'restaurants',
    icon: '◉',
    label: 'Restaurants & Cafés',
    status: 'coming-soon',
    desc: 'Menu pages, reservations, Google visibility.',
    flows: ['Menu Page', 'Reservations', 'Google Visibility', 'Orders', 'Analytics'],
  },
  {
    id: 'healthcare',
    icon: '◎',
    label: 'Healthcare Clinics',
    status: 'coming-soon',
    desc: 'Appointments, patient enquiries, SEO.',
    flows: ['Appointment Page', 'Patient Enquiries', 'SEO Ranking', 'CRM', 'Dashboard'],
  },
  {
    id: 'education',
    icon: '✦',
    label: 'Education & Coaching',
    status: 'coming-soon',
    desc: 'Course pages, enrolments, lead automation.',
    flows: ['Course Page', 'Enrolments', 'Lead Automation', 'SEO', 'Analytics'],
  },
  {
    id: 'retail',
    icon: '◆',
    label: 'Retail & E-commerce',
    status: 'coming-soon',
    desc: 'Product pages, orders, customer automation.',
    flows: ['Product Pages', 'Order Capture', 'Customer CRM', 'SEO', 'Dashboard'],
  },
  {
    id: 'services',
    icon: '▲',
    label: 'Professional Services',
    status: 'coming-soon',
    desc: 'Service pages, consultations, lead capture.',
    flows: ['Service Page', 'Consultation Booking', 'Lead Capture', 'SEO', 'Analytics'],
  },
  {
    id: 'automotive',
    icon: '❋',
    label: 'Automotive',
    status: 'coming-soon',
    desc: 'Vehicle listings, test drives, enquiries.',
    flows: ['Vehicle Listing', 'Test Drive Booking', 'Enquiries', 'SEO', 'Dashboard'],
  },
  {
    id: 'construction',
    icon: '◇',
    label: 'Construction & Builders',
    status: 'coming-soon',
    desc: 'Project pages, quotes, client automation.',
    flows: ['Project Page', 'Quote Requests', 'Client CRM', 'SEO', 'Analytics'],
  },
]

const BENEFITS = [
  { icon: '✦', label: 'One AI Platform',             desc: 'Every industry, one system.' },
  { icon: '▲', label: 'One Dashboard',               desc: 'All data in one place.' },
  { icon: '◎', label: 'Shared Analytics',            desc: 'Cross-industry insights.' },
  { icon: '◈', label: 'Scalable Architecture',       desc: 'Grows without limits.' },
  { icon: '◉', label: 'Industry Workflows',          desc: 'Tailored to each business.' },
  { icon: '❋', label: 'Future Ready',                desc: 'New modules added continuously.' },
]

export default function SolutionsSection() {
  const [visible,  setVisible]  = useState(false)
  const [active,   setActive]   = useState('realestate')
  const [preview,  setPreview]  = useState(INDUSTRIES[0])
  const [fading,   setFading]   = useState(false)
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

  function selectIndustry(ind: typeof INDUSTRIES[0]) {
    if (ind.id === active) return
    if (reduced.current) { setActive(ind.id); setPreview(ind); return }
    setFading(true)
    setTimeout(() => { setActive(ind.id); setPreview(ind); setFading(false) }, 220)
  }

  return (
    <section
      ref={ref}
      id="solutions"
      aria-labelledby="sol-heading"
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
          position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
          width: 'clamp(28rem,50vw,65rem)', height: 'clamp(28rem,50vw,65rem)',
          background: 'radial-gradient(circle, rgba(201,150,14,0.05) 0%, transparent 65%)',
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
            }}>Solutions</span>
          </div>
          <div className="gold-divider" style={{ margin: '0 auto clamp(0.85rem,1.6vw,1.2rem)' }} />
          <h2
            id="sol-heading"
            className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
            style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(1.8rem,3.8vw,3rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: 'var(--text-primary)', letterSpacing: '-0.01em',
              marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
            }}
          >
            Built for Every Business<br />
            <span style={{
              background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 55%, #F5D080 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Ready to Grow.</span>
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
            Every industry has different challenges. Marketing OS adapts its AI workflows, landing pages, automation and analytics to match each business type.
          </p>
        </div>

        {/* ── Industry grid + Preview ── */}
        <div
          className="sol-body"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(1.5rem,3vw,3rem)',
            alignItems: 'start',
            marginBottom: 'clamp(3rem,6vw,5rem)',
          }}
        >
          {/* Industry grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(0.5rem,1vw,0.75rem)',
          }}>
            {INDUSTRIES.map((ind, i) => {
              const isActive = active === ind.id
              const avail    = ind.status === 'available'
              return (
                <button
                  key={ind.id}
                  onClick={() => selectIndustry(ind)}
                  aria-pressed={isActive}
                  className={visible && !reduced.current ? 'animate-fade-up' : ''}
                  style={{
                    animationDelay: `${i * 50 + 150}ms`,
                    padding: 'clamp(0.75rem,1.4vw,1rem) clamp(0.6rem,1.1vw,0.85rem)',
                    background: isActive ? (avail ? 'rgba(21,128,61,0.07)' : 'var(--gold-dim)') : 'var(--surface-2)',
                    border: `1px solid ${isActive ? (avail ? 'rgba(21,128,61,0.28)' : 'var(--gold-border)') : 'var(--border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    transform: isActive ? 'translateY(-2px)' : 'none',
                    boxShadow: isActive ? '0 0.4rem 1.2rem rgba(0,0,0,0.15)' : 'none',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' } }}
                >
                  <div style={{
                    fontSize: 'clamp(0.85rem,1.4vw,1.1rem)',
                    color: isActive ? (avail ? '#15803D' : 'var(--gold)') : 'var(--text-muted)',
                    marginBottom: '0.35rem',
                    transition: 'color 0.3s',
                  }}>{ind.icon}</div>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.6rem,0.95vw,0.72rem)',
                    color: 'var(--text-primary)', lineHeight: 1.25,
                    marginBottom: '0.3rem',
                  }}>{ind.label}</p>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
                    fontSize: 'clamp(0.38rem,0.6vw,0.46rem)',
                    letterSpacing: '0.06em',
                    color: avail ? '#15803D' : 'var(--text-muted)',
                    background: avail ? 'rgba(21,128,61,0.08)' : 'var(--surface-3)',
                    border: `1px solid ${avail ? 'rgba(21,128,61,0.2)' : 'var(--border)'}`,
                    padding: '0.15em 0.45em', borderRadius: '2em',
                  }}>
                    <span style={{
                      width: '0.22rem', height: '0.22rem', borderRadius: '50%',
                      background: avail ? '#15803D' : 'var(--text-muted)',
                      animation: avail && !reduced.current ? 'solDot 2s infinite' : 'none',
                    }} />
                    {avail ? 'Live' : 'Soon'}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Preview panel */}
          <div style={{
            position: 'sticky', top: 'clamp(5rem,8vw,7rem)',
          }}>
            <div
              style={{
                padding: 'clamp(1.25rem,2.5vw,2rem)',
                background: 'linear-gradient(145deg, var(--surface-2), var(--surface-1))',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: '0 1.5rem 4rem rgba(0,0,0,0.25)',
                overflow: 'hidden',
                position: 'relative',
                opacity: fading ? 0 : 1,
                transform: fading ? 'translateY(0.5rem)' : 'translateY(0)',
                transition: 'opacity 0.22s ease, transform 0.22s ease',
              }}
            >
              {/* Inner glow */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: '-25%', right: '-15%',
                width: '55%', height: '55%',
                background: 'radial-gradient(circle, rgba(201,150,14,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(1rem,2vw,1.5rem)' }}>
                <div style={{
                  width: 'clamp(2.2rem,3.8vw,3rem)', height: 'clamp(2.2rem,3.8vw,3rem)',
                  borderRadius: 'var(--radius-md)',
                  background: preview.status === 'available' ? 'rgba(21,128,61,0.08)' : 'var(--gold-dim)',
                  border: `1px solid ${preview.status === 'available' ? 'rgba(21,128,61,0.22)' : 'var(--gold-border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 'clamp(0.85rem,1.5vw,1.1rem)',
                  color: preview.status === 'available' ? '#15803D' : 'var(--gold)',
                  flexShrink: 0,
                }}>
                  {preview.icon}
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.9rem,1.5vw,1.1rem)',
                    color: 'var(--text-primary)', lineHeight: 1.2,
                  }}>{preview.label}</p>
                  <p style={{ fontSize: 'clamp(0.58rem,0.88vw,0.68rem)', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{preview.desc}</p>
                </div>
              </div>

              {/* Workflow steps */}
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--text-muted)', marginBottom: 'clamp(0.65rem,1.2vw,0.9rem)',
              }}>
                AI Workflow
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem,0.8vw,0.6rem)' }}>
                {preview.flows.map((flow, i) => (
                  <div key={flow} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: 'clamp(1.4rem,2.4vw,1.8rem)', height: 'clamp(1.4rem,2.4vw,1.8rem)',
                      borderRadius: '50%',
                      background: i === 0 ? (preview.status === 'available' ? 'rgba(21,128,61,0.1)' : 'var(--gold-dim)') : 'var(--surface-3)',
                      border: `1px solid ${i === 0 ? (preview.status === 'available' ? 'rgba(21,128,61,0.25)' : 'var(--gold-border)') : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: 'clamp(0.45rem,0.72vw,0.55rem)',
                      color: i === 0 ? (preview.status === 'available' ? '#15803D' : 'var(--gold)') : 'var(--text-muted)',
                    }}>
                      {i + 1}
                    </div>
                    <p style={{
                      fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                      color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: i === 0 ? 500 : 400,
                    }}>{flow}</p>
                    {i === 0 && (
                      <span style={{
                        marginLeft: 'auto', flexShrink: 0,
                        fontSize: 'clamp(0.4rem,0.62vw,0.48rem)',
                        color: preview.status === 'available' ? '#15803D' : 'var(--gold)',
                        background: preview.status === 'available' ? 'rgba(21,128,61,0.08)' : 'var(--gold-dim)',
                        border: `1px solid ${preview.status === 'available' ? 'rgba(21,128,61,0.2)' : 'var(--gold-border)'}`,
                        padding: '0.15em 0.5em', borderRadius: '2em',
                      }}>
                        {preview.status === 'available' ? 'Active' : 'Soon'}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Connector lines between steps */}
              <div style={{ position: 'absolute', left: `calc(clamp(1.25rem,2.5vw,2rem) + clamp(0.7rem,1.2vw,0.9rem))`, top: 0, bottom: 0, width: '1px', background: 'var(--border)', pointerEvents: 'none', zIndex: 0 }} />
            </div>
          </div>
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
            className="sol-benefits"
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
              Explore Solutions
            </Link>
            <Link href="/roadmap" className="btn-secondary" style={{
              padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
              fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            }}>
              View Product Roadmap
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes solDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        @media (max-width: 1024px) {
          .sol-body     { grid-template-columns: 1fr !important; }
          .sol-benefits { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 640px) {
          .sol-body > div:first-child { grid-template-columns: repeat(2,1fr) !important; }
          .sol-benefits { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 400px) {
          .sol-body > div:first-child { grid-template-columns: 1fr !important; }
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
