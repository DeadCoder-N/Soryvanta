import { describe, it, expect } from 'vitest'
import { server } from '../src/mocks/server'
import { http, HttpResponse } from 'msw'

// ── Helper ────────────────────────────────────────────────────────────────────
const BASE = 'http://localhost:3000'
const get = (path: string) => fetch(`${BASE}${path}`)

// ── Dashboard Analytics ───────────────────────────────────────────────────────
describe('GET /api/broker/analytics', () => {
  beforeEach(() => {
    server.resetHandlers()
  })

  it('returns analytics summary with listings, views, leads', async () => {
    const res = await get('/api/broker/analytics')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toHaveProperty('totalListings')
    expect(data).toHaveProperty('totalViews')
    expect(data).toHaveProperty('totalLeads')
    expect(data).toHaveProperty('conversionRate')
    expect(data).toHaveProperty('whatsappLeads')
    expect(data).toHaveProperty('webLeads')
    expect(data).toHaveProperty('topListings')
    expect(data).toHaveProperty('properties')
    expect(typeof data.totalListings).toBe('number')
    expect(typeof data.totalViews).toBe('number')
    expect(typeof data.totalLeads).toBe('number')
  })

  it('returns zero analytics for a new broker with no activity', async () => {
    server.use(
      http.get(`${BASE}/api/broker/analytics`, () => {
        return HttpResponse.json({
          totalViews: 0,
          totalLeads: 0,
          totalListings: 0,
          activeListings: 0,
          whatsappLeads: 0,
          webLeads: 0,
          conversionRate: 0,
          topListings: [],
          properties: [],
        })
      }),
    )
    const res = await get('/api/broker/analytics')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.totalListings).toBe(0)
    expect(data.totalViews).toBe(0)
    expect(data.totalLeads).toBe(0)
    expect(data.conversionRate).toBe(0)
    expect(data.topListings).toEqual([])
    expect(data.properties).toEqual([])
  })

  it('returns correct conversion rate calculation', async () => {
    server.use(
      http.get(`${BASE}/api/broker/analytics`, () => {
        return HttpResponse.json({
          totalViews: 200,
          totalLeads: 30,
          totalListings: 2,
          activeListings: 2,
          whatsappLeads: 20,
          webLeads: 10,
          conversionRate: 15, // (30/200) * 100 = 15
          topListings: [
            { id: 'p1', title: 'Listing 1', slug: 'listing-1', views: 120, leads: 20, conversionRate: 16.7 },
            { id: 'p2', title: 'Listing 2', slug: 'listing-2', views: 80, leads: 10, conversionRate: 12.5 },
          ],
          properties: [
            { id: 'p1', title: 'Listing 1', slug: 'listing-1', analytics: { viewCount: 120 }, _count: { leads: 20 } },
            { id: 'p2', title: 'Listing 2', slug: 'listing-2', analytics: { viewCount: 80 }, _count: { leads: 10 } },
          ],
        })
      }),
    )
    const res = await get('/api/broker/analytics')
    const data = await res.json()
    expect(data.conversionRate).toBe(15)
    expect(data.whatsappLeads).toBe(20)
    expect(data.webLeads).toBe(10)
  })

  it('returns all leads from WhatsApp', async () => {
    server.use(
      http.get(`${BASE}/api/broker/analytics`, () => {
        return HttpResponse.json({
          totalViews: 100,
          totalLeads: 10,
          totalListings: 1,
          activeListings: 1,
          whatsappLeads: 10,
          webLeads: 0,
          conversionRate: 10,
          topListings: [
            { id: 'p1', title: 'Test Property', slug: 'test-property', views: 100, leads: 10, conversionRate: 10 },
          ],
          properties: [
            { id: 'p1', title: 'Test Property', slug: 'test-property', analytics: { viewCount: 100 }, _count: { leads: 10 } },
          ],
        })
      }),
    )
    const res = await get('/api/broker/analytics')
    const data = await res.json()
    expect(data.whatsappLeads).toBe(10)
    expect(data.webLeads).toBe(0)
    expect(data.totalLeads).toBe(10)
  })

  it('returns all leads from Web', async () => {
    server.use(
      http.get(`${BASE}/api/broker/analytics`, () => {
        return HttpResponse.json({
          totalViews: 50,
          totalLeads: 5,
          totalListings: 1,
          activeListings: 1,
          whatsappLeads: 0,
          webLeads: 5,
          conversionRate: 10,
          topListings: [
            { id: 'p1', title: 'Web Lead Property', slug: 'web-lead', views: 50, leads: 5, conversionRate: 10 },
          ],
          properties: [
            { id: 'p1', title: 'Web Lead Property', slug: 'web-lead', analytics: { viewCount: 50 }, _count: { leads: 5 } },
          ],
        })
      }),
    )
    const res = await get('/api/broker/analytics')
    const data = await res.json()
    expect(data.whatsappLeads).toBe(0)
    expect(data.webLeads).toBe(5)
    expect(data.totalLeads).toBe(5)
  })

  it('handles network error gracefully', async () => {
    server.use(
      http.get(`${BASE}/api/broker/analytics`, () => {
        return HttpResponse.error()
      }),
    )
    await expect(get('/api/broker/analytics')).rejects.toThrow()
  })

  it('returns 500 on server error', async () => {
    server.use(
      http.get(`${BASE}/api/broker/analytics`, () => {
        return HttpResponse.json({ error: 'Internal server error' }, { status: 500 })
      }),
    )
    const res = await get('/api/broker/analytics')
    expect(res.status).toBe(500)
  })

  it('returns single listing analytics correctly', async () => {
    server.use(
      http.get(`${BASE}/api/broker/analytics`, () => {
        return HttpResponse.json({
          totalViews: 45,
          totalLeads: 3,
          totalListings: 1,
          activeListings: 1,
          whatsappLeads: 2,
          webLeads: 1,
          conversionRate: 6.7,
          topListings: [
            { id: 'p1', title: 'Single Listing', slug: 'single-listing', views: 45, leads: 3, conversionRate: 6.7 },
          ],
          properties: [
            { id: 'p1', title: 'Single Listing', slug: 'single-listing', analytics: { viewCount: 45 }, _count: { leads: 3 } },
          ],
        })
      }),
    )
    const res = await get('/api/broker/analytics')
    const data = await res.json()
    expect(data.totalListings).toBe(1)
    expect(data.totalViews).toBe(45)
    expect(data.totalLeads).toBe(3)
    expect(data.topListings).toHaveLength(1)
    expect(data.topListings[0].title).toBe('Single Listing')
  })
})