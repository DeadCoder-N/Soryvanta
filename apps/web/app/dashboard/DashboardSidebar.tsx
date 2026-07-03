'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SignOutButton from './SignOutButton'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '▦' },
  { href: '/dashboard/listings/new', label: 'New Listing', icon: '+' },
  { href: '/dashboard/leads', label: 'Leads', icon: '◎' },
  { href: '/dashboard/profile', label: 'Profile', icon: '⚙' },
]

export default function DashboardSidebar({ email, phone }: { email?: string | null; phone?: string | null }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const sidebarContent = (
    <aside style={{
      width: '220px', flexShrink: 0,
      background: 'var(--warm-white)',
      borderRight: '1px solid var(--linen-dk)',
      display: 'flex', flexDirection: 'column',
      height: '100vh',
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: '16px 20px', borderBottom: '3px solid var(--logo-gold)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'block' }} className="btn-press">
          <Image src="/Brisvora.png" alt="Brisvora" width={72} height={72} style={{ objectFit: 'contain', display: 'block' }} />
        </Link>
        <p style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', marginTop: '4px' }} className="truncate">
          {email}
        </p>
        {phone ? (
          <p style={{ fontSize: '0.65rem', color: 'var(--logo-green)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>✓</span> WhatsApp linked
          </p>
        ) : (
          <Link href="/dashboard/profile" style={{ textDecoration: 'none' }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--gold)', marginTop: '2px', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
              ⚠ No WhatsApp — add now
            </p>
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map(item => {
          const isActive = item.href === '/dashboard'
            ? pathname === '/dashboard'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', textDecoration: 'none',
                fontSize: '0.8rem', letterSpacing: '0.04em',
                transition: 'background 0.18s ease, color 0.18s ease, border-color 0.18s ease',
                background: isActive ? 'var(--linen)' : 'transparent',
                color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                borderLeft: isActive ? '2px solid var(--logo-gold)' : '2px solid transparent',
                borderRadius: '0 4px 4px 0',
              }}
            >
              <span style={{
                fontSize: '0.75rem',
                color: isActive ? 'var(--logo-gold)' : 'var(--logo-green)',
                transition: 'color 0.18s ease',
              }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid var(--linen-dk)' }}>
        <SignOutButton />
      </div>
    </aside>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="dashboard-sidebar" style={{ display: 'flex' }}>
        {sidebarContent}
      </div>

      {/* Mobile top bar */}
      <div className="dashboard-mobile-bar" style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--warm-white)', borderBottom: '2px solid var(--logo-gold)',
        padding: '0 1rem', height: '56px',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Image src="/Brisvora.png" alt="Brisvora" width={44} height={44} style={{ objectFit: 'contain' }} />
        </Link>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '8px', color: 'var(--ink)',
            transition: 'opacity 0.2s',
          }}
          aria-label="Toggle menu"
        >
          <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ display: 'block', height: '2px', background: 'var(--ink)', transition: 'transform 0.25s ease', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', height: '2px', background: 'var(--ink)', transition: 'transform 0.25s ease', transform: open ? 'rotate(-45deg)' : 'none' }} />
            <span style={{ display: 'block', height: '2px', background: 'var(--ink)', transition: 'opacity 0.25s ease', opacity: open ? 0 : 1 }} />
          </div>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: 'rgba(0,0,0,0.4)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
        onClick={() => setOpen(false)}
      />

      {/* Mobile drawer */}
      <div
        className="dashboard-mobile-bar"
        style={{
          display: 'none',
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: '260px', zIndex: 100,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {sidebarContent}
      </div>
    </>
  )
}
