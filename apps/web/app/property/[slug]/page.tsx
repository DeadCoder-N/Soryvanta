import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getListingBySlug, incrementViewCount } from '@brisvora/api'
import { formatPrice } from '@brisvora/shared'
import { auth } from '@/auth'
import LeadForm from './LeadForm'
import MobileContactBar from './MobileContactBar'
import ImageGallery from '@/components/ImageGallery'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const property = await getListingBySlug(slug)
  if (!property) return {}

  const propertyType = property.type.charAt(0) + property.type.slice(1).toLowerCase()
  const bhkInfo = property.bedrooms ? ` ${property.bedrooms} BHK` : ''
  const location = property.city

  return {
    title: `${property.title} — Brisvora`,
    description: `${property.description.slice(0, 120)}... View ${propertyType}${bhkInfo} for ${formatPrice(property.price)} in ${location}. Contact broker now.`,
    keywords: [
      `property in ${location}`,
      `${propertyType} for sale`,
      `${location} real estate`,
      `${bhkInfo.trim()} in ${location}`,
      'premium property India',
      'luxury real estate',
    ],
    alternates: { canonical: `/property/${property.slug}` },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: `https://brisvora.vercel.app/property/${property.slug}`,
      siteName: 'Brisvora',
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images.length > 0 ? [{ url: property.images[0].url, width: 1200, height: 630, alt: property.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: property.description.slice(0, 160),
      images: property.images.length > 0 ? [property.images[0].url] : [],
    },
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getListingBySlug(slug)
  if (!property) notFound()
  const session = await auth()

  await incrementViewCount(property.id).catch(err => console.error('Failed to increment view count', err))

  const waLink = property.owner?.phone
    ? `https://wa.me/${property.owner.phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in: ${encodeURIComponent(property.title)}`
    : (property as any).ownerPhone
    ? `https://wa.me/${((property as any).ownerPhone as string).replace(/[^0-9]/g, '')}?text=Hi, I'm interested in: ${encodeURIComponent(property.title)}`
    : null

  const propertySchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `https://brisvora.vercel.app/property/${property.slug}`,
    datePosted: property.createdAt.toISOString(),
    dateModified: property.updatedAt.toISOString(),
    image: property.images.map(img => img.url),
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
      url: `https://brisvora.vercel.app/property/${property.slug}`,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Person', name: property.owner?.name ?? 'Broker' },
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city,
      addressCountry: 'IN',
    },
    numberOfRooms: property.bedrooms,
    floorSize: property.areaSqft ? { '@type': 'QuantitativeValue', value: property.areaSqft, unitCode: 'FTSQ' } : undefined,
    propertyType: property.type,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://brisvora.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://brisvora.vercel.app' },
      { '@type': 'ListItem', position: 3, name: property.city, item: `https://brisvora.vercel.app?city=${encodeURIComponent(property.city)}` },
      { '@type': 'ListItem', position: 4, name: property.title, item: `https://brisvora.vercel.app/property/${property.slug}` },
    ],
  }

  return (
    <div style={{ background: 'var(--linen)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navbar />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--warm-white)', borderBottom: '1px solid var(--linen-dk)', padding: '10px 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
          <Link href="/" style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>Properties</Link>
          <span>›</span>
          <Link href={`/?city=${encodeURIComponent(property.city)}`} style={{ color: 'var(--ink-muted)', textDecoration: 'none' }}>{property.city}</Link>
          <span>›</span>
          <span style={{ color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>{property.title}</span>
        </div>
      </div>

      {/* Image gallery with type badge + price overlay */}
      <div style={{ position: 'relative' }}>
        <ImageGallery images={property.images} title={property.title} />
        {/* Type badge */}
        {property.images.length > 0 && (
          <div style={{
            position: 'absolute', top: '20px', left: '1.5rem', zIndex: 10,
            background: 'var(--warm-white)', color: 'var(--ink)',
            fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '5px 14px',
          }}>
            {property.type}
          </div>
        )}
        {/* Price overlay */}
        {property.images.length > 0 && (
          <div style={{ position: 'absolute', bottom: property.images.length > 1 ? '82px' : '28px', left: '1.5rem', zIndex: 10 }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--warm-white)', fontWeight: 400 }}>
              {formatPrice(property.price)}
            </p>
          </div>
        )}
      </div>

      {/* No image fallback header */}
      {property.images.length === 0 && (
        <div style={{ background: 'var(--bark)', padding: '40px 1.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 14px', background: 'rgba(255,255,255,0.1)', color: 'var(--warm-white)' }}>
              {property.type}
            </span>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--warm-white)', fontWeight: 400, marginTop: '16px' }}>
              {formatPrice(property.price)}
            </p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="property-page-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 1.5rem' }}>
        <div className="property-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '56px', alignItems: 'flex-start' }}>

          {/* Left — details */}
          <div>
            <p style={{ fontSize: '0.65rem', color: 'var(--mauve)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
              {property.city} · {property.type}
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.2, marginBottom: '10px' }}>
              {property.title}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '28px' }}>
              {property.address}
            </p>

            {/* Specs row */}
            {[property.bedrooms, property.bathrooms, property.areaSqft].some(Boolean) && (
              <div className="specs-row" style={{ display: 'flex', borderTop: '1px solid var(--linen-dk)', borderBottom: '1px solid var(--linen-dk)', marginBottom: '36px' }}>
                {[
                  property.bedrooms && { label: 'Bedrooms', value: property.bedrooms },
                  property.bathrooms && { label: 'Bathrooms', value: property.bathrooms },
                  property.areaSqft && { label: 'Area', value: `${property.areaSqft} sqft` },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ].filter(Boolean).map((spec: any, i: number, arr: any[]) => (
                  <div key={spec.label} style={{
                    padding: '18px 24px',
                    borderRight: i < arr.length - 1 ? '1px solid var(--linen-dk)' : 'none',
                    paddingLeft: i === 0 ? '0' : '24px',
                  }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--ink)', fontWeight: 400 }}>{spec.value}</p>
                    <p style={{ fontSize: '0.68rem', color: 'var(--ink-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>{spec.label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '14px' }}>
              About this property
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-soft)', lineHeight: 1.85, marginBottom: '36px' }}>
              {property.description}
            </p>

            {/* Features */}
            {property.features.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '18px' }}>
                  Features
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
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
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--ink)', fontWeight: 400, marginBottom: '18px' }}>
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

          {/* Right — contact sidebar (hidden on mobile) */}
          <div className="property-sidebar" style={{ position: 'sticky', top: '80px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <BrokerCard ownerName={property.owner?.name} ownerEmail={property.owner?.email} waLink={waLink} />
            <LeadForm propertyId={property.id} />
          </div>
        </div>
      </div>

      {/* Mobile sticky contact bar */}
      <MobileContactBar waLink={waLink} propertyId={property.id} price={formatPrice(property.price)} />

      <Footer />
    </div>
  )
}

function BrokerCard({ ownerName, ownerEmail, waLink }: { ownerName?: string | null; ownerEmail?: string | null; waLink: string | null }) {
  return (
    <div style={{ background: 'var(--warm-white)', border: '1px solid var(--linen-dk)', padding: '24px' }}>
      <p style={{ fontSize: '0.62rem', color: 'var(--mauve)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '14px' }}>
        Listed By
      </p>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '4px' }}>
        {ownerName ?? 'Listed via WhatsApp'}
      </p>
      {ownerEmail && (
        <p style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>{ownerEmail}</p>
      )}
      {waLink && (
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="btn-press"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            background: '#25D366', color: '#fff',
            padding: '12px', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            textDecoration: 'none', marginTop: '18px',
            transition: 'background 0.2s',
          }}>
          <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>
      )}
    </div>
  )
}
