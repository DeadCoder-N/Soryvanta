import { prisma } from '@brisvora/shared'

type PropertyWithAnalytics = {
  id: string
  title: string
  slug: string
  analytics: { viewCount: number } | null
  _count: { leads: number }
}

export async function getBrokerAnalytics(ownerId: string) {
  const properties = await prisma.property.findMany({
    where: { ownerId },
    select: {
      id: true,
      title: true,
      slug: true,
      analytics: true,
      _count: { select: { leads: true } },
    },
  })

  const totalViews: number = properties.reduce((sum: number, p: PropertyWithAnalytics) => {
    return sum + (p.analytics?.viewCount ?? 0)
  }, 0)
  const totalLeads: number = properties.reduce((sum: number, p: PropertyWithAnalytics) => {
    return sum + p._count.leads
  }, 0)
  const totalListings = properties.length

  return { totalViews, totalLeads, totalListings, properties }
}
