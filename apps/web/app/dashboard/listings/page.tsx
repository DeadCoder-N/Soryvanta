import { auth } from '@/auth'
import { getBrokerListings } from '@brisvora/api'
import Link from 'next/link'
import ListingsClient from './ListingsClient'
import { IcoPlus } from '@/components/Icons'

export default async function ListingsPage() {
  const session = await auth()
  if (!session?.user?.id) return <div>Access denied</div>

  const listings = await getBrokerListings(session.user.id)

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '32px',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <div>
          <span className="section-label" style={{ marginBottom: '6px' }}>Properties</span>
          <div className="gold-divider" style={{ marginBottom: '12px' }} />
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
            color: 'var(--text-primary)', fontWeight: 400,
          }}>
            My Listings
          </h1>
        </div>
        <Link href="/dashboard/listings/new" className="btn-primary" style={{ gap: '8px' }}>
          <IcoPlus size={14} />
          New Listing
        </Link>
      </div>

      <ListingsClient listings={listings as any} />
    </div>
  )
}
