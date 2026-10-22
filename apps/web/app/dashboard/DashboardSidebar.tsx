'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SignOutButton from './SignOutButton'

const workspaceNav = [
  {
    href: '/dashboard/growth',
    label: 'Overview',
    exact: true,
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/listings',
    label: 'Listings',
    exact: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M2 3.5C2 2.67 2.67 2 3.5 2h8C12.33 2 13 2.67 13 3.5v8c0 .83-.67 1.5-1.5 1.5h-8A1.5 1.5 0 0 1 2 11.5v-8Z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M5 5.5h5M5 7.5h5M5 9.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/listings/new',
    label: 'New Listing',
    exact: true,
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7.5 5v5M5 7.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/leads',
    label: 'Leads',
    exact: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 1.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2 13c0-2.76 2.46-5 5.5-5s5.5 2.24 5.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    exact: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M2 11.5L5.5 7.5L8.5 9.5L13 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 13.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const accountNav = [
  {
    href: '/dashboard/profile',
    label: 'Profile',
    exact: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2.5 13.5c0-2.49 2.24-4.5 5-4.5s5 2.01 5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function NavItem({ item, onClick }: { item: typeof workspaceNav[0]; onClick?: () => void }) {
  const pathname = usePathname()
  const isActive = item.exact
    ? pathname === item.href
    : pathname.startsWith(item.href) && !(item.href === '/dashboard/listings' && pathname === '/dashboard/listings/new')

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="sidebar-item"
      style={{
        background: isActive ? 'var(--gold-dim)' : 'transparent',
        color: isActive ? 'var(--gold-light)' : 'var(--text-secondary)',
        borderColor: isActive ? 'var(--gold-border)' : 'transparent',
        fontWeight: isActive ? 500 : 400,
        borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
        paddingLeft: '12px',
        position: 'relative',
      }}
    >
      <span style={{ opacity: isActive ? 1 : 0.55, flexShrink: 0 }}>{item.icon}</span>
      <span style={{ flex: 1 }}>{item.label}</span>
      {isActive && (
        <span style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: 'var(--gold)',
          boxShadow: '0 0 8px var(--gold)',
          flexShrink: 0,
        }} />
      )}
    </Link>
  )
}

function SidebarContent({ email, phone, role, isDrawer, onClose }: {
  email?: string | null; phone?: string | null; role?: string | null
  isDrawer?: boolean; onClose?: () => void
}) {
  return (
    <aside style={{
      width: '240px', flexShrink: 0,
      background: 'var(--surface-1)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      height: '100vh', overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{ padding: isDrawer ? '16px 16px 14px' : '22px 16px 14px', borderBottom: '1px solid var(--border)' }}>
        {!isDrawer && (
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '18px' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
              Marketing OS
              <span style={{ color: 'var(--gold)', fontSize: '0.45rem', verticalAlign: 'super', marginLeft: '1px' }}>™</span>
            </span>
          </Link>
        )}

        {/* User card */}
        <div style={{
          background: 'var(--surface-2)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', padding: '10px 12px',
        }}>
          {/* Avatar + email row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--gold-dim), var(--surface-3))',
              border: '1px solid var(--gold-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', color: 'var(--gold)', fontWeight: 600,
            }}>
              {email?.[0]?.toUpperCase() ?? 'B'}
            </div>
            <p style={{
              fontSize: '0.72rem', color: 'var(--text-secondary)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
            }}>{email}</p>
          </div>

          {phone ? (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              fontSize: '0.58rem', color: '#4ade80',
              background: 'var(--green-dim)', border: '1px solid rgba(74,222,128,0.2)',
              padding: '3px 9px', borderRadius: '30px',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', animation: 'pulse-dot 2s infinite' }} />
              WhatsApp linked
            </div>
          ) : (
            <Link href="/dashboard/profile" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.58rem', color: 'var(--gold)',
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                padding: '3px 9px', borderRadius: '30px', cursor: 'pointer',
              }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M4.5 1v7M1 4.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Link WhatsApp
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {/* Workspace section */}
        <p style={{
          fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--text-muted)', fontFamily: "'Cinzel', serif",
          padding: '6px 12px 5px',
        }}>Workspace</p>

        {workspaceNav.map(item => (
          <NavItem key={item.href} item={item} onClick={onClose} />
        ))}

        {/* Account section */}
        <p style={{
          fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--text-muted)', fontFamily: "'Cinzel', serif",
          padding: '14px 12px 5px',
        }}>Account</p>

        {accountNav.map(item => (
          <NavItem key={item.href} item={item} onClick={onClose} />
        ))}
      </nav>

      {/* Admin */}
      {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
        <div style={{ padding: '6px 10px', borderTop: '1px solid var(--border)' }}>
          <Link href="/admin" className="sidebar-item" style={{
            color: role === 'SUPER_ADMIN' ? '#f87171' : 'var(--gold)',
            fontSize: '0.78rem',
            borderLeft: '2px solid transparent',
            paddingLeft: '12px',
          }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1L9.18 5.26L13.5 5.64L10.5 8.24L11.41 12.5L7.5 10.27L3.59 12.5L4.5 8.24L1.5 5.64L5.82 5.26L7.5 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            Admin Panel
          </Link>
        </div>
      )}

      {/* Sign out */}
      <div style={{ padding: '8px 10px 16px', borderTop: '1px solid var(--border)' }}>
        <SignOutButton />
      </div>
    </aside>
  )
}

export default function DashboardSidebar({ email, phone, role }: {
  email?: string | null; phone?: string | null; role?: string | null
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <div className="dashboard-sidebar" style={{ display: 'flex' }}>
        <SidebarContent email={email} phone={phone} role={role} />
      </div>

      {/* Mobile top bar */}
      <div className="dashboard-mobile-bar" style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '0 1rem', height: '56px',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>Marketing OS</span>
        </Link>
        <button
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--text-primary)' }}
          aria-label="Toggle menu"
        >
          <div style={{ width: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', height: '1.5px', background: 'var(--text-primary)', borderRadius: '2px',
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
        background: 'rgba(0,0,0,0.65)',
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
        <SidebarContent email={email} phone={phone} role={role} isDrawer onClose={() => setOpen(false)} />
      </div>
    </>
  )
}
