import { auth } from '@/auth'
import { getBrokerLeads } from '@brisvora/api'

type LeadWithProperty = {
  id: string
  name: string | null
  phone: string | null
  message: string | null
  source: string
  createdAt: Date
  property: { id: string; title: string; slug: string }
}

export default async function LeadsPage() {
  const session = await auth()
  if (!session?.user?.id) return <div>Access denied</div>

  const leads = await getBrokerLeads(session.user.id)

  return (
    <div>
      <div style={{ marginBottom: '48px' }}>
        <p style={{ fontSize: '0.62rem', color: 'var(--mauve)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Enquiries
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--ink)', fontWeight: 400 }}>
          Leads
        </h1>
      </div>

      <div style={{ background: 'var(--warm-white)', border: '1px solid var(--linen-dk)' }}>
        {leads.length === 0 ? (
          <div style={{ padding: '80px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink-soft)' }}>No leads yet</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '8px' }}>
              Leads appear here when visitors enquire about your listings
            </p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--linen)', borderBottom: '1px solid var(--linen-md)' }}>
                {['Name', 'Phone', 'Property', 'Message', 'Source', 'Date'].map(h => (
                  <th key={h} style={{
                    padding: '12px 20px', textAlign: 'left',
                    fontSize: '0.62rem', color: 'var(--ink-muted)',
                    letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500,
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: LeadWithProperty) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--linen-md)' }}
                  className="hover:bg-[var(--linen)] transition-colors">
                  <td style={{ padding: '16px 20px', color: 'var(--ink)', fontWeight: 500 }}>{lead.name ?? '—'}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--ink-soft)' }}>{lead.phone ?? '—'}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--ink-soft)', maxWidth: '160px' }} className="truncate">{lead.property.title}</td>
                  <td style={{ padding: '16px 20px', color: 'var(--ink-muted)', maxWidth: '200px' }} className="truncate">{lead.message ?? '—'}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '4px 10px', background: 'var(--linen-md)', color: 'var(--ink-soft)',
                    }}>
                      {lead.source}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                    {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
