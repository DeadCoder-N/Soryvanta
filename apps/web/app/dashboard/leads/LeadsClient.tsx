'use client'

import { useState, useMemo } from 'react'
import { IcoWhatsApp, IcoMessage, IcoPhone } from '@/components/Icons'

type Lead = {
  id: string; name: string | null; phone: string | null
  message: string | null; source: string; createdAt: Date
  property: { id: string; title: string; slug: string }
}

const SOURCE_TABS = ['All', 'whatsapp', 'web'] as const

function AvatarInitial({ name }: { name: string | null }) {
  const letter = name?.[0]?.toUpperCase() ?? '?'
  return (
    <div style={{
      width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, var(--gold-dim), var(--surface-3))',
      border: '1px solid var(--gold-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 600,
    }}>
      {letter}
    </div>
  )
}

export default function LeadsClient({ leads }: { leads: Lead[] }) {
  const [search, setSearch] = useState('')
  const [sourceTab, setSourceTab] = useState<string>('All')

  const filtered = useMemo(() => {
    let result = leads
    if (sourceTab !== 'All') result = result.filter(l => l.source === sourceTab)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.property.title.toLowerCase().includes(q)
      )
    }
    return result
  }, [leads, sourceTab, search])

  if (leads.length === 0) {
    return (
      <div className="animate-fade-up" style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)', padding: '80px 40px', textAlign: 'center',
      }}>
        <div style={{
          width: '64px', height: '64px', margin: '0 auto 20px',
          background: 'var(--gold-dim)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--gold)',
        }}>
          <IcoMessage size={26} />
        </div>
        <h2 className="empty-state-title">No leads yet</h2>
        <p className="empty-state-body" style={{ maxWidth: '300px', margin: '0 auto' }}>
          Leads appear here when visitors enquire about your listings via WhatsApp or the web form.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-up delay-150">
      {/* Search + filter row */}
      <div style={{
        display: 'flex', gap: '12px', marginBottom: '20px',
        flexWrap: 'wrap', alignItems: 'center',
      }}>
        {/* Source tabs */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {SOURCE_TABS.map(tab => (
            <button key={tab} onClick={() => setSourceTab(tab)}
              style={{
                padding: '6px 14px', borderRadius: '999px', fontSize: '0.72rem',
                fontWeight: sourceTab === tab ? 500 : 400,
                background: sourceTab === tab ? 'var(--gold-dim)' : 'var(--surface-2)',
                color: sourceTab === tab ? 'var(--gold)' : 'var(--text-muted)',
                border: `1px solid ${sourceTab === tab ? 'var(--gold-border)' : 'var(--border)'}`,
                cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize',
              }}>
              {tab === 'All' ? `All (${leads.length})` : tab === 'whatsapp' ? `WhatsApp (${leads.filter(l => l.source === 'whatsapp').length})` : `Web (${leads.filter(l => l.source === 'web').length})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, phone, property..."
          style={{
            flex: 1, minWidth: '200px',
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', padding: '7px 14px',
            fontSize: '0.78rem', color: 'var(--text-primary)',
            outline: 'none', transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border)')}
        />
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)', overflow: 'hidden',
      }}>
        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '48px', fontSize: '0.88rem' }}>
            No leads match your search.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '640px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  {['Buyer', 'Contact', 'Property', 'Message', 'Source', 'Date', ''].map(h => (
                    <th key={h} style={{
                      padding: '10px 16px', textAlign: 'left',
                      fontSize: '0.6rem', color: 'var(--text-muted)',
                      letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead.id} className="table-row"
                    style={{ borderBottom: '1px solid var(--border)', animationDelay: `${i * 0.03}s` }}>

                    {/* Buyer */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <AvatarInitial name={lead.name} />
                        <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                          {lead.name ?? '—'}
                        </span>
                      </div>
                    </td>

                    {/* Contact */}
                    <td style={{ padding: '14px 16px' }}>
                      {lead.phone ? (
                        <a href={`tel:${lead.phone}`}
                          style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <IcoPhone size={12} />
                          {lead.phone}
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>

                    {/* Property */}
                    <td style={{ padding: '14px 16px', maxWidth: '160px' }}>
                      <span className="line-clamp-1" style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>
                        {lead.property.title}
                      </span>
                    </td>

                    {/* Message */}
                    <td style={{ padding: '14px 16px', maxWidth: '180px' }}>
                      <span className="line-clamp-1" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {lead.message ?? '—'}
                      </span>
                    </td>

                    {/* Source */}
                    <td style={{ padding: '14px 16px' }}>
                      <span className={`badge ${lead.source === 'whatsapp' ? 'badge-green' : 'badge-muted'}`}>
                        {lead.source}
                      </span>
                    </td>

                    {/* Date */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </td>

                    {/* WhatsApp action */}
                    <td style={{ padding: '14px 16px' }}>
                      {lead.phone && (
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank" rel="noopener noreferrer"
                          title="Open WhatsApp chat"
                          style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: '30px', height: '30px', borderRadius: 'var(--radius-md)',
                            background: 'var(--green-dim)', border: '1px solid rgba(74,222,128,0.2)',
                            color: '#4ade80', textDecoration: 'none',
                            transition: 'all 0.2s',
                          }}>
                          <IcoWhatsApp size={14} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
