import { redirect, notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getListingBySlug } from '@marketing-os/api'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = await getListingBySlug(slug)
  if (!property) return { title: 'Property Not Found | Marketing OS' }

  const typeRoute = property.type.toLowerCase()
  return {
    title: `${property.title} | Marketing OS`,
    description: property.description.slice(0, 160),
    alternates: { canonical: `/${typeRoute}/${property.slug}` },
    robots: { index: true, follow: true },
  }
}

export default async function LegacyPropertyPage({ params }: Props) {
  const { slug } = await params
  const property = await getListingBySlug(slug)

  if (!property) notFound()

  // 301 Permanent Redirect to new SEO route
  const typeRoute = property.type.toLowerCase()
  redirect(`/${typeRoute}/${slug}`)
}