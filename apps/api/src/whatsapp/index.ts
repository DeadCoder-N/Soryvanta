import type { WhatsAppInboundMessage, WhatsAppOutboundMessage } from '@brisvora/shared'

const API_KEY = process.env.AISENSY_API_KEY!
const API_URL = 'https://backend.aisensy.com/campaign/t1/api/v2'
const AISENSY_PHONE = process.env.AISENSY_PHONE_NUMBER || '+918850908790'

// Parse AiSensy Webhook payload
export function parseInboundMessage(body: Record<string, any>): WhatsAppInboundMessage | null {
  try {
    // AiSensy payloads typically look like:
    // { "event": "message", "from": "919876543210", "message": { "type": "text", "text": "Hello" } }
    // Or they might have slightly different structures.
    // This is a flexible parser that attempts to find the sender and the text.

    // If it's a Meta payload wrapped by AiSensy, check for 'entry'
    if (body.entry) {
      const entry = (body.entry as any[])?.[0]
      const change = entry?.changes?.[0]
      const message = change?.value?.messages?.[0]
      if (!message) return null

      const mediaUrls: string[] = []
      if (message.image?.id) mediaUrls.push(message.image.id) // AiSensy might provide direct URLs instead of IDs.

      return {
        from: change.value.contacts?.[0]?.profile?.name ?? 'Unknown',
        waId: message.from,
        body: message.text?.body ?? '',
        mediaUrls,
        timestamp: message.timestamp,
      }
    }

    // Direct AiSensy format
    if (body.destination || body.from) {
      const sender = body.source || body.from || body.sender
      const msgData = body.message || body.text
      let textBody = ''

      if (typeof msgData === 'string') {
        textBody = msgData
      } else if (msgData?.text) {
        textBody = msgData.text
      } else if (msgData?.body) {
        textBody = msgData.body
      }

      if (!sender || !textBody) return null

      return {
        from: 'User', // AiSensy might not always provide profile name in the basic payload
        waId: sender,
        body: textBody,
        mediaUrls: [], // Media handling depends on how AiSensy sends it (often a public URL)
        timestamp: Date.now().toString(),
      }
    }

    return null
  } catch (err) {
    console.error('Error parsing inbound message:', err)
    return null
  }
}

// Send a WhatsApp text message via AiSensy Campaign API
export async function sendMessage(msg: WhatsAppOutboundMessage): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: API_KEY,
      campaignName: 'bristova_reply',
      destination: msg.to,
      userName: 'User',
      source: AISENSY_PHONE,
      media: {},
      templateParams: [],
      type: 'text',
      text: msg.body
    }),
  })

  if (!res.ok) {
    const error = await res.text()
    console.error('AiSensy Send Error:', error)
    // We don't throw aggressively so it doesn't crash the webhook if it fails
  }
}

// Download media
export async function downloadMedia(mediaIdOrUrl: string): Promise<Buffer> {
  // With AiSensy, if they give us a public URL, we just fetch it directly.
  if (mediaIdOrUrl.startsWith('http')) {
     const res = await fetch(mediaIdOrUrl)
     const arrayBuffer = await res.arrayBuffer()
     return Buffer.from(arrayBuffer)
  }
  throw new Error('AiSensy media download not fully configured. Awaiting payload format.')
}
