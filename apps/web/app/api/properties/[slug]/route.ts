import { NextResponse } from 'next/server'
import { getListingBySlug, incrementViewCount } from '@marketing-os/api'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getListingBySlug(slug)

  if (!property) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Fire and forget — don't await so it doesn't slow down the response
  incrementViewCount(property.id).catch(() => {})

  return NextResponse.json(property)
}
