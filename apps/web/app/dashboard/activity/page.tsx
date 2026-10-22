import { auth } from '@/auth'
import { prisma } from '@marketing-os/shared'
import Link from 'next/link'
import { IcoBell, IcoMessage, IcoStar, IcoEye, IcoRefresh, IcoCalendar } from '@/components/Icons'

type Notification = {
  id: string
  type: string
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: Date
}

/* ── Notification Icon ── */
function NotifIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    lead:       <IcoMessage size={14} />,
    view:       <IcoEye size={14} />,
    insight:    <IcoStar size={14} />,
    update:     <IcoRefresh size={14} />,
    reminder:   <IcoCalendar size={14} />,
  }
  const bg: Record<string, string> = {
    lead:     'var(--green-dim)',
    view:     'var(--gold-dim)',
    insight:  'rgba(99,102,241,0.1)',
    update:   'var(--surface-3)',
    reminder: 'rgba(239,68,68,0.08)',
  }
  return (
    <div style={{
      width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
      background: bg[type] ?? 'var(--surface-3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: type === 'lead' ? '#4ade80' : type === 'view' ? 'var(--gold)' : 'var(--text-secondary)',
    }}>
      {icons[type] ?? <IcoBell size={14} />}
    </div>
  )
}

/* ── Empty State ── */
function EmptyNotifications() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 24px', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{
        width: '72px', height: '72px', margin: '0 auto 20px',
        background: 'var(--gold-dim)', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <IcoBell size={28} style={{ color: 'var(--gold)' }} />
      </div>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '8px' }}>
        No notifications yet
      </h2>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
        You'll see updates here when leads come in, listings get views, or the AI generates insights.
      </p>
      <Link href="/dashboard/listings/new" className="btn-primary">
        Create a Listing
      </Link>
    </div>
  )
}

export default async function ActivityPage() {
  const session = await auth()
  if (!session?.user?.id) return <div>Access denied</div>

  /* Fetch recent notifications from WhatsApp messages and leads */
  const [messages, leads] = await Promise.all([
    prisma.whatsappMessage.findMany({
      where: { userId: session.user.id },
      orderBy: { timestamp: 'desc' },
      take: 20,
    }),
    prisma.lead.findMany({
      where: { property: { ownerId: session.user.id } },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { property: { select: { title: true, slug: true } } },
    }),
  ])

  const notifications: Notification[] = []

  // Lead notifications
  leads.forEach(lead => {
    notifications.push({
      id: `lead_${lead.id}`,
      type: 'lead',
      title: 'New Lead',
      message: `${lead.name ?? 'Someone'} enquired about ${lead.property.title} via ${lead.source}.`,
      link: `/dashboard/leads`,
      read: false,
      createdAt: lead.createdAt,
    })
  })

  // Message notifications
  messages.slice(0, 5).forEach(msg => {
    notifications.push({
      id: `msg_${msg.id}`,
      type: msg.direction === 'INBOUND' ? 'lead' : 'update',
      title: msg.direction === 'INBOUND' ? 'Message Received' : 'Message Sent',
      message: msg.content ? (msg.content.length > 80 ? msg.content.slice(0, 78) + '...' : msg.content) : 'No content',
      read: msg.status === 'read',
      createdAt: msg.timestamp,
    })
  })

  notifications.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div>
      {/* Header */}
      <div className="animate-fade-up" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="section-label" style={{ marginBottom: '4px' }}>Activity</span>
            <div className="gold-divider" style={{ marginBottom: '12px' }} />
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-primary)', fontWeight: 400 }}>
              Notifications
            </h1>
          </div>
          {unreadCount > 0 && (
            <div style={{
              fontSize: '0.65rem', padding: '4px 12px', borderRadius: '999px',
              background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid var(--gold-border)',
            }}>
              {unreadCount} unread
            </div>
          )}
        </div>
      </div>

      {/* List */}
      {notifications.length === 0 ? <EmptyNotifications /> : (
        <div className="animate-fade-up delay-100" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {notifications.map((notif, i) => (
            <div key={notif.id} className="animate-fade-up" style={{
              animationDelay: `${150 + i * 30}ms`,
              display: 'flex', gap: '14px', alignItems: 'flex-start',
              padding: '16px 18px',
              background: notif.read ? 'var(--surface-2)' : 'var(--surface-3)',
              border: `1px solid ${notif.read ? 'var(--border)' : 'var(--border-gold)'}`,
              borderRadius: 'var(--radius-md)',
              transition: 'all 0.2s',
            }}>
              <NotifIcon type={notif.type} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', gap: '8px' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: notif.read ? 400 : 500 }}>
                    {notif.title}
                  </p>
                  <span style={{
                    fontSize: '0.6rem', color: 'var(--text-muted)', whiteSpace: 'nowrap',
                  }}>
                    {new Date(notif.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}