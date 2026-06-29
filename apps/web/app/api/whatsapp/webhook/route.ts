import { NextResponse } from 'next/server'
import { verifyWebhook, validateSignature, parseInboundMessage, sendMessage, downloadMedia, generateListing, uploadImage, createListing } from '@brisvora/api'
import { prisma } from '@brisvora/shared'

export function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const challenge = verifyWebhook(
    searchParams.get('hub.mode') ?? '',
    searchParams.get('hub.verify_token') ?? '',
    searchParams.get('hub.challenge') ?? ''
  )
  if (!challenge) return new Response('Forbidden', { status: 403 })
  return new Response(challenge, { status: 200 })
}

export async function POST(req: Request) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-hub-signature-256') ?? ''

  if (!validateSignature(rawBody, signature)) {
    return new Response('Unauthorized', { status: 401 })
  }

  const body = JSON.parse(rawBody)
  const msg = parseInboundMessage(body)
  if (!msg) return NextResponse.json({ ok: true })

  // Find broker by phone
  const user = await prisma.user.findUnique({ where: { phone: msg.waId } })
  if (!user) {
    await sendMessage({ to: msg.waId, body: 'Please register at our platform first.' })
    return NextResponse.json({ ok: true })
  }

  // Download and upload images if any
  const imageUrls: string[] = []
  for (const mediaId of msg.mediaUrls ?? []) {
    const buffer = await downloadMedia(mediaId)
    const { url } = await uploadImage(buffer)
    imageUrls.push(url)
  }

  // Generate listing via AI
  const generated = await generateListing({ rawMessage: msg.body })

  // Save to DB
  const property = await createListing(user.id, generated, imageUrls, msg.body)

  const listingUrl = `${process.env.NEXTAUTH_URL}/property/${property.slug}`
  await sendMessage({ to: msg.waId, body: `✅ Your listing is ready!\n\n${generated.title}\n\n${listingUrl}` })

  return NextResponse.json({ ok: true })
}
