import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@brisvora/shared'
import AdminSidebar from './AdminSidebar'

export const metadata = { title: 'Admin Panel | Brisvora' }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  // Always re-fetch role from DB — never trust stale JWT role
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, email: true },
  })

  const role = user?.role
  if (!role || (role !== 'ADMIN' && role !== 'SUPER_ADMIN')) redirect('/dashboard')

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }}>
      <AdminSidebar role={role} email={user?.email} />
      <main style={{ flex: 1, padding: '40px 48px', overflowX: 'auto' }} className="dashboard-main">
        {children}
      </main>
    </div>
  )
}
