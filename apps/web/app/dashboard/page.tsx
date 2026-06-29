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

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
        <div>
          <p style={{ fontSize: '0.62rem', color: 'var(--gold)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
            Dashboard
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--ink)', fontWeight: 400 }}>
            Overview
          </h1>
        </div>
        <Link href="/dashboard/listings/new" style={{
          background: 'var(--ink)', color: 'var(--warm-white)',
          fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
          padding: '12px 28px', textDecoration: 'none',
        }}>
          + New Listing
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginBottom: '48px' }}>
        {[
          { label: 'Total Listings', value: analytics.totalListings },
          { label: 'Total Views', value: analytics.totalViews },
          { label: 'Total Leads', value: analytics.totalLeads },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            background: i === 0 ? 'var(--bark)' : 'var(--warm-white)',
            padding: '36px 32px',
            borderBottom: `3px solid ${i === 0 ? 'var(--mauve)' : 'var(--linen-dk)'}`,
          }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: i === 0 ? 'var(--warm-white)' : 'var(--ink)', fontWeight: 400, lineHeight: 1 }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '0.7rem', color: i === 0 ? 'rgba(253,252,249,0.45)' : 'var(--ink-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '10px' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Listings table */}
      <div style={{ background: 'var(--warm-white)', border: '1px solid var(--linen-dk)' }}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--linen-dk)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 400 }}>
            My Listings
          </h2>
          <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>{listings.length} total</span>
        </div>

        {listings.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink-soft)', marginBottom: '12px' }}>No listings yet</p>
            <Link href="/dashboard/listings/new" style={{ fontSize: '0.78rem', color: 'var(--mauve)', textDecoration: 'none', borderBottom: '1px solid var(--mauve)', paddingBottom: '1px' }}>
              Create your first listing
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--linen-md)' }}>
                {['Property', 'Price', 'Status', 'Views', 'Leads', ''].map(h => (
                  <th key={h} style={{
                    padding: '12px 20px', textAlign: 'left',
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
              {listings.map((p: PropertyWithAnalytics) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--linen-md)' }}
                  className="hover:bg-[var(--linen)] transition-colors">
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ position: 'relative', width: '48px', height: '36px', background: 'var(--linen-md)', flexShrink: 0 }}>
                        {p.images[0] && <Image src={p.images[0].url} alt={p.title} fill style={{ objectFit: 'cover' }} />}
                      </div>
                      <div>
                        <p style={{ color: 'var(--ink)', fontWeight: 500 }} className="line-clamp-1">{p.title}</p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', marginTop: '2px' }}>{p.city} · {p.type}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--ink)', fontWeight: 500 }}>{formatPrice(p.price)}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '4px 10px',
                      background: p.status === 'ACTIVE' ? 'rgba(26,107,42,0.09)' : 'var(--linen-md)',
                      color: p.status === 'ACTIVE' ? 'var(--logo-green)' : 'var(--ink-muted)',
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', color: 'var(--ink-soft)' }}>{p.analytics?.viewCount ?? 0}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--ink-soft)' }}>{p._count.leads}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <Link href={`/dashboard/listings/${p.id}/edit`} style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', textDecoration: 'none', borderBottom: '1px solid var(--linen-dk)', paddingBottom: '1px' }}>
                        Edit
                      </Link>
                      <Link href={`/property/${p.slug}`} style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', textDecoration: 'none', borderBottom: '1px solid var(--linen-dk)', paddingBottom: '1px' }}>
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
