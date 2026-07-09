'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'

const SOLUTIONS = [
  { label: 'Real Estate', href: '/solutions/real-estate', desc: 'AI listings for property brokers' },
  { label: 'Hotels', href: '/solutions/hotels', desc: 'Booking pages and enquiries' },
  { label: 'Restaurants', href: '/solutions/restaurants', desc: 'Mobile-first menu & landing pages' },
  { label: 'Healthcare', href: '/solutions/healthcare', desc: 'Appointment & service pages' },
  { label: 'Education', href: '/solutions/education', desc: 'Course & institution pages' },
  { label: 'Retail', href: '/solutions/retail', desc: 'Product showcases & lead capture' },
  { label: 'Professional Services', href: '/solutions/professional-services', desc: 'Portfolio & consultation pages' },
]

const FEATURES_LIST = [
  { label: 'AI Landing Pages', href: '/features/ai-landing-pages', desc: 'Generate pages from WhatsApp' },
  { label: 'WhatsApp Automation', href: '/features/whatsapp-automation', desc: 'AI bot for listings & leads' },
  { label: 'AI SEO Engine', href: '/features/seo-engine', desc: 'Auto-optimized for Google' },
  { label: 'Lead Management', href: '/features/lead-management', desc: 'Capture, track, organize' },
  { label: 'Analytics', href: '/features/analytics', desc: 'Views, clicks, conversions' },
  { label: 'AI Workflows', href: '/features/ai-workflows', desc: 'Automate repetitive tasks' },
]

const RESOURCES_LIST = [
  { label: 'Blog', href: '/blog' },
  { label: 'Guides', href: '/guides' },
  { label: 'Documentation', href: '/docs' },
  { label: 'API Docs', href: '/api' },
  { label: 'Help Center', href: '/help' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Changelog', href: '/changelog' },
]

type DropdownKey = 'solutions' | 'features' | 'resources' | null

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const navRef = useRef<HTMLElement>(null)
  const closeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? Math.min(y / docH, 1) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isDark = !mounted || theme === 'dark'
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark')

  const closeDropdown = () => setActiveDropdown(null)

  return (
    <>
      <header
        ref={navRef}
        role="banner"
        style={{
          position: 'sticky', top: 0, zIndex: menuOpen ? 98 : 100,
          isolation: 'isolate',
          background: scrolled
            ? (isDark ? 'rgba(15,14,11,0.75)' : 'rgba(250,248,243,0.78)')
            : 'transparent',
          backdropFilter: scrolled ? 'blur(22px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(22px) saturate(180%)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.15)' : 'none',
          transition: 'background 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '1px', width: `${scrollProgress * 100}%`,
          background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
          transition: 'width 0.1s linear',
          pointerEvents: 'none',
          opacity: scrolled ? 1 : 0,
        }} />

        <div style={{
          maxWidth: '1440px', margin: '0 auto',
          padding: '0 clamp(1rem, 4vw, 2.5rem)',
          height: 'clamp(64px, 8vw, 80px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '16px',
        }}>
          <Link href="/" aria-label="Brisvora home" style={{
            textDecoration: 'none', display: 'flex', alignItems: 'center',
            gap: '10px', flexShrink: 0,
          }}>
            <div
              style={{
                width: '40px', height: '40px', borderRadius: '10px',
                background: 'var(--gold-dim)', border: '1px solid var(--gold-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'transform 0.22s ease, box-shadow 0.22s ease', flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.boxShadow = '0 0 0 2px var(--gold-border), 0 4px 20px rgba(201,150,14,0.22)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Image src="/Brisvora.png" alt="Brisvora" width={26} height={26}
                className="logo-img" style={{ objectFit: 'contain' }} priority />
            </div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              color: 'var(--text-primary)',
              letterSpacing: '0.05em', fontWeight: 400, userSelect: 'none',
            }}>
              Brisvora
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="nav-desktop"
            style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <DropdownWrapper
              label="Solutions"
              isOpen={activeDropdown === 'solutions'}
              onOpen={() => setActiveDropdown('solutions')}
              onClose={closeDropdown}
            >
              <div style={{ padding: 'clamp(0.75rem,1.4vw,1rem)' }}>
                <p style={{
                  fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.18em', color: 'var(--text-muted)',
                  marginBottom: 'clamp(0.5rem,0.9vw,0.65rem)',
                  padding: '0 clamp(0.5rem,0.9vw,0.65rem)',
                }}>Industries</p>
                {SOLUTIONS.map(s => (
                  <Link key={s.href} href={s.href}
                    style={{
                      display: 'block',
                      padding: 'clamp(0.5rem,0.9vw,0.65rem) clamp(0.5rem,0.9vw,0.65rem)',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'background 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-dim)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <p style={{ fontSize: 'clamp(0.65rem,1vw,0.75rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '2px' }}>{s.label}</p>
                    <p style={{ fontSize: 'clamp(0.5rem,0.78vw,0.58rem)', color: 'var(--text-muted)' }}>{s.desc}</p>
                  </Link>
                ))}
                <div style={{ marginTop: 'clamp(0.4rem,0.7vw,0.55rem)', paddingTop: 'clamp(0.4rem,0.7vw,0.55rem)', borderTop: '1px solid var(--border)' }}>
                  <Link href="/solutions" style={{
                    display: 'block',
                    padding: 'clamp(0.4rem,0.7vw,0.55rem) clamp(0.5rem,0.9vw,0.65rem)',
                    fontSize: 'clamp(0.58rem,0.9vw,0.68rem)',
                    color: 'var(--gold)', textDecoration: 'none',
                    borderRadius: 'var(--radius-sm)', transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-dim)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    View All Industries →
                  </Link>
                </div>
              </div>
            </DropdownWrapper>

            <DropdownWrapper
              label="Features"
              isOpen={activeDropdown === 'features'}
              onOpen={() => setActiveDropdown('features')}
              onClose={closeDropdown}
            >
              <div style={{ padding: 'clamp(0.75rem,1.4vw,1rem)' }}>
                <p style={{
                  fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.18em', color: 'var(--text-muted)',
                  marginBottom: 'clamp(0.5rem,0.9vw,0.65rem)',
                  padding: '0 clamp(0.5rem,0.9vw,0.65rem)',
                }}>Capabilities</p>
                {FEATURES_LIST.map(f => (
                  <Link key={f.href} href={f.href}
                    style={{
                      display: 'block',
                      padding: 'clamp(0.5rem,0.9vw,0.65rem) clamp(0.5rem,0.9vw,0.65rem)',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'background 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-dim)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <p style={{ fontSize: 'clamp(0.65rem,1vw,0.75rem)', color: 'var(--text-primary)', fontWeight: 400, marginBottom: '2px' }}>{f.label}</p>
                    <p style={{ fontSize: 'clamp(0.5rem,0.78vw,0.58rem)', color: 'var(--text-muted)' }}>{f.desc}</p>
                  </Link>
                ))}
                <div style={{ marginTop: 'clamp(0.4rem,0.7vw,0.55rem)', paddingTop: 'clamp(0.4rem,0.7vw,0.55rem)', borderTop: '1px solid var(--border)' }}>
                  <Link href="/features" style={{
                    display: 'block',
                    padding: 'clamp(0.4rem,0.7vw,0.55rem) clamp(0.5rem,0.9vw,0.65rem)',
                    fontSize: 'clamp(0.58rem,0.9vw,0.68rem)',
                    color: 'var(--gold)', textDecoration: 'none',
                    borderRadius: 'var(--radius-sm)', transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-dim)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    Explore All Features →
                  </Link>
                </div>
              </div>
            </DropdownWrapper>

            <DropdownWrapper
              label="Resources"
              isOpen={activeDropdown === 'resources'}
              onOpen={() => setActiveDropdown('resources')}
              onClose={closeDropdown}
            >
              <div style={{ padding: 'clamp(0.75rem,1.4vw,1rem)' }}>
                <p style={{
                  fontSize: 'clamp(0.42rem,0.65vw,0.5rem)',
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.18em', color: 'var(--text-muted)',
                  marginBottom: 'clamp(0.5rem,0.9vw,0.65rem)',
                  padding: '0 clamp(0.5rem,0.9vw,0.65rem)',
                }}>Learn & Connect</p>
                {RESOURCES_LIST.map(r => (
                  <Link key={r.href} href={r.href}
                    style={{
                      display: 'block',
                      padding: 'clamp(0.5rem,0.9vw,0.65rem) clamp(0.5rem,0.9vw,0.65rem)',
                      borderRadius: 'var(--radius-sm)',
                      transition: 'background 0.2s',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-dim)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <p style={{ fontSize: 'clamp(0.65rem,1vw,0.75rem)', color: 'var(--text-primary)', fontWeight: 400 }}>{r.label}</p>
                  </Link>
                ))}
              </div>
            </DropdownWrapper>

            <DesktopNavLink href="/#pricing" active={false}>
              Pricing
            </DesktopNavLink>
            <DesktopNavLink href="/docs" active={pathname.startsWith('/docs')}>
              Documentation
            </DesktopNavLink>
          </nav>

          {/* Desktop actions */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            {session?.user ? (
              <Link href="/dashboard" className="btn-primary"
                style={{ padding: '9px 20px', fontSize: '0.78rem' }}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '9px 16px', fontSize: '0.78rem', letterSpacing: '0.03em',
                  color: 'var(--text-secondary)', textDecoration: 'none',
                  borderRadius: 'var(--radius-md)', border: '1px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'transparent' }}
                >
                  Sign In
                </Link>
                <Link href="/register" className="btn-primary"
                  style={{ padding: '9px 20px', fontSize: '0.78rem' }}>
                  Start Free →
                </Link>
              </>
            )}
          </div>

          {/* Mobile controls */}
          <div className="nav-mobile" style={{ display: 'none', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '40px', height: '40px',
                background: 'transparent', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
                transition: 'background 0.2s, border-color 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.borderColor = 'var(--border-md)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen drawer */}
      <div
        className="nav-mobile"
        role="dialog" aria-modal="true" aria-label="Navigation menu"
        style={{
          display: 'none', position: 'fixed', inset: 0, zIndex: 99,
          pointerEvents: menuOpen ? 'all' : 'none',
        }}
      >
        <div onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
            opacity: menuOpen ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
          }}
        />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0,
          width: 'min(340px, 88vw)',
          background: isDark ? 'rgba(15,14,11,0.97)' : 'rgba(250,248,243,0.98)',
          backdropFilter: 'blur(32px) saturate(200%)',
          WebkitBackdropFilter: 'blur(32px) saturate(200%)',
          borderLeft: '1px solid var(--border)',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1)',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            padding: '20px 24px', borderBottom: '1px solid var(--border)',
          }}>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px',
                background: 'none', border: 'none',
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile navigation" style={{ padding: '16px 24px 0', flex: 1 }}>
            <MobileSection title="Platform">
              <MobileLink href="/#pricing" onClose={() => setMenuOpen(false)}>Pricing</MobileLink>
              <MobileLink href="/docs" onClose={() => setMenuOpen(false)}>Documentation</MobileLink>
            </MobileSection>
            <MobileSection title="Solutions">
              {SOLUTIONS.map(s => (
                <MobileLink key={s.href} href={s.href} onClose={() => setMenuOpen(false)} desc={s.desc}>
                  {s.label}
                </MobileLink>
              ))}
              <MobileLink href="/solutions" onClose={() => setMenuOpen(false)} gold>View All Industries →</MobileLink>
            </MobileSection>
            <MobileSection title="Features">
              {FEATURES_LIST.map(f => (
                <MobileLink key={f.href} href={f.href} onClose={() => setMenuOpen(false)} desc={f.desc}>
                  {f.label}
                </MobileLink>
              ))}
              <MobileLink href="/features" onClose={() => setMenuOpen(false)} gold>Explore All Features →</MobileLink>
            </MobileSection>
            <MobileSection title="Resources">
              {RESOURCES_LIST.map(r => (
                <MobileLink key={r.href} href={r.href} onClose={() => setMenuOpen(false)}>
                  {r.label}
                </MobileLink>
              ))}
            </MobileSection>
          </nav>

          <div style={{
            padding: '24px', borderTop: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: '10px',
          }}>
            {session?.user ? (
              <Link href="/dashboard" className="btn-primary"
                style={{ justifyContent: 'center', padding: '13px', fontSize: '0.85rem' }}>
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/register" className="btn-primary"
                  style={{ justifyContent: 'center', padding: '13px', fontSize: '0.85rem' }}>
                  Start Free →
                </Link>
                <Link href="/login" className="btn-secondary"
                  style={{ justifyContent: 'center', padding: '13px', fontSize: '0.85rem' }}>
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

/* ── DropdownWrapper: groups button + panel in relative container ── */
function DropdownWrapper({ label, isOpen, onOpen, onClose, children }: {
  label: string
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  children: React.ReactNode
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={wrapperRef}
      style={{ position: 'relative' }}
      onMouseEnter={onOpen}
      onMouseLeave={(e) => {
        // Only close if mouse left wrapper entirely
        const rect = wrapperRef.current?.getBoundingClientRect()
        if (rect && (
          e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top || e.clientY > rect.bottom
        )) {
          onClose()
        }
      }}
    >
      <button
        aria-expanded={isOpen}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '4px',
          padding: '8px 14px', fontSize: '0.8rem', letterSpacing: '0.025em',
          color: isOpen ? 'var(--gold)' : 'var(--text-secondary)',
          background: 'none', border: 'none', cursor: 'pointer',
          borderRadius: 'var(--radius-md)',
          transition: 'color 0.2s ease',
          fontFamily: 'inherit',
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.color = 'var(--text-primary)' }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.color = 'var(--text-secondary)' }}
      >
        {label}
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          style={{
            transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          aria-hidden="true"
        >
          <path d="M1 1.5L4 4.5L7 1.5" />
        </svg>
      </button>

      {/* Panel */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: '0',
          width: 'clamp(200px, 18vw, 260px)',
          background: 'var(--surface-2)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transform: isOpen ? 'translateY(4px)' : 'translateY(-2px)',
          transition: 'opacity 0.25s cubic-bezier(0.16,1,0.3,1), transform 0.25s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 110,
        }}
        onMouseEnter={onOpen}
      >
        {children}
      </div>
    </div>
  )
}

/* ── Simple desktop link ── */
function DesktopNavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      position: 'relative', display: 'inline-flex', alignItems: 'center',
      padding: '8px 14px', fontSize: '0.8rem', letterSpacing: '0.025em',
      color: active ? 'var(--gold)' : 'var(--text-secondary)',
      textDecoration: 'none', borderRadius: 'var(--radius-md)',
      transition: 'color 0.2s ease',
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-secondary)' }}
    >
      {children}
      <span style={{
        position: 'absolute', bottom: '4px', left: '50%',
        transform: 'translateX(-50%)',
        height: '1px', width: active ? '20px' : '0',
        background: 'var(--gold)', borderRadius: '2px',
        boxShadow: active ? '0 0 6px var(--gold)' : 'none',
        transition: 'width 0.22s cubic-bezier(0.16,1,0.3,1)',
        pointerEvents: 'none',
      }} />
    </Link>
  )
}

/* ── Theme toggle ── */
function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '36px', height: '36px',
        background: 'var(--surface-2)', border: '1px solid var(--border)',
        borderRadius: '50%', cursor: 'pointer',
        color: 'var(--text-secondary)',
        transition: 'background 0.2s, border-color 0.2s, color 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-3)'; e.currentTarget.style.borderColor = 'var(--gold-border)'; e.currentTarget.style.color = 'var(--gold)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

/* ── Hamburger icon ── */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <line x1="2" y1="5" x2="16" y2="5" style={{
        transformOrigin: '9px 5px',
        transform: open ? 'rotate(45deg) translate(0, 4px)' : 'none',
        transition: 'transform 0.28s cubic-bezier(0.16,1,0.3,1)',
      }} />
      <line x1="2" y1="9" x2="16" y2="9" style={{
        opacity: open ? 0 : 1,
        transition: 'opacity 0.18s ease',
      }} />
      <line x1="2" y1="13" x2="16" y2="13" style={{
        transformOrigin: '9px 13px',
        transform: open ? 'rotate(-45deg) translate(0, -4px)' : 'none',
        transition: 'transform 0.28s cubic-bezier(0.16,1,0.3,1)',
      }} />
    </svg>
  )
}

/* ── Mobile section ── */
function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 'clamp(0.75rem,1.4vw,1rem)' }}>
      <p style={{
        fontSize: 'clamp(0.5rem,0.78vw,0.58rem)',
        fontFamily: "'Cinzel', serif",
        letterSpacing: '0.18em',
        color: 'var(--gold)',
        marginBottom: 'clamp(0.4rem,0.7vw,0.55rem)',
        paddingTop: 'clamp(0.4rem,0.7vw,0.55rem)',
      }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {children}
      </div>
    </div>
  )
}

/* ── Mobile link ── */
function MobileLink({ href, children, onClose, desc, gold }: {
  href: string; children: React.ReactNode; onClose: () => void; desc?: string; gold?: boolean
}) {
  return (
    <Link href={href} onClick={onClose} style={{
      display: 'flex', flexDirection: desc ? 'column' : 'row',
      alignItems: desc ? 'flex-start' : 'center',
      padding: desc ? 'clamp(0.5rem,0.9vw,0.65rem) 0' : 'clamp(0.5rem,0.9vw,0.65rem) 0',
      fontSize: desc ? 'clamp(0.65rem,1vw,0.75rem)' : 'clamp(0.72rem,1.1vw,0.82rem)',
      color: gold ? 'var(--gold)' : 'var(--text-secondary)',
      textDecoration: 'none',
      borderBottom: '1px solid var(--border)',
      transition: 'color 0.2s, padding-left 0.2s',
      gap: '2px',
    }}>
      <span style={{
        color: gold ? 'var(--gold)' : 'var(--text-primary)',
        fontWeight: gold ? 500 : 400,
      }}>
        {children}
      </span>
      {desc && (
        <span style={{
          fontSize: 'clamp(0.55rem,0.85vw,0.62rem)',
          color: 'var(--text-muted)',
          lineHeight: 1.3,
        }}>
          {desc}
        </span>
      )}
    </Link>
  )
}