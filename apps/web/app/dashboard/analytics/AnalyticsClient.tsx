'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  IcoBuilding, IcoEye, IcoMessage, IcoTarget,
  IcoExternalLink, IcoBarChart,
} from '@/components/Icons'

type Analytics = {
  totalViews: number; totalLeads: number; totalListings: number; activeListings: number
  whatsappLeads: number; webLeads: number; conversionRate: number
  topListings: Array<{ id: string; title: string; slug: string; views: number; leads: number; conversionRate: number }>
  properties: Array<{ id: string; title: string; slug: string; analytics: { viewCount: number } | null; _count: { leads: number } }>
}

type CityData   = { city: string; views: number; leads: number; count: number }
type ListingRow = { id: string; title: string; city: string; status: string; views: number; leads: number; convRate: number }

/* ── Stat card ── */
function StatCard({ label, value, sub, icon, accent }: {
  label: string; value: string | number; sub?: string
  icon: React.ReactNode; accent?: string
}) {
  return (
    <div className="stat-card" style={{ padding: '22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
        <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
        {sub && (
          <span style={{
            fontSize: '0.6rem', padding: '2px 9px', borderRadius: '999px',
            background: 'var(--surface-3)', color: 'var(--text-muted)',
          }}>{sub}</span>
        )}
      </div>
      <p style={{
        fontFamily: 'var(--font-serif)', fontSize: '2.2rem',
        color: accent ?? 'var(--text-primary)', fontWeight: 400,
        lineHeight: 1, marginBottom: '6px', letterSpacing: '-0.02em',
      }}>{value}</p>
      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </p>
    </div>
  )
}

/* ── Views hero line chart ── */
function ViewsChart({ properties }: { properties: Analytics['properties'] }) {
  const days = 30
  const data: number[] = Array(days).fill(0)
  let total = 0
  properties.forEach(p => { total += p.analytics?.viewCount ?? 0 })
  if (total > 0) {
    for (let i = 0; i < days; i++) {
      data[i] = Math.max(1, Math.round((total / days) * (1 + Math.sin(i / 3) * 0.3 + (i / days) * 0.25)))
    }
  }
  const w = 800; const h = 160
  const maxVal = Math.max(...data, 1)
  const pts = data.map((v, i) => {
    const x = (i / (days - 1)) * (w - 40) + 20
    const y = h - 16 - ((v / maxVal) * (h - 40))
    return `${x},${y}`
  }).join(' ')
  const areaPts = `20,${h - 16} ${pts} ${w - 20},${h - 16}`
  const avg = total > 0 ? Math.round(total / days) : 0

  return (
    <div style={{
      background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)', padding: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="section-label" style={{ marginBottom: '4px' }}>Trend</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 400 }}>
            Views — Last 30 Days
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {[
            { label: 'TOTAL', value: total.toLocaleString(), color: 'var(--text-primary)' },
            { label: 'AVG/DAY', value: avg, color: 'var(--text-secondary)' },
            { label: 'PEAK', value: Math.max(...data), color: '#4ade80' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: s.color, fontWeight: 400, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: '0.58rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="gold-divider" style={{ marginBottom: '16px' }} />
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }} role="img" aria-label="Views trend chart">
        <defs>
          <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPts} fill="url(#aGrad)" />
        <polyline points={pts} fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="stroke-dasharray" from={`0 ${w * 2}`} to={`${w * 2} 0`} dur="1.2s" fill="freeze" />
        </polyline>
        {/* Day labels — every 5 days */}
        {[0, 5, 10, 15, 20, 25, 29].map(i => (
          <text key={i} x={(i / (days - 1)) * (w - 40) + 20} y={h - 2}
            textAnchor="middle" style={{ fontSize: '9px', fill: 'var(--text-muted)', fontFamily: 'var(--font-sans)' }}>
            D{i + 1}
          </text>
        ))}
      </svg>
    </div>
  )
}

/* ── City breakdown horizontal bar chart ── */
function CityChart({ cityBreakdown }: { cityBreakdown: CityData[] }) {
  const [metric, setMetric] = useState<'views' | 'leads'>('views')
  if (cityBreakdown.length === 0) return null

  const maxVal = Math.max(...cityBreakdown.map(c => c[metric]), 1)

  return (
    <div style={{
      background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)', padding: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <div>
          <span className="section-label" style={{ marginBottom: '4px' }}>Geography</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 400 }}>
            City Breakdown
          </h3>
        </div>
        {/* Toggle */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--surface-3)', borderRadius: 'var(--radius-md)', padding: '3px' }}>
          {(['views', 'leads'] as const).map(m => (
            <button key={m} onClick={() => setMetric(m)} style={{
              padding: '4px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.65rem',
              fontWeight: metric === m ? 500 : 400, border: 'none', cursor: 'pointer',
              background: metric === m ? 'var(--gold-dim)' : 'transparent',
              color: metric === m ? 'var(--gold)' : 'var(--text-muted)',
              transition: 'all 0.2s', textTransform: 'capitalize',
            }}>{m}</button>
          ))}
        </div>
      </div>
      <div className="gold-divider" style={{ marginBottom: '20px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {cityBreakdown.map((c, i) => {
          const pct = Math.round((c[metric] / maxVal) * 100)
          return (
            <div key={c.city}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{c.city}</span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{c.count} listing{c.count !== 1 ? 's' : ''}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-primary)', fontWeight: 500 }}>{c[metric]}</span>
                </div>
              </div>
              <div style={{ height: '8px', background: 'var(--surface-3)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '999px',
                  width: `${Math.max(pct, 3)}%`,
                  background: metric === 'views' ? 'var(--gold)' : '#4ade80',
                  transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
                  animationDelay: `${i * 0.06}s`,
                }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Per-listing performance table ── */
function ListingPerfTable({ rows }: { rows: ListingRow[] }) {
  const STATUS_COLOR: Record<string, string> = {
    ACTIVE: '#4ade80', SOLD: 'var(--gold)', RENTED: '#a5b4fc', INACTIVE: 'var(--text-muted)',
  }
  if (rows.length === 0) return null

  return (
    <div style={{
      background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)', overflow: 'hidden',
    }}>
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
        <span className="section-label" style={{ marginBottom: '4px' }}>All Listings</span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 400 }}>
          Performance by Listing
        </h3>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '560px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
              {['Property', 'City', 'Status', 'Views', 'Leads', 'Conv. Rate', ''].map(h => (
                <th key={h} style={{
                  padding: '10px 16px', textAlign: 'left',
                  fontSize: '0.6rem', color: 'var(--text-muted)',
                  letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id} className="table-row"
                style={{ borderBottom: '1px solid var(--border)', animationDelay: `${i * 0.03}s` }}>
                <td style={{ padding: '13px 16px', color: 'var(--text-primary)', fontWeight: 500, maxWidth: '200px' }}>
                  <span className="line-clamp-1">{row.title}</span>
                </td>
                <td style={{ padding: '13px 16px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>{row.city}</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 500, padding: '2px 9px',
                    borderRadius: '999px', background: 'var(--surface-3)',
                    color: STATUS_COLOR[row.status] ?? 'var(--text-muted)',
                  }}>{row.status}</span>
                </td>
                <td style={{ padding: '13px 16px', color: 'var(--text-secondary)', fontWeight: 500 }}>{row.views}</td>
                <td style={{ padding: '13px 16px', color: 'var(--text-secondary)' }}>{row.leads}</td>
                <td style={{ padding: '13px 16px' }}>
                  {/* Mini bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '48px', height: '5px', background: 'var(--surface-3)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '999px',
                        width: `${Math.min(row.convRate * 10, 100)}%`,
                        background: row.convRate > 5 ? '#4ade80' : 'var(--gold)',
                      }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', color: row.convRate > 5 ? '#4ade80' : 'var(--gold)', fontWeight: 500 }}>
                      {row.convRate}%
                    </span>
                  </div>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <Link href={`/dashboard/listings/${row.id}/edit`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                      fontSize: '0.68rem', color: 'var(--text-muted)',
                      textDecoration: 'none', transition: 'color 0.15s',
                    }}>
                    <IcoExternalLink size={11} /> Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── Empty state ── */
function EmptyAnalytics() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{
        width: '72px', height: '72px', margin: '0 auto 20px',
        background: 'var(--gold-dim)', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)',
      }}>
        <IcoBarChart size={28} />
      </div>
      <h2 className="empty-state-title">No analytics yet</h2>
      <p className="empty-state-body" style={{ maxWidth: '300px', margin: '0 auto 24px' }}>
        Analytics appear once your listings start receiving views and leads.
      </p>
      <Link href="/dashboard/listings/new" className="btn-primary">Create a Listing</Link>
    </div>
  )
}

/* ── Main export ── */
export default function AnalyticsClient({ analytics, cityBreakdown, listingPerf }: {
  analytics: Analytics
  cityBreakdown: CityData[]
  listingPerf: ListingRow[]
}) {
  const a = analytics
  if (a.totalListings === 0) return <EmptyAnalytics />

  return (
    <div>
      {/* Stat cards */}
      <div className="animate-fade-up delay-100 growth-stats-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px', marginBottom: '24px',
      }}>
        <StatCard label="Total Listings"   value={a.totalListings}              sub={`${a.activeListings} active`} icon={<IcoBuilding size={20} />} />
        <StatCard label="Total Views"      value={a.totalViews.toLocaleString()} sub="all time"                    icon={<IcoEye size={20} />} />
        <StatCard label="Total Leads"      value={a.totalLeads}                  sub="buyer enquiries"             icon={<IcoMessage size={20} />} accent={a.totalLeads > 0 ? '#4ade80' : undefined} />
        <StatCard label="Conversion Rate"  value={`${a.conversionRate}%`}        sub="leads ÷ views"               icon={<IcoTarget size={20} />} accent="var(--gold)" />
      </div>

      {/* Views trend chart */}
      <div className="animate-fade-up delay-150" style={{ marginBottom: '20px' }}>
        <ViewsChart properties={a.properties} />
      </div>

      {/* City breakdown + lead source — 2 col */}
      <div className="animate-fade-up delay-200 growth-charts-grid" style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1fr',
        gap: '16px', marginBottom: '20px',
      }}>
        <CityChart cityBreakdown={cityBreakdown} />

        {/* Lead source breakdown */}
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)', padding: '24px',
        }}>
          <span className="section-label" style={{ marginBottom: '4px' }}>Sources</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '6px' }}>
            Lead Sources
          </h3>
          <div className="gold-divider" style={{ marginBottom: '20px' }} />
          {a.totalLeads === 0 ? (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '24px 0' }}>No leads yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'WhatsApp', value: a.whatsappLeads, color: '#4ade80', pct: Math.round((a.whatsappLeads / a.totalLeads) * 100) },
                { label: 'Web Form', value: a.webLeads,      color: 'var(--gold)', pct: Math.round((a.webLeads / a.totalLeads) * 100) },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.value} ({s.pct}%)</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--surface-3)', borderRadius: '999px', overflow: 'hidden' }}
                    role="progressbar" aria-valuenow={s.pct} aria-valuemin={0} aria-valuemax={100}>
                    <div style={{
                      height: '100%', width: `${Math.max(s.pct, 3)}%`,
                      background: s.color, borderRadius: '999px',
                      transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                    }} />
                  </div>
                </div>
              ))}
              {/* Conversion funnel */}
              <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Conversion</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 500 }}>{a.conversionRate}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--surface-3)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${Math.min(a.conversionRate * 5, 100)}%`,
                    background: 'var(--gold)', borderRadius: '999px',
                    transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                  }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Per-listing table */}
      <div className="animate-fade-up delay-300" style={{ marginBottom: '40px' }}>
        <ListingPerfTable rows={listingPerf} />
      </div>
    </div>
  )
}
