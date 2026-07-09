import { http, HttpResponse } from 'msw'

// ── Fixtures ──────────────────────────────────────────────────────────────────

export const MOCK_USER = {
  id: 'user_01',
  name: 'Ravi Sharma',
  email: 'ravi@brisvora.com',
  phone: '+918850908790',
  role: 'BROKER',
}

export const MOCK_LISTINGS = [
  {
    id: 'prop_01',
    slug: 'luxury-3bhk-bandra-west-mumbai-abc123',
    title: 'Luxury 3BHK in Bandra West',
    city: 'Mumbai',
    price: 8500000,
    priceLabel: '₹85 Lakh',
    type: 'APARTMENT',
    status: 'ACTIVE',
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1200,
    description: 'Premium 3BHK apartment in the heart of Bandra West.',
    address: 'Bandra West, Mumbai',
    features: ['Parking', 'Gym', 'Swimming Pool'],
    amenities: ['24/7 Security', 'Power Backup'],
    images: [{ url: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', order: 0 }],
    analytics: { viewCount: 142 },
    _count: { leads: 7 },
    createdAt: '2026-06-01T10:00:00Z',
  },
  {
    id: 'prop_02',
    slug: 'sea-view-villa-juhu-mumbai-def456',
    title: 'Sea View Villa in Juhu',
    city: 'Mumbai',
    price: 25000000,
    priceLabel: '₹2.5 Cr',
    type: 'VILLA',
    status: 'ACTIVE',
    bedrooms: 5,
    bathrooms: 4,
    areaSqft: 3500,
    description: 'Stunning sea-facing villa with private pool.',
    address: 'Juhu, Mumbai',
    features: ['Private Pool', 'Sea View', 'Garden'],
    amenities: ['Staff Quarters', 'Home Theatre'],
    images: [{ url: 'https://res.cloudinary.com/demo/image/upload/sample2.jpg', order: 0 }],
    analytics: { viewCount: 89 },
    _count: { leads: 3 },
    createdAt: '2026-06-15T10:00:00Z',
  },
]

export const MOCK_LEADS = [
  {
    id: 'lead_01',
    name: 'Priya Mehta',
    phone: '+919876543210',
    message: 'Interested in the 3BHK. Can we schedule a visit?',
    source: 'whatsapp',
    createdAt: '2026-07-01T09:00:00Z',
    property: { id: 'prop_01', title: 'Luxury 3BHK in Bandra West', slug: 'luxury-3bhk-bandra-west-mumbai-abc123' },
  },
  {
    id: 'lead_02',
    name: 'Arjun Singh',
    phone: '+919123456789',
    message: 'What is the final price?',
    source: 'web',
    createdAt: '2026-07-02T14:30:00Z',
    property: { id: 'prop_01', title: 'Luxury 3BHK in Bandra West', slug: 'luxury-3bhk-bandra-west-mumbai-abc123' },
  },
  {
    id: 'lead_03',
    name: null,
    phone: null,
    message: 'Please contact me.',
    source: 'web',
    createdAt: '2026-07-03T11:00:00Z',
    property: { id: 'prop_02', title: 'Sea View Villa in Juhu', slug: 'sea-view-villa-juhu-mumbai-def456' },
  },
]

export const MOCK_ANALYTICS = {
  totalListings: 2,
  activeListings: 2,
  totalViews: 231,
  totalLeads: 10,
  whatsappLeads: 7,
  webLeads: 3,
  conversionRate: 4.3,
  topListings: MOCK_LISTINGS.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    views: p.analytics?.viewCount ?? 0,
    leads: p._count.leads,
    conversionRate: p.analytics?.viewCount && p.analytics.viewCount > 0
      ? Math.round((p._count.leads / p.analytics.viewCount) * 100 * 10) / 10
      : 0,
  })),
  properties: MOCK_LISTINGS.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    analytics: p.analytics,
    _count: p._count,
  })),
}

// ── Handlers ──────────────────────────────────────────────────────────────────

export const handlers = [

  // ── Auth ──
  http.post('/api/register', async ({ request }) => {
    const body = await request.json() as Record<string, string>
    if (!body.email || !body.password) {
      return HttpResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }
    if (body.email === 'existing@brisvora.com') {
      return HttpResponse.json({ error: 'Email already registered' }, { status: 409 })
    }
    return HttpResponse.json({ id: 'user_new', email: body.email }, { status: 201 })
  }),

  // ── Broker Listings ──
  http.get('/api/broker/listings', () => {
    return HttpResponse.json(MOCK_LISTINGS)
  }),

  http.post('/api/broker/listings', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>
    if (!body.title || !body.price) {
      return HttpResponse.json({ error: 'Title and price are required' }, { status: 400 })
    }
    return HttpResponse.json({ id: 'prop_new', slug: 'new-listing-xyz', ...body }, { status: 201 })
  }),

  http.put('/api/broker/listings/:id', async ({ params, request }) => {
    const body = await request.json() as Record<string, unknown>
    if (params.id === 'prop_notfound') {
      return HttpResponse.json({ error: 'Listing not found' }, { status: 404 })
    }
    return HttpResponse.json({ id: params.id, ...body })
  }),

  http.delete('/api/broker/listings/:id', ({ params }) => {
    if (params.id === 'prop_notfound') {
      return HttpResponse.json({ error: 'Listing not found' }, { status: 404 })
    }
    return HttpResponse.json({ success: true })
  }),

  // ── Public Properties ──
  http.get('/api/properties', ({ request }) => {
    const url = new URL(request.url)
    const city = url.searchParams.get('city')
    const results = city
      ? MOCK_LISTINGS.filter(p => p.city.toLowerCase().includes(city.toLowerCase()))
      : MOCK_LISTINGS
    return HttpResponse.json(results)
  }),

  http.get('/api/properties/:slug', ({ params }) => {
    const listing = MOCK_LISTINGS.find(p => p.slug === params.slug)
    if (!listing) {
      return HttpResponse.json({ error: 'Property not found' }, { status: 404 })
    }
    return HttpResponse.json(listing)
  }),

  // ── Leads ──
  http.get('/api/broker/leads', () => {
    return HttpResponse.json(MOCK_LEADS)
  }),

  http.post('/api/leads', async ({ request }) => {
    const body = await request.json() as Record<string, string>
    if (!body.propertyId) {
      return HttpResponse.json({ error: 'propertyId is required' }, { status: 400 })
    }
    return HttpResponse.json({ id: 'lead_new', ...body }, { status: 201 })
  }),

  // ── Analytics ──
  http.get('/api/broker/analytics', () => {
    return HttpResponse.json(MOCK_ANALYTICS)
  }),

  // ── Upload ──
  http.post('/api/upload', async ({ request }) => {
    const contentType = request.headers.get('content-type') ?? ''
    const mockFile = request.headers.get('x-mock-file')
    // Accept either multipart FormData or plain body with mock header
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      if (!formData.get('file')) {
        return HttpResponse.json({ error: 'No file provided' }, { status: 400 })
      }
    } else if (!mockFile && !contentType) {
      return HttpResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    return HttpResponse.json({
      url: 'https://res.cloudinary.com/demo/image/upload/mock-upload.jpg',
      publicId: 'mock-upload',
    })
  }),

  // ── Broker Profile ──
  http.get('/api/broker/profile', () => {
    return HttpResponse.json(MOCK_USER)
  }),

  http.put('/api/broker/profile', async ({ request }) => {
    const body = await request.json() as Record<string, string>
    return HttpResponse.json({ ...MOCK_USER, ...body })
  }),
]

// ── Edge Case Handler Overrides (import these in specific tests) ──────────────

export const edgeCaseHandlers = {

  // Empty states
  emptyListings: http.get('/api/broker/listings', () => HttpResponse.json([])),
  emptyLeads: http.get('/api/broker/leads', () => HttpResponse.json([])),
  zeroAnalytics: http.get('/api/broker/analytics', () =>
    HttpResponse.json({ totalListings: 0, totalViews: 0, totalLeads: 0, properties: [] })
  ),

  // Network errors
  listingsNetworkError: http.get('/api/broker/listings', () => HttpResponse.error()),
  leadsNetworkError: http.get('/api/broker/leads', () => HttpResponse.error()),
  analyticsNetworkError: http.get('/api/broker/analytics', () => HttpResponse.error()),
  uploadNetworkError: http.post('/api/upload', () => HttpResponse.error()),

  // Server errors
  listings500: http.get('/api/broker/listings', () =>
    HttpResponse.json({ error: 'Internal server error' }, { status: 500 })
  ),
  leads500: http.get('/api/broker/leads', () =>
    HttpResponse.json({ error: 'Internal server error' }, { status: 500 })
  ),
  register500: http.post('/api/register', () =>
    HttpResponse.json({ error: 'Internal server error' }, { status: 500 })
  ),

  // Auth errors
  unauthorized: http.get('/api/broker/listings', () =>
    HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
  ),
  forbidden: http.get('/api/broker/listings', () =>
    HttpResponse.json({ error: 'Forbidden' }, { status: 403 })
  ),

  // Validation errors
  registerMissingEmail: http.post('/api/register', () =>
    HttpResponse.json({ error: 'Email is required' }, { status: 400 })
  ),
  registerDuplicateEmail: http.post('/api/register', () =>
    HttpResponse.json({ error: 'Email already registered' }, { status: 409 })
  ),
  leadMissingPropertyId: http.post('/api/leads', () =>
    HttpResponse.json({ error: 'propertyId is required' }, { status: 400 })
  ),

  // Slow responses (for loading state tests)
  slowListings: http.get('/api/broker/listings', async () => {
    await new Promise(r => setTimeout(r, 2000))
    return HttpResponse.json([])
  }),

  // Single listing (minimal data)
  singleListing: http.get('/api/broker/listings', () =>
    HttpResponse.json([MOCK_LISTINGS[0]])
  ),

  // Property not found
  propertyNotFound: http.get('/api/properties/:slug', () =>
    HttpResponse.json({ error: 'Property not found' }, { status: 404 })
  ),
}
