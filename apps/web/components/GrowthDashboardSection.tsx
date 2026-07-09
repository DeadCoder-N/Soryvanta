'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const METRICS = [
  { label: 'Total Views',      value: 4280,  suffix: '',   growth: '+18%', icon: '◎' },
  { label: 'New Leads',        value: 138,   suffix: '',   growth: '+24%', icon: '◆' },
  { label: 'Active Listings',  value: 24,    suffix: '',   growth: '+6',   icon: '⬡' },
  { label: 'Conversion Rate',  value: 3.2,   suffix: '%',  growth: '+0.4%',icon: '▲' },
]

const INSIGHTS = [
  { text: 'Listings with 8+ images receive 34% more enquiries.',       icon: '✦' },
  { text: 'Properties updated this week rank higher on Google.',        icon: '◎' },
  { text: 'WhatsApp leads convert 2× faster than form submissions.',    icon: '◉' },
]

const ACTIVITY = [
  { label: 'New lead received',          sub: 'Luxury Villa · 2 min ago',    dot: '#15803D' },
  { label: 'Listing published',          sub: '3 BHK Apartment · 14 min ago', dot: '#C9960E' },
  { label: 'SEO optimization complete',  sub: 'Commercial Space · 1 hr ago',  dot: '#15803D' },
  { label: 'AI description generated',   sub: 'Studio Flat · 2 hr ago',       dot: '#C9960E' },
  { label: 'Analytics updated',          sub: 'All listings · 3 hr ago',      dot: '#BFC3C9' },
]

// Simple SVG area chart data (normalised 0–100)
const CHART_POINTS = [18, 28, 22, 42, 38, 55, 48, 62, 58, 74, 68, 88, 82, 94, 100]

function buildPath(pts: number[], w: number, h: number) {
  const step = w / (pts.length - 1)
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${i * step},${h - (p / 100) * h}`).join(' ')
  const area = `${line} L${(pts.length - 1) * step},${h} L0,${h} Z`
  return { line, area }
}

function useCounter(target: number, active: boolean, decimals = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 1400
    const step = 16
    const inc = target / (duration / step)
    const id = setInterval(() => {
      start += inc
      if (start >= target) { setVal(target); clearInterval(id) }
      else setVal(parseFloat(start.toFixed(decimals)))
    }, step)
    return () => clearInterval(id)
  }, [active, target, decimals])
  return val
}

function MetricCard({ m, active }: { m: typeof METRICS[0]; active: boolean }) {
  const decimals = m.suffix === '%' ? 1 : 0
  const count = useCounter(m.value, active, decimals)
  return (
    <div style={{
      padding: 'clamp(1rem,2vw,1.4rem)',
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      transition: 'border-color 0.25s, transform 0.25s',
      cursor: 'default',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(0.5rem,1vw,0.75rem)' }}>
        <span style={{ fontSize: 'clamp(0.7rem,1.1vw,0.85rem)', color: 'var(--text-muted)' }}>{m.icon}</span>
        <span style={{
          fontSize: 'clamp(0.45rem,0.7vw,0.55rem)', letterSpacing: '0.06em',
          color: '#15803D', background: 'rgba(21,128,61,0.08)',
          border: '1px solid rgba(21,128,61,0.18)',
          padding: '0.15em 0.5em', borderRadius: '2em',
          display: 'flex', alignItems: 'center', gap: '0.2rem',
        }}>
          <span>↑</span>{m.growth}
        </span>
      </div>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.4rem,2.8vw,2.2rem)',
        color: 'var(--text-primary)', lineHeight: 1, fontWeight: 400,
        marginBottom: '0.25rem',
      }}>
        {count.toLocaleString()}{m.suffix}
      </p>
      <p style={{ fontSize: 'clamp(0.58rem,0.88vw,0.68rem)', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
        {m.label}
      </p>
    </div>
  )
}

export default function GrowthDashboardSection() {
  const [visible, setVisible] = useState(false)
  const [chartW,  setChartW]  = useState(400)
  const chartRef = useRef<HTMLDivElement>(null)
  const ref      = useRef<HTMLElement>(null)
  const reduced  = useRef(false)

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
    if (!chartRef.current) return
    const ro = new ResizeObserver(([e]) => setChartW(e.contentRect.width))
    ro.observe(chartRef.current)
    return () => ro.disconnect()
  }, [])

  const H = 80
  const { line, area } = buildPath(CHART_POINTS, chartW, H)

  return (
    <section
      ref={ref}
      id="dashboard"
      aria-labelledby="dash-heading"
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
          position: 'absolute', top: '-10%', right: '-5%',
          width: 'clamp(26rem,42vw,54rem)', height: 'clamp(26rem,42vw,54rem)',
          background: 'radial-gradient(circle, rgba(201,150,14,0.055) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
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
            }}>Growth Dashboard</span>
          </div>
          <div className="gold-divider" style={{ margin: '0 auto clamp(0.85rem,1.6vw,1.2rem)' }} />
          <h2
            id="dash-heading"
            className={visible && !reduced.current ? 'animate-fade-up delay-100' : ''}
            style={{
              fontFamily: "'Playfair Display', var(--font-serif), serif",
              fontSize: 'clamp(1.8rem,3.8vw,3rem)',
              fontWeight: 400, lineHeight: 1.1,
              color: 'var(--text-primary)', letterSpacing: '-0.01em',
              marginBottom: 'clamp(0.85rem,1.6vw,1.2rem)',
            }}
          >
            Everything That Matters.<br />
            <span style={{
              background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 55%, #F5D080 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>One Dashboard.</span>
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
            Track listings, leads, traffic and performance from one intelligent command center. No spreadsheets. No manual reporting.
          </p>
        </div>

        {/* ── Metric cards ── */}
        <div
          className="dash-metrics"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(0.65rem,1.2vw,1rem)',
            marginBottom: 'clamp(1rem,2vw,1.5rem)',
          }}
        >
          {METRICS.map(m => (
            <MetricCard key={m.label} m={m} active={visible} />
          ))}
        </div>

        {/* ── Chart + Activity ── */}
        <div
          className="dash-body"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(0.65rem,1.2vw,1rem)',
            marginBottom: 'clamp(1rem,2vw,1.5rem)',
          }}
        >
          {/* Area chart */}
          <div style={{
            padding: 'clamp(1.1rem,2.2vw,1.6rem)',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'clamp(0.75rem,1.5vw,1.1rem)' }}>
              <div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.45rem,0.72vw,0.54rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.2rem' }}>
                  Growth Trend
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem,1.8vw,1.3rem)', color: 'var(--text-primary)' }}>
                  +94% <span style={{ fontSize: '0.55em', color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif" }}>this month</span>
                </p>
              </div>
              <span style={{
                fontSize: 'clamp(0.45rem,0.7vw,0.55rem)', letterSpacing: '0.06em',
                color: '#15803D', background: 'rgba(21,128,61,0.08)',
                border: '1px solid rgba(21,128,61,0.18)',
                padding: '0.2em 0.6em', borderRadius: '2em',
              }}>↑ All time high</span>
            </div>
            <div ref={chartRef} style={{ width: '100%', height: `${H}px`, position: 'relative' }}>
              <svg
                aria-label="Growth trend chart"
                width="100%" height={H}
                viewBox={`0 0 ${chartW} ${H}`}
                preserveAspectRatio="none"
                style={{ overflow: 'visible' }}
              >
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#C9960E" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#C9960E" stopOpacity="0" />
                  </linearGradient>
                  <clipPath id="chartClip">
                    <rect
                      x="0" y="0" height={H}
                      width={visible ? chartW : 0}
                      style={{ transition: reduced.current ? 'none' : 'width 1.6s cubic-bezier(0.16,1,0.3,1)' }}
                    />
                  </clipPath>
                </defs>
                <path d={area} fill="url(#chartGrad)" clipPath="url(#chartClip)" />
                <path d={line} fill="none" stroke="#C9960E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" clipPath="url(#chartClip)" />
              </svg>
            </div>
          </div>

          {/* Activity feed */}
          <div style={{
            padding: 'clamp(1.1rem,2.2vw,1.6rem)',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.45rem,0.72vw,0.54rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'clamp(0.75rem,1.5vw,1.1rem)' }}>
              Recent Activity
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,0.75rem)' }}>
              {ACTIVITY.map((a, i) => (
                <div
                  key={a.label}
                  className={visible && !reduced.current ? 'animate-fade-up' : ''}
                  style={{ animationDelay: `${i * 80 + 200}ms` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{
                      width: '0.35rem', height: '0.35rem', borderRadius: '50%',
                      background: a.dot, flexShrink: 0,
                      boxShadow: `0 0 0.4rem ${a.dot}55`,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 'clamp(0.65rem,1vw,0.75rem)', color: 'var(--text-primary)', lineHeight: 1.2 }}>{a.label}</p>
                      <p style={{ fontSize: 'clamp(0.52rem,0.8vw,0.62rem)', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{a.sub}</p>
                    </div>
                  </div>
                  {i < ACTIVITY.length - 1 && (
                    <div style={{ height: '1px', background: 'var(--border)', margin: 'clamp(0.4rem,0.8vw,0.6rem) 0 0 1rem' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SEO + AI Insights ── */}
        <div
          className="dash-bottom"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(0.65rem,1.2vw,1rem)',
            marginBottom: 'clamp(3rem,6vw,5rem)',
          }}
        >
          {/* SEO panel */}
          <div style={{
            padding: 'clamp(1.1rem,2.2vw,1.6rem)',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.45rem,0.72vw,0.54rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 'clamp(0.75rem,1.5vw,1.1rem)' }}>
              SEO Performance
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem,1.1vw,0.85rem)' }}>
              {[
                { label: 'Search Visibility', val: 78 },
                { label: 'Indexed Pages',     val: 94 },
                { label: 'Organic Traffic',   val: 62 },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <p style={{ fontSize: 'clamp(0.6rem,0.92vw,0.7rem)', color: 'var(--text-secondary)' }}>{s.label}</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(0.65rem,1vw,0.75rem)', color: 'var(--gold)' }}>{s.val}%</p>
                  </div>
                  <div style={{ height: '3px', background: 'var(--surface-3)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: visible ? `${s.val}%` : '0%',
                      background: 'linear-gradient(90deg, #C9960E, #D4A837)',
                      borderRadius: '2px',
                      transition: reduced.current ? 'none' : `width 1.2s cubic-bezier(0.16,1,0.3,1) ${s.val * 5}ms`,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div style={{
            padding: 'clamp(1.1rem,2.2vw,1.6rem)',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 'clamp(0.75rem,1.5vw,1.1rem)' }}>
              <p style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.45rem,0.72vw,0.54rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                AI Insights
              </p>
              <span style={{
                fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                color: '#15803D', background: 'rgba(21,128,61,0.08)',
                border: '1px solid rgba(21,128,61,0.18)',
                padding: '0.15em 0.5em', borderRadius: '2em',
                display: 'flex', alignItems: 'center', gap: '0.2rem',
              }}>
                <span style={{ width: '0.25rem', height: '0.25rem', borderRadius: '50%', background: '#15803D', animation: !reduced.current ? 'dashDot 2s infinite' : 'none' }} />
                Live
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.6rem,1.1vw,0.85rem)' }}>
              {INSIGHTS.map((ins, i) => (
                <div
                  key={ins.text}
                  className={visible && !reduced.current ? 'animate-fade-up' : ''}
                  style={{ animationDelay: `${i * 100 + 250}ms` }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                    padding: 'clamp(0.6rem,1.1vw,0.85rem)',
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <span style={{ fontSize: 'clamp(0.6rem,0.95vw,0.72rem)', color: 'var(--gold)', flexShrink: 0, marginTop: '0.05rem' }}>{ins.icon}</span>
                    <p style={{ fontSize: 'clamp(0.6rem,0.92vw,0.7rem)', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{ins.text}</p>
                  </div>
                </div>
              ))}
            </div>
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
            <Link href="/demo" className="btn-secondary" style={{
              padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
              fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
            }}>
              View Demo
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dashDot {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        @media (max-width: 1024px) {
          .dash-metrics { grid-template-columns: repeat(2,1fr) !important; }
          .dash-body    { grid-template-columns: 1fr !important; }
          .dash-bottom  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .dash-metrics { grid-template-columns: 1fr !important; }
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
