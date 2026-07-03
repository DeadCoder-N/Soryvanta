import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth'
import { getBrokerListings, getBrokerAnalytics } from '@brisvora/api'
import { formatPrice } from '@brisvora/shared'
import DeleteListingButton from './DeleteListingButton'

type PropertyWithAnalytics = {
  id: string; slug: string; title: string; city: string; price: number
  type: string; status: string; images: Array<{ url: string }>
  analytics: { viewCount: number } | null; _count: { leads: number }
}

const statusStyle: Record<string, { bg: string; color: string }> = {
  ACTIVE:   { bg: 'var(--green-dim)', color: '#4ade80' },
  SOLD:     { bg: 'rgba(201,150,14,0.12)', color: 'var(--gold)' },
  RENTED:   { bg: 'rgba(99,102,241,0.12)', color: '#a5b4fc' },
  INACTIVE: { bg: 'var(--surface-3)', color: 'var(--text-muted)' },
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) return <div>Access denied</div>

  const [listings, analytics] = await Promise.all([
    getBrokerListings(session.user.id),
    getBrokerAnalytics(session.user.id),
  ])

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '4px' }}>Good to see you 👋</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400 }}>Dashboard</h1>
        </div>
        <Link href="/dashboard/listings/new" className="btn-primary">
          + New Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-cards animate-fade-up delay-100" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Listings', value: analytics.totalListings, icon: '🏠', sub: 'properties listed' },
          { label: 'Total Views', value: analytics.totalViews, icon: '👁', sub: 'across all listings' },
          { label: 'Total Leads', value: analytics.totalLeads, icon: '📩', sub: 'buyer enquiries' },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', background: 'var(--surface-3)', padding: '3px 8px', borderRadius: '999px' }}>
                {stat.sub}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1, marginBottom: '6px' }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Listings table */}
      <div className="animate-fade-up delay-200" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: 400 }}>My Listings</h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--surface-3)', padding: '3px 10px', borderRadius: '999px' }}>
            {listings.length} total
          </span>
        </div>

        {listings.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.3 }}>🏠</div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>No listings yet</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px' }}>Create your first listing via WhatsApp or the web form</p>
            <Link href="/dashboard/listings/new" className="btn-primary">Create Listing</Link>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Property', 'Price', 'Status', 'Views', 'Leads', ''].map(h => (
                    <th key={h} style={{
                      padding: '11px 16px', textAlign: 'left',
                      fontSize: '0.65rem', color: 'var(--text-muted)',
                      letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
                      background: 'var(--surface-3)',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {listings.map((p: PropertyWithAnalytics, i: number) => {
                  const st = statusStyle[p.status] ?? statusStyle.INACTIVE
                  return (
                    <tr key={p.id} className="table-row"
                      style={{ borderBottom: '1px solid var(--border)', animation: `fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s both` }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ position: 'relative', width: '48px', height: '36px', background: 'var(--surface-3)', borderRadius: 'var(--radius-sm)', flexShrink: 0, overflow: 'hidden' }}>
                            {p.images[0] && <Image src={p.images[0].url} alt={p.title} fill style={{ objectFit: 'cover' }} />}
                          </div>
                          <div>
                            <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '2px' }}
                              className="line-clamp-1">{p.title}</p>
                            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.city} · {p.type}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-primary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {formatPrice(p.price)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 500, padding: '4px 10px', borderRadius: '999px', background: st.bg, color: st.color }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                        {p.analytics?.viewCount ?? 0}
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>
                        {p._count.leads}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Link href={`/dashboard/listings/${p.id}/edit`} className="btn-ghost" style={{ padding: '6px 12px', fontSize: '0.72rem' }}>
                            Edit
                          </Link>
                          <Link href={`/property/${p.slug}`} className="btn-ghost" style={{ padding: '6px 12px', fontSize: '0.72rem' }}>
                            View
                          </Link>
                          <DeleteListingButton id={p.id} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
