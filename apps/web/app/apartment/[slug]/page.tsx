import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getListingBySlug, incrementViewCount } from '@marketing-os/api'
import { getCanonicalUrl } from '@/lib/site'
import ApartmentClient from './ApartmentClient'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getListingBySlug(slug)

  if (!property) {
    return { title: 'Property Not Found | Marketing OS' }
  }

  const title = `${property.title} | Marketing OS`
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
      canonical: `/apartment/${slug}`,
    },
  }
}

export default async function ApartmentPage({ params }: Props) {
  const { slug } = await params

  // Attempt Level 1: Real DB data
  let property = await getListingBySlug(slug)

  // If no DB data, try Level 2: Flask mock data via mockDataUrl fallback
  if (!property) {
    const flaskApiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://localhost:5000'
    const bhkMatch = slug.match(/(\d)-bhk/)
    const bhk = bhkMatch ? `${bhkMatch[1]}bhk` : '2bhk'

    try {
      const res = await fetch(`${flaskApiUrl}/api/mock/apartment/${bhk}`)
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
          type: 'APARTMENT',
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
    } catch {
      // Level 3: render with inline fallback in ApartmentClient
    }
  }

  if (!property) {
    notFound()
  }

  // Increment view count (only for real DB entries)
  if (property.id !== 'mock') {
    await incrementViewCount(property.id)
  }

  // Canonical site host (env-driven; no former-brand hostname hard-coded)
  const baseUrl = getCanonicalUrl()

  // JSON-LD schemas
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.description,
    url: `${baseUrl}/apartment/${slug}`,
    image: property.images?.[0]?.url,
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'INR',
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Apartments', item: `${baseUrl}/apartment` },
      { '@type': 'ListItem', position: 3, name: property.title },
    ],
  }

  // WhatsApp share link
  const waMessage = encodeURIComponent(
    `🏠 *${property.title}*\n₹${(property.price / 100000).toFixed(1)} L · ${property.bedrooms || '?'} BHK · ${property.areaSqft || '?'} sqft\n\n${baseUrl}/apartment/${slug}`
  )
  const waLink = `https://wa.me/?text=${waMessage}`

  // SEO keywords for apartment pages
  const bhkText = property.bedrooms ? `${property.bedrooms} BHK ` : ''
  const seoTitle = `${bhkText}Apartment in ${property.city} | Marketing OS`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ApartmentClient
        property={{
          ...property,
          seoTitle,
          waLink,
        }}
      />
    </>
  )
}