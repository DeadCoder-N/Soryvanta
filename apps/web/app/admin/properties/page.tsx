'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@brisvora/shared'

const statusStyle: Record<string, { bg: string; color: string }> = {
  ACTIVE:   { bg: 'var(--green-dim)', color: '#4ade80' },
  SOLD:     { bg: 'rgba(201,150,14,0.12)', color: 'var(--gold)' },
  RENTED:   { bg: 'rgba(99,102,241,0.12)', color: '#a5b4fc' },
  INACTIVE: { bg: 'var(--surface-3)', color: 'var(--text-muted)' },
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    if (statusFilter) params.set('status', statusFilter)
    if (typeFilter) params.set('type', typeFilter)
    const res = await fetch(`/api/admin/properties?${params}`)
    if (res.ok) {
      const data = await res.json()
      setProperties(data.properties)
      setTotal(data.total)
      setPages(data.pages)
    }
    setLoading(false)
  }, [page, search, statusFilter, typeFilter])

  useEffect(() => { fetchProperties() }, [fetchProperties])

  async function changeStatus(propertyId: string, status: string) {
    setActionLoading(propertyId + status)
    await fetch('/api/admin/properties', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, status }),
    })
    await fetchProperties()
    setActionLoading(null)
  }

  async function deleteProperty(propertyId: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setActionLoading(propertyId + 'del')
    await fetch('/api/admin/properties', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId }),
    })
    await fetchProperties()
    setActionLoading(null)
  }

  return (
    <div>
      <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px' }}>
          Properties
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{total} total properties</p>
      </div>

      {/* Filters */}
      <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input className="input-modern" style={{ maxWidth: '280px' }}
          placeholder="Search title or city..."
          value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        <select className="input-modern" style={{ maxWidth: '160px', cursor: 'pointer' }}
          value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}>
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
          <option value="SOLD">Sold</option>
          <option value="RENTED">Rented</option>
        </select>
        <select className="input-modern" style={{ maxWidth: '160px', cursor: 'pointer' }}
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
      <div className="animate-fade-up delay-200" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  {['Property', 'Owner', 'Price', 'Status', 'Views', 'Leads', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {properties.map((p: any) => {
                  const st = statusStyle[p.status] ?? statusStyle.INACTIVE
                  return (
                    <tr key={p.id} className="table-row" style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ position: 'relative', width: '44px', height: '34px', background: 'var(--surface-3)', borderRadius: 'var(--radius-sm)', flexShrink: 0, overflow: 'hidden' }}>
                            {p.images?.[0] && <Image src={p.images[0].url} alt={p.title} fill style={{ objectFit: 'cover' }} />}
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ color: 'var(--text-primary)', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{p.title}</p>
                            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.city} · {p.type}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{p.owner?.name ?? '—'}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>{p.owner?.email ?? 'No owner'}</p>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-primary)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {formatPrice(p.price)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 500, padding: '4px 10px', borderRadius: '999px', background: st.bg, color: st.color }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p.analytics?.viewCount ?? 0}</td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{p._count?.leads ?? 0}</td>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <Link href={`/property/${p.slug}`} className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.68rem' }}>
                            View
                          </Link>
                          {p.status !== 'ACTIVE' && (
                            <button className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.68rem', color: '#4ade80' }}
                              disabled={!!actionLoading} onClick={() => changeStatus(p.id, 'ACTIVE')}>
                              {actionLoading === p.id + 'ACTIVE' ? '...' : 'Activate'}
                            </button>
                          )}
                          {p.status !== 'INACTIVE' && (
                            <button className="btn-ghost" style={{ padding: '5px 10px', fontSize: '0.68rem' }}
                              disabled={!!actionLoading} onClick={() => changeStatus(p.id, 'INACTIVE')}>
                              {actionLoading === p.id + 'INACTIVE' ? '...' : 'Deactivate'}
                            </button>
                          )}
                          <button style={{ padding: '5px 10px', fontSize: '0.68rem', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
                            disabled={!!actionLoading} onClick={() => deleteProperty(p.id, p.title)}>
                            {actionLoading === p.id + 'del' ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {pages > 1 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Page {page} of {pages}</span>
            <button className="btn-ghost" style={{ padding: '6px 14px', fontSize: '0.78rem' }}
              disabled={page >= pages} onClick={() => setPage(p => p + 1)}>Next →</button>
          </div>
        )}
      </div>
    </div>
  )
}
