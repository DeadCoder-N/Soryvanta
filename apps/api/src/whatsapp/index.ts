import type { WhatsAppInboundMessage, WhatsAppOutboundMessage } from '@marketing-os/shared'
import { getAiSensyCampaignName } from '@marketing-os/shared'
import * as openwa from './openwa'

const CAMPAIGN_API_KEY = process.env.AISENSY_API_KEY!
const PROJECT_API_KEY = process.env.AISENSY_PROJECT_API_KEY!
const PROJECT_ID = process.env.AISENSY_PROJECT_ID!
const PROJECT_API_BASE = 'https://apis.aisensy.com/project-apis/v1'

/**
 * Active WhatsApp provider.
 *
 * `openwa` (default when OPENWA_API_KEY + OPENWA_SESSION_ID are set) routes
 * WhatsApp traffic through the OpenWA gateway. `aisensy` keeps the previous
 * AiSensy behaviour intact for a manual rollback. The provider is never
 * silently downgraded: when OpenWA is configured it is the required path.
 */
const WHATSAPP_PROVIDER = (process.env.WHATSAPP_PROVIDER || '').trim().toLowerCase()
const openwaConfigured = Boolean(process.env.OPENWA_API_KEY && process.env.OPENWA_SESSION_ID)
export const activeProvider: 'openwa' | 'aisensy' =
  WHATSAPP_PROVIDER === 'aisensy' ? 'aisensy' : (openwaConfigured ? 'openwa' : 'aisensy')

// Re-export the OpenWA adapter surface so consumers can import from
// @marketing-os/api without reaching into the internal module.
export type {
  OpenWAWebhookDelivery,
  OpenWAMessage,
} from './openwa'
export {
  verifyOpenWASignature,
  parseOpenWAInbound,
  extractOpenWAMediaBuffers,
  sendOpenWAMessage,
  downloadOpenWAMedia,
  openwaProvider,
} from './openwa'

if (activeProvider === 'openwa') {
  console.log('[WhatsApp] Active provider: OpenWA (session', process.env.OPENWA_SESSION_ID, ')')
} else if (WHATSAPP_PROVIDER === 'aisensy') {
  console.log('[WhatsApp] Active provider: AiSensy (manual rollback mode)')
} else {
  console.warn(
    '[WhatsApp] No WhatsApp provider is configured. Set OPENWA_API_KEY + OPENWA_SESSION_ID ' +
      'to use OpenWA, or WHATSAPP_PROVIDER=aisensy to keep the legacy AiSensy path.'
  )
}

function extractFromAiSensy(body: Record<string, any>): {
  phone: string
  text: string
  fromName: string
  contactId: string
  mediaUrls: string[]
} | null {
  try {
    // --- WhatsApp Cloud API format (object: whatsapp_business_account) ---
    if (body.object === 'whatsapp_business_account') {
      const changes = body.entry?.[0]?.changes?.[0]?.value
      if (!changes) return null

      // Skip status updates (sent/delivered/read)
      if (changes.statuses && !changes.messages) return null

      const waMsg = changes.messages?.[0]
      if (!waMsg) return null

      // Only process inbound user messages
      if (waMsg.from === changes.metadata?.phone_number_id) return null

      const phone = String(waMsg.from ?? '').replace(/\D/g, '')
      if (phone.length < 10) return null

      const ownNumber = process.env.AISENSY_PHONE_NUMBER?.replace(/\D/g, '') ?? ''
      if (ownNumber && phone === ownNumber) return null

      const contactId = changes.contacts?.[0]?.wa_id ?? phone
      const fromName = changes.contacts?.[0]?.profile?.name ?? 'User'

      let text = ''
      const mediaUrls: string[] = []

      if (waMsg.type === 'text') {
        text = waMsg.text?.body ?? ''
      } else if (waMsg.type === 'image') {
        text = waMsg.image?.caption ?? ''
        if (waMsg.image?.id) mediaUrls.push(waMsg.image.id)
        if (waMsg.image?.url) mediaUrls.push(waMsg.image.url)
      } else if (waMsg.type === 'video') {
        text = waMsg.video?.caption ?? ''
        if (waMsg.video?.id) mediaUrls.push(waMsg.video.id)
      } else if (waMsg.type === 'document') {
        text = waMsg.document?.caption ?? waMsg.document?.filename ?? ''
      }

      if (!text && mediaUrls.length === 0) return null
      if (!text) text = '[photo]'

      return { phone, text, fromName, contactId, mediaUrls }
    }

    // --- AiSensy Project API format (topic: message.created) ---
    const topic = body.topic ?? body.event ?? body.data?.topic
    if (topic !== 'message.created') return null

    const msg = body.data?.message ?? body.data
    if (!msg) return null

    if (msg.sender !== 'USER') return null
    if (msg.message_type === 'ROOM_MESSAGE') return null

    const phone = String(msg.phone_number ?? msg.from ?? '').replace(/\D/g, '')
    if (phone.length < 10) return null

    const ownNumber = process.env.AISENSY_PHONE_NUMBER?.replace(/\D/g, '') ?? ''
    if (ownNumber && phone === ownNumber) return null

    const contactId = String(msg.contact_id ?? '')
    const content = msg.message_content ?? msg.content ?? {}
    let text = ''
    if (typeof content === 'string') {
      text = content
    } else if (typeof content === 'object') {
      const raw = content.text ?? content.body ?? content.caption ?? ''
      text = raw && raw !== 'undefined' ? String(raw) : ''
    }

    const fromName = String(msg.userName ?? msg.user_name ?? msg.contact_name ?? 'User')

    const mediaUrls: string[] = []
    if (typeof content.url === 'string' && content.url.startsWith('http')) mediaUrls.push(content.url)
    // Also check video_content
    const videoContent = msg.video_content ?? (msg.message_type === 'VIDEO' ? content : null)
    if (videoContent && typeof videoContent.url === 'string' && videoContent.url.startsWith('http')) {
      if (!mediaUrls.includes(videoContent.url)) mediaUrls.push(videoContent.url)
    }
    if (Array.isArray(content.media)) {
      for (const m of content.media) {
        if (typeof m === 'string') mediaUrls.push(m)
        else if (m?.url) mediaUrls.push(m.url)
        else if (m?.id) mediaUrls.push(m.id)
      }
    }
    if (typeof content.media === 'string' && content.media.startsWith('http')) mediaUrls.push(content.media)
    if (msg.media_url) mediaUrls.push(msg.media_url)
    if (Array.isArray(msg.media_urls)) for (const u of msg.media_urls) mediaUrls.push(u)

    if (!text && mediaUrls.length === 0) return null
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

// Send a WhatsApp message. Routes through the active provider.
export async function sendMessage(msg: WhatsAppOutboundMessage): Promise<void> {
  if (activeProvider === 'openwa') {
    // OpenWA's send-text endpoint requires a full JID (e.g. 918433956238@c.us),
    // not a bare phone number. Prefer contactId (the full JID from the inbound
    // message) and fall back to `to` for legacy callers.
    const chatId = msg.contactId || msg.to
    const messageId = await openwa.sendOpenWAMessage(chatId, msg.body)
    if (messageId) {
      console.log('Message sent via OpenWA:', messageId)
      return
    }
    console.error('OpenWA send failed for:', chatId.replace(/\D/g, ''))
    return
  }

  await sendMessageViaAiSensy(msg)
}

// Legacy AiSensy send path — kept intact for manual rollback (WHATAPP_PROVIDER=aisensy).
async function sendMessageViaAiSensy(msg: WhatsAppOutboundMessage): Promise<void> {
  const destination = msg.to.replace(/\D/g, '')

  // Strategy 1: Project API — WhatsApp Cloud API style
  if (PROJECT_API_KEY && PROJECT_ID) {
    try {
      const payload: Record<string, any> = {
        to: destination,
        type: 'text',
        text: { body: msg.body },
      }
      if (msg.contactId) payload.contact_id = msg.contactId

      const res = await fetch(`${PROJECT_API_BASE}/project/${PROJECT_ID}/messages`, {
        method: 'POST',
        headers: {
          'X-AiSensy-Project-API-Pwd': PROJECT_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
  const campaignName = getAiSensyCampaignName()
  if (CAMPAIGN_API_KEY && campaignName) {
    try {
      const res = await fetch('https://backend.aisensy.com/campaign/t1/api/v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: CAMPAIGN_API_KEY,
          campaignName,
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

// Download media. OpenWA uses its stored-message media endpoint; AiSensy keeps
// its legacy URL / campaign-media behaviour.
export async function downloadMedia(mediaIdOrUrl: string, chatId?: string, messageId?: string): Promise<Buffer> {
  if (activeProvider === 'openwa' && chatId && messageId) {
    const buf = await openwa.downloadOpenWAMedia(chatId, messageId)
    if (buf) return buf
    throw new Error('OpenWA media download returned no bytes.')
  }

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
