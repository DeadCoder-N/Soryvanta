'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Ideal for individual brokers.',
    popular: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    enterprise: false,
    icon: '⬡',
    highlights: [
      'Basic AI Listings',
      'Dashboard Access',
      'WhatsApp Integration',
      'SEO Optimized Pages',
      'Lead Capture Forms',
    ],
    cta: 'Start Free',
    href: '/register',
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For growing brokerages.',
    popular: true,
    monthlyPrice: 999,
    yearlyPrice: 9999,
    enterprise: false,
    icon: '✦',
    highlights: [
      'Everything in Starter',
      'Advanced AI Generation',
      'Analytics Dashboard',
      'Lead Management',
      'Workflow Automation',
      'Priority Listing Placement',
    ],
    cta: 'Start Free Trial',
    href: '/register',
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'For teams and agencies.',
    popular: false,
    monthlyPrice: 2499,
    yearlyPrice: 24999,
    enterprise: false,
    icon: '◈',
    highlights: [
      'Everything in Professional',
      'Multi-user Access',
      'Priority Support',
      'Advanced Reports',
      'Future AI Modules',
      'Custom Branding',
    ],
    cta: 'Start Free Trial',
    href: '/register',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Large organizations.',
    popular: false,
    monthlyPrice: 0,
    yearlyPrice: 0,
    enterprise: true,
    icon: '◆',
    highlights: [
      'Custom Pricing',
      'Dedicated Support',
      'Custom Integrations',
      'Advanced Security',
      'SLA Guarantee',
      'On-premise Option',
    ],
    cta: 'Talk to Sales',
    href: '/#contact',
  },
]

const FEATURES = [
  { label: 'AI Listing Generation',        starter: true,  pro: true,  biz: true,  ent: true },
  { label: 'WhatsApp Automation',          starter: true,  pro: true,  biz: true,  ent: true },
  { label: 'Landing Pages',                starter: true,  pro: true,  biz: true,  ent: true },
  { label: 'SEO Optimization',             starter: true,  pro: true,  biz: true,  ent: true },
  { label: 'Dashboard',                    starter: true,  pro: true,  biz: true,  ent: true },
  { label: 'Lead Capture',                 starter: true,  pro: true,  biz: true,  ent: true },
  { label: 'Analytics',                    starter: false, pro: true,  biz: true,  ent: true },
  { label: 'CRM',                          starter: false, pro: true,  biz: true,  ent: true },
  { label: 'Workflow Automation',          starter: false, pro: true,  biz: true,  ent: true },
  { label: 'API Access',                   starter: false, pro: false, biz: true,  ent: true },
  { label: 'Multi-user',                   starter: false, pro: false, biz: true,  ent: true },
  { label: 'Priority Support',             starter: false, pro: false, biz: true,  ent: true },
  { label: 'Custom Integrations',          starter: false, pro: false, biz: false, ent: true },
  { label: 'Dedicated Support',            starter: false, pro: false, biz: false, ent: true },
  { label: 'Future AI Modules',            starter: false, pro: false, biz: true,  ent: true },
]

const TRUST_ELEMENTS = [
  { icon: '◈', label: 'Secure Payments' },
  { icon: '▲', label: 'Cancel Anytime' },
  { icon: '✦', label: 'No Hidden Fees' },
  { icon: '◎', label: 'Transparent Pricing' },
  { icon: '◉', label: 'Scalable Plans' },
  { icon: '❋', label: 'Enterprise Ready' },
]

const FAQ_ITEMS = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate the billing.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Every paid plan comes with a 14-day free trial. No credit card required. Cancel anytime during the trial.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, UPI, net banking, and Razorpay. Enterprise plans support invoicing.',
  },
  {
    q: 'Can I use Brisvora for multiple businesses?',
    a: 'Yes. The Business and Enterprise plans support multiple businesses under a single account with separate dashboards.',
  },
  {
    q: 'What happens when I exceed my plan limits?',
    a: 'We notify you before any limits are reached. You can upgrade your plan or purchase additional capacity as needed.',
  },
]

function formatPrice(price: number): string {
  if (price === 0) return 'Free'
  return `₹${price.toLocaleString('en-IN')}`
}

function useCounter(target: number, active: boolean, duration = 1200) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = 16
    const inc = target / (duration / step)
    const id = setInterval(() => {
      start += inc
      if (start >= target) { setVal(target); clearInterval(id) }
      else setVal(Math.round(start))
    }, step)
    return () => clearInterval(id)
  }, [active, target, duration])
  return val
}

export default function PricingSection() {
  const [visible,     setVisible]     = useState(false)
  const [billing,     setBilling]     = useState<'monthly' | 'yearly' | 'enterprise'>('monthly')
  const [activeFaq,   setActiveFaq]   = useState<number | null>(null)
  const [roiListings, setRoiListings] = useState(20)
  const [roiHours,    setRoiHours]    = useState(5)
  const [roiVisible,  setRoiVisible]  = useState(false)
  const [reduced, setReduced] = useState(false)
  const ref     = useRef<HTMLElement>(null)
  const roiRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.06 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!roiRef.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRoiVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    if (roiRef.current) obs.observe(roiRef.current)
    return () => obs.disconnect()
  }, [])

  const hoursSaved = roiListings * roiHours
  const monthlyValue = hoursSaved * 500
  const yearlyValue = monthlyValue * 12
  const animatedHours = useCounter(hoursSaved, roiVisible, 1000)
  const animatedMonthly = useCounter(monthlyValue, roiVisible, 1200)
  const animatedYearly = useCounter(yearlyValue, roiVisible, 1400)

  const getPrice = useCallback((plan: typeof PLANS[0]) => {
    if (plan.enterprise) return 'Custom'
    if (billing === 'enterprise') return 'Custom'
    if (billing === 'yearly') return formatPrice(plan.yearlyPrice)
    return formatPrice(plan.monthlyPrice)
  }, [billing])

  const getPeriod = useCallback((plan: typeof PLANS[0]) => {
    if (plan.enterprise || billing === 'enterprise') return ''
    if (billing === 'yearly') return '/year'
    return '/month'
  }, [billing])

  const getSavings = useCallback((plan: typeof PLANS[0]) => {
    if (plan.enterprise || plan.monthlyPrice === 0 || billing !== 'yearly') return null
    const monthly = plan.monthlyPrice * 12
    const yearly = plan.yearlyPrice
    const saved = monthly - yearly
    return `Save ₹${saved.toLocaleString('en-IN')}/yr`
  }, [billing])

  return (
    <section
      ref={ref}
      id="pricing"
      aria-labelledby="pricing-heading"
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
          position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)',
          width: 'clamp(30rem,55vw,70rem)', height: 'clamp(30rem,55vw,70rem)',
          background: 'radial-gradient(circle, rgba(201,150,14,0.045) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: 'clamp(20rem,32vw,42rem)', height: 'clamp(20rem,32vw,42rem)',
          background: 'radial-gradient(circle, rgba(21,128,61,0.03) 0%, transparent 65%)',
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
              Pricing
            </span>
          </div>
          <div className="gold-divider" style={{ margin: '0 auto clamp(0.85rem,1.6vw,1.2rem)' }} />
          <h2
            id="pricing-heading"
            className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
            style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(1.8rem,3.8vw,3rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: 'var(--text-primary)', letterSpacing: '-0.01em',
              marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
            }}
          >
            Start Small.<br />
            <span style={{
              background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 55%, #F5D080 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Scale Without Limits.</span>
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
            Whether you are an individual broker or a growing business, Brisvora offers flexible plans designed to support every stage of growth.
          </p>
          <div className={visible && !reduced.current ? 'animate-fade-up delay-300' : ''} style={{ marginTop: 'clamp(1rem,2vw,1.5rem)' }}>
            <Link
              href="/pricing"
              style={{
                fontSize: 'clamp(0.62rem,0.95vw,0.72rem)',
                color: 'var(--gold)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                borderBottom: '1px solid var(--gold-border)',
                paddingBottom: '1px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              View detailed pricing & feature comparison →
            </Link>
          </div>
        </div>

        {/* ── Billing Toggle ── */}
        <div
          className={visible && !reduced.current ? 'animate-fade-up delay-150' : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.4rem,0.8vw,0.6rem)',
            marginBottom: 'clamp(2.5rem,5vw,4rem)',
          }}
        >
          {(['monthly', 'yearly', 'enterprise'] as const).map((b) => {
            const isActive = billing === b
            return (
              <button
                key={b}
                onClick={() => setBilling(b)}
                aria-pressed={isActive}
                style={{
                  padding: 'clamp(0.5rem,0.9vw,0.65rem) clamp(1rem,2vw,1.4rem)',
                  background: isActive
                    ? 'linear-gradient(135deg, var(--gold), var(--gold-light))'
                    : 'var(--surface-3)',
                  border: `1px solid ${isActive ? 'var(--gold-border-md)' : 'var(--border)'}`,
                  borderRadius: '2em',
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#000' : 'var(--text-secondary)',
                  letterSpacing: '0.03em',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                  boxShadow: isActive ? '0 4px 16px rgba(201,168,76,0.25)' : 'none',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' } }}
              >
                <span style={{ textTransform: 'capitalize' }}>{b}</span>
                {b === 'yearly' && (
                  <span style={{
                    marginLeft: '0.4rem',
                    fontSize: 'clamp(0.4rem,0.62vw,0.48rem)',
                    color: '#15803D',
                    background: 'rgba(21,128,61,0.1)',
                    border: '1px solid rgba(21,128,61,0.2)',
                    padding: '0.1em 0.4em',
                    borderRadius: '2em',
                    fontWeight: 500,
                  }}>
                    Save 15%
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ── Pricing Cards ── */}
        <div
          className="pricing-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(0.65rem,1.2vw,1rem)',
            marginBottom: 'clamp(3rem,6vw,5rem)',
          }}
        >
          {PLANS.map((plan, i) => {
            const price = getPrice(plan)
            const period = getPeriod(plan)
            const savings = getSavings(plan)
            return (
              <div
                key={plan.id}
                className={visible && !reduced.current ? 'animate-fade-up' : ''}
                style={{
                  animationDelay: `${i * 80 + 200}ms`,
                  position: 'relative',
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '-0.75rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 3,
                  }}>
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(0.38rem,0.58vw,0.46rem)',
                      letterSpacing: '0.15em',
                      color: '#15803D',
                      background: 'rgba(21,128,61,0.1)',
                      border: '1px solid rgba(21,128,61,0.25)',
                      padding: '0.3em 0.8em',
                      borderRadius: '2em',
                      whiteSpace: 'nowrap',
                    }}>
                      Most Popular
                    </span>
                  </div>
                )}

                <div
                  className="pricing-card"
                  style={{
                    padding: 'clamp(1.25rem,2.5vw,2rem)',
                    background: plan.popular
                      ? 'linear-gradient(145deg, var(--surface-2), var(--surface-1))'
                      : 'var(--surface-2)',
                    border: `1px solid ${plan.popular ? 'var(--gold-border)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-2xl)',
                    boxShadow: plan.popular
                      ? '0 1.5rem 4rem rgba(0,0,0,0.25), 0 0 0 1px var(--gold-border)'
                      : 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    cursor: 'default',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = plan.popular
                      ? '0 2rem 5rem rgba(0,0,0,0.3), 0 0 0 1px var(--gold-border)'
                      : '0 1.5rem 4rem rgba(0,0,0,0.2)'
                    e.currentTarget.style.borderColor = plan.popular ? 'var(--gold-border-md)' : 'var(--gold-border)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = plan.popular
                      ? '0 1.5rem 4rem rgba(0,0,0,0.25), 0 0 0 1px var(--gold-border)'
                      : 'none'
                    e.currentTarget.style.borderColor = plan.popular ? 'var(--gold-border)' : 'var(--border)'
                  }}
                >
                  {/* Inner glow for popular */}
                  {plan.popular && (
                    <div aria-hidden="true" style={{
                      position: 'absolute', top: '-20%', right: '-20%',
                      width: '60%', height: '50%',
                      background: 'radial-gradient(circle, rgba(201,150,14,0.06) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Plan header */}
                  <div style={{ marginBottom: 'clamp(1rem,2vw,1.5rem)', position: 'relative', zIndex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: 'clamp(0.4rem,0.8vw,0.6rem)',
                    }}>
                      <span style={{
                        fontSize: 'clamp(0.8rem,1.4vw,1rem)',
                        color: plan.popular ? 'var(--gold)' : 'var(--text-muted)',
                      }}>
                        {plan.icon}
                      </span>
                      <p style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(0.85rem,1.4vw,1.05rem)',
                        color: 'var(--text-primary)',
                        lineHeight: 1.2,
                      }}>
                        {plan.name}
                      </p>
                    </div>
                    <p style={{
                      fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                    }}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div style={{
                    marginBottom: 'clamp(1rem,2vw,1.5rem)',
                    position: 'relative', zIndex: 1,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                      <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.6rem,3vw,2.4rem)',
                        color: 'var(--text-primary)',
                        fontWeight: 400,
                        lineHeight: 1,
                      }}>
                        {price}
                      </span>
                      {period && (
                        <span style={{
                          fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
                          color: 'var(--text-muted)',
                        }}>
                          {period}
                        </span>
                      )}
                    </div>
                    {savings && (
                      <span style={{
                        display: 'inline-block',
                        marginTop: '0.3rem',
                        fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                        color: '#15803D',
                        background: 'rgba(21,128,61,0.08)',
                        border: '1px solid rgba(21,128,61,0.18)',
                        padding: '0.15em 0.5em',
                        borderRadius: '2em',
                      }}>
                        {savings}
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  <div style={{
                    flex: 1,
                    marginBottom: 'clamp(1rem,2vw,1.5rem)',
                    position: 'relative', zIndex: 1,
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem,0.8vw,0.6rem)' }}>
                      {plan.highlights.map((h) => (
                        <div key={h} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}>
                          <span style={{
                            width: 'clamp(0.9rem,1.5vw,1.1rem)',
                            height: 'clamp(0.9rem,1.5vw,1.1rem)',
                            borderRadius: '50%',
                            background: 'rgba(21,128,61,0.08)',
                            border: '1px solid rgba(21,128,61,0.18)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            fontSize: 'clamp(0.35rem,0.55vw,0.42rem)',
                            color: '#15803D',
                          }}>
                            ✓
                          </span>
                          <span style={{
                            fontSize: 'clamp(0.58rem,0.9vw,0.68rem)',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.3,
                          }}>
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <Link
                      href={plan.href}
                      className={plan.enterprise ? 'btn-secondary' : 'btn-primary'}
                      style={{
                        display: 'flex',
                        width: '100%',
                        padding: 'clamp(0.65rem,1.2vw,0.85rem) clamp(1rem,2vw,1.5rem)',
                        fontSize: 'clamp(0.65rem,1vw,0.75rem)',
                        justifyContent: 'center',
                      }}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Feature Comparison ── */}
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
            Compare Plans
          </p>

          <div
            className="pricing-compare"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}
          >
            {/* Header row */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{
                padding: 'clamp(0.75rem,1.4vw,1rem) clamp(1rem,2vw,1.25rem)',
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(0.45rem,0.72vw,0.54rem)',
                letterSpacing: '0.15em',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
              }}>
                Feature
              </div>
              {['Starter', 'Professional', 'Business', 'Enterprise'].map((name, i) => (
                <div
                  key={name}
                  style={{
                    padding: 'clamp(0.75rem,1.4vw,1rem) clamp(0.5rem,1vw,0.75rem)',
                    textAlign: 'center',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.6rem,0.95vw,0.72rem)',
                    color: i === 1 ? 'var(--gold)' : 'var(--text-primary)',
                    borderLeft: '1px solid var(--border)',
                  }}
                >
                  {name}
                  {i === 1 && (
                    <span style={{
                      display: 'block',
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(0.35rem,0.55vw,0.42rem)',
                      color: '#15803D',
                      marginTop: '0.15rem',
                    }}>
                      Popular
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Feature rows */}
            {FEATURES.map((f, i) => (
              <div
                key={f.label}
                className={visible && !reduced.current ? 'animate-fade-up' : ''}
                style={{
                  animationDelay: `${i * 30 + 200}ms`,
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                  borderBottom: i < FEATURES.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-dim)' }}
                onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}
              >
                <div style={{
                  padding: 'clamp(0.65rem,1.2vw,0.85rem) clamp(1rem,2vw,1.25rem)',
                  fontSize: 'clamp(0.6rem,0.92vw,0.7rem)',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {f.label}
                </div>
                {[
                  { key: 'starter' as const, plan: 'Starter' },
                  { key: 'pro' as const, plan: 'Professional' },
                  { key: 'biz' as const, plan: 'Business' },
                  { key: 'ent' as const, plan: 'Enterprise' },
                ].map(({ key, plan }) => (
                  <div
                    key={plan}
                    style={{
                      padding: 'clamp(0.65rem,1.2vw,0.85rem) clamp(0.5rem,1vw,0.75rem)',
                      textAlign: 'center',
                      borderLeft: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {f[key] ? (
                      <span style={{
                        color: '#15803D',
                        fontSize: 'clamp(0.55rem,0.85vw,0.65rem)',
                      }}>
                        ✓
                      </span>
                    ) : (
                      <span style={{
                        color: 'var(--text-muted)',
                        fontSize: 'clamp(0.4rem,0.65vw,0.5rem)',
                        opacity: 0.3,
                      }}>
                        —
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── ROI Calculator ── */}
        <div
          ref={roiRef}
          style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}
        >
          <p
            className={visible && !reduced.current ? 'animate-fade-up' : ''}
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.48rem,0.78vw,0.56rem)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--text-muted)', textAlign: 'center',
              marginBottom: 'clamp(0.5rem,1vw,0.75rem)',
            }}
          >
            ROI Calculator
          </p>
          <p
            className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.1rem,2vw,1.5rem)',
              color: 'var(--text-primary)',
              textAlign: 'center',
              marginBottom: 'clamp(1.5rem,3vw,2.5rem)',
              lineHeight: 1.2,
            }}
          >
            See What Brisvora Saves You
          </p>

          <div
            className="pricing-roi"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(1.5rem,3vw,2.5rem)',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {/* Inputs */}
            <div style={{
              padding: 'clamp(1.25rem,2.5vw,2rem)',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)',
            }}>
              <div style={{ marginBottom: 'clamp(1rem,2vw,1.5rem)' }}>
                <label
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'clamp(0.4rem,0.8vw,0.6rem)',
                  }}
                >
                  <span style={{
                    fontSize: 'clamp(0.6rem,0.92vw,0.7rem)',
                    color: 'var(--text-secondary)',
                  }}>
                    Listings per month
                  </span>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.85rem,1.4vw,1.05rem)',
                    color: 'var(--gold)',
                  }}>
                    {roiListings}
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={roiListings}
                  onChange={e => setRoiListings(Number(e.target.value))}
                  aria-label="Listings per month"
                  style={{
                    width: '100%',
                    height: '4px',
                    appearance: 'none',
                    background: 'var(--surface-3)',
                    borderRadius: '2px',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                  className="pricing-range"
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'clamp(0.4rem,0.8vw,0.6rem)',
                  }}
                >
                  <span style={{
                    fontSize: 'clamp(0.6rem,0.92vw,0.7rem)',
                    color: 'var(--text-secondary)',
                  }}>
                    Hours saved per listing
                  </span>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(0.85rem,1.4vw,1.05rem)',
                    color: 'var(--gold)',
                  }}>
                    {roiHours}h
                  </span>
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={20}
                  step={0.5}
                  value={roiHours}
                  onChange={e => setRoiHours(Number(e.target.value))}
                  aria-label="Hours saved per listing"
                  style={{
                    width: '100%',
                    height: '4px',
                    appearance: 'none',
                    background: 'var(--surface-3)',
                    borderRadius: '2px',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                  className="pricing-range"
                />
              </div>
            </div>

            {/* Results */}
            <div style={{
              padding: 'clamp(1.25rem,2.5vw,2rem)',
              background: 'linear-gradient(145deg, var(--surface-2), var(--surface-1))',
              border: '1px solid var(--gold-border)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 'clamp(0.75rem,1.5vw,1.25rem)',
            }}>
              <div>
                <p style={{
                  fontSize: 'clamp(0.5rem,0.78vw,0.58rem)',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.15em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  Hours Saved Monthly
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.4rem,2.8vw,2.2rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}>
                  {animatedHours.toLocaleString()}
                  <span style={{
                    fontSize: '0.5em',
                    color: 'var(--text-muted)',
                    fontFamily: "'DM Sans', sans-serif",
                    marginLeft: '0.3rem',
                  }}>
                    hrs
                  </span>
                </p>
              </div>

              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, var(--gold-border), transparent)',
              }} />

              <div>
                <p style={{
                  fontSize: 'clamp(0.5rem,0.78vw,0.58rem)',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.15em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  Monthly Value
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.4rem,2.8vw,2.2rem)',
                  color: 'var(--gold)',
                  lineHeight: 1,
                }}>
                  ₹{animatedMonthly.toLocaleString('en-IN')}
                </p>
              </div>

              <div style={{
                height: '1px',
                background: 'linear-gradient(90deg, var(--gold-border), transparent)',
              }} />

              <div>
                <p style={{
                  fontSize: 'clamp(0.5rem,0.78vw,0.58rem)',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.15em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.3rem',
                }}>
                  Yearly Value
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.6rem,3.2vw,2.6rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}>
                  ₹{animatedYearly.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
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
            Frequently Asked Questions
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.4rem,0.8vw,0.6rem)' }}>
            {FAQ_ITEMS.map((faq, i) => {
              const isOpen = activeFaq === i
              return (
                <div
                  key={faq.q}
                  className={visible && !reduced.current ? 'animate-fade-up' : ''}
                  style={{
                    animationDelay: `${i * 60 + 200}ms`,
                    background: 'var(--surface-2)',
                    border: `1px solid ${isOpen ? 'var(--gold-border)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    transition: 'border-color 0.25s',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 'clamp(0.85rem,1.6vw,1.1rem) clamp(1rem,2vw,1.25rem)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      textAlign: 'left',
                      color: 'var(--text-primary)',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(0.72rem,1.1vw,0.85rem)',
                      lineHeight: 1.3,
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{
                      flexShrink: 0,
                      fontSize: 'clamp(0.6rem,0.95vw,0.72rem)',
                      color: isOpen ? 'var(--gold)' : 'var(--text-muted)',
                      transition: 'transform 0.3s, color 0.3s',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}>
                      +
                    </span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? '300px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
                  }}>
                    <p style={{
                      padding: '0 clamp(1rem,2vw,1.25rem) clamp(0.85rem,1.6vw,1.1rem)',
                      fontSize: 'clamp(0.6rem,0.92vw,0.7rem)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Trust Elements ── */}
        <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
          <div
            className="pricing-trust"
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
              Start Free
            </Link>
            <Link href="/pricing" className="btn-secondary" style={{
              padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
              fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            }}>
              View Full Pricing
            </Link>
            <Link href="/#contact" className="btn-ghost" style={{
              padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
              fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            }}>
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .pricing-range::-webkit-slider-thumb {
          appearance: none;
          width: clamp(0.85rem,1.4vw,1.1rem);
          height: clamp(0.85rem,1.4vw,1.1rem);
          border-radius: 50%;
          background: var(--gold);
          border: 2px solid var(--surface-2);
          cursor: pointer;
          box-shadow: 0 0 0 2px var(--gold-border);
          transition: transform 0.2s;
        }
        .pricing-range::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .pricing-range::-moz-range-thumb {
          width: clamp(0.85rem,1.4vw,1.1rem);
          height: clamp(0.85rem,1.4vw,1.1rem);
          border-radius: 50%;
          background: var(--gold);
          border: 2px solid var(--surface-2);
          cursor: pointer;
          box-shadow: 0 0 0 2px var(--gold-border);
        }
        @media (max-width: 1024px) {
          .pricing-cards  { grid-template-columns: repeat(2,1fr) !important; }
          .pricing-roi    { grid-template-columns: 1fr !important; }
          .pricing-compare { overflow-x: auto !important; }
          .pricing-compare > div { min-width: 600px !important; }
        }
        @media (max-width: 640px) {
          .pricing-cards  { grid-template-columns: 1fr !important; max-width: 400px; margin-left: auto; margin-right: auto; }
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