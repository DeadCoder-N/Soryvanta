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
      <div className="animate-fade-up" style={{ marginBottom: '48px' }}>
        <p style={{ fontSize: '0.62rem', color: 'var(--mauve)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '8px' }}>
          Enquiries
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--ink)', fontWeight: 400 }}>
          Leads
        </h1>
      </div>

      <div className="animate-fade-up delay-100" style={{ background: 'var(--warm-white)', border: '1px solid var(--linen-dk)' }}>
        {leads.length === 0 ? (
          <div style={{ padding: '80px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px', opacity: 0.2 }}>◎</div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink-soft)', marginBottom: '8px' }}>
              No leads yet
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', lineHeight: 1.7, maxWidth: '320px', margin: '0 auto' }}>
              Leads appear here when visitors enquire about your listings via the contact form or WhatsApp
            </p>
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--linen-md)', background: 'var(--linen)', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)', letterSpacing: '0.08em' }}>
                {leads.length} total lead{leads.length !== 1 ? 's' : ''}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--logo-green)' }}>
                ● {leads.filter((l: LeadWithProperty) => l.source === 'whatsapp').length} via WhatsApp
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                ● {leads.filter((l: LeadWithProperty) => l.source === 'web').length} via web form
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', minWidth: '640px' }}>
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
                  {leads.map((lead: LeadWithProperty, i: number) => (
                    <tr key={lead.id}
                      style={{
                        borderBottom: '1px solid var(--linen-md)',
                        transition: 'background 0.15s ease',
                        animation: `fadeInUp 0.4s cubic-bezier(0.22,1,0.36,1) ${i * 0.04}s both`,
                      }}
                      className="hover:bg-[var(--linen)]">
                      <td style={{ padding: '16px 20px', color: 'var(--ink)', fontWeight: 500 }}>
                        {lead.name ?? '—'}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        {lead.phone ? (
                          <a href={`tel:${lead.phone}`}
                            className="hover-soft"
                            style={{ color: 'var(--ink-soft)', textDecoration: 'none', transition: 'color 0.15s' }}>
                            {lead.phone}
                          </a>
                        ) : '—'}
                      </td>
                      <td style={{ padding: '16px 20px', color: 'var(--ink-soft)', maxWidth: '160px' }} className="truncate">
                        {lead.property.title}
                      </td>
                      <td style={{ padding: '16px 20px', color: 'var(--ink-muted)', maxWidth: '200px' }} className="truncate">
                        {lead.message ?? '—'}
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{
                          fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                          padding: '4px 10px',
                          background: lead.source === 'whatsapp' ? 'rgba(37,211,102,0.1)' : 'var(--linen-md)',
                          color: lead.source === 'whatsapp' ? '#1a8a3a' : 'var(--ink-soft)',
                        }}>
                          {lead.source}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '0.75rem', color: 'var(--ink-muted)', whiteSpace: 'nowrap' }}>
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
