import type { WhatsAppInboundMessage, WhatsAppOutboundMessage } from '@brisvora/shared'

const CAMPAIGN_API_KEY = process.env.AISENSY_API_KEY!
const PROJECT_API_KEY = process.env.AISENSY_PROJECT_API_KEY!
const PROJECT_ID = process.env.AISENSY_PROJECT_ID!
const PROJECT_API_BASE = 'https://apis.aisensy.com/project-apis/v1'

function extractFromAiSensy(body: Record<string, any>): {
  phone: string
  text: string
  fromName: string
  contactId: string
  mediaUrls: string[]
} | null {
  try {
    const topic = body.topic ?? body.event ?? body.data?.topic
    if (topic !== 'message.created') return null

    const msg = body.data?.message ?? body.data
    if (!msg) return null

    // Skip non-user messages (system, bot, agent, outbound echoes)
    if (msg.sender !== 'USER') return null

    // Skip outbound message echoes (ROOM_MESSAGE = message sent by the bot)
    if (msg.message_type === 'ROOM_MESSAGE') return null

    const phone = String(msg.phone_number ?? msg.from ?? '').replace(/\D/g, '')
    if (phone.length < 10) return null

    // Skip if phone matches our own business number (outbound echo)
    const ownNumber = process.env.AISENSY_PHONE_NUMBER?.replace(/\D/g, '') ?? ''
    if (ownNumber && phone === ownNumber) return null

    const contactId = String(msg.contact_id ?? '')

    const content = msg.message_content ?? msg.content ?? {}
    let text = ''
    if (typeof content === 'string') {
      text = content
    } else if (typeof content === 'object') {
      text = String(content.text ?? content.body ?? content.caption ?? '')
    }

    const fromName = String(msg.userName ?? msg.user_name ?? msg.contact_name ?? 'User')

    const mediaUrls: string[] = []
    // AiSensy sends image URL directly in content.url
    if (typeof content.url === 'string' && content.url.startsWith('http')) {
      mediaUrls.push(content.url)
    }
    if (Array.isArray(content.media)) {
      for (const m of content.media) {
        if (typeof m === 'string') mediaUrls.push(m)
        else if (m?.url) mediaUrls.push(m.url)
        else if (m?.id) mediaUrls.push(m.id)
      }
    }
    if (typeof content.media === 'string' && content.media.startsWith('http')) {
      mediaUrls.push(content.media)
    }
    if (msg.media_url) mediaUrls.push(msg.media_url)
    if (Array.isArray(msg.media_urls)) {
      for (const u of msg.media_urls) mediaUrls.push(u)
    }

    // Drop message only if no text AND no media
    if (!text && mediaUrls.length === 0) return null

    // If photo with no caption, use placeholder so conversation state is updated
    if (!text) text = '[photo]'

    return { phone, text, fromName, contactId, mediaUrls }
  } catch (e) {
    console.error('Error extracting AiSensy payload:', e)
    return null
  }
}

export function parseInboundMessage(body: Record<string, any>): WhatsAppInboundMessage | null {
  try {
    const known = extractFromAiSensy(body)
    if (known && known.phone && known.text) {
      return {
        from: known.fromName,
        waId: known.phone,
        body: known.text,
        contactId: known.contactId,
        mediaUrls: known.mediaUrls,
        timestamp: Date.now().toString(),
      }
    }
    return null
  } catch (err) {
    console.error('Error parsing inbound message:', err)
    return null
  }
}

// Send a WhatsApp message via AiSensy Project API (live chat reply)
export async function sendMessage(msg: WhatsAppOutboundMessage): Promise<void> {
  const destination = msg.to.replace(/\D/g, '')

  // Strategy 1: Project API — WhatsApp Cloud API style
  if (PROJECT_API_KEY && PROJECT_ID) {
    try {
      const res = await fetch(`${PROJECT_API_BASE}/project/${PROJECT_ID}/messages`, {
        method: 'POST',
        headers: {
          'X-AiSensy-Project-API-Pwd': PROJECT_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: destination,
          type: 'text',
          text: { body: msg.body },
        }),
      })
      const resText = await res.text()
      if (res.ok) {
        console.log('Message sent via Project API')
        return
      }
      console.log('Project API failed:', res.status, resText.slice(0, 200))
    } catch (e) {
      console.log('Project API error:', e)
    }
  }

  // Strategy 2: Campaign API with approved template (fallback)
  if (CAMPAIGN_API_KEY) {
    try {
      const res = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: CAMPAIGN_API_KEY,
          campaignName: 'brisvora_reply',
          destination,
          userName: 'User',
          templateParams: [msg.body],
          media: {},
        }),
      })
      const resText = await res.text()
      if (res.ok) {
        console.log('Message sent via Campaign API')
        return
      }
      console.error('Campaign API failed:', res.status, resText)
    } catch (e) {
      console.error('Campaign API error:', e)
    }
  }

  console.error('All send strategies failed for:', destination)
}

// Download media from URL or AiSensy media endpoint
export async function downloadMedia(mediaIdOrUrl: string): Promise<Buffer> {
  if (mediaIdOrUrl.startsWith('http')) {
    const res = await fetch(mediaIdOrUrl)
    if (!res.ok) throw new Error(`Failed to download media: ${res.status}`)
    return Buffer.from(await res.arrayBuffer())
  }

  if (!CAMPAIGN_API_KEY) throw new Error('AISENSY_API_KEY not set.')

  const trimmed = mediaIdOrUrl.trim()
  if (!trimmed) throw new Error('Empty media ID.')

  const endpoints = [
    `https://backend.aisensy.com/campaign/t1/api/v2/media/${encodeURIComponent(trimmed)}?apiKey=${CAMPAIGN_API_KEY}`,
    `https://backend.aisensy.com/campaign/t1/api/v2/media?mediaId=${encodeURIComponent(trimmed)}`,
  ]

  let lastError: Error | null = null
  for (const url of endpoints) {
    try {
      const res = await fetch(url)
      if (res.ok) return Buffer.from(await res.arrayBuffer())
      lastError = new Error(`Media download failed: ${res.status} for ${url}`)
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e))
    }
  }

  throw lastError ?? new Error('Media download failed.')
}
