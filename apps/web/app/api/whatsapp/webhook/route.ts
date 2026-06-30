import { NextResponse } from 'next/server'
import { prisma } from '@brisvora/shared'
import { parseInboundMessage, sendMessage, downloadMedia, generateListing, uploadImage, createListing, processConversationalMessage, clearConversationState, getConversationState } from '@brisvora/api'

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '')
}

// GET — Handles AiSensy webhook verification (challenge/verify)
export async function GET(req: Request) {
  const url = new URL(req.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')

  console.log('WEBHOOK_GET — mode:', mode, 'token:', token, 'challenge:', challenge)

  // AiSensy sends: hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=RANDOM_STRING
  // We must return the challenge string with 200 to verify
  if (mode === 'subscribe' && token && challenge) {
    // Accept any verify token for now (we'll secure this later)
    return NextResponse.json(challenge)
  }

  // Also handle plain ?token=&challenge= style (AiSensy sometimes uses this)
  const plainToken = url.searchParams.get('token')
  const plainChallenge = url.searchParams.get('challenge')
  if (plainToken && plainChallenge) {
    return NextResponse.json(plainChallenge)
  }

  return NextResponse.json({ ok: true })
}

// POST — Receives webhook events from AiSensy
export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('--- NEW AISENSY WEBHOOK RECEIVED ---')
    console.log('Keys:', Object.keys(body))
    console.log(JSON.stringify(body).slice(0, 3000))

    const msg = parseInboundMessage(body)
    if (!msg) {
      console.log('Webhook parsed as non-message or unsupported format.')
      return NextResponse.json({ ok: true })
    }

    console.log('Parsed Message:', msg)

    const normalizedWaId = normalizePhone(msg.waId)
    const possiblePhones = [normalizedWaId]

    if (normalizedWaId.startsWith('91') && normalizedWaId.length > 10) {
      possiblePhones.push(normalizedWaId.slice(2))
    }
    if (!normalizedWaId.startsWith('91') && normalizedWaId.length === 10) {
      possiblePhones.push(`91${normalizedWaId}`)
    }

    let user = null
    for (const phone of possiblePhones) {
      user = await prisma.user.findUnique({ where: { phone } })
      if (user) break
    }

    if (!user) {
      console.log(`User not found for phone: ${msg.waId}`)
      await sendMessage({ to: msg.waId, body: 'Please register at our platform first and link your WhatsApp number in the Profile Settings.' })
      return NextResponse.json({ ok: true })
    }

    const flowResult = await processConversationalMessage(user.id, msg.waId, msg.body, msg.mediaUrls ?? [])

    console.log('Flow result:', flowResult)

    if (flowResult === 'GENERATING') {
      await sendMessage({ to: msg.waId, body: 'Generating your listing with AI... Please wait a moment.' })

      const conversation = await getConversationState(user.id)
      const context = conversation?.context as any ?? {}
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
      const generated = await generateListing({ rawMessage })
      const property = await createListing(user.id, generated, imageUrls, rawMessage)

      const listingUrl = `${process.env.NEXTAUTH_URL || 'https://brisvora.vercel.app'}/property/${property.slug}`
      await sendMessage({ to: msg.waId, body: `Your listing is ready!\n\n${generated.title}\n\n${listingUrl}` })

      await clearConversationState(user.id)
      return NextResponse.json({ ok: true })
    }

    console.log('Sending reply:', flowResult)
    await sendMessage({ to: msg.waId, body: flowResult })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
