import { prisma } from '@brisvora/shared'

type PropertyWithAnalytics = {
  id: string
  title: string
  slug: string
  status: string
  createdAt: Date
  analytics: { viewCount: number; inquiryCount: number } | null
  _count: { leads: number }
  leads: Array<{ source: string }>
}

export async function getBrokerAnalytics(ownerId: string) {
  const properties = await prisma.property.findMany({
    where: { ownerId },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      createdAt: true,
      analytics: true,
      _count: { select: { leads: true } },
      leads: { select: { source: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const totalViews: number = properties.reduce((sum: number, p: PropertyWithAnalytics) =>
    sum + (p.analytics?.viewCount ?? 0), 0)
  const totalLeads: number = properties.reduce((sum: number, p: PropertyWithAnalytics) =>
    sum + p._count.leads, 0)
  const totalListings = properties.length
  const activeListings = properties.filter((p: PropertyWithAnalytics) => p.status === 'ACTIVE').length

  // Lead source breakdown
  const allLeads = properties.flatMap((p: PropertyWithAnalytics) => p.leads)
  const whatsappLeads = allLeads.filter(l => l.source === 'whatsapp').length
  const webLeads = allLeads.filter(l => l.source === 'web').length

  // Conversion rate: leads / views (as percentage)
  const conversionRate = totalViews > 0
    ? Math.round((totalLeads / totalViews) * 100 * 10) / 10
    : 0

  // Top listings by views
  const topListings = [...properties]
    .sort((a: PropertyWithAnalytics, b: PropertyWithAnalytics) =>
      (b.analytics?.viewCount ?? 0) - (a.analytics?.viewCount ?? 0)
    )
    .slice(0, 5)
    .map((p: PropertyWithAnalytics) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      views: p.analytics?.viewCount ?? 0,
      leads: p._count.leads,
      conversionRate: (p.analytics?.viewCount ?? 0) > 0
        ? Math.round((p._count.leads / (p.analytics?.viewCount ?? 1)) * 100 * 10) / 10
        : 0,
    }))

  return {
    totalViews,
    totalLeads,
    totalListings,
    activeListings,
    whatsappLeads,
    webLeads,
    conversionRate,
    topListings,
    properties,
  }
}
