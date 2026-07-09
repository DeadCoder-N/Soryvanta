import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getListingBySlug, incrementViewCount } from '@brisvora/api'
import VillaClient from './VillaClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getListingBySlug(slug)

  if (!property) {
    return { title: 'Villa Not Found | Brisvora' }
  }

  const title = `${property.title} | Brisvora`
  const description = property.description.slice(0, 160)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: property.images?.[0]?.url ? [{ url: property.images[0].url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: property.images?.[0]?.url ? [property.images[0].url] : [],
    },
    alternates: {
      canonical: `/villa/${slug}`,
    },
  }
}

export default async function VillaPage({ params }: Props) {
  const { slug } = await params

  let property = await getListingBySlug(slug)

  if (!property) {
    const flaskApiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://localhost:5000'
    try {
      const res = await fetch(`${flaskApiUrl}/api/mock/villa`)
      if (res.ok) {
        const mockData = await res.json()
        property = {
          id: 'mock',
          slug,
          ownerId: null,
          ownerPhone: mockData.broker?.phone || null,
          title: mockData.title,
          description: mockData.description,
          address: mockData.address,
          city: mockData.city,
          price: mockData.price,
          priceLabel: mockData.priceLabel,
          bedrooms: mockData.bedrooms,
          bathrooms: mockData.bathrooms,
          areaSqft: mockData.areaSqft,
          type: 'VILLA',
          status: 'ACTIVE',
          features: mockData.features,
          amenities: mockData.amenities,
          rawInput: null,
          mockDataUrl: null,
          mediaJson: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          images: mockData.images?.map((img: any, i: number) => ({
            id: `mock-${i}`,
            propertyId: 'mock',
            url: img.url,
            thumbnailUrl: img.url,
            caption: img.caption,
            order: img.order,
            mediaType: 'image',
            createdAt: new Date(),
          })) || [],
          owner: null,
          analytics: null,
        }
      }
    } catch {}
  }

  if (!property) notFound()

  if (property.id !== 'mock') {
    await incrementViewCount(property.id)
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `https://brisvora.vercel.app/villa/${slug}`,
    image: property.images?.[0]?.url,
    offers: { '@type': 'Offer', price: property.price, priceCurrency: 'INR' },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://brisvora.vercel.app' },
      { '@type': 'ListItem', position: 2, name: 'Villas', item: 'https://brisvora.vercel.app/villa' },
      { '@type': 'ListItem', position: 3, name: property.title },
    ],
  }

  const waMessage = encodeURIComponent(
    `🏡 *${property.title}*\n₹${(property.price / 100000).toFixed(1)} L · ${property.bedrooms || '?'} BHK · ${property.areaSqft || '?'} sqft\n\nhttps://brisvora.vercel.app/villa/${slug}`
  )
  const waLink = `https://wa.me/?text=${waMessage}`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <VillaClient property={{ ...property, waLink }} />
    </>
  )
}