import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@brisvora/shared'
import SignOutButton from './SignOutButton'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { phone: true, email: true },
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--linen)' }}>

      {/* Sidebar */}
      <aside style={{
        width: '220px', flexShrink: 0,
        background: 'var(--warm-white)',
        borderRight: '1px solid var(--linen-dk)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Logo */}
        <div style={{ padding: '16px 20px', borderBottom: '3px solid var(--logo-gold)' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'block' }}>
            <Image src="/Brisvora.png" alt="Brisvora" width={80} height={80} style={{ objectFit: 'contain', display: 'block' }} />
          </Link>
          <p style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', marginTop: '4px' }} className="truncate">
            {session.user.email}
          </p>
          {user?.phone ? (
            <p style={{ fontSize: '0.65rem', color: 'var(--logo-green)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>✓</span> WhatsApp linked
            </p>
          ) : (
            <Link href="/dashboard/profile" style={{ textDecoration: 'none' }}>
              <p style={{ fontSize: '0.65rem', color: 'var(--gold)', marginTop: '2px' }}>
                ⚠ No WhatsApp number — click to add
              </p>
            </Link>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { href: '/dashboard', label: 'Overview', icon: '▦' },
            { href: '/dashboard/listings/new', label: 'New Listing', icon: '+' },
            { href: '/dashboard/leads', label: 'Leads', icon: '◎' },
            { href: '/dashboard/profile', label: 'Profile', icon: '⚙' },
          ].map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', textDecoration: 'none',
              fontSize: '0.8rem', color: 'var(--ink-soft)',
              letterSpacing: '0.04em',
              transition: 'background 0.15s, color 0.15s',
            }}
              className="hover:bg-[var(--linen)] hover:text-[var(--ink)] rounded-none">
              <span style={{ fontSize: '0.75rem', color: 'var(--logo-green)' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Sign out */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--linen-dk)' }}>
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '48px', overflowAuto: 'auto' } as React.CSSProperties}>
        {children}
      </main>
    </div>
  )
}
