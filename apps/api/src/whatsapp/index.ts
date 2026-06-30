import type { WhatsAppInboundMessage, WhatsAppOutboundMessage } from '@brisvora/shared'
import { prisma } from '@brisvora/shared'

const API_KEY = process.env.AISENSY_API_KEY!
const API_URL = 'https://backend.aisensy.com/campaign/t1/api/v2'
const AISENSY_PHONE = process.env.AISENSY_PHONE_NUMBER || '+918850908790'

function extractPhoneAndText(body: Record<string, any>): { phone: string; text: string; mediaUrls: string[] } | null {
  const mediaUrls: string[] = []

  // Strategy 1: Deep recursive search for any phone-like string and any text-like string
  const findDeep = (obj: any, depth = 0): { phone: string; text: string } | null => {
    if (depth > 8 || !obj || typeof obj !== 'object') return null

    if (typeof obj === 'object') {
      const keys = Object.keys(obj)
      const phoneKey = keys.find(k => /phone|mobile|from|waId|sender|number|to/.test(k.toLowerCase()))
      const textKey = keys.find(k => /text|body|message|content|caption/.test(k.toLowerCase()))

      if (phoneKey && textKey) {
        const phone = String(obj[phoneKey] ?? '').replace(/\D/g, '')
        const text = String(obj[textKey] ?? '')
        if (phone.length >= 10 && text.length > 0) {
          return { phone, text }
        }
      }

      for (const key of keys) {
        const val = obj[key]
        if (Array.isArray(val)) {
          for (const item of val) {
            const result = findDeep(item, depth + 1)
            if (result) return result
          }
        } else if (typeof val === 'object') {
          const result = findDeep(val, depth + 1)
          if (result) return result
        }
      }
    }
    return null
  }

  // Also look for image/media URLs anywhere in the payload
  const findMediaUrls = (obj: any, depth = 0): string[] => {
    if (depth > 8 || !obj || typeof obj !== 'object') return []
    if (typeof obj === 'object') {
      const urls: string[] = []
      for (const key of Object.keys(obj)) {
        const val = obj[key]
        if (typeof val === 'string' && val.startsWith('http')) {
          urls.push(val)
        } else if (typeof val === 'object') {
          urls.push(...findMediaUrls(val, depth + 1))
        }
      }
      return urls
    }
    return []
  }

  // Strategy 2: Known top-level keys
  if (body.waId || body.from || body.sender) {
    const phone = String(body.waId || body.from || body.sender).replace(/\D/g, '')
    const text = String(body.body || body.text || body.message?.text || body.message?.body || '')
    mediaUrls.push(...findMediaUrls(body))
    if (phone.length >= 10) return { phone, text, mediaUrls }
  }

  // Strategy 3: Deep search
  const deep = findDeep(body)
  if (deep) {
    mediaUrls.push(...findMediaUrls(body))
    return { phone: deep.phone, text: deep.text, mediaUrls }
  }

  return null
}

// Parse AiSensy Webhook payload — robust against ANY format
export function parseInboundMessage(body: Record<string, any>): WhatsAppInboundMessage | null {
  try {
    const extracted = extractPhoneAndText(body)
    if (!extracted) {
      console.log('Could not extract phone+text from payload. Keys:', Object.keys(body))
      return null
    }

    const waId = extracted.phone
    const textBody = extracted.text

    // Determine sender name if available
    let fromName = 'User'
    const deep = findDeep(body, (obj: any) => obj?.profile?.name || obj?.name || null)

    return {
      from: fromName,
      waId,
      body: textBody,
      mediaUrls: extracted.mediaUrls,
      timestamp: Date.now().toString(),
    }
  } catch (err) {
    console.error('Error parsing inbound message:', err)
    return null
  }
}

// old signature removed — using new robust extractor below

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

// Helper for finding values in nested objects
function findDeep(obj: any, predicate: (v: any) => any, depth = 0): any {
  if (depth > 8 || !obj || typeof obj !== 'object') return undefined
  const direct = predicate(obj)
  if (direct !== undefined) return direct
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const r = findDeep(item, predicate, depth + 1)
      if (r !== undefined) return r
    }
  } else {
    for (const key of Object.keys(obj)) {
      const r = findDeep(obj[key], predicate, depth + 1)
      if (r !== undefined) return r
    }
  }
  return undefined
}
