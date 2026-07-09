import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getListingBySlug, incrementViewCount } from '@brisvora/api'
import PlotClient from './PlotClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getListingBySlug(slug)
  if (!property) return { title: 'Plot Not Found | Brisvora' }

  return {
    title: `${property.title} | Brisvora`,
    description: property.description.slice(0, 160),
    alternates: { canonical: `/plot/${slug}` },
  }
}

export default async function PlotPage({ params }: Props) {
  const { slug } = await params
  let property = await getListingBySlug(slug)

  if (!property) {
    const flaskApiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://localhost:5000'
    try {
      const res = await fetch(`${flaskApiUrl}/api/mock/plot`)
      if (res.ok) {
        const m = await res.json()
        property = {
          id: 'mock', slug, ownerId: null, ownerPhone: m.broker?.phone || null,
          title: m.title, description: m.description, address: m.address, city: m.city,
          price: m.price, priceLabel: m.priceLabel, bedrooms: m.bedrooms, bathrooms: m.bathrooms,
          areaSqft: m.areaSqft, type: 'PLOT', status: 'ACTIVE',
          features: m.features, amenities: m.amenities,
          rawInput: null, mockDataUrl: null, mediaJson: null,
          createdAt: new Date(), updatedAt: new Date(),
          images: m.images?.map((img: any, i: number) => ({
            id: `mock-${i}`, propertyId: 'mock', url: img.url, thumbnailUrl: img.url,
            caption: img.caption, order: img.order, mediaType: 'image', createdAt: new Date(),
          })) || [], owner: null, analytics: null,
        }
      }
    } catch {}
  }

  if (!property) notFound()
  if (property.id !== 'mock') await incrementViewCount(property.id)

  const jsonLd = { '@context': 'https://schema.org', '@type': 'RealEstateListing', name: property.title, description: property.description, url: `https://brisvora.vercel.app/plot/${slug}`, image: property.images?.[0]?.url, offers: { '@type': 'Offer', price: property.price, priceCurrency: 'INR' } }
  const waMessage = encodeURIComponent(`📍 *${property.title}*\n₹${(property.price / 100000).toFixed(1)} L · ${property.areaSqft || '?'} sqft\n\nhttps://brisvora.vercel.app/plot/${slug}`)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PlotClient property={{ ...property, waLink: `https://wa.me/?text=${waMessage}` }} />
    </>
  )
}