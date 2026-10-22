import { NextResponse } from 'next/server'
import { prisma, ConversationContextSchema } from '@marketing-os/shared'
import {
  sendMessage, downloadMedia,
  generateListing, uploadImage, createListing,
  processConversationalMessage, clearConversationState, getConversationState,
} from '@marketing-os/api'
import {
  verifyOpenWASignature, parseOpenWAInbound, extractOpenWAMediaBuffers, OpenWAWebhookDelivery,
} from '@marketing-os/api'

const WEBHOOK_SECRET = process.env.OPENWA_WEBHOOK_SECRET || process.env.AISENSY_WEBHOOK_SECRET

// In-process dedup of OpenWA deliveries (X-OpenWA-Idempotency-Key is stable
// across retries of the same occurrence). Bounded so a long-running process
// cannot grow unboundedly.
const seenKeys = new Set<string>()
const SEEN_KEYS_MAX = 10_000

function recordKey(key: string) {
  if (seenKeys.size >= SEEN_KEYS_MAX) seenKeys.clear()
  seenKeys.add(key)
}

export async function GET(req: Request) {
  // OpenWA does not use a verify handshake; it POSTs signed deliveries only.
  // Kept for backwards compatibility with any legacy verifier.
  const url = new URL(req.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')
  if (mode === 'subscribe' && token && challenge) {
    if (WEBHOOK_SECRET && token !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Invalid verify token' }, { status: 403 })
    }
    return NextResponse.json(challenge)
  }
  return NextResponse.json({ ok: true })
}

export async function POST(req: Request) {
  // Read the raw body BEFORE parsing so the HMAC can be verified over the
  // exact bytes OpenWA sent (not a re-serialized copy).
  const rawBody = Buffer.from(await req.arrayBuffer())
  const signature = req.headers.get('X-OpenWA-Signature')
  const idempotencyKey = req.headers.get('X-OpenWA-Idempotency-Key')

  if (WEBHOOK_SECRET) {
    if (!verifyOpenWASignature(rawBody, signature, WEBHOOK_SECRET)) {
      console.warn('OpenWA webhook rejected: invalid HMAC signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }
  }

  let delivery: OpenWAWebhookDelivery
  try {
    delivery = JSON.parse(rawBody.toString('utf8')) as OpenWAWebhookDelivery
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const event = delivery.event

  // Session lifecycle events are informational only — never reply to a user.
  if (event !== 'message.received') {
    return NextResponse.json({ ok: true })
  }

  // Idempotency: dedupe on the delivery key so a retried event cannot create
  // a second listing or send a duplicate reply.
  if (idempotencyKey) {
    if (seenKeys.has(idempotencyKey)) {
      return NextResponse.json({ ok: true })
    }
    recordKey(idempotencyKey)
  }

  const msg = parseOpenWAInbound(delivery)
  if (!msg) {
    return NextResponse.json({ ok: true })
  }

  try {
    const phone = msg.waId
    const digits = phone.replace(/\D/g, '')
    const candidates = new Set<string>([digits, `+${digits}`])
    if (digits.length === 12 && digits.startsWith('91')) {
      candidates.add(digits.slice(2))
      candidates.add(`+91${digits.slice(2)}`)
    } else if (digits.length === 10) {
      candidates.add(`91${digits}`)
      candidates.add(`+91${digits}`)
    }

    let user: { id: string } | null = null
    for (const candidate of candidates) {
      user = await prisma.user.findUnique({ where: { phone: candidate } })
      if (user) break
    }

    const conversationKey = user?.id ?? `phone:${digits}`

    // OpenWA inlines inbound media as base64 in the webhook payload (under
    // WEBHOOK_MEDIA_INLINE_MAX_BYTES, default 1 MiB). Those bytes are
    // ephemeral — they are not retrievable later — so upload each photo to
    // Cloudinary as it arrives and pass the resulting URL into the conversation
    // accumulator. Larger/omitted media falls back to the stored-message
    // media endpoint via downloadMedia.
    const newImageUrls: string[] = []
    const inlineBuffers = extractOpenWAMediaBuffers(delivery)
    for (const buffer of inlineBuffers) {
      try {
        const { url } = await uploadImage(buffer, 'marketing-os/properties', 'image')
        newImageUrls.push(url)
      } catch (err) {
        console.error('Failed to upload inbound image:', err)
      }
    }

    const flowResult = await processConversationalMessage(
      conversationKey,
      msg.waId,
      msg.body,
      newImageUrls
    )

    if (flowResult === 'GENERATING') {
      await sendMessage({ to: msg.waId, contactId: msg.contactId, body: 'Generating your listing with AI... Please wait a moment.' })

      const conversation = await getConversationState(conversationKey)
      const context = ConversationContextSchema.parse(conversation?.context ?? {})
      const accumulatedText = context.accumulatedText ?? ''
      // imageUrls are already Cloudinary URLs from prior uploads — no re-fetch.
      const imageUrls = context.imageUrls ?? []

      const rawMessage = accumulatedText || msg.body
      const result = await generateListing({ rawMessage, imageUrls })

      const property = await createListing(digits, result.listing, imageUrls, rawMessage, user?.id, result.mockDataUrl)

      const typeRoute = result.listing.type?.toLowerCase() || 'property'
      const baseUrl = (process.env.NEXTAUTH_URL || process.env.CANONICAL_URL || 'http://localhost:3000')
        .replace(/^http:\/\/192\.168\.\d+\.\d+:\d+/, 'http://localhost:3000')
      const listingUrl = `${baseUrl}/${typeRoute}/${property.slug}`

      let replyBody = `Your listing is ready!\n\n${result.listing.title}\n\n${listingUrl}`
      if (!user) {
        const registerHost = (process.env.NEXTAUTH_URL || process.env.CANONICAL_URL || 'http://localhost:3000')
        replyBody += `\n\nTo edit this listing, register at ${registerHost.replace(/^https?:\/\//, '')} with this WhatsApp number.`
      }

      await sendMessage({ to: msg.waId, contactId: msg.contactId, body: replyBody })
      await clearConversationState(conversationKey)
      return NextResponse.json({ ok: true })
    }

    await sendMessage({ to: msg.waId, contactId: msg.contactId, body: flowResult })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}