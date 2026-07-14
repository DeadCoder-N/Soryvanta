'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M9.5 9.5L13 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
)
const IconExternal = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M4.5 2H2a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M6.5 1.5H9.5v3M9.5 1.5L5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const IconLead = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="16" y1="3" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="16" y1="24" x2="16" y2="29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="3" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="24" y1="16" x2="29" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const sourceStyle: Record<string, { bg: string; color: string }> = {
  whatsapp: { bg: 'rgba(21,128,61,0.1)',   color: '#4ade80' },
  web:      { bg: 'rgba(96,165,250,0.1)',  color: '#60a5fa' },
  direct:   { bg: 'rgba(201,168,76,0.12)', color: 'var(--gold-light)' },
}

type Lead = {
  id: string; name: string | null; phone: string | null
  countryCode: string | null; source: string
  message?: string | null; tokenCount?: number | null; createdAt: string
  property?: { title: string; city: string; slug: string; type: string; owner?: { name: string | null; email: string } | null } | null
}

export default function AdminLeadsPage() {
  const [leads, setLeads]   = useState<Lead[]>([])
  const [total, setTotal]   = useState(0)
  const [page, setPage]     = useState(1)
  const [pages, setPages]   = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchLeads = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    const res = await fetch(`/api/admin/leads?${params}`)
    if (res.ok) {
      const data = await res.json()
      setLeads(data.leads); setTotal(data.total); setPages(data.pages)
    }
    setLoading(false)
  }, [page, search])

  useEffect(() => { fetchLeads() }, [fetchLeads])

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
          Lead Management
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.5vw,1.8rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '4px' }}>
          Leads
        </h1>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{total} total leads</p>
      </div>

      <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div style={{ position: 'relative', maxWidth: '280px', flex: 1 }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            <IconSearch />
          </span>
          <input className="input-modern" style={{ paddingLeft: '34px' }}
            placeholder="Search by name or phone..."
            value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
        </div>
      </div>

      <div className="animate-fade-up delay-200" style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center' }}>
            <div style={{ width: '24px', height: '24px', border: '2px solid var(--border)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div style={{ padding: '64px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <div style={{ margin: '0 auto 16px', opacity: 0.3 }}><IconLead /></div>
            <p style={{ fontSize: '0.88rem' }}>No leads found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '860px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  <th style={thStyle}>Buyer</th>
                  <th style={thStyle}>Property</th>
                  <th style={thStyle}>Broker</th>
                  <th style={thStyle}>Source</th>
                  <th style={thStyle}>Tokens</th>
                  <th style={thStyle}>Date</th>
                  <th style={{ ...thStyle, width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => {
                  const ss = sourceStyle[l.source] ?? sourceStyle.web
                  const isExpanded = expanded === l.id
                  return (
                    <>
                      <tr key={l.id} style={{
                        borderBottom: isExpanded ? 'none' : '1px solid var(--border)',
                        background: isExpanded ? 'var(--surface-3)' : 'transparent',
                        transition: 'background 0.15s',
                      }}>
                        {/* Buyer */}
                        <td style={{ padding: '13px 16px' }}>
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{l.name ?? '—'}</p>
                          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                            {l.countryCode ?? ''}{l.phone ?? '—'}
                          </p>
                        </td>

                        {/* Property */}
                        <td style={{ padding: '13px 16px' }}>
                          {l.property ? (
                            <Link
                              href={`/${l.property.type?.toLowerCase() ?? 'property'}/${l.property.slug}`}
                              target="_blank"
                              style={{ color: 'var(--gold)', textDecoration: 'none', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                              {l.property.title}
                              <IconExternal />
                            </Link>
                          ) : <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>—</span>}
                          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>{l.property?.city}</p>
                        </td>

                        {/* Broker */}
                        <td style={{ padding: '13px 16px' }}>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '2px' }}>{l.property?.owner?.name ?? '—'}</p>
                          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{l.property?.owner?.email}</p>
                        </td>

                        {/* Source */}
                        <td style={{ padding: '13px 16px' }}>
                          <span style={{
                            fontSize: '0.62rem', fontWeight: 500, padding: '3px 9px',
                            borderRadius: '999px', background: ss.bg, color: ss.color,
                            border: `1px solid ${ss.color}30`,
                          }}>
                            {l.source}
                          </span>
                        </td>

                        {/* Token count */}
                        <td style={{ padding: '13px 16px' }}>
                          {l.tokenCount != null ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{ width: '40px', height: '3px', background: 'var(--surface-3)', borderRadius: '2px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${Math.min((l.tokenCount / 200) * 100, 100)}%`, background: 'var(--gold)', borderRadius: '2px' }} />
                              </div>
                              <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{l.tokenCount}</span>
                            </div>
                          ) : <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>—</span>}
                        </td>

                        {/* Date */}
                        <td style={{ padding: '13px 16px', fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {new Date(l.createdAt).toLocaleDateString('en-IN')}
                        </td>

                        {/* Expand for message */}
                        <td style={{ padding: '13px 12px', textAlign: 'center' }}>
                          {l.message && (
                            <button
                              onClick={() => setExpanded(isExpanded ? null : l.id)}
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
                          )}
                        </td>
                      </tr>

                      {/* Expanded message */}
                      {isExpanded && l.message && (
                        <tr key={l.id + '-msg'} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td colSpan={7} style={{ padding: '12px 24px 16px', background: 'var(--surface-1)' }}>
                            <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: "'Cinzel', serif" }}>
                              Message
                            </p>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{l.message}</p>
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
              {total} leads · Page {page} of {pages}
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
