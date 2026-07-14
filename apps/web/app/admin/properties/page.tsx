'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ── Icons ─────────────────────────────────────────────────────────
const IcoSearch = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)
const IcoTrash = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M2 3.5h9M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M10.5 3.5l-.7 7a.5.5 0 01-.5.5H3.7a.5.5 0 01-.5-.5l-.7-7"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IcoExternal = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M4.5 2H2a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M6.5 1.5H9.5v3M9.5 1.5L5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IcoEye = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M1 6.5S3.5 2 6.5 2 12 6.5 12 6.5 9.5 11 6.5 11 1 6.5 1 6.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <circle cx="6.5" cy="6.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)
const IcoHome = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M4 15L16 4l12 11v14a1 1 0 01-1 1H5a1 1 0 01-1-1V15z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 30V20h8v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
)
const IcoEdit = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M9 2.5l1.5 1.5-7 7H2v-1.5l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)

// ── Types ─────────────────────────────────────────────────────────
type Property = {
  id: string; title: string; city: string; price: number
  status: string; type: string; slug: string
  images?: { url: string }[]
  owner?: { name: string | null; email: string } | null
  analytics?: { viewCount: number } | null
  _count?: { leads: number }
  createdAt: string
}

// ── Constants ─────────────────────────────────────────────────────
const STATUS_STYLE: Record<string, { bg: string; color: string; border: string }> = {
  ACTIVE:   { bg: 'rgba(74,222,128,0.1)',  color: '#4ade80',           border: 'rgba(74,222,128,0.2)' },
  SOLD:     { bg: 'rgba(201,168,76,0.12)', color: 'var(--gold-light)', border: 'var(--gold-border)' },
  RENTED:   { bg: 'rgba(167,139,250,0.1)', color: '#a78bfa',           border: 'rgba(167,139,250,0.2)' },
  INACTIVE: { bg: 'var(--surface-3)',       color: 'var(--text-muted)', border: 'var(--border)' },
}
const TYPE_COLOR: Record<string, string> = {
  APARTMENT: '#60a5fa', VILLA: 'var(--gold)', PLOT: '#4ade80',
  COMMERCIAL: '#fb923c', HOUSE: '#a78bfa',
}
const TYPE_PATH: Record<string, string> = {
  APARTMENT: 'apartment', VILLA: 'villa', PLOT: 'plot', COMMERCIAL: 'commercial',
}

function formatPrice(p: number) {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)} Cr`
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)} L`
  return `₹${p.toLocaleString('en-IN')}`
}

// ── PropertyRow ───────────────────────────────────────────────────
function PropertyRow({ p, actionLoading, onStatus, onDelete }: {
  p: Property
  actionLoading: string | null
  onStatus: (id: string, status: string) => void
  onDelete: (id: string, title: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const st = STATUS_STYLE[p.status] ?? STATUS_STYLE.INACTIVE
  const busy = !!actionLoading
  const path = `/${TYPE_PATH[p.type] ?? 'property'}/${p.slug}`

  const btnBase: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '4px',
    padding: '5px 10px', borderRadius: 'var(--radius-md)',
    fontSize: '0.65rem', fontWeight: 500,
    cursor: busy ? 'not-allowed' : 'pointer',
    border: '1px solid var(--border)', background: 'var(--surface-3)',
    color: 'var(--text-secondary)', transition: 'all 0.15s',
    opacity: busy ? 0.5 : 1, whiteSpace: 'nowrap',
  }

  return (
    <tr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: '1px solid var(--border)',
        background: hovered ? 'var(--surface-3)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* Thumbnail + title */}
      <td style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            position: 'relative', width: '48px', height: '36px', flexShrink: 0,
            background: 'var(--surface-3)', borderRadius: 'var(--radius-sm)',
            overflow: 'hidden', border: '1px solid var(--border)',
          }}>
            {p.images?.[0]
              ? <Image src={p.images[0].url} alt={p.title} fill style={{ objectFit: 'cover' }} />
              : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', opacity: 0.3 }}><IcoHome /></div>
            }
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
              {p.title}
            </p>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{p.city}</p>
          </div>
        </div>
      </td>

      {/* Owner */}
      <td style={{ padding: '12px 16px' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{p.owner?.name ?? '—'}</p>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{p.owner?.email ?? 'No owner'}</p>
      </td>

      {/* Price */}
      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
          {formatPrice(p.price)}
        </span>
      </td>

      {/* Type */}
      <td style={{ padding: '12px 16px' }}>
        <span style={{
          fontSize: '0.62rem', fontWeight: 500, padding: '2px 8px',
          borderRadius: '999px', background: 'var(--surface-3)',
          color: TYPE_COLOR[p.type] ?? 'var(--text-secondary)',
          border: '1px solid var(--border)',
        }}>
          {p.type}
        </span>
      </td>

      {/* Status — inline dropdown */}
      <td style={{ padding: '12px 16px' }}>
        <select
          value={p.status}
          disabled={busy}
          onChange={e => onStatus(p.id, e.target.value)}
          style={{
            background: st.bg, border: `1px solid ${st.border}`,
            borderRadius: 'var(--radius-md)', padding: '4px 8px',
            fontSize: '0.65rem', color: st.color,
            cursor: busy ? 'not-allowed' : 'pointer',
            outline: 'none', fontWeight: 500,
          }}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="SOLD">SOLD</option>
          <option value="RENTED">RENTED</option>
        </select>
      </td>

      {/* Views */}
      <td style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
          <IcoEye />
          <span style={{ fontSize: '0.78rem' }}>{p.analytics?.viewCount ?? 0}</span>
        </div>
      </td>

      {/* Leads */}
      <td style={{ padding: '12px 16px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
        {p._count?.leads ?? 0}
      </td>

      {/* Listed date */}
      <td style={{ padding: '12px 16px', fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
        {new Date(p.createdAt).toLocaleDateString('en-IN')}
      </td>

      {/* Actions — hover reveal */}
      <td style={{ padding: '12px 16px', minWidth: '180px' }}>
        <div style={{
          display: 'flex', gap: '5px', alignItems: 'center',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.18s, transform 0.18s',
          pointerEvents: hovered ? 'auto' : 'none',
        }}>
          <Link
            href={path} target="_blank"
            style={{ ...btnBase, textDecoration: 'none', color: 'var(--text-secondary)' }}
          >
            <IcoExternal /> View
          </Link>
          <Link
            href={`/dashboard/listings/${p.id}/edit`}
            style={{ ...btnBase, textDecoration: 'none', color: 'var(--gold)', borderColor: 'var(--gold-border)', background: 'var(--gold-dim)' }}
          >
            <IcoEdit /> Edit
          </Link>
          <button
            style={{ ...btnBase, color: '#f87171', borderColor: 'rgba(239,68,68,0.22)', background: 'rgba(239,68,68,0.08)' }}
            disabled={busy}
            onClick={() => onDelete(p.id, p.title)}
          >
            <IcoTrash />
            {actionLoading === p.id + 'del' ? '...' : 'Delete'}
          </button>
        </div>
      </td>
    </tr>
  )
}

// ── Main Page ─────────────────────────────────────────────────────
export default function AdminPropertiesPage() {
  const [properties, setProperties]       = useState<Property[]>([])
  const [total, setTotal]                 = useState(0)
  const [page, setPage]                   = useState(1)
  const [pages, setPages]                 = useState(1)
  const [search, setSearch]               = useState('')
  const [statusFilter, setStatusFilter]   = useState('')
  const [typeFilter, setTypeFilter]       = useState('')
  const [loading, setLoading]             = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search)       params.set('search', search)
    if (statusFilter) params.set('status', statusFilter)
    if (typeFilter)   params.set('type', typeFilter)
    const res = await fetch(`/api/admin/properties?${params}`)
    if (res.ok) {
      const data = await res.json()
      setProperties(data.properties); setTotal(data.total); setPages(data.pages)
    }
    setLoading(false)
  }, [page, search, statusFilter, typeFilter])

  useEffect(() => { fetchProperties() }, [fetchProperties])

  async function changeStatus(propertyId: string, status: string) {
    setActionLoading(propertyId + status)
    await fetch('/api/admin/properties', {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, status }),
    })
    await fetchProperties()
    setActionLoading(null)
  }

  async function deleteProperty(propertyId: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setActionLoading(propertyId + 'del')
    await fetch('/api/admin/properties', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId }),
    })
    await fetchProperties()
    setActionLoading(null)
  }

  const thStyle: React.CSSProperties = {
    padding: '11px 16px', textAlign: 'left',
    fontSize: '0.6rem', color: 'var(--text-muted)',
    letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
    fontFamily: "'Cinzel', serif",
  }

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.58rem', color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '6px' }}>
          Property Management
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px' }}>
          Properties
        </h1>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{total} total properties</p>
      </div>

      {/* Filters */}
      <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', maxWidth: '280px', flex: 1 }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            <IcoSearch />
          </span>
          <input className="input-modern" style={{ paddingLeft: '34px' }}
            placeholder="Search title or city..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <select className="input-modern" style={{ maxWidth: '150px', cursor: 'pointer' }}
          value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}>
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SOLD">Sold</option>
          <option value="RENTED">Rented</option>
        </select>
        <select className="input-modern" style={{ maxWidth: '150px', cursor: 'pointer' }}
          value={typeFilter} onChange={e => { setTypeFilter(e.target.value); setPage(1) }}>
          <option value="">All Types</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
          <option value="VILLA">Villa</option>
          <option value="PLOT">Plot</option>
          <option value="COMMERCIAL">Commercial</option>
        </select>
      </div>

      {/* Table */}
      <div className="animate-fade-up delay-200" style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <div style={{ width: '24px', height: '24px', border: '2px solid var(--border)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '0.88rem' }}>No properties found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  <th style={thStyle}>Property</th>
                  <th style={thStyle}>Owner</th>
                  <th style={thStyle}>Price</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Views</th>
                  <th style={thStyle}>Leads</th>
                  <th style={thStyle}>Listed</th>
                  <th style={{ ...thStyle, minWidth: '180px' }}>Actions (hover)</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(p => (
                  <PropertyRow
                    key={p.id}
                    p={p}
                    actionLoading={actionLoading}
                    onStatus={changeStatus}
                    onDelete={deleteProperty}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div style={{
            padding: '14px 20px', borderTop: '1px solid var(--border)',
            display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {total} properties · Page {page} of {pages}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="btn-ghost" style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
              <button className="btn-ghost" style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
