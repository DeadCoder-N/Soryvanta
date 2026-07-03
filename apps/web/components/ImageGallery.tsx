'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'

type PropertyImage = { id: string; url: string; caption: string | null }

export default function ImageGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState(false)

  const goTo = useCallback((idx: number) => {
    setPrev(active)
    setActive(idx)
    // clear prev after transition
    setTimeout(() => setPrev(null), 380)
  }, [active])

  const goPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    goTo((active - 1 + images.length) % images.length)
  }, [active, images.length, goTo])

  const goNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    goTo((active + 1) % images.length)
  }, [active, images.length, goTo])

  if (images.length === 0) return null

  return (
    <>
      {/* Hero image */}
      <div
        style={{ position: 'relative', height: 'clamp(280px, 50vw, 520px)', background: 'var(--linen-md)', cursor: 'zoom-in', overflow: 'hidden' }}
        onClick={() => setLightbox(true)}
      >
        {/* Previous image (fading out) */}
        {prev !== null && (
          <Image
            key={`prev-${prev}`}
            src={images[prev].url}
            alt={title}
            fill
            style={{ objectFit: 'cover', opacity: 0, transition: 'opacity 0.35s ease', zIndex: 1 }}
          />
        )}
        {/* Active image (fading in) */}
        <Image
          key={`active-${active}`}
          src={images[active].url}
          alt={title}
          fill
          style={{ objectFit: 'cover', animation: 'fadeIn 0.35s ease both', zIndex: 2 }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(26,22,20,0.35) 100%)', zIndex: 3 }} />

        {/* Image counter */}
        {images.length > 1 && (
          <div style={{
            position: 'absolute', bottom: '16px', right: '16px', zIndex: 4,
            background: 'rgba(0,0,0,0.5)', color: '#fff',
            fontSize: '0.7rem', padding: '4px 10px', letterSpacing: '0.08em',
          }}>
            {active + 1} / {images.length}
          </div>
        )}

        {/* Prev/Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 4,
                background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
                width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2rem',
                backdropFilter: 'blur(4px)',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.28)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 4,
                background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
                width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2rem',
                backdropFilter: 'blur(4px)',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.28)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="thumbnail-strip" style={{ background: 'var(--ink)', padding: '10px 1.5rem', display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => goTo(i)}
              style={{
                position: 'relative', width: '72px', height: '52px', flexShrink: 0,
                border: i === active ? '2px solid var(--logo-gold)' : '2px solid transparent',
                padding: 0, cursor: 'pointer', background: 'none',
                opacity: i === active ? 1 : 0.5,
                transition: 'opacity 0.2s, border-color 0.2s, transform 0.2s',
                transform: i === active ? 'scale(1.04)' : 'scale(1)',
              }}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img.url} alt={img.caption ?? `Image ${i + 1}`} fill style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'fadeIn 0.2s ease both',
          }}
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'absolute', top: '20px', right: '20px',
              background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
              width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.2rem',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); goPrev() }}
                style={{
                  position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
                  width: '48px', height: '48px', cursor: 'pointer', fontSize: '1.5rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={e => { e.stopPropagation(); goNext() }}
                style={{
                  position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
                  width: '48px', height: '48px', cursor: 'pointer', fontSize: '1.5rem',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}

          <div
            style={{ position: 'relative', width: 'min(90vw, 1000px)', height: 'min(80vh, 700px)', animation: 'scaleIn 0.25s cubic-bezier(0.22,1,0.36,1) both' }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={images[active].url}
              alt={images[active].caption ?? title}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>

          <p style={{ position: 'absolute', bottom: '20px', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
            {active + 1} / {images.length} — click outside to close
          </p>
        </div>
      )}
    </>
  )
}
