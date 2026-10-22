import { prisma } from '@marketing-os/shared'

export async function createLead(data: {
  propertyId: string
  name?: string
  phone?: string
  message?: string
  source?: string
}) {
  const [lead] = await prisma.$transaction([
    prisma.lead.create({ data }),
    prisma.analytics.update({
      where: { propertyId: data.propertyId },
      data: { inquiryCount: { increment: 1 } },
    }),
  ])
  return lead
}

export async function getBrokerLeads(ownerId: string) {
  return prisma.lead.findMany({
    where: { property: { ownerId } },
    include: {
      property: { select: { id: true, title: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}
