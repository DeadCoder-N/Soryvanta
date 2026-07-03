import { auth } from '@/auth'
import Link from 'next/link'
import { formatPrice } from '@brisvora/shared'

async function getStats() {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/api/admin`, {
    cache: 'no-store',
    headers: { cookie: '' },
  }).catch(() => null)
  if (!res?.ok) return null
  return res.json()
}

export default async function AdminOverviewPage() {
  const session = await auth()

  // Fetch directly via prisma to avoid self-fetch complexity
  const { prisma } = await import('@brisvora/shared')

  const [
    totalUsers, totalProperties, totalLeads, totalMessages,
    activeProperties, totalViews,
    brokerCount, adminCount, superAdminCount,
    recentUsers, recentProperties,
    propertiesByType, propertiesByStatus,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.property.count(),
    prisma.lead.count(),
    prisma.whatsappMessage.count(),
    prisma.property.count({ where: { status: 'ACTIVE' } }),
    prisma.analytics.aggregate({ _sum: { viewCount: true } }),
    prisma.user.count({ where: { role: 'BROKER' } }),
    prisma.user.count({ where: { role: 'ADMIN' } }),
    prisma.user.count({ where: { role: 'SUPER_ADMIN' } }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' }, take: 5,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.property.findMany({
      orderBy: { createdAt: 'desc' }, take: 5,
      select: {
        id: true, title: true, city: true, price: true, status: true, type: true, slug: true, createdAt: true,
        owner: { select: { name: true, email: true } },
      },
    }),
    prisma.property.groupBy({ by: ['type'], _count: true }),
    prisma.property.groupBy({ by: ['status'], _count: true }),
  ])

  const topStats = [
    { label: 'Total Users', value: totalUsers, icon: '👥', sub: `${brokerCount} brokers · ${adminCount + superAdminCount} admins`, color: 'var(--gold)' },
    { label: 'Total Properties', value: totalProperties, icon: '🏠', sub: `${activeProperties} active`, color: '#60a5fa' },
    { label: 'Total Leads', value: totalLeads, icon: '◎', sub: 'buyer enquiries', color: '#4ade80' },
    { label: 'WhatsApp Messages', value: totalMessages, icon: '💬', sub: 'all time', color: '#a78bfa' },
    { label: 'Total Views', value: totalViews._sum.viewCount ?? 0, icon: '👁', sub: 'across all listings', color: '#fb923c' },
    { label: 'Active Listings', value: activeProperties, icon: '✓', sub: 'live on platform', color: '#34d399' },
  ]

  const roleColor: Record<string, string> = {
    SUPER_ADMIN: '#f87171',
    ADMIN: 'var(--gold)',
    BROKER: 'var(--text-secondary)',
  }
  const statusColor: Record<string, string> = {
    ACTIVE: '#4ade80', SOLD: 'var(--gold)', RENTED: '#a78bfa', INACTIVE: 'var(--text-muted)',
  }

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '4px' }}>
          Welcome back, {session?.user?.email}
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400 }}>
          Admin Overview
        </h1>
      </div>

      {/* Top stats */}
      <div className="animate-fade-up delay-100" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {topStats.map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', background: 'var(--surface-3)', padding: '3px 8px', borderRadius: '999px' }}>
                {s.sub}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: s.color, fontWeight: 400, lineHeight: 1, marginBottom: '6px' }}>
              {s.value.toLocaleString()}
            </p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Role breakdown + Property breakdown */}
      <div className="animate-fade-up delay-200" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        {/* User roles */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Users by Role
          </p>
          {[
            { role: 'BROKER', count: brokerCount },
            { role: 'ADMIN', count: adminCount },
            { role: 'SUPER_ADMIN', count: superAdminCount },
          ].map(({ role, count }) => (
            <div key={role} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', color: roleColor[role] ?? 'var(--text-secondary)' }}>{role}</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{count}</span>
            </div>
          ))}
        </div>

        {/* Properties by status */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Properties by Status
          </p>
          {propertiesByStatus.map((s: any) => (
            <div key={s.status} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.82rem', color: statusColor[s.status] ?? 'var(--text-secondary)' }}>{s.status}</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>{s._count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent users + Recent properties */}
      <div className="animate-fade-up delay-300" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Recent users */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 400 }}>Recent Users</h2>
            <Link href="/admin/users" className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.72rem' }}>View all →</Link>
          </div>
          {recentUsers.map((u: any) => (
            <div key={u.id} className="table-row" style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{u.email}</p>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 600, padding: '3px 8px', borderRadius: '999px', color: roleColor[u.role], background: 'var(--surface-3)' }}>
                {u.role}
              </span>
            </div>
          ))}
        </div>

        {/* Recent properties */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 400 }}>Recent Properties</h2>
            <Link href="/admin/properties" className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.72rem' }}>View all →</Link>
          </div>
          {recentProperties.map((p: any) => (
            <div key={p.id} className="table-row" style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{p.city} · {formatPrice(p.price)}</p>
              </div>
              <span style={{ fontSize: '0.65rem', fontWeight: 500, padding: '3px 8px', borderRadius: '999px', color: statusColor[p.status], background: 'var(--surface-3)', flexShrink: 0, marginLeft: '8px' }}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
