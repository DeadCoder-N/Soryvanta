/**
 * OpenWA provider adapter.
 *
 * Implements the WhatsApp provider boundary used by the Marketing OS
 * property-listing workflow. Drives the OpenWA REST API exclusively using the
 * documented contract (see https://github.com/rmyndharis/OpenWA):
 *
 *   Outbound  POST /api/sessions/:sessionId/messages/send-text
 *             body { chatId, text, mentions? } -> { messageId, timestamp }
 *   Inbound   Webhook deliveries of `message.received` carry the full message
 *             object under `data`: { id, from, to, body, type, timestamp,
 *             isGroup, kind, fromMe, chatId, media{...} }
 *   Signature X-OpenWA-Signature: sha256=<hex> (HMAC-SHA256 over the RAW body
 *             bytes, keyed by the webhook `secret`).
 *   Idempotency X-OpenWA-Idempotency-Key (stable across retries).
 *   Media     GET /api/sessions/:sessionId/messages/:chatId/:messageId/media
 *             -> raw bytes (archive first, inline base64 fallback).
 *
 * Configuration (env):
 *   OPENWA_API_BASE_URL   - base URL, e.g. http://127.0.0.1:2785/api
 *   OPENWA_API_KEY        - API key (X-API-Key). Never committed.
 *   OPENWA_SESSION_ID     - the created session UUID.
 *   OPENWA_WEBHOOK_SECRET - HMAC signing secret set on the webhook.
 */

import crypto from 'crypto'
import type { WhatsAppInboundMessage, WhatsAppOutboundMessage } from '@marketing-os/shared'

const BASE = (process.env.OPENWA_API_BASE_URL || 'http://127.0.0.1:2785/api').replace(/\/$/, '')
const API_KEY = process.env.OPENWA_API_KEY || ''
const SESSION_ID = process.env.OPENWA_SESSION_ID || ''

if (!API_KEY) console.warn('[OpenWA] OPENWA_API_KEY is not set; outbound sends will fail')
if (!SESSION_ID) console.warn('[OpenWA] OPENWA_SESSION_ID is not set; outbound sends will fail')

function headers(extra: Record<string, string> = {}) {
  return { 'X-API-Key': API_KEY, 'Content-Type': 'application/json', ...extra }
}

export interface OpenWAMessage {
  id: string
  from: string
  to: string
  body: string
  type: string
  timestamp: number
  isGroup: boolean
  kind: string
  fromMe: boolean
  chatId: string
  media?: {
    mimetype?: string
    filename?: string
    data?: string
    omitted?: boolean
    sizeBytes?: number
  }
}

export interface OpenWAWebhookDelivery {
  event: string
  timestamp: string
  sessionId: string
  idempotencyKey: string
  deliveryId: string
  data: OpenWAMessage
}

/** Extract inline media buffers from an OpenWA webhook delivery.
 *
 * OpenWA inlines inbound media as base64 in `data.media.data` when it is
 * under `WEBHOOK_MEDIA_INLINE_MAX_BYTES` (default 1 MiB); larger blobs arrive
 * as `media.omitted: true` and must be fetched from the stored-message media
 * endpoint. Returns one Buffer per media item, in order.
 */
export function extractOpenWAMediaBuffers(delivery: OpenWAWebhookDelivery): Buffer[] {
  const media = delivery?.data?.media
  if (!media || media.omitted) return []
  if (!media.data) return []
  try {
    return [Buffer.from(media.data, 'base64')]
  } catch {
    return []
  }
}

/** Verify the HMAC-SHA256 signature over the RAW request body bytes. */
export function verifyOpenWASignature(rawBody: Buffer, signatureHeader: string | null, secret: string): boolean {
  if (!secret) return false
  if (typeof signatureHeader !== 'string' || !signatureHeader.startsWith('sha256=')) return false
  const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
  const a = Buffer.from(signatureHeader)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

/** Parse an OpenWA webhook delivery into our normalized inbound message. */
export function parseOpenWAInbound(delivery: OpenWAWebhookDelivery): WhatsAppInboundMessage | null {
  const data = delivery?.data
  if (!data || !data.id) return null
  if (data.fromMe) return null
  if (data.kind === 'group' || data.isGroup) return null
  if (!data.chatId) return null

  const phone = String(data.from ?? '').replace(/\D/g, '')
  if (phone.length < 10) return null

  let body = typeof data.body === 'string' ? data.body : ''
  const mediaUrls: string[] = []

  if (data.media && !data.media.omitted) {
    if (data.media.data) mediaUrls.push(`inline:${data.media.mimetype || 'image'}:${data.media.filename || ''}`)
  }

  if (!body && mediaUrls.length === 0) return null
  if (!body) body = '[photo]'

  return {
    from: data.from,
    waId: phone,
    body,
    contactId: data.chatId,
    mediaUrls: mediaUrls.length ? mediaUrls : undefined,
    timestamp: String(data.timestamp ?? Date.now() / 1000),
  }
}

/** Send a text message via OpenWA. Returns the OpenWA message id or null. */
export async function sendOpenWAMessage(to: string, body: string): Promise<string | null> {
  if (!API_KEY || !SESSION_ID) {
    console.error('[OpenWA] Cannot send: OPENWA_API_KEY or OPENWA_SESSION_ID missing')
    return null
  }
  const url = `${BASE}/sessions/${SESSION_ID}/messages/send-text`
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ chatId: to, text: body }),
    })
    const text = await res.text()
    let json: any = null
    try { json = JSON.parse(text) } catch { /* non-JSON body */ }
    if (!res.ok) {
      console.error('[OpenWA] send-text failed:', res.status, text.slice(0, 500))
      return null
    }
    return json?.messageId ?? null
  } catch (err) {
    console.error('[OpenWA] send-text error:', err)
    return null
  }
}

/** Download inbound media bytes for a stored message. Returns a Buffer or null. */
export async function downloadOpenWAMedia(chatId: string, messageId: string): Promise<Buffer | null> {
  if (!API_KEY || !SESSION_ID) {
    console.error('[OpenWA] Cannot download media: OPENWA_API_KEY or OPENWA_SESSION_ID missing')
    return null
  }
  const url = `${BASE}/sessions/${SESSION_ID}/messages/${encodeURIComponent(chatId)}/${encodeURIComponent(messageId)}/media`
  try {
    const res = await fetch(url, { headers: { 'X-API-Key': API_KEY } })
    if (!res.ok) {
      console.error('[OpenWA] media download failed:', res.status)
      return null
    }
    return Buffer.from(await res.arrayBuffer())
  } catch (err) {
    console.error('[OpenWA] media download error:', err)
    return null
  }
}

/** Resolve an inbound media reference to a Buffer for the Cloudinary upload flow. */
export async function resolveOpenWAMediaBuffer(mediaRef: string, chatId: string, messageId: string): Promise<Buffer | null> {
  if (mediaRef.startsWith('inline:')) return null
  return downloadOpenWAMedia(chatId, messageId)
}

export const openwaProvider = {
  name: 'openwa' as const,
  send: (msg: WhatsAppOutboundMessage) => sendOpenWAMessage(msg.to, msg.body),
  downloadMedia: (chatId: string, messageId: string) => downloadOpenWAMedia(chatId, messageId),
}