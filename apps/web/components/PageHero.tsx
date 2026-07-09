'use client'

import Link from 'next/link'

interface PageHeroProps {
  label: string
  title: string
  titleGold?: string
  description: string
  cta?: { label: string; href: string }
  ctaSecondary?: { label: string; href: string }
  badge?: string
}

export default function PageHero({ label, title, titleGold, description, cta, ctaSecondary, badge }: PageHeroProps) {
  return (
    <section
      aria-label={title}
      style={{
        position: 'relative',
        padding: 'clamp(6rem,12vw,9rem) 0 clamp(4rem,8vw,6rem)',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Background */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: 'clamp(30rem,60vw,70rem)', height: 'clamp(20rem,40vw,50rem)',
          background: 'radial-gradient(ellipse, rgba(201,150,14,0.06) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)`,
          backgroundSize: '5rem 5rem',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
        }} />
      </div>

      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: '0 clamp(1.25rem,4vw,2.5rem)',
        position: 'relative', zIndex: 1,
        textAlign: 'center',
      }}>
        {badge && (
          <div className="animate-fade-up" style={{ marginBottom: 'clamp(0.75rem,1.5vw,1rem)' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(0.5rem,0.85vw,0.58rem)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold)', border: '1px solid var(--gold-border)',
              padding: '0.4em 1.1em', borderRadius: '2em',
              background: 'var(--gold-dim)',
            }}>
              {badge}
            </span>
          </div>
        )}

        <div className="animate-fade-up" style={{ marginBottom: 'clamp(0.5rem,1vw,0.75rem)' }}>
          <span style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(0.5rem,0.85vw,0.58rem)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--gold)',
          }}>{label}</span>
        </div>

        <div className="gold-divider animate-fade-up" style={{ margin: '0 auto clamp(1rem,2vw,1.5rem)' }} />

        <h1 className="animate-fade-up delay-100" style={{
          fontFamily: "'Playfair Display', var(--font-serif), serif",
          fontSize: 'clamp(2rem,4.5vw,3.5rem)',
          fontWeight: 400, lineHeight: 1.08,
          letterSpacing: '-0.015em',
          color: 'var(--text-primary)',
          marginBottom: titleGold ? '0' : 'clamp(1rem,2vw,1.5rem)',
        }}>
          {title}
          {titleGold && (
            <>
              <br />
              <span style={{
                background: 'linear-gradient(120deg, #C9960E 0%, #D4A837 50%, #F5D080 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                {titleGold}
              </span>
            </>
          )}
        </h1>

        {titleGold && <div style={{ marginBottom: 'clamp(1rem,2vw,1.5rem)' }} />}

        <p className="animate-fade-up delay-200" style={{
          fontFamily: "'DM Sans', var(--font-sans), sans-serif",
          fontSize: 'clamp(0.88rem,1.4vw,1.05rem)',
          color: 'var(--text-secondary)', lineHeight: 1.8,
          maxWidth: '60ch', margin: '0 auto',
          marginBottom: (cta || ctaSecondary) ? 'clamp(2rem,4vw,3rem)' : '0',
        }}>
          {description}
        </p>

        {(cta || ctaSecondary) && (
          <div className="animate-fade-up delay-300" style={{
            display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {cta && (
              <Link href={cta.href} className="btn-primary" style={{
                padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
                fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
              }}>
                {cta.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link href={ctaSecondary.href} className="btn-secondary" style={{
                padding: 'clamp(0.75rem,1.4vw,0.95rem) clamp(1.5rem,3vw,2rem)',
                fontSize: 'clamp(0.72rem,1.05vw,0.82rem)',
              }}>
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
