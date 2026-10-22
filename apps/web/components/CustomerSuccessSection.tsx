'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const CASE_STUDIES = [
  {
    id: 'realestate',
    icon: '⬡',
    business: 'Real Estate Broker',
    challenge: 'Creating listings manually every day — photos, descriptions, pricing updates across multiple platforms.',
    solution: 'Generated professional listings through WhatsApp AI. Sent property details via message, AI produced SEO-optimized pages instantly.',
    outcome: 'Faster publishing, centralized lead management, 3× more enquiries per listing.',
    color: '#15803D',
    steps: [
      'Daily manual listing creation',
      'Sent property details via WhatsApp',
      'AI generated SEO listing page',
      'Published with shareable link',
      'Leads captured in dashboard',
    ],
  },
  {
    id: 'hotels',
    icon: '◈',
    business: 'Hotels & Resorts',
    challenge: 'Managing booking enquiries across phone, WhatsApp, and walk-ins with no centralized system.',
    solution: 'AI-generated landing pages for each property with room details, amenities, and direct booking enquiry forms.',
    outcome: 'Improved online visibility, structured enquiry management, 40% faster response to booking requests.',
    color: '#C9960E',
    steps: [
      'Scattered booking enquiries',
      'AI created property landing pages',
      'Enquiry forms embedded on pages',
      'All leads routed to dashboard',
      'Streamlined booking workflow',
    ],
  },
  {
    id: 'restaurants',
    icon: '◉',
    business: 'Restaurants & Cafés',
    challenge: 'Scattered menu links, no online presence management, lost customer enquiries.',
    solution: 'Mobile-first landing pages with menu, location, hours, and direct WhatsApp ordering integration.',
    outcome: 'Simplified customer experience, centralized enquiries, 25% increase in direct orders.',
    color: '#C9960E',
    steps: [
      'No centralized online presence',
      'Mobile landing page generated',
      'Menu and location embedded',
      'WhatsApp ordering connected',
      'Customer enquiries organized',
    ],
  },
  {
    id: 'healthcare',
    icon: '◎',
    business: 'Healthcare Clinics',
    challenge: 'Appointment enquiries lost across calls and messages, no structured patient intake process.',
    solution: 'Dedicated service pages with doctor profiles, appointment booking forms, and automated confirmation.',
    outcome: 'Improved lead organization, reduced missed appointments, structured patient enquiry pipeline.',
    color: '#C9960E',
    steps: [
      'Disorganized appointment requests',
      'Service pages with doctor info',
      'Online booking forms deployed',
      'Automated confirmations sent',
      'Patient data organized in CRM',
    ],
  },
]

const MILESTONES = [
  { label: 'WhatsApp Integration',         status: 'completed', date: 'Q1 2026' },
  { label: 'AI Listing Generation',        status: 'completed', date: 'Q1 2026' },
  { label: 'Landing Pages',                status: 'completed', date: 'Q2 2026' },
  { label: 'SEO Engine',                   status: 'completed', date: 'Q2 2026' },
  { label: 'Analytics Dashboard',          status: 'completed', date: 'Q2 2026' },
  { label: 'AI Ecosystem',                 status: 'completed', date: 'Q3 2026' },
  { label: 'Subscription Plans',           status: 'upcoming',  date: 'Q3 2026' },
  { label: 'AI CRM',                       status: 'upcoming',  date: 'Q4 2026' },
  { label: 'AI Website Builder',           status: 'upcoming',  date: 'Q4 2026' },
  { label: 'Marketing Automation',         status: 'upcoming',  date: 'Q1 2027' },
]

const TRUST_ELEMENTS = [
  { icon: '◈', label: 'Secure Infrastructure' },
  { icon: '▲', label: 'SEO Ready' },
  { icon: '✦', label: 'AI Powered' },
  { icon: '◎', label: 'Fast Hosting' },
  { icon: '◉', label: 'Mobile Optimized' },
  { icon: '⬡', label: 'Privacy Focused' },
  { icon: '◆', label: 'Accessible' },
  { icon: '❋', label: 'Production Ready' },
]

const SUCCESS_TIMELINE = [
  { step: 1, label: 'Business Challenge', icon: '⬡' },
  { step: 2, label: 'Used Marketing OS', icon: '✦' },
  { step: 3, label: 'Generated Landing Page', icon: '◈' },
  { step: 4, label: 'Improved Workflow', icon: '▲' },
  { step: 5, label: 'Collected Leads', icon: '◉' },
  { step: 6, label: 'Business Growth', icon: '◆' },
]

export default function CustomerSuccessSection() {
  const [visible,     setVisible]     = useState(false)
  const [activeCase,  setActiveCase]  = useState('realestate')
  const [activeStep,  setActiveStep]  = useState(0)
  const [hoveredCase, setHoveredCase] = useState<string | null>(null)
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
    const id = setInterval(() => setActiveStep(i => (i + 1) % SUCCESS_TIMELINE.length), 2400)
    return () => clearInterval(id)
  }, [visible])

  const currentCase = CASE_STUDIES.find(c => c.id === activeCase) || CASE_STUDIES[0]

  return (
    <section
      ref={ref}
      id="customer-success"
      aria-labelledby="cs-heading"
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
          background: 'radial-gradient(circle, rgba(201,150,14,0.045) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '0%', right: '-5%',
          width: 'clamp(20rem,32vw,42rem)', height: 'clamp(20rem,32vw,42rem)',
          background: 'radial-gradient(circle, rgba(21,128,61,0.035) 0%, transparent 65%)',
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
            }}>
              Customer Success
            </span>
          </div>
          <div className="gold-divider" style={{ margin: '0 auto clamp(0.85rem,1.6vw,1.2rem)' }} />
          <h2
            id="cs-heading"
            className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
            style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(1.8rem,3.8vw,3rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: 'var(--text-primary)', letterSpacing: '-0.01em',
              marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
            }}
          >
            Real Businesses.<br />
            <span style={{
              background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 55%, #F5D080 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Real Results. Real Growth.</span>
          </h2>
          <p
            className={visible && !reduced.current ? 'animate-fade-up delay-200' : ''}
            style={{
              fontFamily: "'DM Sans', var(--font-sans), sans-serif",
              fontSize: 'clamp(0.85rem,1.3vw,1rem)',
              color: 'var(--text-secondary)', lineHeight: 1.8,
              maxWidth: '56ch', margin: '0 auto',
            }}
          >
            Every improvement inside Marketing OS is driven by real business workflows, user feedback and continuous iteration. Here is how businesses are growing with the platform.
          </p>
        </div>

        {/* ── Customer Success Timeline ── */}
        <div
          className="cs-timeline"
          style={{
            marginBottom: 'clamp(3rem,6vw,5rem)',
            position: 'relative',
          }}
        >
          {/* Desktop horizontal timeline */}
          <div
            className="cs-timeline-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              padding: 'clamp(1.5rem,3vw,2.5rem) 0',
            }}
          >
            {/* Connector line */}
            <div style={{
              position: 'absolute',
              top: '50%', left: 'clamp(1.5rem,3vw,2.5rem)',
              right: 'clamp(1.5rem,3vw,2.5rem)',
              height: '1px',
              background: 'linear-gradient(90deg, var(--gold-border), var(--border), var(--gold-border))',
              transform: 'translateY(-50%)',
              zIndex: 0,
            }} />

            {SUCCESS_TIMELINE.map((item, i) => {
              const isActive = activeStep === i
              const isPast = i < activeStep
              return (
                <div
                  key={item.step}
                  className={visible && !reduced.current ? 'animate-fade-up' : ''}
                  style={{
                    animationDelay: `${i * 80 + 200}ms`,
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'clamp(0.4rem,0.8vw,0.6rem)',
                    flex: 1,
                    cursor: 'default',
                  }}
                >
                  {/* Step circle */}
                  <div style={{
                    width: 'clamp(2.5rem,4.5vw,3.5rem)',
                    height: 'clamp(2.5rem,4.5vw,3.5rem)',
                    borderRadius: '50%',
                    background: isActive
                      ? 'linear-gradient(135deg, var(--gold), var(--gold-light))'
                      : isPast
                        ? 'rgba(21,128,61,0.12)'
                        : 'var(--surface-3)',
                    border: `1px solid ${
                      isActive
                        ? 'var(--gold-border-md)'
                        : isPast
                          ? 'rgba(21,128,61,0.25)'
                          : 'var(--border)'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(0.7rem,1.2vw,0.9rem)',
                    color: isActive ? '#000' : isPast ? '#15803D' : 'var(--text-muted)',
                    boxShadow: isActive
                      ? '0 0 0 4px var(--gold-dim), 0 0 1.5rem rgba(201,168,76,0.2)'
                      : 'none',
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                    animation: isActive && !reduced.current
                      ? 'csStepPulse 2.4s ease-in-out infinite'
                      : 'none',
                  }}>
                    {isPast ? (
                      <span style={{ fontSize: 'clamp(0.5rem,0.85vw,0.65rem)' }}>✓</span>
                    ) : (
                      item.icon
                    )}
                  </div>

                  {/* Label */}
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
                    color: isActive ? 'var(--text-primary)' : isPast ? 'var(--text-secondary)' : 'var(--text-muted)',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    maxWidth: '10ch',
                    transition: 'color 0.3s',
                  }}>
                    {item.label}
                  </p>

                  {/* Step number */}
                  <span style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(0.38rem,0.58vw,0.46rem)',
                    letterSpacing: '0.12em',
                    color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                    opacity: isActive ? 1 : 0.4,
                    transition: 'opacity 0.3s, color 0.3s',
                  }}>
                    {`0${item.step}`}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Mobile vertical timeline */}
          <div
            className="cs-timeline-mobile"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 'clamp(0.5rem,1vw,0.75rem)',
              position: 'relative',
              paddingLeft: 'clamp(2rem,4vw,3rem)',
            }}
          >
            {/* Vertical connector */}
            <div style={{
              position: 'absolute',
              top: 'clamp(1.25rem,2.5vw,1.75rem)',
              bottom: 'clamp(1.25rem,2.5vw,1.75rem)',
              left: 'clamp(0.9rem,1.8vw,1.2rem)',
              width: '1px',
              background: 'linear-gradient(180deg, var(--gold-border), var(--border), var(--gold-border))',
            }} />

            {SUCCESS_TIMELINE.map((item, i) => {
              const isActive = activeStep === i
              const isPast = i < activeStep
              return (
                <div
                  key={item.step}
                  className={visible && !reduced.current ? 'animate-fade-up' : ''}
                  style={{
                    animationDelay: `${i * 60 + 200}ms`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'clamp(0.65rem,1.2vw,0.9rem)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div style={{
                    width: 'clamp(1.6rem,3vw,2.2rem)',
                    height: 'clamp(1.6rem,3vw,2.2rem)',
                    borderRadius: '50%',
                    background: isActive
                      ? 'linear-gradient(135deg, var(--gold), var(--gold-light))'
                      : isPast
                        ? 'rgba(21,128,61,0.12)'
                        : 'var(--surface-3)',
                    border: `1px solid ${
                      isActive
                        ? 'var(--gold-border-md)'
                        : isPast
                          ? 'rgba(21,128,61,0.25)'
                          : 'var(--border)'
                    }`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 'clamp(0.5rem,0.9vw,0.65rem)',
                    color: isActive ? '#000' : isPast ? '#15803D' : 'var(--text-muted)',
                    boxShadow: isActive
                      ? '0 0 0 3px var(--gold-dim)'
                      : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {isPast ? '✓' : item.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.72rem,1.1vw,0.82rem)',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      lineHeight: 1.2,
                    }}>
                      {item.label}
                    </p>
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(0.38rem,0.58vw,0.46rem)',
                      letterSpacing: '0.12em',
                      color: 'var(--text-muted)',
                    }}>
                      {`STEP 0${item.step}`}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Case Study Cards ── */}
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
            Success Stories
          </p>

          {/* Case study selector tabs */}
          <div
            className="cs-tabs"
            style={{
              display: 'flex',
              gap: 'clamp(0.4rem,0.8vw,0.6rem)',
              justifyContent: 'center',
              marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
              flexWrap: 'wrap',
            }}
          >
            {CASE_STUDIES.map((cs, i) => {
              const isActive = activeCase === cs.id
              return (
                <button
                  key={cs.id}
                  onClick={() => setActiveCase(cs.id)}
                  aria-pressed={isActive}
                  className={visible && !reduced.current ? 'animate-fade-up' : ''}
                  style={{
                    animationDelay: `${i * 60 + 200}ms`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'clamp(0.35rem,0.6vw,0.5rem)',
                    padding: 'clamp(0.45rem,0.85vw,0.6rem) clamp(0.75rem,1.4vw,1rem)',
                    background: isActive ? 'var(--gold-dim)' : 'var(--surface-2)',
                    border: `1px solid ${isActive ? 'var(--gold-border)' : 'var(--border)'}`,
                    borderRadius: '2em',
                    cursor: 'pointer',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.6rem,0.95vw,0.72rem)',
                    color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    transform: isActive ? 'translateY(-1px)' : 'none',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' } }}
                >
                  <span style={{ fontSize: 'clamp(0.55rem,0.85vw,0.65rem)' }}>{cs.icon}</span>
                  {cs.business}
                </button>
              )
            })}
          </div>

          {/* Active case study card */}
          <div
            className={visible && !reduced.current ? 'animate-fade-up' : ''}
            style={{ animationDelay: '200ms' }}
          >
            <div
              className="cs-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(1.5rem,3vw,2.5rem)',
                padding: 'clamp(1.5rem,3vw,2.5rem)',
                background: 'linear-gradient(145deg, var(--surface-2), var(--surface-1))',
                border: '1px solid var(--gold-border)',
                borderRadius: 'var(--radius-2xl)',
                boxShadow: '0 1.5rem 4rem rgba(0,0,0,0.25), 0 0 0 1px var(--gold-border)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Inner glow */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: '-30%', right: '-10%',
                width: '50%', height: '60%',
                background: `radial-gradient(circle, ${currentCase.color}08 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* Left column — Problem & Solution */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Business type */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.5rem,1vw,0.75rem)',
                  marginBottom: 'clamp(1rem,2vw,1.5rem)',
                }}>
                  <div style={{
                    width: 'clamp(2rem,3.5vw,2.8rem)',
                    height: 'clamp(2rem,3.5vw,2.8rem)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--gold-dim)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(0.8rem,1.4vw,1.1rem)',
                    color: 'var(--gold)',
                    flexShrink: 0,
                  }}>
                    {currentCase.icon}
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.85rem,1.4vw,1.05rem)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.2,
                    }}>
                      {currentCase.business}
                    </p>
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(0.38rem,0.58vw,0.46rem)',
                      letterSpacing: '0.15em',
                      color: 'var(--gold)',
                    }}>
                      Case Study
                    </span>
                  </div>
                </div>

                {/* Challenge */}
                <div style={{ marginBottom: 'clamp(1rem,2vw,1.5rem)' }}>
                  <p style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 'clamp(0.4rem,0.8vw,0.6rem)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}>
                    <span style={{ color: '#ef4444' }}>△</span>
                    Challenge
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.7rem,1.1vw,0.82rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                  }}>
                    {currentCase.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div style={{ marginBottom: 'clamp(1rem,2vw,1.5rem)' }}>
                  <p style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: 'clamp(0.4rem,0.8vw,0.6rem)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}>
                    <span style={{ color: 'var(--gold)' }}>✦</span>
                    Marketing OS Solution
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.7rem,1.1vw,0.82rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                  }}>
                    {currentCase.solution}
                  </p>
                </div>
              </div>

              {/* Right column — Outcome & Steps */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Outcome */}
                <div style={{
                  padding: 'clamp(1rem,2vw,1.5rem)',
                  background: 'rgba(21,128,61,0.06)',
                  border: '1px solid rgba(21,128,61,0.2)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'clamp(1rem,2vw,1.5rem)',
                }}>
                  <p style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: '#15803D',
                    marginBottom: 'clamp(0.4rem,0.8vw,0.6rem)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}>
                    <span>✓</span>
                    Outcome
                  </p>
                  <p style={{
                    fontSize: 'clamp(0.7rem,1.1vw,0.82rem)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.7,
                    fontFamily: "'Playfair Display', serif",
                  }}>
                    {currentCase.outcome}
                  </p>
                </div>

                {/* Workflow steps */}
                <p style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  marginBottom: 'clamp(0.65rem,1.2vw,0.9rem)',
                }}>
                  Workflow
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.35rem,0.7vw,0.5rem)' }}>
                  {currentCase.steps.map((step, i) => (
                    <div key={step} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(0.5rem,1vw,0.75rem)',
                      padding: 'clamp(0.4rem,0.8vw,0.55rem) clamp(0.65rem,1.2vw,0.85rem)',
                      background: i === 0 ? 'rgba(21,128,61,0.04)' : 'transparent',
                      border: i === 0 ? '1px solid rgba(21,128,61,0.15)' : '1px solid transparent',
                      borderRadius: 'var(--radius-md)',
                      transition: 'all 0.3s',
                    }}>
                      <div style={{
                        width: 'clamp(1.2rem,2vw,1.6rem)',
                        height: 'clamp(1.2rem,2vw,1.6rem)',
                        borderRadius: '50%',
                        background: i === 0 ? 'rgba(21,128,61,0.1)' : 'var(--surface-3)',
                        border: `1px solid ${i === 0 ? 'rgba(21,128,61,0.25)' : 'var(--border)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: 'clamp(0.4rem,0.65vw,0.5rem)',
                        color: i === 0 ? '#15803D' : 'var(--text-muted)',
                      }}>
                        {i + 1}
                      </div>
                      <p style={{
                        fontSize: 'clamp(0.6rem,0.95vw,0.72rem)',
                        color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                        lineHeight: 1.3,
                      }}>
                        {step}
                      </p>
                      {i === 0 && (
                        <span style={{
                          marginLeft: 'auto',
                          flexShrink: 0,
                          fontSize: 'clamp(0.38rem,0.58vw,0.46rem)',
                          color: '#15803D',
                          background: 'rgba(21,128,61,0.08)',
                          border: '1px solid rgba(21,128,61,0.2)',
                          padding: '0.15em 0.5em',
                          borderRadius: '2em',
                        }}>
                          Start
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Product Milestones ── */}
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
            Product Milestones
          </p>

          <div
            className="cs-milestones"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'clamp(0.5rem,1vw,0.75rem)',
              position: 'relative',
            }}
          >
            {/* Completed milestones */}
            <div style={{
              padding: 'clamp(1.25rem,2.5vw,2rem)',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
            }}>
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.45rem,0.72vw,0.54rem)',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: '#15803D',
                marginBottom: 'clamp(1rem,2vw,1.5rem)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}>
                <span style={{
                  width: '0.35rem', height: '0.35rem', borderRadius: '50%',
                  background: '#15803D',
                  animation: !reduced.current ? 'csDot 2s infinite' : 'none',
                }} />
                Shipped
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
                {MILESTONES.filter(m => m.status === 'completed').map((m, i) => (
                  <div
                    key={m.label}
                    className={visible && !reduced.current ? 'animate-fade-up' : ''}
                    style={{
                      animationDelay: `${i * 50 + 200}ms`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(0.5rem,1vw,0.75rem)',
                      padding: 'clamp(0.5rem,1vw,0.7rem) clamp(0.65rem,1.2vw,0.85rem)',
                      background: 'rgba(21,128,61,0.04)',
                      border: '1px solid rgba(21,128,61,0.12)',
                      borderRadius: 'var(--radius-md)',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(21,128,61,0.3)'; e.currentTarget.style.background = 'rgba(21,128,61,0.07)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(21,128,61,0.12)'; e.currentTarget.style.background = 'rgba(21,128,61,0.04)' }}
                  >
                    <span style={{
                      width: 'clamp(1.1rem,1.8vw,1.4rem)',
                      height: 'clamp(1.1rem,1.8vw,1.4rem)',
                      borderRadius: '50%',
                      background: '#15803D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: 'clamp(0.4rem,0.65vw,0.5rem)',
                      color: '#fff',
                    }}>
                      ✓
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                      }}>
                        {m.label}
                      </p>
                    </div>
                    <span style={{
                      fontSize: 'clamp(0.4rem,0.62vw,0.48rem)',
                      color: 'var(--text-muted)',
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: '0.08em',
                      flexShrink: 0,
                    }}>
                      {m.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming milestones */}
            <div style={{
              padding: 'clamp(1.25rem,2.5vw,2rem)',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
            }}>
              <p style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.45rem,0.72vw,0.54rem)',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 'clamp(1rem,2vw,1.5rem)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}>
                <span style={{
                  width: '0.35rem', height: '0.35rem', borderRadius: '50%',
                  background: 'var(--gold)',
                  animation: !reduced.current ? 'csDot 2s infinite' : 'none',
                }} />
                Building Next
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
                {MILESTONES.filter(m => m.status === 'upcoming').map((m, i) => (
                  <div
                    key={m.label}
                    className={visible && !reduced.current ? 'animate-fade-up' : ''}
                    style={{
                      animationDelay: `${i * 50 + 200}ms`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'clamp(0.5rem,1vw,0.75rem)',
                      padding: 'clamp(0.5rem,1vw,0.7rem) clamp(0.65rem,1.2vw,0.85rem)',
                      background: 'var(--gold-dim)',
                      border: '1px solid var(--gold-border)',
                      borderRadius: 'var(--radius-md)',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border-md)'; e.currentTarget.style.background = 'rgba(201,168,76,0.15)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.background = 'var(--gold-dim)' }}
                  >
                    <span style={{
                      width: 'clamp(1.1rem,1.8vw,1.4rem)',
                      height: 'clamp(1.1rem,1.8vw,1.4rem)',
                      borderRadius: '50%',
                      border: '1.5px solid var(--gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: 'clamp(0.4rem,0.65vw,0.5rem)',
                      color: 'var(--gold)',
                    }}>
                      ⟡
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                      }}>
                        {m.label}
                      </p>
                    </div>
                    <span style={{
                      fontSize: 'clamp(0.4rem,0.62vw,0.48rem)',
                      color: 'var(--gold)',
                      fontFamily: "'Cinzel', serif",
                      letterSpacing: '0.08em',
                      flexShrink: 0,
                    }}>
                      {m.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Trust Elements ── */}
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
            Built on Trust
          </p>
          <div
            className="cs-trust"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(0.4rem,0.8vw,0.6rem)',
            }}
          >
            {TRUST_ELEMENTS.map((t, i) => (
              <div
                key={t.label}
                className={visible && !reduced.current ? 'animate-fade-up' : ''}
                style={{
                  animationDelay: `${i * 40 + 200}ms`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'clamp(0.35rem,0.6vw,0.5rem)',
                  padding: 'clamp(0.4rem,0.8vw,0.55rem) clamp(0.75rem,1.4vw,1rem)',
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '2em',
                  transition: 'all 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.background = 'var(--gold-dim)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <span style={{
                  fontSize: 'clamp(0.5rem,0.8vw,0.6rem)',
                  color: 'var(--gold)',
                }}>
                  {t.icon}
                </span>
                <span style={{
                  fontSize: 'clamp(0.58rem,0.88vw,0.68rem)',
                  color: 'var(--text-secondary)',
                  letterSpacing: '0.02em',
                }}>
                  {t.label}
                </span>
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
              Join Early Access
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
        @keyframes csStepPulse {
          0%,100% { box-shadow: 0 0 0 4px var(--gold-dim), 0 0 1.5rem rgba(201,168,76,0.15); }
          50%      { box-shadow: 0 0 0 6px var(--gold-dim), 0 0 2.5rem rgba(201,168,76,0.25); }
        }
        @keyframes csDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        @media (max-width: 1024px) {
          .cs-timeline-desktop { display: none !important; }
          .cs-timeline-mobile  { display: flex !important; }
          .cs-card             { grid-template-columns: 1fr !important; }
          .cs-milestones       { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .cs-tabs { flex-direction: column !important; align-items: center !important; }
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