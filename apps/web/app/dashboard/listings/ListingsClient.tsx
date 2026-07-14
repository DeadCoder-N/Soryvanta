'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IcoEdit, IcoTrash, IcoExternalLink, IcoBuilding } from '@/components/Icons'

type Listing = {
  id: string; slug: string; title: string; city: string
  price: number; type: string; status: string
  images: Array<{ url: string }>
  analytics: { viewCount: number } | null
  _count: { leads: number }
}

const STATUS_TABS = ['All', 'ACTIVE', 'INACTIVE', 'SOLD', 'RENTED'] as const
const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  ACTIVE:   { bg: 'var(--green-dim)',              color: '#4ade80',           label: 'Active' },
  SOLD:     { bg: 'rgba(201,168,76,0.12)',          color: 'var(--gold)',       label: 'Sold' },
  RENTED:   { bg: 'rgba(99,102,241,0.12)',          color: '#a5b4fc',           label: 'Rented' },
  INACTIVE: { bg: 'var(--surface-3)',               color: 'var(--text-muted)', label: 'Inactive' },
}

const TYPE_PATH: Record<string, string> = {
  APARTMENT: 'apartment', VILLA: 'villa', PLOT: 'plot', COMMERCIAL: 'commercial',
}

function listingPath(type: string, slug: string) {
  return `/${TYPE_PATH[type] ?? 'property'}/${slug}`
}

function formatPrice(p: number) {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`
  return `₹${p.toLocaleString('en-IN')}`
}

function DeleteBtn({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this listing? This cannot be undone.')) return
    setLoading(true)
    await fetch(`/api/broker/listings/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading}
      title="Delete listing"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '30px', height: '30px', borderRadius: 'var(--radius-md)',
        background: 'transparent', border: '1px solid var(--border)',
        color: loading ? 'var(--text-muted)' : '#f87171',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s', flexShrink: 0,
      }}>
      <IcoTrash size={13} />
    </button>
  )
}

export default function ListingsClient({ listings }: { listings: Listing[] }) {
  const [activeTab, setActiveTab] = useState<string>('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let result = listings
    if (activeTab !== 'All') result = result.filter(l => l.status === activeTab)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q)
      )
    }
    return result
  }, [listings, activeTab, search])

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: listings.length }
    STATUS_TABS.slice(1).forEach(s => { c[s] = listings.filter(l => l.status === s).length })
    return c
  }, [listings])

  if (listings.length === 0) {
    return (
      <div className="animate-fade-up" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <div style={{
          width: '72px', height: '72px', margin: '0 auto 20px',
          background: 'var(--gold-dim)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gold)',
        }}>
          <IcoBuilding size={28} />
        </div>
        <h2 className="empty-state-title">No listings yet</h2>
        <p className="empty-state-body" style={{ maxWidth: '320px', margin: '0 auto 24px' }}>
          Create your first listing via WhatsApp or the web form — AI generates it instantly.
        </p>
        <Link href="/dashboard/listings/new" className="btn-primary">Create First Listing</Link>
      </div>
    )
  }

  return (
    <div className="animate-fade-up delay-100">
      {/* Filter tabs + search */}
      <div style={{
        display: 'flex', gap: '12px', marginBottom: '24px',
        flexWrap: 'wrap', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
          {STATUS_TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px', borderRadius: '999px', fontSize: '0.72rem',
                fontWeight: activeTab === tab ? 500 : 400,
                background: activeTab === tab ? 'var(--gold-dim)' : 'var(--surface-2)',
                color: activeTab === tab ? 'var(--gold)' : 'var(--text-muted)',
                border: `1px solid ${activeTab === tab ? 'var(--gold-border)' : 'var(--border)'}`,
                cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}>
              {tab === 'All' ? 'All' : STATUS_STYLE[tab]?.label ?? tab}
              <span style={{ marginLeft: '5px', opacity: 0.6 }}>({counts[tab] ?? 0})</span>
            </button>
          ))}
        </div>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search listings..."
          style={{
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', padding: '7px 14px',
            fontSize: '0.78rem', color: 'var(--text-primary)',
            width: '200px', outline: 'none', transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '48px', fontSize: '0.88rem' }}>
          No listings match your filter.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {filtered.map((listing, i) => {
            const st = STATUS_STYLE[listing.status] ?? STATUS_STYLE.INACTIVE
            return (
              <div key={listing.id} className="card animate-fade-up"
                style={{ overflow: 'hidden', animationDelay: `${i * 0.04}s` }}>
                {/* Image */}
                <div style={{ position: 'relative', paddingTop: '56%', background: 'var(--surface-3)' }}>
                  {listing.images[0] ? (
                    <Image src={listing.images[0].url} alt={listing.title} fill
                      style={{ objectFit: 'cover' }} className="card-img" />
                  ) : (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--text-muted)',
                    }}>
                      <IcoBuilding size={32} />
                    </div>
                  )}
                  <span style={{
                    position: 'absolute', top: '10px', left: '10px',
                    fontSize: '0.6rem', fontWeight: 500, padding: '3px 10px',
                    borderRadius: '999px', background: st.bg, color: st.color,
                    backdropFilter: 'blur(8px)',
                  }}>
                    {st.label}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: '16px' }}>
                  <p className="line-clamp-1" style={{
                    fontFamily: 'var(--font-serif)', fontSize: '0.95rem',
                    color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px',
                  }}>{listing.title}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    {listing.city} · {listing.type}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 400 }}>
                      {formatPrice(listing.price)}
                    </span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {listing.analytics?.viewCount ?? 0} views
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {listing._count.leads} leads
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <Link href={`/dashboard/listings/${listing.id}/edit`}
                      className="listing-action-btn"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                      <IcoEdit size={12} /> Edit
                    </Link>
                    <Link href={listingPath(listing.type, listing.slug)} target="_blank"
                      className="listing-action-btn"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                      <IcoExternalLink size={12} /> View
                    </Link>
                    <DeleteBtn id={listing.id} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
