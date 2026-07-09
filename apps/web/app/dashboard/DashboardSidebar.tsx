'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SignOutButton from './SignOutButton'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '⊞', exact: true },
  { href: '/dashboard/listings/new', label: 'New Listing', icon: '+', exact: false },
  { href: '/dashboard/leads', label: 'Leads', icon: '◎', exact: false },
  { href: '/dashboard/profile', label: 'Profile', icon: '⚙', exact: false },
]

export default function DashboardSidebar({ email, phone, role }: { email?: string | null; phone?: string | null; role?: string | null }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const sidebar = (isDrawer = false) => (
    <aside style={{
      width: '250px', flexShrink: 0,
      background: 'var(--surface-1)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      height: '100vh', overflowY: 'auto',
    }}>
      {/* Logo + user */}
      <div style={{ padding: isDrawer ? '16px 18px 18px' : '24px 18px 18px', borderBottom: '1px solid var(--border)' }}>
        {!isDrawer && (
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--gold-dim), rgba(201,168,76,0.05))',
              border: '1px solid var(--gold-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Image src="/Brisvora.png" alt="Brisvora" width={26} height={26} className="logo-img" style={{ objectFit: 'contain' }} />
            </div>
            <span style={{
              fontFamily: 'var(--font-serif)', fontSize: '1rem',
              color: 'var(--text-primary)', letterSpacing: '0.04em',
            }}>
              Brisvora
              <span style={{ color: 'var(--gold)', fontSize: '0.5rem', verticalAlign: 'super', marginLeft: '1px' }}>™</span>
            </span>
          </Link>
        )}

        {/* User info */}
        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '12px',
        }}>
          <p style={{
            fontSize: '0.75rem', color: 'var(--text-secondary)',
            marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 1,
            overflow: 'hidden',
          }}>{email}</p>
          {phone ? (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontSize: '0.6rem', color: '#4ade80',
              background: 'var(--green-dim)', border: '1px solid rgba(74,222,128,0.2)',
              padding: '3px 10px', borderRadius: '30px',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80' }} />
              WhatsApp linked
            </div>
          ) : (
            <Link href="/dashboard/profile" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                fontSize: '0.6rem', color: 'var(--gold)',
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                padding: '3px 10px', borderRadius: '30px', cursor: 'pointer',
              }}>
                ⚠ Link WhatsApp
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={{
          fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--text-muted)', fontFamily: "'Cinzel', serif",
          padding: '8px 12px 6px',
        }}>
          Menu
        </p>
        {navItems.map(item => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="sidebar-item"
              style={{
                background: isActive ? 'var(--gold-dim)' : 'transparent',
                color: isActive ? 'var(--gold-light)' : 'var(--text-secondary)',
                borderColor: isActive ? 'var(--gold-border)' : 'transparent',
                fontWeight: isActive ? 500 : 400,
              }}>
              <span style={{ fontSize: '0.85rem', width: '18px', textAlign: 'center', opacity: isActive ? 1 : 0.5 }}>{item.icon}</span>
              {item.label}
              {isActive && (
                <span style={{
                  marginLeft: 'auto',
                  width: '4px', height: '4px', borderRadius: '50%',
                  background: 'var(--gold)',
                  boxShadow: '0 0 6px var(--gold)',
                }} />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Admin panel link */}
      {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
        <div style={{ padding: '8px 12px', borderTop: '1px solid var(--border)' }}>
          <Link href="/admin"
            className="sidebar-item"
            style={{
              color: role === 'SUPER_ADMIN' ? '#f87171' : 'var(--gold)',
              fontSize: '0.78rem',
            }}>
            <span style={{ fontSize: '0.85rem', width: '18px', textAlign: 'center' }}>⚡</span>
            Admin Panel
          </Link>
        </div>
      )}

      {/* Sign out */}
      <div style={{ padding: '12px 12px 20px', borderTop: '1px solid var(--border)' }}>
        <SignOutButton />
      </div>
    </aside>
  )

  return (
    <>
      <div className="dashboard-sidebar" style={{ display: 'flex' }}>{sidebar()}</div>

      {/* Mobile top bar */}
      <div className="dashboard-mobile-bar" style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '0 1rem', height: '56px',
        alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image src="/Brisvora.png" alt="Brisvora" width={28} height={28} className="logo-img" style={{ objectFit: 'contain' }} />
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
        width: '270px', zIndex: 100,
        transform: open ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.28s cubic-bezier(0.16,1,0.3,1)',
      }}>
        {sidebar(true)}
      </div>
    </>
  )
}