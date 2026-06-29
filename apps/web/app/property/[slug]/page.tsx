import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getListingBySlug } from '@brisvora/api'
import { formatPrice } from '@brisvora/shared'
import { auth } from '@/auth'
import LeadForm from './LeadForm'

type PropertyImage = { id: string; url: string; caption: string | null }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const property = await getListingBySlug(slug)
  if (!property) return {}
  return {
    title: `${property.title} — Brisvora`,
    description: property.description.slice(0, 160),
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getListingBySlug(slug)
  if (!property) notFound()
  const session = await auth()

  const waLink = property.owner.phone
    ? `https://wa.me/${property.owner.phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in: ${property.title}`
    : null

  return (
    <div style={{ background: 'var(--linen)', minHeight: '100vh' }}>

      {/* Nav */}
      <header style={{ background: 'var(--warm-white)', borderBottom: '2px solid var(--logo-gold)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Image src="/Brisvora.png" alt="Brisvora" width={80} height={80} style={{ objectFit: 'contain', display: 'block' }} />
          </Link>
          <Link href="/" style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid var(--linen-dk)', paddingBottom: '2px' }}>
            ← All Properties
          </Link>
          {session?.user ? (
            <Link href="/dashboard" style={{
              background: 'var(--logo-gold)', color: 'var(--warm-white)',
              fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '8px 18px', textDecoration: 'none',
            }}>
              Dashboard
            </Link>
          ) : (
            <Link href="/login" style={{ fontSize: '0.72rem', color: 'var(--ink-soft)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Sign In
            </Link>
          )}
        </div>
      </header>

      {/* Hero image — full width */}
      {property.images.length > 0 && (
        <div style={{ position: 'relative', height: '520px', background: 'var(--linen-md)' }}>
          <Image
            src={property.images[0].url}
            alt={property.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Subtle overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(26,22,20,0.35) 100%)' }} />

          {/* Type badge */}
          <div style={{
            position: 'absolute', top: '28px', left: '2rem',
            background: 'var(--warm-white)', color: 'var(--ink)',
            fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '6px 16px',
          }}>
            {property.type}
          </div>

          {/* Price overlay on image bottom */}
          <div style={{ position: 'absolute', bottom: '28px', left: '2rem' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--warm-white)', fontWeight: 400 }}>
              {formatPrice(property.price)}
            </p>
          </div>
        </div>
      )}

      {/* Thumbnail strip */}
      {property.images.length > 1 && (
        <div style={{ background: 'var(--ink)', padding: '12px 2rem', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {property.images.slice(1, 5).map((img: PropertyImage) => (
            <div key={img.id} style={{ position: 'relative', width: '80px', height: '56px', flexShrink: 0, opacity: 0.7 }}>
              <Image src={img.url} alt={img.caption ?? ''} fill style={{ objectFit: 'cover' }} />
            </div>
          ))}
          {property.images.length > 5 && (
            <div style={{ width: '80px', height: '56px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>+{property.images.length - 5}</span>
            </div>
          )}
        </div>
      )}

      {/* Main content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '56px 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '64px', alignItems: 'flex-start' }}>

          {/* Left — details */}
          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--mauve)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {property.city} · {property.type}
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.2, marginBottom: '12px' }}>
              {property.title}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '32px' }}>
              {property.address}
            </p>

            {/* Specs row */}
            <div style={{ display: 'flex', gap: '0', borderTop: '1px solid var(--linen-dk)', borderBottom: '1px solid var(--linen-dk)', marginBottom: '40px' }}>
              {[
                property.bedrooms && { label: 'Bedrooms', value: property.bedrooms },
                property.bathrooms && { label: 'Bathrooms', value: property.bathrooms },
                property.areaSqft && { label: 'Area', value: `${property.areaSqft} sqft` },
              ].filter(Boolean).map((spec: any, i: number, arr: any[]) => (
                <div key={spec.label} style={{
                  padding: '20px 28px',
                  borderRight: i < arr.length - 1 ? '1px solid var(--linen-dk)' : 'none',
                  paddingLeft: i === 0 ? '0' : '28px',
                }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 400 }}>{spec.value}</p>
                  <p style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{spec.label}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '16px' }}>
              About this property
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.85, marginBottom: '40px' }}>
              {property.description}
            </p>

            {/* Features */}
            {property.features.length > 0 && (
              <div style={{ marginBottom: '36px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '20px' }}>
                  Features
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {property.features.map((f: string) => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '4px', height: '4px', background: 'var(--logo-green)', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '20px' }}>
                  Nearby Amenities
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {property.amenities.map((a: string) => (
                    <span key={a} style={{
                      fontSize: '0.72rem', color: 'var(--ink-soft)',
                      border: '1px solid var(--linen-dk)', padding: '6px 14px',
                      background: 'var(--warm-white)', letterSpacing: '0.04em',
                    }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — contact sidebar */}
          <div style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Broker card */}
            <div style={{ background: 'var(--warm-white)', border: '1px solid var(--linen-dk)', padding: '28px' }}>
              <p style={{ fontSize: '0.62rem', color: 'var(--mauve)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Listed By
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '4px' }}>
                {property.owner.name ?? 'Broker'}
              </p>
              {property.owner.email && (
                <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{property.owner.email}</p>
              )}

              {waLink && (
                <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  background: '#25D366', color: '#fff',
                  padding: '13px', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  textDecoration: 'none', marginTop: '20px',
                }}>
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              )}
            </div>

            {/* Lead form */}
            <LeadForm propertyId={property.id} />
          </div>

        </div>
      </div>
    </div>
  )
}
