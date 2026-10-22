import { auth } from '@/auth'
import Link from 'next/link'
import { formatPrice } from '@marketing-os/shared'

type GroupByResult = { status?: string; type?: string; _count: number }
type RecentUser = { id: string; name: string | null; email: string; role: string; createdAt: Date }
type RecentProperty = { id: string; title: string; city: string; price: number; status: string; type: string; slug: string; createdAt: Date; owner: { name: string | null; email: string } | null }

const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1 16c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M13 9c1.8 0 3.5 1 3.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="13.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
)

const IconProperties = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 8.5L9 2l7 6.5V16a1 1 0 01-1 1H3a1 1 0 01-1-1V8.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M7 17V11h4v6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>
)

const IconLeads = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="9" y1="1.5" x2="9" y2="4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="9" y1="13.5" x2="9" y2="16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="1.5" y1="9" x2="4.5" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <line x1="13.5" y1="9" x2="16.5" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

const IconMessage = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 1.5A7.5 7.5 0 0116.5 9c0 4.142-3.358 7.5-7.5 7.5a7.47 7.47 0 01-3.693-.97L1.5 16.5l1.003-3.14A7.47 7.47 0 011.5 9 7.5 7.5 0 019 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M6 8.5h6M6 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)

const IconViews = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M1.5 9S4.5 3 9 3s7.5 6 7.5 6-3 6-7.5 6S1.5 9 1.5 9z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
)

const IconActive = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5.5 9.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const roleColor: Record<string, string> = {
  SUPER_ADMIN: '#f87171',
  ADMIN: 'var(--gold)',
  BROKER: 'var(--text-secondary)',
}

const statusColor: Record<string, string> = {
  ACTIVE: '#4ade80',
  SOLD: 'var(--gold)',
  RENTED: '#a78bfa',
  INACTIVE: 'var(--text-muted)',
}

export default async function AdminOverviewPage() {
  const session = await auth()
  const { prisma } = await import('@marketing-os/shared')

  const totalUsers        = await prisma.user.count()
  const totalProperties   = await prisma.property.count()
  const totalLeads        = await prisma.lead.count()
  const totalMessages     = await prisma.whatsappMessage.count()
  const activeProperties  = await prisma.property.count({ where: { status: 'ACTIVE' } })
  const totalViews        = await prisma.analytics.aggregate({ _sum: { viewCount: true } })
  const brokerCount       = await prisma.user.count({ where: { role: 'BROKER' } })
  const adminCount        = await prisma.user.count({ where: { role: 'ADMIN' } })
  const superAdminCount   = await prisma.user.count({ where: { role: 'SUPER_ADMIN' } })
  const recentUsers       = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }, take: 5,
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  })
  const recentProperties  = await prisma.property.findMany({
    orderBy: { createdAt: 'desc' }, take: 5,
    select: {
      id: true, title: true, city: true, price: true, status: true,
      type: true, slug: true, createdAt: true,
      owner: { select: { name: true, email: true } },
    },
  })
  const propertiesByStatus = await prisma.property.groupBy({ by: ['status'], _count: true })

  const topStats = [
    { label: 'Total Users',       value: totalUsers,                          Icon: IconUsers,      sub: `${brokerCount} brokers · ${adminCount + superAdminCount} admins`, color: 'var(--gold)' },
    { label: 'Total Properties',  value: totalProperties,                     Icon: IconProperties, sub: `${activeProperties} active`,   color: '#60a5fa' },
    { label: 'Total Leads',       value: totalLeads,                          Icon: IconLeads,      sub: 'buyer enquiries',              color: '#4ade80' },
    { label: 'WhatsApp Messages', value: totalMessages,                       Icon: IconMessage,    sub: 'all time',                     color: '#a78bfa' },
    { label: 'Total Views',       value: totalViews._sum.viewCount ?? 0,      Icon: IconViews,      sub: 'across all listings',          color: '#fb923c' },
    { label: 'Active Listings',   value: activeProperties,                    Icon: IconActive,     sub: 'live on platform',             color: '#34d399' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: '36px' }}>
        <p style={{
          fontFamily: "'Cinzel', serif",
          fontSize: '0.58rem', color: 'var(--gold)',
          letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px',
        }}>
          Control Panel
        </p>
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px',
        }}>
          Admin Overview
        </h1>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {session?.user?.email}
        </p>
      </div>

      {/* Top stats grid */}
      <div className="animate-fade-up delay-100" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '14px',
        marginBottom: '28px',
      }}>
        {topStats.map(({ label, value, Icon, sub, color }) => (
          <div key={label} className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Top accent line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
              background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
            }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: 'var(--radius-md)',
                background: 'var(--surface-3)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: color,
              }}>
                <Icon />
              </div>
              <span style={{
                fontSize: '0.62rem', color: 'var(--text-muted)',
                background: 'var(--surface-3)', padding: '3px 8px',
                borderRadius: '999px', border: '1px solid var(--border)',
              }}>
                {sub}
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.2rem', color: color,
              fontWeight: 400, lineHeight: 1, marginBottom: '6px',
            }}>
              {value.toLocaleString()}
            </p>
            <p style={{
              fontSize: '0.68rem', color: 'var(--text-muted)',
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Role breakdown + Property breakdown */}
      <div className="animate-fade-up delay-200" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '14px', marginBottom: '28px',
      }}>
        {/* Users by role */}
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '24px',
        }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.58rem', color: 'var(--text-muted)',
            letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px',
          }}>
            Users by Role
          </p>
          {[
            { role: 'BROKER',      count: brokerCount,     bar: (brokerCount / Math.max(totalUsers, 1)) * 100 },
            { role: 'ADMIN',       count: adminCount,      bar: (adminCount / Math.max(totalUsers, 1)) * 100 },
            { role: 'SUPER_ADMIN', count: superAdminCount, bar: (superAdminCount / Math.max(totalUsers, 1)) * 100 },
          ].map(({ role, count, bar }) => (
            <div key={role} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.78rem', color: roleColor[role] ?? 'var(--text-secondary)' }}>{role}</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{count}</span>
              </div>
              <div style={{ height: '2px', background: 'var(--surface-3)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${bar}%`,
                  background: roleColor[role] ?? 'var(--text-muted)',
                  borderRadius: '2px',
                  transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Properties by status */}
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: '24px',
        }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.58rem', color: 'var(--text-muted)',
            letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px',
          }}>
            Properties by Status
          </p>
          {propertiesByStatus.length === 0 ? (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '24px 0' }}>No properties yet</p>
          ) : propertiesByStatus.map((s: GroupByResult) => (
            <div key={s.status} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.78rem', color: statusColor[s.status ?? ''] ?? 'var(--text-secondary)' }}>{s.status}</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{s._count}</span>
              </div>
              <div style={{ height: '2px', background: 'var(--surface-3)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(s._count / Math.max(totalProperties, 1)) * 100}%`,
                  background: statusColor[s.status ?? ''] ?? 'var(--text-muted)',
                  borderRadius: '2px',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent users + Recent properties */}
      <div className="animate-fade-up delay-300" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px',
      }}>
        {/* Recent users */}
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 400 }}>
              Recent Users
            </h2>
            <Link href="/admin/users" className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.7rem' }}>
              View all
            </Link>
          </div>
          {recentUsers.length === 0 ? (
            <p style={{ padding: '32px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>No users yet</p>
          ) : recentUsers.map((u: RecentUser) => (
            <div key={u.id} className="table-row" style={{
              padding: '12px 20px', borderBottom: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '2px' }}>
                  {u.name ?? u.email}
                </p>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {new Date(u.createdAt).toLocaleDateString('en-IN')}
                </p>
              </div>
              <span style={{
                fontSize: '0.6rem', fontWeight: 600, padding: '3px 9px',
                borderRadius: '999px', color: roleColor[u.role],
                background: 'var(--surface-3)', border: '1px solid var(--border)',
                letterSpacing: '0.04em',
              }}>
                {u.role}
              </span>
            </div>
          ))}
        </div>

        {/* Recent properties */}
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 20px', borderBottom: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 400 }}>
              Recent Properties
            </h2>
            <Link href="/admin/properties" className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.7rem' }}>
              View all
            </Link>
          </div>
          {recentProperties.length === 0 ? (
            <p style={{ padding: '32px', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)' }}>No properties yet</p>
          ) : recentProperties.map((p: RecentProperty) => (
            <div key={p.id} className="table-row" style={{
              padding: '12px 20px', borderBottom: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ minWidth: 0 }}>
                <p style={{
                  fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '2px',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {p.title}
                </p>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {p.city} · {formatPrice(p.price)}
                </p>
              </div>
              <span style={{
                fontSize: '0.6rem', fontWeight: 500, padding: '3px 9px',
                borderRadius: '999px', color: statusColor[p.status],
                background: 'var(--surface-3)', border: '1px solid var(--border)',
                flexShrink: 0, marginLeft: '8px', letterSpacing: '0.04em',
              }}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
