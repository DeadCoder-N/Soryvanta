import { MetadataRoute } from 'next'
import { prisma } from '@brisvora/shared'

// Type mapping for SEO routes
const TYPE_ROUTES: Record<string, string> = {
  APARTMENT: 'apartment',
  VILLA: 'villa',
  PLOT: 'plot',
  COMMERCIAL: 'commercial',
  HOUSE: 'apartment',
  OTHER: 'property',
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://brisvora.vercel.app'

  // Graceful fallback if Supabase connection fails during build
  let propertyUrls: MetadataRoute.Sitemap = []
  try {
    const properties = await prisma.property.findMany({
      where: { status: 'ACTIVE' },
      select: { slug: true, updatedAt: true, type: true },
      orderBy: { updatedAt: 'desc' },
      take: 10000,
    })

    propertyUrls = properties.map((p) => {
      const route = TYPE_ROUTES[p.type] || 'property'
      return {
        url: `${baseUrl}/${route}/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'daily' as const,
        priority: 0.8,
      }
    })
  } catch (err) {
    console.warn('Sitemap DB fetch failed (build without Supabase):', (err as Error).message)
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...propertyUrls,
  ]
}