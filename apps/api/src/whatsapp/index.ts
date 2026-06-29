import crypto from 'crypto'
import type { WhatsAppInboundMessage, WhatsAppOutboundMessage } from '@brisvora/shared'

const VERIFY_TOKEN = process.env.META_WHATSAPP_VERIFY_TOKEN!
const PHONE_NUMBER_ID = process.env.META_PHONE_NUMBER_ID!
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN!
const API_URL = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`

// Webhook verification handshake (GET)
export function verifyWebhook(
  mode: string,
  token: string,
  challenge: string
): string | null {
  if (mode === 'subscribe' && token === VERIFY_TOKEN) return challenge
  return null
}

// Validate incoming webhook signature (POST)
export function validateSignature(rawBody: string, signature: string): boolean {
  const appSecret = process.env.META_APP_SECRET!
  const expected = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex')
  return `sha256=${expected}` === signature
}

// Parse Meta Cloud API webhook payload
export function parseInboundMessage(body: Record<string, unknown>): WhatsAppInboundMessage | null {
  try {
    const entry = (body.entry as any[])?.[0]
    const change = entry?.changes?.[0]
    const message = change?.value?.messages?.[0]
    if (!message) return null

    const mediaUrls: string[] = []
    if (message.image?.id) mediaUrls.push(message.image.id)
    if (message.video?.id) mediaUrls.push(message.video.id)

    return {
      from: change.value.contacts?.[0]?.profile?.name ?? 'Unknown',
      waId: message.from,
      body: message.text?.body ?? '',
      mediaUrls,
      timestamp: message.timestamp,
    }
  } catch {
    return null
  }
}

// Send a WhatsApp text message via Meta Cloud API
export async function sendMessage(msg: WhatsAppOutboundMessage): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: msg.to,
      type: 'text',
      text: { body: msg.body },
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(`WhatsApp send failed: ${error}`)
  }
}

// Download media from Meta servers (returns buffer)
export async function downloadMedia(mediaId: string): Promise<Buffer> {
  const urlRes = await fetch(`https://graph.facebook.com/v19.0/${mediaId}`, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  })
  const { url } = (await urlRes.json()) as { url: string }

  const mediaRes = await fetch(url, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  })
  const arrayBuffer = await mediaRes.arrayBuffer()
  return Buffer.from(arrayBuffer)
}
