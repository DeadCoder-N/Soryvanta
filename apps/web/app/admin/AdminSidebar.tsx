'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SignOutButton from '../dashboard/SignOutButton'

const IconOverview = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)

const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1 13c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M11 7.5c1.5 0 3 .8 3 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="11.5" cy="4.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
)

const IconProperties = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 7L8 2l6 5v7a1 1 0 01-1 1H3a1 1 0 01-1-1V7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M6 14V9h4v5" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
  </svg>
)

const IconLeads = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="8" y1="1.5" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="8" y1="12" x2="8" y2="14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="1.5" y1="8" x2="4" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="12" y1="8" x2="14.5" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const IconWhatsApp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5A6.5 6.5 0 0114.5 8c0 3.59-2.91 6.5-6.5 6.5a6.47 6.47 0 01-3.2-.84L1.5 14.5l.87-2.72A6.47 6.47 0 011.5 8 6.5 6.5 0 018 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M5.5 6.5c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5l.5 1c.1.2.05.44-.12.58l-.38.3c.3.6.8 1.1 1.4 1.4l.3-.38a.5.5 0 01.58-.12l1 .5c.28.14.42.45.32.74l-.2.6A.5.5 0 019.5 11C7.29 11 5 8.71 5 6.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
  </svg>
)

const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 7.5V13h3v-3h2v3h3V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconArrowLeft = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const navItems = [
  { href: '/admin',            label: 'Overview',   Icon: IconOverview,    exact: true },
  { href: '/admin/users',      label: 'Users',      Icon: IconUsers,       exact: false },
  { href: '/admin/properties', label: 'Properties', Icon: IconProperties,  exact: false },
  { href: '/admin/leads',      label: 'Leads',      Icon: IconLeads,       exact: false },
  { href: '/admin/messages',   label: 'WhatsApp',   Icon: IconWhatsApp,    exact: false },
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
      position: 'relative',
    }}>
      {/* Subtle gold glow top */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold-border), transparent)',
      }} />

      {/* Logo + identity */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            Marketing OS
            <span style={{ color: 'var(--gold)', fontSize: '0.5rem', verticalAlign: 'super', marginLeft: '2px' }}>™</span>
          </span>
        </Link>

        {/* Role badge card */}
        <div style={{
          background: 'var(--surface-2)',
          border: `1px solid ${role === 'SUPER_ADMIN' ? 'rgba(239,68,68,0.18)' : 'var(--gold-border)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '10px 12px',
        }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '3px', letterSpacing: '0.04em' }}>Signed in as</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</p>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.08em',
            padding: '3px 10px', borderRadius: '999px',
            background: role === 'SUPER_ADMIN' ? 'rgba(239,68,68,0.1)' : 'var(--gold-dim)',
            color: role === 'SUPER_ADMIN' ? '#f87171' : 'var(--gold-light)',
            border: `1px solid ${role === 'SUPER_ADMIN' ? 'rgba(239,68,68,0.22)' : 'var(--gold-border)'}`,
          }}>
            {/* Pulse dot */}
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%', flexShrink: 0,
              background: role === 'SUPER_ADMIN' ? '#f87171' : 'var(--gold)',
            }} />
            {role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={{
          fontSize: '0.58rem', color: 'var(--text-muted)',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          fontFamily: "'Cinzel', serif",
          padding: '8px 10px 6px',
        }}>
          Control Panel
        </p>

        {navItems.map(({ href, label, Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link key={href} href={href} onClick={() => setOpen(false)}
              className={`sidebar-item${isActive ? ' active' : ''}`}>
              <Icon />
              {label}
            </Link>
          )
        })}

        <div style={{ borderTop: '1px solid var(--border)', marginTop: '10px', paddingTop: '10px' }}>
          <p style={{
            fontSize: '0.58rem', color: 'var(--text-muted)',
            letterSpacing: '0.14em', textTransform: 'uppercase',
            fontFamily: "'Cinzel', serif",
            padding: '4px 10px 6px',
          }}>
            Navigation
          </p>
          <Link href="/dashboard" className="sidebar-item">
            <IconArrowLeft />
            Broker Dashboard
          </Link>
        </div>
      </nav>

      {/* Sign out */}
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
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '0.04em', fontWeight: 400 }}>
            Marketing OS
          </span>
        </Link>
        <button onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--text-primary)' }}
          aria-label="Toggle menu">
          <div style={{ width: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
