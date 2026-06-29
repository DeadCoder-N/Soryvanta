import { NextResponse } from 'next/server'
import { searchListings, createListing, generateListing } from '@brisvora/api'
import { auth } from '@/auth'
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const listings = await searchListings({
    city: searchParams.get('city') ?? undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    type: searchParams.get('type') ?? undefined,
    bedrooms: searchParams.get('bedrooms') ? Number(searchParams.get('bedrooms')) : undefined,
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 12,
  })

  return NextResponse.json(listings)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { rawMessage, imageUrls = [] } = await req.json()
  if (!rawMessage) {
    return NextResponse.json({ error: 'rawMessage is required' }, { status: 400 })
  }

  const generated = await generateListing({ rawMessage })
  const property = await createListing(session.user.id, generated, imageUrls, rawMessage)

  return NextResponse.json(property, { status: 201 })
}
