import { describe, it, expect } from 'vitest'
import { server } from '../src/mocks/server'
import {
  MOCK_LISTINGS,
  MOCK_LEADS,
  edgeCaseHandlers,
} from '../src/mocks/handlers'

// ── Helper ────────────────────────────────────────────────────────────────────
const BASE = 'http://localhost:3000'
const get = (path: string) => fetch(`${BASE}${path}`)
const post = (path: string, body: unknown) =>
  fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
const put = (path: string, body: unknown) =>
  fetch(`${BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
const del = (path: string) => fetch(`${BASE}${path}`, { method: 'DELETE' })

// ── Broker Listings ───────────────────────────────────────────────────────────
describe('GET /api/broker/listings', () => {
  it('returns listings array', async () => {
    const res = await get('/api/broker/listings')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toHaveLength(2)
    expect(data[0]).toMatchObject({ id: 'prop_01', title: 'Luxury 3BHK in Bandra West' })
  })

  it('returns empty array when broker has no listings', async () => {
    server.use(edgeCaseHandlers.emptyListings)
    const res = await get('/api/broker/listings')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toEqual([])
  })

  it('returns 401 when unauthenticated', async () => {
    server.use(edgeCaseHandlers.unauthorized)
    const res = await get('/api/broker/listings')
    expect(res.status).toBe(401)
  })

  it('returns 500 on server error', async () => {
    server.use(edgeCaseHandlers.listings500)
    const res = await get('/api/broker/listings')
    expect(res.status).toBe(500)
  })
})

describe('POST /api/broker/listings', () => {
  it('creates a listing with valid data', async () => {
    const res = await post('/api/broker/listings', {
      title: '2BHK in Andheri',
      price: 6500000,
      city: 'Mumbai',
      type: 'APARTMENT',
    })
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data).toHaveProperty('id')
    expect(data.title).toBe('2BHK in Andheri')
  })

  it('returns 400 when title is missing', async () => {
    const res = await post('/api/broker/listings', { price: 5000000 })
    expect(res.status).toBe(400)
  })

  it('returns 400 when price is missing', async () => {
    const res = await post('/api/broker/listings', { title: 'Test Listing' })
    expect(res.status).toBe(400)
  })
})

describe('PUT /api/broker/listings/:id', () => {
  it('updates an existing listing', async () => {
    const res = await put('/api/broker/listings/prop_01', { title: 'Updated Title' })
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.title).toBe('Updated Title')
  })

  it('returns 404 for non-existent listing', async () => {
    const res = await put('/api/broker/listings/prop_notfound', { title: 'X' })
    expect(res.status).toBe(404)
  })
})

describe('DELETE /api/broker/listings/:id', () => {
  it('deletes an existing listing', async () => {
    const res = await del('/api/broker/listings/prop_01')
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.success).toBe(true)
  })

  it('returns 404 for non-existent listing', async () => {
    const res = await del('/api/broker/listings/prop_notfound')
    expect(res.status).toBe(404)
  })
})

// ── Public Properties ─────────────────────────────────────────────────────────
describe('GET /api/properties', () => {
  it('returns all active listings', async () => {
    const res = await get('/api/properties')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toHaveLength(2)
  })

  it('filters by city', async () => {
    const res = await get('/api/properties?city=Mumbai')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.every((p: typeof MOCK_LISTINGS[0]) => p.city === 'Mumbai')).toBe(true)
  })

  it('returns empty array for city with no listings', async () => {
    const res = await get('/api/properties?city=Kolkata')
    const data = await res.json()
    expect(data).toEqual([])
  })
})

describe('GET /api/properties/:slug', () => {
  it('returns a listing by slug', async () => {
    const res = await get('/api/properties/luxury-3bhk-bandra-west-mumbai-abc123')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.id).toBe('prop_01')
  })

  it('returns 404 for unknown slug', async () => {
    server.use(edgeCaseHandlers.propertyNotFound)
    const res = await get('/api/properties/does-not-exist')
    expect(res.status).toBe(404)
  })
})

// ── Leads ─────────────────────────────────────────────────────────────────────
describe('GET /api/broker/leads', () => {
  it('returns leads array', async () => {
    const res = await get('/api/broker/leads')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toHaveLength(3)
  })

  it('returns empty array when no leads', async () => {
    server.use(edgeCaseHandlers.emptyLeads)
    const res = await get('/api/broker/leads')
    const data = await res.json()
    expect(data).toEqual([])
  })

  it('handles leads with null name and phone', async () => {
    const res = await get('/api/broker/leads')
    const data = await res.json()
    const nullLead = data.find((l: typeof MOCK_LEADS[0]) => l.name === null)
    expect(nullLead).toBeDefined()
    expect(nullLead.phone).toBeNull()
  })

  it('returns 500 on server error', async () => {
    server.use(edgeCaseHandlers.leads500)
    const res = await get('/api/broker/leads')
    expect(res.status).toBe(500)
  })
})

describe('POST /api/leads', () => {
  it('creates a lead with valid data', async () => {
    const res = await post('/api/leads', {
      propertyId: 'prop_01',
      name: 'Test User',
      phone: '+919999999999',
      message: 'Interested',
      source: 'web',
    })
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data).toHaveProperty('id')
  })

  it('creates a lead with only propertyId (anonymous)', async () => {
    const res = await post('/api/leads', { propertyId: 'prop_01' })
    expect(res.status).toBe(201)
  })

  it('returns 400 when propertyId is missing', async () => {
    server.use(edgeCaseHandlers.leadMissingPropertyId)
    const res = await post('/api/leads', { name: 'Test' })
    expect(res.status).toBe(400)
  })
})

// ── Analytics ─────────────────────────────────────────────────────────────────
describe('GET /api/broker/analytics', () => {
  it('returns analytics summary', async () => {
    const res = await get('/api/broker/analytics')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data).toMatchObject({
      totalListings: 2,
      totalViews: 231,
      totalLeads: 10,
    })
  })

  it('returns zero analytics for new broker', async () => {
    server.use(edgeCaseHandlers.zeroAnalytics)
    const res = await get('/api/broker/analytics')
    const data = await res.json()
    expect(data.totalListings).toBe(0)
    expect(data.totalViews).toBe(0)
    expect(data.totalLeads).toBe(0)
    expect(data.properties).toEqual([])
  })

  it('returns 500 on server error', async () => {
    server.use(edgeCaseHandlers.analyticsNetworkError)
    await expect(get('/api/broker/analytics')).rejects.toThrow()
  })
})

// ── Registration ──────────────────────────────────────────────────────────────
describe('POST /api/register', () => {
  it('registers a new broker', async () => {
    const res = await post('/api/register', {
      email: 'newbroker@example.com',
      password: 'SecurePass123!',
      name: 'New Broker',
    })
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.email).toBe('newbroker@example.com')
  })

  it('returns 409 for duplicate email', async () => {
    server.use(edgeCaseHandlers.registerDuplicateEmail)
    const res = await post('/api/register', {
      email: 'existing@example.com',
      password: 'pass123',
    })
    expect(res.status).toBe(409)
    const data = await res.json()
    expect(data.error).toMatch(/already registered/i)
  })

  it('returns 400 when email is missing', async () => {
    const res = await post('/api/register', { password: 'pass123' })
    expect(res.status).toBe(400)
  })

  it('returns 400 when password is missing', async () => {
    const res = await post('/api/register', { email: 'test@test.com' })
    expect(res.status).toBe(400)
  })

  it('returns 500 on server error', async () => {
    server.use(edgeCaseHandlers.register500)
    const res = await post('/api/register', { email: 'a@b.com', password: 'pass' })
    expect(res.status).toBe(500)
  })
})

// ── Upload ────────────────────────────────────────────────────────────────────
describe('POST /api/upload', () => {
  it('uploads a file and returns cloudinary url', async () => {
    // Use multipart/form-data with a plain string body to avoid jsdom Blob timeout
    const res = await fetch(`${BASE}/api/upload`, {
      method: 'POST',
      headers: { 'x-mock-file': 'test.jpg' },
      body: 'fake-image-data',
    })
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data).toHaveProperty('url')
    expect(data.url).toContain('cloudinary.com')
  })

  it('returns 400 when no file is provided', async () => {
    const formData = new FormData()
    const res = await fetch(`${BASE}/api/upload`, { method: 'POST', body: formData })
    expect(res.status).toBe(400)
  })

  it('handles network error on upload', async () => {
    server.use(edgeCaseHandlers.uploadNetworkError)
    await expect(
      fetch(`${BASE}/api/upload`, { method: 'POST', body: 'img' })
    ).rejects.toThrow()
  })
})

// ── Broker Profile ────────────────────────────────────────────────────────────
describe('GET /api/broker/profile', () => {
  it('returns broker profile', async () => {
    const res = await get('/api/broker/profile')
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.email).toBe('ravi@example.com')
    expect(data.role).toBe('BROKER')
  })
})

describe('PUT /api/broker/profile', () => {
  it('updates broker profile', async () => {
    const res = await put('/api/broker/profile', { name: 'Ravi Kumar' })
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.name).toBe('Ravi Kumar')
  })
})
