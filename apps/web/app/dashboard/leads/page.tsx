import { auth } from '@/auth'
import { getBrokerLeads } from '@brisvora/api'

type LeadWithProperty = {
  id: string; name: string | null; phone: string | null; message: string | null
  source: string; createdAt: Date; property: { id: string; title: string; slug: string }
}

export default async function LeadsPage() {
  const session = await auth()
  if (!session?.user?.id) return <div>Access denied</div>
  const leads = await getBrokerLeads(session.user.id)

  return (
    <div>
      <div className="animate-fade-up" style={{ marginBottom: '32px' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '4px' }}>Buyer enquiries</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400 }}>Leads</h1>
      </div>

      {leads.length > 0 && (
        <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <span className="badge badge-muted">{leads.length} total</span>
          <span className="badge badge-green">
            {leads.filter((l: LeadWithProperty) => l.source === 'whatsapp').length} via WhatsApp
          </span>
          <span className="badge badge-muted">
            {leads.filter((l: LeadWithProperty) => l.source === 'web').length} via web form
          </span>
        </div>
      )}

      <div className="animate-fade-up delay-150" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        {leads.length === 0 ? (
          <div style={{ padding: '80px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.25 }}>📩</div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>No leads yet</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '300px', margin: '0 auto', lineHeight: 1.7 }}>
              Leads appear here when visitors enquire about your listings
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '640px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-3)' }}>
                  {['Name', 'Phone', 'Property', 'Message', 'Source', 'Date'].map(h => (
                    <th key={h} style={{ padding: '11px 20px', textAlign: 'left', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((lead: LeadWithProperty, i: number) => (
                  <tr key={lead.id} className="table-row"
                    style={{ borderBottom: '1px solid var(--border)', animation: `fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s both` }}>
                    <td style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: 500 }}>{lead.name ?? '—'}</td>
                    <td style={{ padding: '16px 20px' }}>
                      {lead.phone
                        ? <a href={`tel:${lead.phone}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.15s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>{lead.phone}</a>
                        : <span style={{ color: 'var(--text-muted)' }}>—</span>}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', maxWidth: '160px' }} className="truncate">{lead.property.title}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--text-muted)', maxWidth: '200px' }} className="truncate">{lead.message ?? '—'}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <span className={`badge ${lead.source === 'whatsapp' ? 'badge-green' : 'badge-muted'}`}>
                        {lead.source}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
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
