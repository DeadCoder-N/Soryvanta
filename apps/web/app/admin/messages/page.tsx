'use client'

import { useState, useEffect, useCallback } from 'react'

const directionStyle: Record<string, { bg: string; color: string }> = {
  INBOUND:  { bg: 'var(--green-dim)', color: '#4ade80' },
  OUTBOUND: { bg: 'var(--gold-dim)', color: 'var(--gold-light)' },
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [search, setSearch] = useState('')
  const [dirFilter, setDirFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    if (dirFilter) params.set('direction', dirFilter)
    const res = await fetch(`/api/admin/messages?${params}`)
    if (res.ok) {
      const data = await res.json()
      setMessages(data.messages)
      setTotal(data.total)
      setPages(data.pages)
    }
    setLoading(false)
  }, [page, search, dirFilter])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  return (
    <div>
      <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px' }}>
          WhatsApp Messages
        </h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{total} total messages</p>
      </div>

      <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input className="input-modern" style={{ maxWidth: '280px' }}
          placeholder="Search by WhatsApp ID..."
          value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        <select className="input-modern" style={{ maxWidth: '180px', cursor: 'pointer' }}
          value={dirFilter} onChange={e => { setDirFilter(e.target.value); setPage(1) }}>
          <option value="">All Directions</option>
          <option value="INBOUND">Inbound</option>
          <option value="OUTBOUND">Outbound</option>
        </select>
      </div>

      <div className="animate-fade-up delay-200" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '700px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  {['WhatsApp ID', 'User', 'Direction', 'Status', 'Message', 'Time'].map(h => (
                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map((m: any) => {
                  const ds = directionStyle[m.direction] ?? directionStyle.INBOUND
                  return (
                    <tr key={m.id} className="table-row" style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.75rem' }}>
                        {m.waId}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{m.user?.name ?? '—'}</p>
                        <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{m.user?.email ?? 'Unknown'}</p>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '0.68rem', fontWeight: 500, padding: '4px 10px', borderRadius: '999px', background: ds.bg, color: ds.color }}>
                          {m.direction}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: '0.68rem', padding: '3px 8px', borderRadius: '999px', background: 'var(--surface-3)', color: 'var(--text-muted)' }}>
                          {m.status ?? '—'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-secondary)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.content}
                      </td>
                      <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                        {new Date(m.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
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
