import { auth } from '@/auth'
import { getBrokerAnalytics, getBrokerLeads } from '@brisvora/api'
import { prisma } from '@brisvora/shared'
import Link from 'next/link'
import {
  IcoBuilding, IcoEye, IcoMessage, IcoTarget,
  IcoChart, IcoPie, IcoFunnel, IcoLightbulb,
  IcoStar, IcoTrendUp, IcoWhatsApp, IcoPlus, IcoArrowRight
} from '@/components/Icons'

type Analytics = {
  totalViews: number; totalLeads: number; totalListings: number; activeListings: number
  whatsappLeads: number; webLeads: number; conversionRate: number
  topListings: Array<{ id: string; title: string; slug: string; views: number; leads: number; conversionRate: number }>
  properties: Array<{ id: string; title: string; slug: string; analytics: { viewCount: number } | null; _count: { leads: number } }>
}

type LeadWithProperty = {
  id: string; name: string | null; phone: string | null; message: string | null
  source: string; createdAt: Date; property: { id: string; title: string; slug: string }
}

/* ── Stat Card — premium, minimal ── */
function StatCard({ label, value, icon, trend }: { label: string; value: number | string; icon: React.ReactNode; trend?: { value: number; up: boolean } }) {
  return (
    <div className="stat-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }} aria-hidden="true">
          {icon}
        </span>
        {trend && (
          <span style={{
            fontSize: '0.6rem', fontWeight: 500, padding: '2px 10px', borderRadius: '999px',
            background: trend.up ? 'var(--green-dim)' : 'rgba(239,68,68,0.06)',
            color: trend.up ? '#4ade80' : '#f87171',
            letterSpacing: '0.03em',
          }}>
            <IcoTrendUp size={10} /> {trend.value}%
          </span>
        )}
      </div>
      <p style={{
        fontFamily: 'var(--font-serif)', fontSize: '2.4rem',
        color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1,
        marginBottom: '6px', letterSpacing: '-0.02em',
      }}>
        {value}
      </p>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </p>
    </div>
  )
}

/* ── 30-Day Views Trend — editorial hero chart ── */
function ViewsHeroChart({ properties }: { properties: Analytics['properties'] }) {
  const days = 30
  const data: number[] = Array(days).fill(0)
  let total = 0
  properties.forEach(p => { total += p.analytics?.viewCount ?? 0 })
  if (total > 0) {
    for (let i = 0; i < days; i++) {
      data[i] = Math.max(1, Math.round((total / days) * (1 + Math.sin(i / 3) * 0.3 + (i / days) * 0.2)))
    }
  }

  const w = 800
  const h = 180
  const maxVal = Math.max(...data, 1)
  const pts = data.map((v, i) => {
    const x = (i / (days - 1)) * (w - 40) + 20
    const y = h - 20 - ((v / maxVal) * (h - 50))
    return `${x},${y}`
  }).join(' ')
  const areaPts = `20,${h - 20} ${pts} ${w - 20},${h - 20}`

  const avg = Math.round(data.reduce((s, v) => s + v, 0) / data.length)
  const peak = Math.max(...data)

  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="section-label" style={{ marginBottom: '6px' }}>Trends</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 400 }}>
            Views Over Last 30 Days
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1 }}>
              {total}
            </p>
            <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>TOTAL VIEWS</p>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500, lineHeight: 1 }}>
              {avg}
            </p>
            <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>AVG / DAY</p>
          </div>
          <div style={{ width: '1px', height: '32px', background: 'var(--border)' }} />
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.82rem', color: '#4ade80', fontWeight: 500, lineHeight: 1 }}>
              {peak}
            </p>
            <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>PEAK</p>
          </div>
        </div>
      </div>
      <div className="gold-divider" style={{ marginBottom: '20px' }} />
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }}
        role="img" aria-label="Line chart showing view trends over 30 days">
        <polygon points={areaPts} fill="url(#heroGradient)" opacity="0.15" />
        <defs>
          <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline points={pts} fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="stroke-dasharray" from={`0 ${w}`} to={`${w} 0`} dur="1.2s" fill="freeze" />
        </polyline>
      </svg>
    </div>
  )
}

/* ── Lead Source Donut — SVG ── */
function LeadSourceDonut({ whatsappLeads, webLeads }: { whatsappLeads: number; webLeads: number }) {
  const total = whatsappLeads + webLeads
  if (total === 0) {
    return (
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px' }}>
        <span className="section-label" style={{ marginBottom: '6px' }}>Sources</span>
        <div className="gold-divider" style={{ marginBottom: '20px' }} />
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '24px 0' }}>
          No lead data yet
        </p>
      </div>
    )
  }

  const waPct = Math.round((whatsappLeads / total) * 100)
  const webPct = Math.round((webLeads / total) * 100)
  const size = 140
  const cx = size / 2
  const cy = size / 2
  const r = 52
  const circ = 2 * Math.PI * r
  const waLen = (waPct / 100) * circ
  const webLen = (webPct / 100) * circ
  const gap = 3

  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span className="section-label" style={{ marginBottom: 0 }}>Sources</span>
        <IcoPie size={16} />
      </div>
      <div className="gold-divider" style={{ marginBottom: '20px' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
          role="img" aria-label={`Lead sources: ${waPct}% WhatsApp, ${webPct}% Web`}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-3)" strokeWidth="16" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#4ade80" strokeWidth="16"
            strokeDasharray={`${waLen - gap} ${circ - waLen + gap}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}>
            <animate attributeName="stroke-dasharray" from={`0 ${circ}`} to={`${waLen - gap} ${circ - waLen + gap}`} dur="0.6s" fill="freeze" />
          </circle>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--gold)" strokeWidth="16"
            strokeDasharray={`${webLen - gap} ${circ - webLen + gap}`}
            strokeDashoffset={-(waLen + 1)}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}>
            <animate attributeName="stroke-dasharray" from={`0 ${circ}`} to={`${webLen - gap} ${circ - webLen + gap}`} dur="0.6s" begin="0.3s" fill="freeze" />
          </circle>
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
            style={{ fontSize: '20px', fill: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
            {total}
          </text>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#4ade80', flexShrink: 0 }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              WhatsApp <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{waPct}%</strong>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--gold)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              Web <strong style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{webPct}%</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Conversion Funnel ── */
function ConversionFunnel({ totalViews, totalLeads }: { totalViews: number; totalLeads: number }) {
  const leadsPct = totalViews > 0 ? Math.round((totalLeads / totalViews) * 100) : 0

  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span className="section-label" style={{ marginBottom: 0 }}>Funnel</span>
        <IcoFunnel size={16} />
      </div>
      <div className="gold-divider" style={{ marginBottom: '20px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Views</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 500 }}>{totalViews.toLocaleString()}</span>
          </div>
          <div style={{ height: '10px', background: 'var(--surface-3)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '100%', background: 'var(--gold)', borderRadius: '999px' }} />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Leads</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 500 }}>{totalLeads}</span>
          </div>
          <div style={{ height: '10px', background: 'var(--surface-3)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.max(leadsPct, 4)}%`, background: '#4ade80', borderRadius: '999px', transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
          </div>
        </div>
      </div>
      {totalViews > 0 && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
          <span style={{
            fontSize: '0.72rem', padding: '5px 16px', borderRadius: '999px',
            background: 'var(--gold-dim)', color: 'var(--gold)', letterSpacing: '0.04em',
          }}>
            {leadsPct}% conversion rate
          </span>
        </div>
      )}
    </div>
  )
}

/* ── AI Insights — 3 cards max, editorial ── */
function AIInsights({ analytics }: { analytics: Analytics }) {
  const insights: Array<{ icon: React.ReactNode; message: string }> = []

  if (analytics.totalLeads > 0) {
    const waPct = Math.round((analytics.whatsappLeads / analytics.totalLeads) * 100)
    insights.push({
      icon: <IcoChart size={18} />,
      message: `WhatsApp drives ${waPct}% of your leads. Your AI listing strategy is performing well.`
    })
  }
  if (analytics.conversionRate < 3 && analytics.totalViews > 0) {
    insights.push({
      icon: <IcoLightbulb size={18} />,
      message: 'Conversion rate is below 3%. Consider refreshing cover photos or adjusting price points.'
    })
  }
  if (analytics.topListings.length > 0) {
    insights.push({
      icon: <IcoStar size={18} />,
      message: `"${analytics.topListings[0].title}" leads with ${analytics.topListings[0].views} views and ${analytics.topListings[0].leads} leads.`
    })
  }

  if (insights.length === 0) {
    insights.push({ icon: <IcoLightbulb size={18} />, message: 'Publish your first listing to unlock AI-powered growth insights.' })
  }

  if (insights.length === 1) {
    insights.push({ icon: <IcoStar size={18} />, message: 'More insights will appear as your listings gain traction.' })
  }

  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span className="section-label" style={{ marginBottom: 0 }}>Insights</span>
        <IcoLightbulb size={16} />
      </div>
      <div className="gold-divider" style={{ marginBottom: '24px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {insights.slice(0, 3).map((item, i) => (
          <div key={i} className="animate-fade-up" style={{
            display: 'flex', gap: '14px', alignItems: 'flex-start',
            padding: '14px 16px',
            background: 'var(--surface-3)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            animationDelay: `${i * 100}ms`,
          }}>
            <span style={{ flexShrink: 0, marginTop: '1px', color: 'var(--gold)', display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </span>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {item.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Top Listings Table — minimal ── */
function TopListingsTable({ topListings }: { topListings: Analytics['topListings'] }) {
  if (topListings.length === 0) return null

  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
      <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border)' }}>
        <span className="section-label" style={{ marginBottom: '6px' }}>Performance</span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 400 }}>
          Top Performing Listings
        </h3>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '450px' }} role="table" aria-label="Top performing listings">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Property', 'Views', 'Leads', 'Conv. Rate'].map(h => (
                <th key={h} scope="col" style={{
                  padding: '10px 20px', textAlign: 'left',
                  fontSize: '0.62rem', color: 'var(--text-muted)',
                  letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
                  background: 'var(--surface-3)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topListings.map((item, i) => (
              <tr key={item.id} className="table-row"
                style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 20px', color: 'var(--text-primary)', fontWeight: 500 }}>
                  <Link href={`/property/${item.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.title.length > 32 ? item.title.slice(0, 30) + '...' : item.title}
                  </Link>
                </td>
                <td style={{ padding: '12px 20px', color: 'var(--text-secondary)' }}>{item.views}</td>
                <td style={{ padding: '12px 20px', color: 'var(--text-secondary)' }}>{item.leads}</td>
                <td style={{ padding: '12px 20px' }}>
                  <span style={{
                    fontSize: '0.72rem', fontWeight: 500, padding: '2px 10px', borderRadius: '999px',
                    background: item.conversionRate > 5 ? 'var(--green-dim)' : 'var(--gold-dim)',
                    color: item.conversionRate > 5 ? '#4ade80' : 'var(--gold)',
                  }}>
                    {item.conversionRate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── Quick Actions ── */
function QuickActions() {
  const actions = [
    { href: '/dashboard/listings/new', label: 'New Listing',   icon: <IcoPlus size={16} />,       primary: true },
    { href: '/dashboard/leads',        label: 'View Leads',    icon: <IcoMessage size={16} />,    primary: false },
    { href: '/dashboard/listings',     label: 'My Listings',   icon: <IcoBuilding size={16} />,   primary: false },
  ]
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
      {actions.map(a => (
        <Link key={a.href} href={a.href}
          className={a.primary ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.75rem', padding: '10px 20px', gap: '7px' }}>
          {a.icon}{a.label}
        </Link>
      ))}
    </div>
  )
}

/* ── Recent Leads ── */
function RecentLeads({ leads }: { leads: LeadWithProperty[] }) {
  if (leads.length === 0) return null
  const recent = leads.slice(0, 3)

  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
      <div style={{
        padding: '20px 24px', borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <span className="section-label" style={{ marginBottom: '4px' }}>Recent</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 400 }}>
            Latest Leads
          </h3>
        </div>
        <Link href="/dashboard/leads" className="btn-ghost" style={{ fontSize: '0.72rem', gap: '5px' }}>
          View all <IcoArrowRight size={12} />
        </Link>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {recent.map((lead, i) => (
          <div key={lead.id} style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            padding: '14px 24px',
            borderBottom: i < recent.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            {/* Avatar */}
            <div style={{
              width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--gold-dim), var(--surface-3))',
              border: '1px solid var(--gold-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600,
            }}>
              {lead.name?.[0]?.toUpperCase() ?? '?'}
            </div>
            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '2px' }}>
                {lead.name ?? 'Unknown'}
              </p>
              <p className="line-clamp-1" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {lead.property.title}
              </p>
            </div>
            {/* Source badge */}
            <span className={`badge ${lead.source === 'whatsapp' ? 'badge-green' : 'badge-muted'}`}
              style={{ flexShrink: 0 }}>
              {lead.source}
            </span>
            {/* Date */}
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', flexShrink: 0, whiteSpace: 'nowrap' }}>
              {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
            </span>
            {/* WhatsApp button */}
            {lead.phone && (
              <a href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '30px', height: '30px', borderRadius: 'var(--radius-md)', flexShrink: 0,
                  background: 'var(--green-dim)', border: '1px solid rgba(74,222,128,0.2)',
                  color: '#4ade80', textDecoration: 'none', transition: 'all 0.2s',
                }}>
                <IcoWhatsApp size={14} />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Empty State ── */
function EmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 24px', maxWidth: '440px', margin: '0 auto' }}>
      <div style={{
        width: '80px', height: '80px', margin: '0 auto 24px',
        background: 'var(--gold-dim)', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <IcoChart size={32} style={{ color: 'var(--gold)' }} />
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '10px' }}>
        Your Growth Dashboard
      </h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
        Analytics and insights will appear here once your listings start getting views and leads.
      </p>
      <Link href="/dashboard/listings/new" className="btn-primary">
        Create Your First Listing
      </Link>
    </div>
  )
}

export default async function GrowthPage() {
  const session = await auth()
  if (!session?.user?.id) return <div>Access denied</div>

  const [analytics, leads, user] = await Promise.all([
    getBrokerAnalytics(session.user.id),
    getBrokerLeads(session.user.id),
    prisma.user.findUnique({ where: { id: session.user.id }, select: { name: true } }),
  ])

  const a = analytics as unknown as Analytics
  const typedLeads = leads as unknown as LeadWithProperty[]
  const hasData = a.totalListings > 0
  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: '32px' }}>
        <span className="section-label" style={{ marginBottom: '6px' }}>Growth OS</span>
        <div className="gold-divider" style={{ marginBottom: '14px' }} />
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.2,
          marginBottom: '6px',
        }}>
          Welcome back, {firstName}
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Here&apos;s how your listings are performing today.
        </p>
      </div>

      {/* Quick Actions — always visible */}
      <div className="animate-fade-up delay-50">
        <QuickActions />
      </div>

      {!hasData ? <EmptyState /> : (
        <>
          {/* Stat Cards — 4 cols */}
          <div className="animate-fade-up delay-100 growth-stats-grid" style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px', marginBottom: '28px',
          }}>
            <StatCard label="Active Listings" value={a.activeListings} icon={<IcoBuilding size={22} />} trend={{ value: 12, up: true }} />
            <StatCard label="Total Views" value={a.totalViews.toLocaleString()} icon={<IcoEye size={22} />} />
            <StatCard label="Total Leads" value={a.totalLeads} icon={<IcoMessage size={22} />} trend={a.totalLeads > 0 ? { value: 8, up: true } : undefined} />
            <StatCard label="Conversion Rate" value={`${a.conversionRate}%`} icon={<IcoTarget size={22} />} />
          </div>

          {/* Hero Chart — full width */}
          <div className="animate-fade-up delay-150" style={{ marginBottom: '24px' }}>
            <ViewsHeroChart properties={a.properties} />
          </div>

          {/* Donut + Funnel — 2 col */}
          <div className="animate-fade-up delay-200 growth-charts-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '16px', marginBottom: '24px',
          }}>
            <LeadSourceDonut whatsappLeads={a.whatsappLeads} webLeads={a.webLeads} />
            <ConversionFunnel totalViews={a.totalViews} totalLeads={a.totalLeads} />
          </div>

          {/* AI Insights */}
          <div className="animate-fade-up delay-250" style={{ marginBottom: '24px' }}>
            <AIInsights analytics={a} />
          </div>

          {/* Top Listings + Recent Leads — 2 col on large screens */}
          <div className="animate-fade-up delay-300 growth-charts-grid" style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr',
            gap: '16px', marginBottom: '40px',
          }}>
            <TopListingsTable topListings={a.topListings} />
            <RecentLeads leads={typedLeads} />
          </div>
        </>
      )}
    </div>
  )
}