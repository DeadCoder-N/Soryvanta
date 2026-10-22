import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@marketing-os/shared'

function isAdmin(role?: string) {
  return role === 'ADMIN' || role === 'SUPER_ADMIN'
}

export async function GET() {
  const session = await auth()
  if (!session?.user || !isAdmin(session.user.role))
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const [
    totalUsers, totalProperties, totalLeads, totalMessages,
    activeProperties, totalViews, recentUsers, recentProperties,
    brokerCount, adminCount, superAdminCount,
    propertiesByType, propertiesByStatus,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.property.count(),
    prisma.lead.count(),
    prisma.whatsappMessage.count(),
    prisma.property.count({ where: { status: 'ACTIVE' } }),
    prisma.analytics.aggregate({ _sum: { viewCount: true } }),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, name: true, email: true, role: true, createdAt: true } }),
    prisma.property.findMany({ orderBy: { createdAt: 'desc' }, take: 5, select: { id: true, title: true, city: true, price: true, status: true, type: true, slug: true, createdAt: true, owner: { select: { name: true, email: true } } } }),
    prisma.user.count({ where: { role: 'BROKER' } }),
    prisma.user.count({ where: { role: 'ADMIN' } }),
    prisma.user.count({ where: { role: 'SUPER_ADMIN' } }),
    prisma.property.groupBy({ by: ['type'], _count: true }),
    prisma.property.groupBy({ by: ['status'], _count: true }),
  ])

  return NextResponse.json({
    stats: {
      totalUsers, totalProperties, totalLeads, totalMessages,
      activeProperties, totalViews: totalViews._sum.viewCount ?? 0,
      brokerCount, adminCount, superAdminCount,
    },
    recentUsers,
    recentProperties,
    propertiesByType,
    propertiesByStatus,
  })
}
