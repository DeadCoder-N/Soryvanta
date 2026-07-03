import { NextResponse } from 'next/server'
import { prisma, ConversationContextSchema } from '@brisvora/shared'
import {
  parseInboundMessage, sendMessage, downloadMedia,
  generateListing, uploadImage, createListing,
  processConversationalMessage, clearConversationState, getConversationState,
} from '@brisvora/api'

const WEBHOOK_SECRET = process.env.AISENSY_WEBHOOK_SECRET

export async function GET(req: Request) {
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

  const plainToken = url.searchParams.get('token')
  const plainChallenge = url.searchParams.get('challenge')
  if (plainToken && plainChallenge) {
    if (WEBHOOK_SECRET && plainToken !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Invalid verify token' }, { status: 403 })
    }
    return NextResponse.json(plainChallenge)
  }

  return NextResponse.json({ ok: true })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('--- WEBHOOK RECEIVED ---')
    console.log(JSON.stringify(body).slice(0, 2000))

    const msg = parseInboundMessage(body)
    if (!msg) {
      console.log('Ignored: non-message or system event')
      return NextResponse.json({ ok: true })
    }

    console.log('Parsed:', JSON.stringify({ waId: msg.waId, body: msg.body, contactId: msg.contactId, mediaUrls: msg.mediaUrls }))

    // Look up registered user — optional, not required
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

    // Use userId if registered, otherwise use phone as the conversation key
    const conversationKey = user?.id ?? `phone:${digits}`

    const flowResult = await processConversationalMessage(
      conversationKey,
      msg.waId,
      msg.body,
      msg.mediaUrls ?? []
    )

    console.log('Flow result:', flowResult)

    if (flowResult === 'GENERATING') {
      await sendMessage({ to: msg.waId, contactId: msg.contactId, body: 'Generating your listing with AI... Please wait a moment.' })

      const conversation = await getConversationState(conversationKey)
      const context = ConversationContextSchema.parse(conversation?.context ?? {})
      const accumulatedText = context.accumulatedText ?? ''
      const accumulatedImageIds = context.imageUrls ?? []
      const allMediaIds = [...accumulatedImageIds, ...(msg.mediaUrls ?? [])]

      const imageUrls: string[] = []
      for (const mediaId of allMediaIds) {
        try {
          const buffer = await downloadMedia(mediaId)
          const { url } = await uploadImage(buffer)
          imageUrls.push(url)
        } catch (err) {
          console.error('Failed to process image:', err)
        }
      }

      const rawMessage = accumulatedText || msg.body
      const generated = await generateListing({ rawMessage, imageUrls })

      // createListing: ownerPhone always set, ownerId only if registered
      const property = await createListing(digits, generated, imageUrls, rawMessage, user?.id)

      const listingUrl = `${process.env.NEXTAUTH_URL || 'https://brisvora.vercel.app'}/property/${property.slug}`

      let replyBody = `Your listing is ready!\n\n${generated.title}\n\n${listingUrl}`
      if (!user) {
        replyBody += `\n\nTo edit this listing, register at brisvora.vercel.app with this WhatsApp number.`
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
