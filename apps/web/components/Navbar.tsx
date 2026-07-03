'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isDark = !mounted || theme === 'dark'

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? (isDark ? 'rgba(15,14,11,0.92)' : 'rgba(255,255,255,0.92)') : 'var(--surface-1)',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'var(--border-md)' : 'var(--border)'}`,
      transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/Brisvora.png" alt="Brisvora" width={40} height={40} style={{ objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            Brisvora
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/" className="btn-ghost nav-link"
            style={{ color: pathname === '/' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            Properties
          </Link>

          {session?.user ? (
            <Link href="/dashboard" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.78rem' }}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn-ghost"
                style={{ color: pathname === '/login' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                Sign In
              </Link>
              <Link href="/register" className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.78rem' }}>
                Get Started
              </Link>
            </>
          )}

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? '☀' : '☾'}
          </button>
        </nav>

        {/* Mobile hamburger + theme toggle */}
        <div className="nav-mobile" style={{ display: 'none', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDark ? '☀' : '☾'}
          </button>
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--text-primary)' }}
            aria-label="Toggle menu"
          >
            <div style={{ width: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', height: '2px',
                  background: 'var(--text-primary)',
                  borderRadius: '2px',
                  transition: 'transform 0.25s ease, opacity 0.25s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                    : i === 2 ? 'rotate(-45deg) translate(4px, -4px)'
                    : 'none'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="nav-mobile" style={{
        overflow: 'hidden',
        maxHeight: menuOpen ? '280px' : '0',
        opacity: menuOpen ? 1 : 0,
        transition: 'max-height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease',
        display: 'flex', flexDirection: 'column',
        borderTop: menuOpen ? '1px solid var(--border)' : 'none',
        background: 'var(--surface-1)',
      }}>
        <div style={{ padding: '16px 1.5rem 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link href="/" onClick={() => setMenuOpen(false)} className="btn-ghost"
            style={{ justifyContent: 'flex-start', color: pathname === '/' ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
            Properties
          </Link>
          {session?.user ? (
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="btn-ghost"
              style={{ justifyContent: 'flex-start', color: 'var(--gold)' }}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="btn-ghost"
                style={{ justifyContent: 'flex-start' }}>
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}
                className="btn-primary"
                style={{ marginTop: '8px', justifyContent: 'center' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
