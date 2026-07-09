'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LeadForm from './LeadForm'

type PropertyImage = { id: string; url: string; caption: string | null }

type Property = {
  id: string
  slug: string
  title: string
  description: string
  address: string
  city: string
  price: number
  priceLabel: string
  bedrooms: number | null
  bathrooms: number | null
  areaSqft: number | null
  type: string
  features: string[]
  amenities: string[]
  images: PropertyImage[]
  ownerName: string | null
  ownerEmail: string | null
  ownerPhone: string | null
}

const GOLD = '#c9a84c'
const GOLD_LIGHT = '#f0d080'

export default function PropertyClient({ property, waLink }: { property: Property; waLink: string | null }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [heroGone, setHeroGone] = useState(false)
  const [enquireOpen, setEnquireOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const sliderTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const images = property.images
  const hasImages = images.length > 0
  const hasMultiple = images.length > 1
  const SLIDE_DURATION = 5000

  // scroll detection
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      if (heroRef.current) {
        const bottom = heroRef.current.getBoundingClientRect().bottom
        setHeroGone(bottom < window.innerHeight * 0.5)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // auto slide
  const goTo = useCallback((idx: number) => {
    setActiveSlide((idx + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!hasMultiple) return
    sliderTimer.current = setInterval(() => goTo(activeSlide + 1), SLIDE_DURATION)
    return () => { if (sliderTimer.current) clearInterval(sliderTimer.current) }
  }, [activeSlide, hasMultiple, goTo])

  const handlePrev = () => {
    goTo(activeSlide - 1)
  }
  const handleNext = () => {
    goTo(activeSlide + 1)
  }

  // horizontal carousel auto-scroll + drag
  useEffect(() => {
    if (!hasMultiple) return
    const el = carouselRef.current
    if (!el) return
    let paused = false
    let raf = 0
    let dragging = false
    let startX = 0
    let scrollStart = 0

    const tick = () => {
      if (!paused && !dragging) {
        el.scrollLeft += 0.6
        if (el.scrollLeft >= el.scrollWidth - el.offsetWidth - 1) el.scrollLeft = 0
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onEnter = () => { paused = true }
    const onLeave = () => { paused = false }
    const onDown = (e: MouseEvent) => { dragging = true; paused = true; startX = e.pageX - el.offsetLeft; scrollStart = el.scrollLeft; el.style.cursor = 'grabbing' }
    const onMove = (e: MouseEvent) => { if (!dragging) return; el.scrollLeft = scrollStart - (e.pageX - el.offsetLeft - startX) }
    const onUp = () => { dragging = false; paused = false; el.style.cursor = 'grab' }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('mousedown', onDown)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [hasMultiple])

  const typeLabel = property.type.charAt(0) + property.type.slice(1).toLowerCase()
  const bhkLabel = property.bedrooms ? `${property.bedrooms} BHK ` : ''
  const hasSpecs = property.bedrooms || property.bathrooms || property.areaSqft

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', fontFamily: "'DM Sans', system-ui, sans-serif", color: '#fff' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 5%',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/Brisvora.png" alt="Brisvora" width={36} height={36} style={{ objectFit: 'contain' }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#fff', letterSpacing: '0.02em' }}>
            Brisvora
          </span>
        </Link>

        {/* desktop nav */}
        <div className="prop-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <Link href="/" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', letterSpacing: '0.04em', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}>
            ← All Properties
          </Link>
          {waLink && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
              padding: '9px 20px', borderRadius: '30px',
              background: '#25D366', color: '#fff',
              fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em',
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 2px 12px rgba(37,211,102,0.35)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(37,211,102,0.35)' }}>
              <WhatsAppIcon size={14} /> WhatsApp
            </a>
          )}
          <button onClick={() => setEnquireOpen(true)} style={{
            padding: '9px 20px', borderRadius: '30px',
            border: '1px solid rgba(255,255,255,0.35)', background: 'transparent',
            color: '#fff', fontSize: '0.78rem', letterSpacing: '0.08em',
            cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}>
            ENQUIRE
          </button>
        </div>

        {/* mobile hamburger */}
        <button className="prop-nav-mobile" onClick={() => setMenuOpen(o => !o)} style={{
          background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: '8px',
        }}>
          <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', height: '2px', background: '#fff', borderRadius: '2px',
                transition: 'transform 0.25s, opacity 0.25s',
                transform: menuOpen ? (i === 0 ? 'rotate(45deg) translate(5px,5px)' : i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none') : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </div>
        </button>
      </nav>

      {/* mobile menu dropdown */}
      {menuOpen && (
        <div className="prop-mobile-menu" style={{
          position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99,
          background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 5%', display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          <Link href="/" onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← All Properties
          </Link>
          {waLink && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
              style={{ color: '#25D366', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <WhatsAppIcon size={16} /> Chat on WhatsApp
            </a>
          )}
          <button onClick={() => { setEnquireOpen(true); setMenuOpen(false) }} style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
            padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontSize: '0.85rem', textAlign: 'left',
          }}>
            Enquire Now
          </button>
        </div>
      )}

      {/* ── HERO SLIDER ── */}
      <div ref={heroRef} style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>

        {hasImages ? (
          images.map((img, i) => (
            <div key={img.id} style={{
              position: 'absolute', inset: 0,
              opacity: i === activeSlide ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
              zIndex: i === activeSlide ? 2 : 1,
            }}>
              <Image src={img.url} alt={property.title} fill style={{ objectFit: 'cover' }} priority={i === 0} />
            </div>
          ))
        ) : (
          // no image fallback — dark gradient
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1510 50%, #0a0a0a 100%)',
          }} />
        )}

        {/* cinematic overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)',
        }} />

        {/* title + price bottom left */}
        <div style={{ position: 'absolute', bottom: hasMultiple ? '110px' : '80px', left: '5%', zIndex: 10 }}>
          <p style={{
            fontSize: '0.65rem', color: GOLD, letterSpacing: '0.25em',
            textTransform: 'uppercase', fontFamily: "'Cinzel', serif", marginBottom: '10px',
          }}>
            {property.city} · {typeLabel}
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            color: '#fff', fontWeight: 400, lineHeight: 1.15,
            marginBottom: '12px', maxWidth: '700px',
          }}>
            {property.title}
          </h1>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            color: GOLD, fontWeight: 400,
          }}>
            {property.priceLabel}
          </p>
        </div>

        {/* type badge top left */}
        <div style={{
          position: 'absolute', top: '80px', left: '5%', zIndex: 10,
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: '5px 16px',
          fontSize: '0.62rem', color: '#fff', letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>
          {bhkLabel}{typeLabel}
        </div>

        {/* HUD — progress bars + arrows */}
        {hasMultiple && (
          <div style={{
            position: 'absolute', bottom: '30px', left: '5%', right: '5%', zIndex: 10,
            display: 'flex', alignItems: 'center', gap: '24px',
          }}>
            {/* counter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '1.6rem', color: GOLD, fontWeight: 600, lineHeight: 1 }}>
                {String(activeSlide + 1).padStart(2, '0')}
              </span>
              <span style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.3)', display: 'block' }} />
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
                {String(images.length).padStart(2, '0')}
              </span>
            </div>

            {/* progress bars */}
            <div style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'center' }}>
              {images.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{
                  flex: 1, height: '2px', background: 'rgba(255,255,255,0.2)',
                  border: 'none', padding: 0, cursor: 'pointer', position: 'relative', overflow: 'hidden',
                  borderRadius: '2px',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: i < activeSlide ? 'rgba(255,255,255,0.5)' : 'transparent',
                  }} />
                  {i === activeSlide && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, height: '100%',
                      background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
                      animation: `hsProgress ${SLIDE_DURATION}ms linear forwards`,
                    }} />
                  )}
                </button>
              ))}
            </div>

            {/* arrows */}
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
              {[{ fn: handlePrev, icon: '←' }, { fn: handleNext, icon: '→' }].map(({ fn, icon }) => (
                <button key={icon} onClick={fn} style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: '14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(8px)', transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.borderColor = GOLD }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}>
                  {icon}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* scroll hint */}
        <div style={{
          position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
          zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }} className="prop-scroll-hint">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            {'SCROLL'.split('').map((l, i) => (
              <span key={i} style={{
                display: 'block', color: 'rgba(255,255,255,0.5)',
                fontSize: '9px', fontFamily: "'Cinzel', serif", letterSpacing: '1px', lineHeight: 1,
                animation: `propLetterFade 2.4s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}>{l}</span>
            ))}
          </div>
          <div style={{
            width: '1px', height: '50px', marginTop: '4px',
            background: `linear-gradient(to bottom, ${GOLD}, transparent)`,
            animation: 'propLinePulse 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* ── DETAIL SECTION ── */}
      <section style={{
        background: '#0a0a0a', color: '#fff',
        padding: '100px 5%', position: 'relative', overflow: 'hidden',
      }}>
        {/* gold top accent */}
        <div style={{
          position: 'absolute', top: 0, left: '5%',
          width: '80px', height: '2px',
          background: `linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT})`,
        }} />

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px',
          maxWidth: '1200px', margin: '0 auto',
        }} className="prop-detail-grid">

          {/* left */}
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.07)', paddingRight: '80px' }} className="prop-detail-left">
            <p style={{
              fontSize: '11px', letterSpacing: '4px', color: GOLD,
              fontFamily: "'Cinzel', serif", textTransform: 'uppercase', marginBottom: '20px',
            }}>
              INTRODUCING
            </p>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 400, color: '#fff', lineHeight: 1.4, marginBottom: '24px',
            }}>
              {bhkLabel}{typeLabel}<br />in {property.city}
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 2, marginBottom: '12px' }}>
              {property.address}
            </p>
            {hasSpecs && (
              <div style={{ display: 'flex', gap: '24px', marginTop: '32px', flexWrap: 'wrap' }}>
                {property.bedrooms && (
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: GOLD, fontWeight: 400, lineHeight: 1 }}>{property.bedrooms}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>Bedrooms</p>
                  </div>
                )}
                {property.bathrooms && (
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: GOLD, fontWeight: 400, lineHeight: 1 }}>{property.bathrooms}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>Bathrooms</p>
                  </div>
                )}
                {property.areaSqft && (
                  <div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: GOLD, fontWeight: 400, lineHeight: 1 }}>{property.areaSqft.toLocaleString()}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>Sq. Ft.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* right */}
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 400, color: '#fff', lineHeight: 1.2, marginBottom: '24px',
            }}>
              {property.title}
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 2, marginBottom: '16px' }}>
              {property.description}
            </p>
            <div style={{ marginTop: '40px', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setEnquireOpen(true)} style={{
                padding: '13px 32px', borderRadius: '30px',
                border: '1px solid rgba(255,255,255,0.4)', background: 'transparent',
                color: '#fff', cursor: 'pointer', fontSize: '13px',
                letterSpacing: '2px', textTransform: 'uppercase', transition: 'all 0.35s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}>
                GET IN TOUCH
              </button>
              {property.ownerPhone && (
                <a href={`tel:+${property.ownerPhone}`} style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.4)', background: 'transparent',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', fontSize: '16px', transition: 'all 0.35s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff' }}>
                  📞
                </a>
              )}
              {waLink && (
                <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.4)', background: 'transparent',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', transition: 'all 0.35s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.borderColor = '#25D366' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}>
                  <WhatsAppIcon size={18} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPECS BAR ── */}
      {hasSpecs && (
        <div style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap' }}>
            {([
              property.bedrooms && { label: 'Bedrooms', value: property.bedrooms },
              property.bathrooms && { label: 'Bathrooms', value: property.bathrooms },
              property.areaSqft && { label: 'Area', value: `${property.areaSqft.toLocaleString()} sq.ft` },
            ].filter(Boolean) as { label: string; value: string | number }[]).map((spec, i, arr) => (
              <div key={spec.label} style={{
                flex: '1 1 0', minWidth: '160px', padding: '28px 24px',
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.9rem', color: GOLD, fontWeight: 400, lineHeight: 1 }}>{spec.value}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '8px' }}>{spec.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── HORIZONTAL IMAGE CAROUSEL ── */}
      {hasMultiple && (
        <section className="prop-carousel" style={{ background: '#0a0a0a', padding: '90px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto 36px', padding: '0 5%' }}>
            <p style={{ fontSize: '11px', letterSpacing: '4px', color: GOLD, fontFamily: "'Cinzel', serif", textTransform: 'uppercase', marginBottom: '10px' }}>GALLERY</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, color: '#fff' }}>A Closer Look</h2>
          </div>
          <div ref={carouselRef} style={{
            display: 'flex', gap: '16px', overflowX: 'auto', scrollBehavior: 'smooth',
            padding: '0 5%', cursor: 'grab', scrollbarWidth: 'none',
          }}>
            {images.map((img) => (
              <div key={img.id} style={{
                flex: '0 0 auto', width: 'min(60%, 520px)', aspectRatio: '4 / 3',
                position: 'relative', borderRadius: '4px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <Image src={img.url} alt={img.caption || property.title} fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FEATURES (light) ── */}
      {property.features.length > 0 && (
        <section style={{ background: '#f8f8f8', color: '#1a1a1a', padding: '100px 5%' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', letterSpacing: '4px', color: '#b88a2f', fontFamily: "'Cinzel', serif", textTransform: 'uppercase', marginBottom: '10px' }}>HIGHLIGHTS</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, color: '#b88a2f', marginBottom: '40px' }}>Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 48px' }}>
              {property.features.map((f) => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#c9a84c', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#333' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AMENITIES (light) ── */}
      {property.amenities.length > 0 && (
        <section style={{ background: '#f8f8f8', color: '#1a1a1a', padding: '0 5% 100px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '60px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '4px', color: '#b88a2f', fontFamily: "'Cinzel', serif", textTransform: 'uppercase', marginBottom: '10px' }}>NEARBY</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, color: '#b88a2f', marginBottom: '36px' }}>Amenities</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {property.amenities.map((a) => (
                <span key={a} style={{
                  fontSize: '0.82rem', color: '#1a1a1a',
                  border: '1px solid rgba(201,168,76,0.5)', padding: '9px 18px',
                  borderRadius: '30px', background: 'rgba(201,168,76,0.06)', letterSpacing: '0.02em',
                }}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BROKER CARD ── */}
      <section style={{ background: '#0a0a0a', padding: '100px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="prop-broker-grid">
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '4px', color: GOLD, fontFamily: "'Cinzel', serif", textTransform: 'uppercase', marginBottom: '16px' }}>LISTED BY</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, color: '#fff', marginBottom: '18px' }}>
              Connect with the broker
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 2, maxWidth: '440px' }}>
              Interested in this property? Reach out directly and get all your questions answered — availability, site visits, and the best deal.
            </p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px', padding: '28px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                👤
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: '#fff' }}>
                  {property.ownerName ?? 'Listed via WhatsApp'}
                </p>
                {property.ownerEmail && (
                  <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)' }}>{property.ownerEmail}</p>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {waLink && (
                <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
                  flex: 1, minWidth: '140px', padding: '12px', borderRadius: '30px',
                  background: '#25D366', color: '#fff', fontSize: '0.82rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  textDecoration: 'none', boxShadow: '0 2px 12px rgba(37,211,102,0.3)',
                }}>
                  <WhatsAppIcon size={16} /> WhatsApp
                </a>
              )}
              {property.ownerPhone && (
                <a href={`tel:+${property.ownerPhone}`} style={{
                  flex: 1, minWidth: '140px', padding: '12px', borderRadius: '30px',
                  border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                  fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  textDecoration: 'none',
                }}>
                  📞 Call
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING ENQUIRE BUTTON ── */}
      <button
        className="prop-floating-enquire"
        onClick={() => setEnquireOpen(true)}
        style={{
          position: 'fixed', right: 0, top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'right center',
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
          color: '#0a0a0a', fontWeight: 700, letterSpacing: '0.15em', fontSize: '0.72rem',
          padding: '12px 26px', border: 'none', borderRadius: '4px 4px 0 0',
          cursor: 'pointer', zIndex: 70, boxShadow: '0 8px 24px rgba(201,168,76,0.35)',
        }}
      >
        ENQUIRE
      </button>

      {/* ── ENQUIRY POPUP ── */}
      {enquireOpen && (
        <div onClick={() => setEnquireOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          animation: 'fadeIn 0.2s ease both',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxWidth: '420px', background: '#111',
            border: '1px solid rgba(201,168,76,0.25)', borderRadius: '12px', padding: '32px',
            position: 'relative', animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
          }}>
            <button onClick={() => setEnquireOpen(false)} style={{
              position: 'absolute', top: '14px', right: '16px', background: 'none', border: 'none',
              color: 'rgba(255,255,255,0.6)', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1,
            }}>×</button>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#fff', marginBottom: '6px' }}>Enquire Now</h3>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '22px' }}>{property.title}</p>
            <LeadForm propertyId={property.id} onSent={() => setEnquireOpen(false)} />
          </div>
        </div>
      )}

      {/* ── STICKY BOTTOM BAR ── */}
      <div className="prop-sticky-bar" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 60,
        background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        transform: heroGone ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
        padding: '12px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
            {typeLabel}{property.bedrooms ? ` · ${property.bedrooms} BHK` : ''}
          </p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', color: GOLD, lineHeight: 1.1 }}>{property.priceLabel}</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button onClick={() => setEnquireOpen(true)} style={{
            padding: '11px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.35)',
            background: 'transparent', color: '#fff', fontSize: '0.78rem', letterSpacing: '0.06em', cursor: 'pointer',
          }}>ENQUIRE NOW</button>
          {waLink && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
              padding: '11px 20px', borderRadius: '30px', background: '#25D366', color: '#fff',
              fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <WhatsAppIcon size={15} /> WhatsApp
            </a>
          )}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '64px 5% 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/Brisvora.png" alt="Brisvora" width={34} height={34} style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#fff' }}>Brisvora</span>
          </div>
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>Properties</Link>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>About</Link>
            <a href="https://wa.me/919766637979" target="_blank" rel="noopener noreferrer" style={{ color: GOLD, textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <WhatsAppIcon size={15} /> WhatsApp
            </a>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '32px auto 0', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center' }}>
            © {new Date().getFullYear()} Brisvora. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ── STYLES (keyframes + responsive) ── */}
      <style>{`
        @keyframes hsProgress { from { width: 0%; } to { width: 100%; } }
        @keyframes propLetterFade { 0%,100% { opacity:0.3; transform:translateY(0); } 50% { opacity:1; transform:translateY(-2px); } }
        @keyframes propLinePulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

        .prop-nav-desktop { display: flex; }
        .prop-nav-mobile { display: none; }
        .prop-mobile-menu { display: flex; }
        .prop-scroll-hint { display: flex; }
        .prop-carousel { display: block; }
        .prop-floating-enquire { display: block; }

        @media (max-width: 768px) {
          .prop-nav-desktop { display: none !important; }
          .prop-nav-mobile { display: block !important; }
          .prop-scroll-hint { display: none !important; }
          .prop-carousel { display: none !important; }
          .prop-floating-enquire { display: none !important; }
          .prop-detail-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .prop-detail-left { border-right: none !important; padding-right: 0 !important; }
          .prop-broker-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </div>
  )
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
