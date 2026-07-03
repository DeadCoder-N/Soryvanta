'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    const res = await fetch(`/api/admin/leads?${params}`)
    if (res.ok) {
      const data = await res.json()
      setLeads(data.leads)
      setTotal(data.total)
      setPages(data.pages)
    }
    setLoading(false)
  }, [page, search])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  return (
    <div>
      <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px' }}>
          Leads
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{total} total leads</p>
      </div>

      <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input className="input-modern" style={{ maxWidth: '280px' }}
          placeholder="Search by name or phone..."
          value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
      </div>

      <div className="animate-fade-up delay-200" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  {['Lead', 'Property', 'Broker', 'Source', 'Message', 'Date'].map(h => (
                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l: any) => (
                  <tr key={l.id} className="table-row" style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <p style={{ color: 'var(--text-primary)', marginBottom: '2px' }}>{l.name ?? '—'}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{l.phone ?? '—'}</p>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <Link href={`/property/${l.property?.slug}`} style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.78rem' }}>
                        {l.property?.title ?? '—'}
                      </Link>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{l.property?.city}</p>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{l.property?.owner?.name ?? '—'}</p>
                      <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{l.property?.owner?.email}</p>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: '999px', background: 'var(--surface-3)', color: 'var(--text-secondary)' }}>
                        {l.source}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {l.message ?? '—'}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                      {new Date(l.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
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
