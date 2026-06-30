import { NextResponse } from 'next/server'
import { parseInboundMessage, sendMessage, downloadMedia, generateListing, uploadImage, createListing, processConversationalMessage, clearConversationState, getConversationState } from '@brisvora/api'
import { prisma } from '@brisvora/shared'

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '')
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('--- NEW AISENSY WEBHOOK RECEIVED ---')
    console.log(JSON.stringify(body, null, 2))

    const msg = parseInboundMessage(body)
    if (!msg) {
      console.log('Webhook parsed as non-message or unsupported format, ignoring.')
      return NextResponse.json({ ok: true })
    }

    console.log('Parsed Message:', msg)

    const normalizedWaId = normalizePhone(msg.waId)
    const possiblePhones = [normalizedWaId]

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

    if (flowResult === 'GENERATING') {
      await sendMessage({ to: msg.waId, body: 'Generating your listing with AI... Please wait a moment.' })

      const conversation = await getConversationState(user.id)
      const context = conversation?.context as any ?? {}
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

      const generated = await generateListing({ rawMessage: msg.body })
      const property = await createListing(user.id, generated, imageUrls, msg.body)

      const listingUrl = `${process.env.NEXTAUTH_URL || 'https://brisvora.vercel.app'}/property/${property.slug}`
      await sendMessage({ to: msg.waId, body: `Your listing is ready!\n\n${generated.title}\n\n${listingUrl}` })

      await clearConversationState(user.id)
      return NextResponse.json({ ok: true })
    }

    await sendMessage({ to: msg.waId, body: flowResult })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
