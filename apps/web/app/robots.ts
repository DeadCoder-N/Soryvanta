import { MetadataRoute } from 'next'
import { getCanonicalUrl } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getCanonicalUrl()
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard/', '/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
