'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SignOutButton from '../dashboard/SignOutButton'

const navItems = [
  { href: '/admin', label: 'Overview', icon: '⊞', exact: true },
  { href: '/admin/users', label: 'Users', icon: '👥', exact: false },
  { href: '/admin/properties', label: 'Properties', icon: '🏠', exact: false },
  { href: '/admin/leads', label: 'Leads', icon: '◎', exact: false },
  { href: '/admin/messages', label: 'WhatsApp', icon: '💬', exact: false },
]

export default function AdminSidebar({ role, email }: { role: string; email?: string | null }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const sidebar = (
    <aside style={{
      width: '240px', flexShrink: 0,
      background: 'var(--surface-1)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      height: '100vh', overflowY: 'auto',
    }}>
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Image src="/Brisvora.png" alt="Brisvora" width={32} height={32} style={{ objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)' }}>Brisvora</span>
        </Link>
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Signed in as</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '6px' }} className="truncate">{email}</p>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.06em',
            padding: '3px 10px', borderRadius: '999px',
            background: role === 'SUPER_ADMIN' ? 'rgba(239,68,68,0.12)' : 'var(--gold-dim)',
            color: role === 'SUPER_ADMIN' ? '#f87171' : 'var(--gold-light)',
            border: `1px solid ${role === 'SUPER_ADMIN' ? 'rgba(239,68,68,0.25)' : 'var(--gold-border)'}`,
          }}>
            {role === 'SUPER_ADMIN' ? '⚡ Super Admin' : '🛡 Admin'}
          </span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 10px 4px' }}>
          Admin Panel
        </p>
        {navItems.map(item => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className={`sidebar-item${isActive ? ' active' : ''}`}>
              <span style={{ fontSize: '0.85rem', width: '18px', textAlign: 'center' }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}

        <div style={{ borderTop: '1px solid var(--border)', marginTop: '8px', paddingTop: '8px' }}>
          <p style={{ fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px 4px' }}>
            Navigation
          </p>
          <Link href="/dashboard" className="sidebar-item">
            <span style={{ fontSize: '0.85rem', width: '18px', textAlign: 'center' }}>←</span>
            Broker Dashboard
          </Link>
        </div>
      </nav>

      <div style={{ padding: '12px 10px 16px', borderTop: '1px solid var(--border)' }}>
        <SignOutButton />
      </div>
    </aside>
  )

  return (
    <>
      <div className="dashboard-sidebar" style={{ display: 'flex' }}>{sidebar}</div>

      {/* Mobile top bar */}
      <div className="dashboard-mobile-bar" style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--surface-1)', borderBottom: '1px solid var(--border)',
        padding: '0 1rem', height: '56px', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image src="/Brisvora.png" alt="Brisvora" width={32} height={32} style={{ objectFit: 'contain' }} />
        </Link>
        <button onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--text-primary)' }}
          aria-label="Toggle menu">
          <div style={{ width: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', height: '2px', background: 'var(--text-primary)', borderRadius: '2px',
                transition: 'transform 0.25s, opacity 0.25s',
                transform: open ? (i === 0 ? 'rotate(45deg) translate(4px,4px)' : i === 2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none') : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </div>
        </button>
      </div>

      {/* Overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(0,0,0,0.6)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.25s',
      }} onClick={() => setOpen(false)} />

      {/* Mobile drawer */}
      <div className="dashboard-mobile-bar" style={{
        display: 'none', position: 'fixed', top: 0, left: 0, bottom: 0,
        width: '260px', zIndex: 100,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.28s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {sidebar}
      </div>
    </>
  )
}
