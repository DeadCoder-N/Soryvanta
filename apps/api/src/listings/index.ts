import { prisma, generateSlug } from '@marketing-os/shared'
import type { GeneratedListing } from '@marketing-os/shared'

export async function createListing(
  ownerPhone: string,
  generated: GeneratedListing,
  imageUrls: string[],
  rawInput: string,
  ownerId?: string,
  mockDataUrl?: string
) {
  const tempId = crypto.randomUUID()
  const slug = generateSlug(generated.title, tempId)

  const property = await prisma.property.create({
    data: {
      slug,
      ownerId: ownerId ?? null,
      ownerPhone,
      title: generated.title,
      description: generated.description,
      address: generated.address,
      city: generated.city,
      price: generated.price,
      priceLabel: generated.priceLabel,
      bedrooms: generated.bedrooms,
      bathrooms: generated.bathrooms,
      areaSqft: generated.areaSqft,
      type: generated.type,
      features: generated.features,
      amenities: generated.amenities,
      rawInput,
      mockDataUrl: mockDataUrl ?? null,
      images: {
        create: imageUrls.map((url, i) => ({ url, order: i })),
      },
      analytics: {
        create: {},
      },
    },
    include: { images: true, analytics: true },
  })

  return property
}

export async function getListingBySlug(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: 'asc' } },
      owner: { select: { name: true, phone: true, email: true } },
      analytics: true,
    },
  })
}

export async function getBrokerListings(ownerId: string) {
  return prisma.property.findMany({
    where: { ownerId },
    include: {
      images: { take: 1, orderBy: { order: 'asc' } },
      analytics: true,
      _count: { select: { leads: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function searchListings(params: {
  city?: string
  minPrice?: number
  maxPrice?: number
  type?: string
  bedrooms?: number
  page?: number
  limit?: number
}) {
  const { city, minPrice, maxPrice, type, bedrooms, page = 1, limit = 12 } = params

  return prisma.property.findMany({
    where: {
      status: 'ACTIVE',
      ...(city && { city: { contains: city, mode: 'insensitive' } }),
      ...(minPrice && { price: { gte: minPrice } }),
      ...(maxPrice && { price: { lte: maxPrice } }),
      ...(type && { type: type as any }),
      ...(bedrooms && { bedrooms }),
    },
    include: {
      images: { take: 1, orderBy: { order: 'asc' } },
      analytics: { select: { viewCount: true } },
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  })
}

export async function updateListing(
  id: string,
  ownerId: string,
  data: Partial<GeneratedListing>,
  keepImageIds: string[] = [],
  newImageUrls: string[] = []
) {
  const existing = await prisma.property.findFirst({
    where: { id, OR: [{ ownerId }, { ownerId: null }] },
    select: { id: true },
  })
  if (!existing) throw new Error('Listing not found or access denied')

  return prisma.property.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
      images: {
        ...(keepImageIds.length > 0
          ? { deleteMany: { id: { notIn: keepImageIds } } }
          : newImageUrls.length > 0
            ? { deleteMany: {} }
            : {}
        ),
        create: newImageUrls.map((url, i) => ({ url, order: i })),
      },
    },
    include: { images: true },
  })
}

export async function claimListings(ownerPhone: string, ownerId: string) {
  const digits = ownerPhone.replace(/\D/g, '')
  // Try all phone formats that could be stored
  const candidates = [digits, `+${digits}`]
  if (digits.length === 12 && digits.startsWith('91')) candidates.push(digits.slice(2))
  if (digits.length === 10) candidates.push(`91${digits}`)

  return prisma.property.updateMany({
    where: { ownerPhone: { in: candidates }, ownerId: null },
    data: { ownerId },
  })
}

export async function deleteListing(id: string, ownerId: string) {
  return prisma.property.delete({ where: { id, ownerId } })
}

export async function incrementViewCount(propertyId: string) {
  return prisma.analytics.upsert({
    where: { propertyId },
    create: {
      propertyId,
      viewCount: 1,
      inquiryCount: 0,
      lastViewed: new Date(),
    },
    update: {
      viewCount: { increment: 1 },
      lastViewed: new Date(),
    },
  })
}
