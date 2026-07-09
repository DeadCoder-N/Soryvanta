import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getListingBySlug, incrementViewCount } from '@brisvora/api'
import { formatPrice } from '@brisvora/shared'
import PropertyClient from './PropertyClient'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const property = await getListingBySlug(slug)
  if (!property) return {}

  const propertyType = property.type.charAt(0) + property.type.slice(1).toLowerCase()
  const bhkInfo = property.bedrooms ? ` ${property.bedrooms} BHK` : ''
  const location = property.city
  const priceLabel = property.priceLabel ?? formatPrice(property.price)

  return {
    title: `${property.title} — Brisvora`,
    description: `${property.description.slice(0, 120)}... View ${propertyType}${bhkInfo} for ${priceLabel} in ${location}. Contact broker now.`,
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

  await incrementViewCount(property.id).catch(err => console.error('Failed to increment view count', err))

  const ownerPhone = property.owner?.phone ?? property.ownerPhone ?? null
  const waLink = ownerPhone
    ? `https://wa.me/${ownerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I'm interested in: ${property.title}`)}`
    : null

  const priceLabel = property.priceLabel ?? formatPrice(property.price)

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

  const mappedProperty = {
    id: property.id,
    slug: property.slug,
    title: property.title,
    description: property.description,
    address: property.address,
    city: property.city,
    price: property.price,
    priceLabel,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    areaSqft: property.areaSqft,
    type: property.type,
    features: property.features,
    amenities: property.amenities,
    images: property.images.map(img => ({ id: img.id, url: img.url, caption: img.caption })),
    ownerName: property.owner?.name ?? null,
    ownerEmail: property.owner?.email ?? null,
    ownerPhone,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(propertySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PropertyClient property={mappedProperty} waLink={waLink} />
    </>
  )
}
