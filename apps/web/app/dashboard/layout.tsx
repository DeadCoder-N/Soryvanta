import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@brisvora/shared'
import DashboardSidebar from './DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { phone: true, email: true, role: true },
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--linen)' }}>
      <DashboardSidebar email={user?.email} phone={user?.phone} role={user?.role} />

      {/* Main content — padded top on mobile for the fixed bar */}
      <main style={{ flex: 1, padding: '48px', overflowX: 'auto' } as React.CSSProperties}
        className="dashboard-main">
        {children}
      </main>
    </div>
  )
}
