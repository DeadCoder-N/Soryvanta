import type { WhatsAppInboundMessage, WhatsAppOutboundMessage } from '@brisvora/shared'

const API_KEY = process.env.AISENSY_API_KEY!
const API_URL = 'https://backend.aisensy.com/campaign/t1/api/v2'
const AISENSY_PHONE = process.env.AISENSY_PHONE_NUMBER || '+918850908790'

// --- Payload extraction ---
function extractPhoneAndText(body: Record<string, any>): { phone: string; text: string; mediaUrls: string[] } | null {
  const mediaUrls: string[] = []

  // Walk any object/array looking for: phone-like string (10+ digits) + text-like string
  function walk(obj: any, depth: number): { phone: string; text: string } | null {
    if (depth > 10 || !obj) return null

    if (Array.isArray(obj)) {
      for (const item of obj) {
        const r = walk(item, depth + 1)
        if (r) return r
      }
      return null
    }

    if (typeof obj === 'object') {
      // Same-object heuristic: this object has both a phone-looking value and a text-looking value
      const entries = Object.entries(obj)
      let phoneMatch: string | null = null
      let textMatch: string | null = null

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
      }

      if (phoneMatch && textMatch) {
        return { phone: phoneMatch, text: textMatch }
      }

      // Collect media URLs anywhere
      for (const [k, v] of entries) {
        if (typeof v === 'string' && v.startsWith('http')) {
          mediaUrls.push(v)
        }
      }

      // Recurse into child objects/arrays
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
  return { phone: found.phone, text: found.text, mediaUrls }
}

// Parse AiSensy Webhook payload — extremely robust against unknown formats
export function parseInboundMessage(body: Record<string, any>): WhatsAppInboundMessage | null {
  try {
    const extracted = extractPhoneAndText(body)
    if (!extracted) {
      console.log('PARSE_FAIL — top-level keys:', Object.keys(body))
      // As a last resort, dump the whole body so we can inspect it in Vercel logs
      console.log('PARSE_FAIL — full body:', JSON.stringify(body).slice(0, 2000))
      return null
    }

    return {
      from: 'User',
      waId: extracted.phone,
      body: extracted.text,
      mediaUrls: extracted.mediaUrls,
      timestamp: Date.now().toString(),
    }
  } catch (err) {
    console.error('Error parsing inbound message:', err)
    return null
  }
}

// Send a WhatsApp text message via AiSensy
// Tries multiple endpoints: CleverTap (Bearer auth) → Campaign (apiKey body)
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
    text: msg.body
  }

  // Strategy 1: CleverTap endpoint with Bearer token
  try {
    const res = await fetch('https://backend.aisensy.com/clever-tap/t1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
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

  // Strategy 2: Campaign endpoint (requires campaign to exist)
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
