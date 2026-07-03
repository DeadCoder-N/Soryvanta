import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth'
import { getBrokerListings, getBrokerAnalytics } from '@brisvora/api'
import { formatPrice } from '@brisvora/shared'
import DeleteListingButton from './DeleteListingButton'

type PropertyWithAnalytics = {
  id: string
  slug: string
  title: string
  city: string
  price: number
  type: string
  status: string
  images: Array<{ url: string }>
  analytics: { viewCount: number } | null
  _count: { leads: number }
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) return <div>Access denied</div>

  const [listings, analytics] = await Promise.all([
    getBrokerListings(session.user.id),
    getBrokerAnalytics(session.user.id),
  ])

  const stats = [
    { label: 'Total Listings', value: analytics.totalListings, dark: true, icon: '▦', suffix: '' },
    { label: 'Total Views', value: analytics.totalViews, dark: false, icon: '◉', suffix: '' },
    { label: 'Total Leads', value: analytics.totalLeads, dark: false, icon: '◎', suffix: '' },
  ]

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <p style={{ fontSize: '0.62rem', color: 'var(--gold)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Dashboard
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--ink)', fontWeight: 400 }}>
            Overview
          </h1>
        </div>
        <Link href="/dashboard/listings/new"
          className="btn-press"
          style={{
            background: 'var(--ink)', color: 'var(--warm-white)',
            fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
            padding: '12px 24px', textDecoration: 'none', whiteSpace: 'nowrap',
            transition: 'background 0.2s',
          }}>
          + New Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: '40px' }}>
        {stats.map((stat, i) => (
          <div key={stat.label}
            className={`stat-card animate-count-up delay-${(i + 1) * 100}`}
            style={{
              background: stat.dark ? 'var(--bark)' : 'var(--warm-white)',
              padding: '32px 28px',
              borderBottom: `3px solid ${stat.dark ? 'var(--mauve)' : 'var(--linen-dk)'}`,
              cursor: 'default',
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '2.75rem',
                color: stat.dark ? 'var(--warm-white)' : 'var(--ink)',
                fontWeight: 400, lineHeight: 1,
              }}>
                {stat.value}
              </p>
              <span style={{
                fontSize: '1rem',
                color: stat.dark ? 'rgba(253,252,249,0.25)' : 'var(--linen-dk)',
              }}>{stat.icon}</span>
            </div>
            <p style={{
              fontSize: '0.7rem',
              color: stat.dark ? 'rgba(253,252,249,0.45)' : 'var(--ink-muted)',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Listings table */}
      <div className="animate-fade-up delay-300" style={{ background: 'var(--warm-white)', border: '1px solid var(--linen-dk)', overflowX: 'auto' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--linen-dk)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 400 }}>
            My Listings
          </h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>{listings.length} total</span>
        </div>

        {listings.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px', opacity: 0.3 }}>▦</div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink-soft)', marginBottom: '12px' }}>No listings yet</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginBottom: '20px' }}>
              Create your first listing via WhatsApp or the web form
            </p>
            <Link href="/dashboard/listings/new"
              className="btn-press"
              style={{
                display: 'inline-block',
                fontSize: '0.72rem', color: 'var(--warm-white)',
                background: 'var(--ink)',
                padding: '10px 24px',
                textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
              Create Listing
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--linen-md)' }}>
                {['Property', 'Price', 'Status', 'Views', 'Leads', ''].map(h => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: 'left',
                    fontSize: '0.62rem', color: 'var(--ink-muted)',
                    letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
                    background: 'var(--linen)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listings.map((p: PropertyWithAnalytics, i: number) => (
                <tr key={p.id}
                  style={{
                    borderBottom: '1px solid var(--linen-md)',
                    transition: 'background 0.15s ease',
                    animation: `fadeInUp 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.05}s both`,
                  }}
                  className="hover:bg-[var(--linen)]">
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ position: 'relative', width: '48px', height: '36px', background: 'var(--linen-md)', flexShrink: 0, overflow: 'hidden' }}>
                        {p.images[0] && (
                          <Image src={p.images[0].url} alt={p.title} fill
                            style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }} />
                        )}
                      </div>
                      <div>
                        <p style={{ color: 'var(--ink)', fontWeight: 500 }} className="line-clamp-1">{p.title}</p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '2px' }}>{p.city} · {p.type}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--ink)', fontWeight: 500, whiteSpace: 'nowrap' }}>{formatPrice(p.price)}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '4px 10px',
                      background: p.status === 'ACTIVE' ? 'rgba(26,107,42,0.09)' : p.status === 'SOLD' ? 'rgba(184,134,11,0.09)' : 'var(--linen-md)',
                      color: p.status === 'ACTIVE' ? 'var(--logo-green)' : p.status === 'SOLD' ? 'var(--gold)' : 'var(--ink-muted)',
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--ink-soft)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>◉</span>
                      {p.analytics?.viewCount ?? 0}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--ink-soft)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--ink-muted)' }}>◎</span>
                      {p._count.leads}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                      <Link href={`/dashboard/listings/${p.id}/edit`}
                        className="hover-ink">
                        Edit
                      </Link>
                      <Link href={`/property/${p.slug}`}
                        className="hover-ink">
                        View
                      </Link>
                      <DeleteListingButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
