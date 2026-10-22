import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  verifyOpenWASignature,
  parseOpenWAInbound,
  extractOpenWAMediaBuffers,
  OpenWAWebhookDelivery,
} from '@marketing-os/api'

const secret = '0123456789abcdef0123456789abcdef'

function sign(raw: string): string {
  // eslint-disable-next-line no-restricted-syntax
  const crypto = require('crypto')
  return 'sha256=' + crypto.createHmac('sha256', secret).update(raw).digest('hex')
}

function delivery(over: Partial<OpenWAWebhookDelivery> = {}): OpenWAWebhookDelivery {
  return {
    event: 'message.received',
    timestamp: '2026-10-22T13:30:00.000Z',
    sessionId: 'marketing-os-secondary',
    idempotencyKey: 'msg_test_3EB0ABC123',
    deliveryId: 'dlv_550e8400-e29b-41d4-a716-446655440000',
    data: {
      id: '3EB0ABC123',
      from: '919876543210@c.us',
      to: '919876543210@c.us',
      body: '2 BHK in Andheri, 1.2 crore',
      type: 'chat',
      timestamp: 1787000000,
      isGroup: false,
      kind: 'individual',
      fromMe: false,
      chatId: '919876543210@c.us',
    },
    ...over,
  }
}

describe('verifyOpenWASignature', () => {
  it('accepts a valid HMAC over the raw body', () => {
    const raw = JSON.stringify(delivery())
    expect(verifyOpenWASignature(Buffer.from(raw), sign(raw), secret)).toBe(true)
  })

  it('rejects a tampered body even with a valid-looking header', () => {
    const raw = JSON.stringify(delivery())
    const forged = JSON.stringify(delivery({ data: { ...delivery().data, body: 'injected' } }))
    expect(verifyOpenWASignature(Buffer.from(forged), sign(raw), secret)).toBe(false)
  })

  it('rejects a non-sha256 header', () => {
    const raw = JSON.stringify(delivery())
    expect(verifyOpenWASignature(Buffer.from(raw), 'md5=abc', secret)).toBe(false)
  })

  it('rejects when no secret is configured', () => {
    const raw = JSON.stringify(delivery())
    expect(verifyOpenWASignature(Buffer.from(raw), sign(raw), '')).toBe(false)
  })
})

describe('parseOpenWAInbound', () => {
  it('normalizes a text message', () => {
    const m = parseOpenWAInbound(delivery())
    expect(m).not.toBeNull()
    expect(m!.waId).toBe('919876543210')
    expect(m!.body).toBe('2 BHK in Andheri, 1.2 crore')
    expect(m!.contactId).toBe('919876543210@c.us')
  })

  it('drops own-sends (fromMe)', () => {
    expect(parseOpenWAInbound(delivery({ data: { ...delivery().data, fromMe: true } }))).toBeNull()
  })

  it('drops group messages', () => {
    expect(parseOpenWAInbound(delivery({ data: { ...delivery().data, isGroup: true, kind: 'group' } }))).toBeNull()
  })

  it('drops messages without a chatId', () => {
    expect(parseOpenWAInbound(delivery({ data: { ...delivery().data, chatId: '' } }))).toBeNull()
  })
})

describe('extractOpenWAMediaBuffers', () => {
  it('returns the inline base64 buffer for an image', () => {
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47]).toString('base64')
    const d = delivery({ data: { ...delivery().data, type: 'image', media: { mimetype: 'image/png', data: png } } })
    const bufs = extractOpenWAMediaBuffers(d)
    expect(bufs.length).toBe(1)
    expect(bufs[0]!.toString('hex')).toBe('89504e47')
  })

  it('returns nothing for omitted (over-cap) media', () => {
    const d = delivery({ data: { ...delivery().data, media: { mimetype: 'image/png', omitted: true, sizeBytes: 2_000_000 } } })
    expect(extractOpenWAMediaBuffers(d)).toEqual([])
  })
})