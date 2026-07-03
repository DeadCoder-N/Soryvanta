'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header style={{
      background: 'var(--warm-white)',
      borderBottom: '2px solid var(--logo-gold)',
      position: 'sticky', top: 0, zIndex: 50,
      transition: 'box-shadow 0.2s ease',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
          className="btn-press">
          <Image src="/Brisvora.png" alt="Brisvora" width={68} height={68} style={{ objectFit: 'contain', display: 'block' }} />
        </Link>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/"
            className="nav-link"
            style={{
              fontSize: '0.75rem',
              color: pathname === '/' ? 'var(--ink)' : 'var(--ink-soft)',
              letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
              fontWeight: pathname === '/' ? 500 : 400,
              transition: 'color 0.2s',
            }}>
            Properties
          </Link>
          {session?.user ? (
            <Link href="/dashboard"
              className="btn-press"
              style={{
                background: 'var(--logo-gold)', color: 'var(--warm-white)',
                fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '10px 22px', textDecoration: 'none',
              }}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login"
                className="nav-link"
                style={{
                  fontSize: '0.75rem',
                  color: pathname === '/login' ? 'var(--ink)' : 'var(--ink-soft)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
                  transition: 'color 0.2s',
                }}>
                Sign In
              </Link>
              <Link href="/register"
                className="btn-press"
                style={{
                  background: 'var(--logo-gold)', color: 'var(--warm-white)',
                  fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '10px 22px', textDecoration: 'none',
                }}>
                List Property
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none' }}
          aria-label="Toggle menu"
        >
          <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{
              display: 'block', height: '2px', background: 'var(--ink)',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display: 'block', height: '2px', background: 'var(--ink)',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              transform: menuOpen ? 'rotate(-45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', height: '2px', background: 'var(--ink)',
              transition: 'opacity 0.25s ease',
              opacity: menuOpen ? 0 : 1,
            }} />
          </div>
        </button>
      </div>

      {/* Mobile dropdown — animated */}
      <div
        className="nav-mobile"
        style={{
          background: 'var(--warm-white)',
          borderTop: '1px solid var(--linen-dk)',
          overflow: 'hidden',
          maxHeight: menuOpen ? '320px' : '0',
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.32s cubic-bezier(0.22,1,0.36,1), opacity 0.25s ease',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ padding: '20px 1.5rem', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/" onClick={() => setMenuOpen(false)}
            style={{ fontSize: '0.8rem', color: pathname === '/' ? 'var(--ink)' : 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: pathname === '/' ? 500 : 400 }}>
            Properties
          </Link>
          {session?.user ? (
            <Link href="/dashboard" onClick={() => setMenuOpen(false)}
              style={{ fontSize: '0.8rem', color: 'var(--logo-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}
                style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}
                style={{ fontSize: '0.8rem', color: 'var(--logo-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
                List Property
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
