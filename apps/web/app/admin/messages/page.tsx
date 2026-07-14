'use client'

import { useState, useEffect, useCallback } from 'react'

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)
const IconMsg = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M16 3A13 13 0 0129 16c0 7.18-5.82 13-13 13a12.94 12.94 0 01-6.4-1.68L3 29l1.74-5.44A12.94 12.94 0 013 16 13 13 0 0116 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M10 14h12M10 19h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const dirStyle: Record<string, { bg: string; color: string; border: string }> = {
  INBOUND:  { bg: 'rgba(74,222,128,0.1)',  color: '#4ade80',           border: 'rgba(74,222,128,0.2)' },
  OUTBOUND: { bg: 'rgba(201,168,76,0.12)', color: 'var(--gold-light)', border: 'var(--gold-border)' },
}

type Message = {
  id: string; waId: string; direction: string; status?: string | null
  content: string; timestamp: string
  user?: { name: string | null; email: string } | null
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [total, setTotal]       = useState(0)
  const [page, setPage]         = useState(1)
  const [pages, setPages]       = useState(1)
  const [search, setSearch]     = useState('')
  const [dirFilter, setDirFilter] = useState('')
  const [loading, setLoading]   = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search)    params.set('search', search)
    if (dirFilter) params.set('direction', dirFilter)
    const res = await fetch(`/api/admin/messages?${params}`)
    if (res.ok) {
      const data = await res.json()
      setMessages(data.messages); setTotal(data.total); setPages(data.pages)
    }
    setLoading(false)
  }, [page, search, dirFilter])

  useEffect(() => { fetchMessages() }, [fetchMessages])

  const thStyle: React.CSSProperties = {
    padding: '11px 16px', textAlign: 'left',
    fontSize: '0.6rem', color: 'var(--text-muted)',
    letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
    fontFamily: "'Cinzel', serif",
  }

  return (
    <div>
      <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
        <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.58rem', color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '6px' }}>
          WhatsApp Activity
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px' }}>
          Messages
        </h1>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{total} total messages</p>
      </div>

      <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', maxWidth: '280px', flex: 1 }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            <IconSearch />
          </span>
          <input className="input-modern" style={{ paddingLeft: '34px' }}
            placeholder="Search by WhatsApp ID..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>
        <select className="input-modern" style={{ maxWidth: '180px', cursor: 'pointer' }}
          value={dirFilter} onChange={e => { setDirFilter(e.target.value); setPage(1) }}>
          <option value="">All Directions</option>
          <option value="INBOUND">Inbound</option>
          <option value="OUTBOUND">Outbound</option>
        </select>
      </div>

      <div className="animate-fade-up delay-200" style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <div style={{ width: '24px', height: '24px', border: '2px solid var(--border)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ margin: '0 auto 16px', opacity: 0.3 }}><IconMsg /></div>
            <p style={{ fontSize: '0.88rem' }}>No messages found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  <th style={thStyle}>WhatsApp ID</th>
                  <th style={thStyle}>User</th>
                  <th style={thStyle}>Direction</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Preview</th>
                  <th style={thStyle}>Time</th>
                  <th style={{ ...thStyle, width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => {
                  const ds = dirStyle[m.direction] ?? dirStyle.INBOUND
                  const isExpanded = expanded === m.id
                  return (
                    <>
                      <tr key={m.id} style={{
                        borderBottom: isExpanded ? 'none' : '1px solid var(--border)',
                        background: isExpanded ? 'var(--surface-3)' : 'transparent',
                        transition: 'background 0.15s',
                      }}>
                        {/* WA ID */}
                        <td style={{ padding: '13px 16px' }}>
                          <code style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'monospace', background: 'var(--surface-3)', padding: '2px 6px', borderRadius: '4px' }}>
                            {m.waId}
                          </code>
                        </td>

                        {/* User */}
                        <td style={{ padding: '13px 16px' }}>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{m.user?.name ?? '—'}</p>
                          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{m.user?.email ?? 'Unknown'}</p>
                        </td>

                        {/* Direction */}
                        <td style={{ padding: '13px 16px' }}>
                          <span style={{
                            fontSize: '0.62rem', fontWeight: 600, padding: '3px 9px',
                            borderRadius: '999px', background: ds.bg, color: ds.color,
                            border: `1px solid ${ds.border}`, letterSpacing: '0.04em',
                          }}>
                            {m.direction}
                          </span>
                        </td>

                        {/* Status */}
                        <td style={{ padding: '13px 16px' }}>
                          <span style={{
                            fontSize: '0.62rem', padding: '2px 8px', borderRadius: '999px',
                            background: 'var(--surface-3)', color: 'var(--text-muted)',
                            border: '1px solid var(--border)',
                          }}>
                            {m.status ?? '—'}
                          </span>
                        </td>

                        {/* Preview */}
                        <td style={{ padding: '13px 16px', maxWidth: '220px' }}>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {m.content}
                          </p>
                        </td>

                        {/* Time */}
                        <td style={{ padding: '13px 16px', fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {new Date(m.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                        </td>

                        {/* Expand */}
                        <td style={{ padding: '13px 12px', textAlign: 'center' }}>
                          <button
                            onClick={() => setExpanded(isExpanded ? null : m.id)}
                            style={{
                              background: isExpanded ? 'var(--gold-dim)' : 'var(--surface-3)',
                              border: `1px solid ${isExpanded ? 'var(--gold-border)' : 'var(--border)'}`,
                              borderRadius: 'var(--radius-md)', padding: '4px 8px',
                              cursor: 'pointer', color: isExpanded ? 'var(--gold)' : 'var(--text-muted)',
                              fontSize: '0.6rem',
                            }}
                          >
                            {isExpanded ? '▲' : '▼'}
                          </button>
                        </td>
                      </tr>

                      {/* Full message */}
                      {isExpanded && (
                        <tr key={m.id + '-full'} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td colSpan={7} style={{ padding: '12px 24px 16px', background: 'var(--surface-1)' }}>
                            <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Cinzel', serif" }}>
                              Full Message
                            </p>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{m.content}</p>
                          </td>
                        </tr>
                      )}
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {pages > 1 && (
          <div style={{
            padding: '14px 20px', borderTop: '1px solid var(--border)',
            display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {total} messages · Page {page} of {pages}
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
