import { auth } from '@/auth'
import { getBrokerLeads } from '@brisvora/api'
import LeadsClient from './LeadsClient'

export default async function LeadsPage() {
  const session = await auth()
  if (!session?.user?.id) return <div>Access denied</div>

  const leads = await getBrokerLeads(session.user.id)

  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thisWeek = leads.filter((l: any) => new Date(l.createdAt) >= weekAgo).length
  const whatsappCount = leads.filter((l: any) => l.source === 'whatsapp').length
  const webCount = leads.filter((l: any) => l.source === 'web').length

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: '32px' }}>
        <span className="section-label" style={{ marginBottom: '6px' }}>CRM</span>
        <div className="gold-divider" style={{ marginBottom: '12px' }} />
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
          color: 'var(--text-primary)', fontWeight: 400,
        }}>
          Leads
        </h1>
      </div>

      {/* Stat row */}
      {leads.length > 0 && (
        <div className="animate-fade-up delay-100 leads-pipeline-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px', marginBottom: '28px',
        }}>
          {[
            { label: 'Total Leads',    value: leads.length,   color: 'var(--text-primary)' },
            { label: 'This Week',      value: thisWeek,        color: 'var(--gold)' },
            { label: 'Via WhatsApp',   value: whatsappCount,   color: '#4ade80' },
            { label: 'Via Web',        value: webCount,        color: 'var(--text-secondary)' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '16px 20px',
            }}>
              <p style={{
                fontFamily: 'var(--font-serif)', fontSize: '1.8rem',
                color: stat.color, fontWeight: 400, lineHeight: 1, marginBottom: '4px',
              }}>{stat.value}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}

      <LeadsClient leads={leads as any} />
    </div>
  )
}
