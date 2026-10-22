import { auth } from '@/auth'
import { getBrokerAnalytics, getBrokerListings } from '@marketing-os/api'
import AnalyticsClient from './AnalyticsClient'
import Link from 'next/link'
import { IcoPlus } from '@/components/Icons'

export default async function AnalyticsPage() {
  const session = await auth()
  if (!session?.user?.id) return <div>Access denied</div>

  const [analytics, listings] = await Promise.all([
    getBrokerAnalytics(session.user.id),
    getBrokerListings(session.user.id),
  ])

  const a = analytics as any
  const ls = listings as any[]

  // City breakdown — computed server-side
  const cityMap: Record<string, { views: number; leads: number; count: number }> = {}
  ls.forEach(l => {
    const city = l.city || 'Unknown'
    if (!cityMap[city]) cityMap[city] = { views: 0, leads: 0, count: 0 }
    cityMap[city].views  += l.analytics?.viewCount ?? 0
    cityMap[city].leads  += l._count?.leads ?? 0
    cityMap[city].count  += 1
  })
  const cityBreakdown = Object.entries(cityMap)
    .map(([city, data]) => ({ city, ...data }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 8)

  // Per-listing performance rows
  const listingPerf = ls.map(l => ({
    id:           l.id,
    title:        l.title,
    city:         l.city,
    status:       l.status,
    views:        l.analytics?.viewCount ?? 0,
    leads:        l._count?.leads ?? 0,
    convRate:     (l.analytics?.viewCount ?? 0) > 0
                    ? Math.round((l._count.leads / l.analytics.viewCount) * 1000) / 10
                    : 0,
  })).sort((a, b) => b.views - a.views)

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '32px',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <div>
          <span className="section-label" style={{ marginBottom: '6px' }}>Analytics</span>
          <div className="gold-divider" style={{ marginBottom: '12px' }} />
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
            color: 'var(--text-primary)', fontWeight: 400,
          }}>
            Performance Insights
          </h1>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Views, leads and conversion across all your listings.
          </p>
        </div>
        <Link href="/dashboard/listings/new" className="btn-primary" style={{ gap: '8px' }}>
          <IcoPlus size={14} /> New Listing
        </Link>
      </div>

      <AnalyticsClient
        analytics={a}
        cityBreakdown={cityBreakdown}
        listingPerf={listingPerf}
      />
    </div>
  )
}
