import type { WhatsAppInboundMessage, WhatsAppOutboundMessage } from '@brisvora/shared'

const API_KEY = process.env.AISENSY_API_KEY!
const API_URL = 'https://backend.aisensy.com/campaign/t1/api/v2'
const AISENSY_PHONE = process.env.AISENSY_PHONE_NUMBER || '+918850908790'

// --- Known AiSensy webhook format (from actual payload) ---
// body.topic === "message.created"
// body.data.message.phone_number  => "918454806491"
// body.data.message.message_content.text  => "Hello"
// body.data.message.userName  => "Nitesh"
// body.data.message.message_type  => "TEXT"
// body.data.message.sent_at  => timestamp
function extractFromAiSensy(body: Record<string, any>): { phone: string; text: string; fromName: string; mediaUrls: string[] } | null {
  try {
    const topic = body.topic ?? body.event ?? body.data?.topic
    if (topic !== 'message.created') return null

    const msg = body.data?.message ?? body.data
    if (!msg) return null

    const phone = String(msg.phone_number ?? msg.from ?? msg.sender ?? '').replace(/\D/g, '')
    if (phone.length < 10) return null

    const content = msg.message_content ?? msg.content ?? {}
    let text = ''
    if (typeof content === 'string') {
      text = content
    } else if (typeof content === 'object') {
      text = String(content.text ?? content.body ?? content.caption ?? '')
    }

    const fromName = String(msg.userName ?? msg.user_name ?? msg.contact_name ?? 'User')

    const mediaUrls: string[] = []
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

    return { phone, text, fromName, mediaUrls }
  } catch (e) {
    console.error('Error extracting AiSensy payload:', e)
    return null
  }
}

// Parse AiSensy Webhook payload — targeted extractor first, deep walk fallback
export function parseInboundMessage(body: Record<string, any>): WhatsAppInboundMessage | null {
  try {
    // Strategy 1: Known AiSensy webhook format
    const known = extractFromAiSensy(body)
    if (known && known.phone && known.text) {
      return {
        from: known.fromName,
        waId: known.phone,
        body: known.text,
        mediaUrls: known.mediaUrls,
        timestamp: Date.now().toString(),
      }
    }

    // Strategy 2: Generic deep recursive walk (fallback for unknown formats)
    const generic = extractGeneric(body)
    if (generic) return generic

    return null
  } catch (err) {
    console.error('Error parsing inbound message:', err)
    return null
  }
}

function extractGeneric(body: Record<string, any>): WhatsAppInboundMessage | null {
  const mediaUrls: string[] = []

  function walk(obj: any, depth: number): { phone: string; text: string; fromName: string } | null {
    if (depth > 10 || !obj) return null
    if (Array.isArray(obj)) {
      for (const item of obj) {
        const r = walk(item, depth + 1)
        if (r) return r
      }
      return null
    }
    if (typeof obj === 'object') {
      const entries = Object.entries(obj)
      let phoneMatch: string | null = null
      let textMatch: string | null = null
      let nameMatch: string | null = null

      for (const [k, v] of entries) {
        if (typeof v !== 'string') continue
        const digits = v.replace(/\D/g, '')
        const lowerK = k.toLowerCase()
        if (!phoneMatch && digits.length >= 10 && /phone|from|waId|sender|number|mobile|to|destination/.test(lowerK)) {
          phoneMatch = digits
        }
        if (!textMatch && v.length > 0 && /text|body|message|content|caption/.test(lowerK)) {
          textMatch = v
        }
        if (!nameMatch && v.length > 0 && /name|user/.test(lowerK)) {
          nameMatch = v
        }
      }

      if (phoneMatch && textMatch) {
        return { phone: phoneMatch, text: textMatch, fromName: nameMatch ?? 'User' }
      }

      for (const [k, v] of entries) {
        if (typeof v === 'string' && v.startsWith('http')) mediaUrls.push(v)
      }
      for (const [k, v] of entries) {
        if (k === 'password' || k === 'apiKey' || k === 'secret') continue
        const r = walk(v, depth + 1)
        if (r) return r
      }
    }
    return null
  }

  const found = walk(body, 0)
  if (!found) return null
  return {
    from: found.fromName,
    waId: found.phone,
    body: found.text,
    mediaUrls,
    timestamp: Date.now().toString(),
  }
}

// Send a WhatsApp text message via AiSensy
// Tries CleverTap endpoint (Bearer) → Campaign endpoint (apiKey body)
export async function sendMessage(msg: WhatsAppOutboundMessage): Promise<void> {
  const destination = msg.to.replace(/[^0-9]/g, '')
  const payload = {
    apiKey: API_KEY,
    campaignName: 'bristova_reply',
    destination,
    userName: 'User',
    source: AISENSY_PHONE,
    media: {},
    templateParams: [],
    type: 'text',
    text: msg.body,
  }

  // Strategy 1: CleverTap endpoint with Bearer token
  try {
    const res = await fetch('https://backend.aisensy.com/clever-tap/t1/messages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: destination,
        type: 'text',
        text: msg.body,
      }),
    })
    if (res.ok) {
      console.log('Message sent via CleverTap endpoint')
      return
    }
    const errText = await res.text()
    console.log('CleverTap endpoint failed:', res.status, errText)
  } catch (e) {
    console.log('CleverTap endpoint error:', e)
  }

  // Strategy 2: Campaign endpoint
  try {
    const res2 = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res2.ok) {
      console.log('Message sent via Campaign endpoint')
      return
    }
    const errText2 = await res2.text()
    console.error('AiSensy Send Error (campaign):', errText2)
  } catch (e) {
    console.error('AiSensy Campaign endpoint error:', e)
  }
}

// Download media
export async function downloadMedia(mediaIdOrUrl: string): Promise<Buffer> {
  if (mediaIdOrUrl.startsWith('http')) {
    const res = await fetch(mediaIdOrUrl)
    const arrayBuffer = await res.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }
  throw new Error('AiSensy media download not fully configured. Awaiting payload format.')
}
