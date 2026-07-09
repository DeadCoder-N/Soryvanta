import Anthropic from '@anthropic-ai/sdk'
import type { GeneratedListing, ListingGenerationInput } from '@brisvora/shared'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export type ListingResult = {
  listing: GeneratedListing
  mockDataUrl?: string
  level: 'claude' | 'regex-mock' | 'flask-mock'
}

export async function generateListing(input: ListingGenerationInput): Promise<ListingResult> {
  const raw = input.rawMessage
  const imageUrls = input.imageUrls ?? []
  const flaskApiUrl = process.env.NEXT_PUBLIC_FLASK_API_URL || 'http://localhost:5000'

  // ── LEVEL 1: Claude 3.5 Sonnet ────────────────────────────────
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const userContent: any[] = []
      for (const url of imageUrls) {
        userContent.push({
          type: 'image',
          source: { type: 'url', url },
        })
      }
      userContent.push({
        type: 'text',
        text: raw || 'Please analyze the property images above and generate a listing.',
      })

      console.log('[generateListing] Level 1 — Claude 3.5 Sonnet')
      console.log('[generateListing] Input text:', raw)
      console.log('[generateListing] Input images:', imageUrls)

      const msg = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2048,
        system: `You are an expert luxury real estate copywriter and data extractor. Extract structured listing data from informal broker messages. Output ONLY the requested JSON via the tool. Make educated guesses for missing fields based on context. Description must be polished, professional, and appeal to luxury buyers. Use correct spelling and grammar.`,
        messages: [{ role: 'user', content: userContent }],
        tools: [{
          name: 'extract_property_details',
          description: 'Extract property details into structured listing.',
          input_schema: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              description: { type: 'string' },
              address: { type: 'string' },
              city: { type: 'string' },
              price: { type: 'number' },
              priceLabel: { type: 'string' },
              bedrooms: { type: 'number' },
              bathrooms: { type: 'number' },
              areaSqft: { type: 'number' },
              type: { type: 'string', enum: ['APARTMENT', 'HOUSE', 'VILLA', 'PLOT', 'COMMERCIAL', 'OTHER'] },
              features: { type: 'array', items: { type: 'string' } },
              amenities: { type: 'array', items: { type: 'string' } }
            },
            required: ['title', 'description', 'address', 'city', 'price', 'priceLabel', 'type', 'features', 'amenities']
          }
        }],
        tool_choice: { type: 'tool', name: 'extract_property_details' }
      })

      const toolUse = msg.content.find(c => c.type === 'tool_use')
      if (toolUse && toolUse.type === 'tool_use') {
        const data = toolUse.input as any
        return {
          listing: {
            ...data,
            bedrooms: data.bedrooms ?? undefined,
            bathrooms: data.bathrooms ?? undefined,
            areaSqft: data.areaSqft ?? undefined,
          } as GeneratedListing,
          level: 'claude'
        }
      }
      throw new Error('Claude did not return tool usage.')
    } catch (error) {
      console.error('[generateListing] Level 1 failed:', (error as any)?.message)
      console.warn('[generateListing] Falling to Level 2 — Regex mock')
    }
  } else {
    console.warn('[generateListing] ANTHROPIC_API_KEY not set. Skipping Level 1.')
  }

  // ── LEVEL 2: Regex Mock Fallback ───────────────────────────────
  try {
    console.log('[generateListing] Level 2 — Regex mock')
    const regexResult = mockGenerateListing(input)
    return { listing: regexResult, level: 'regex-mock' }
  } catch (error) {
    console.error('[generateListing] Level 2 failed:', (error as any)?.message)
    console.warn('[generateListing] Falling to Level 3 — Flask JSON mock')
  }

  // ── LEVEL 3: Flask JSON Mock API ────────────────────────────────
  console.log('[generateListing] Level 3 — Flask JSON mock API')

  const rawLower = (raw || '').toLowerCase()
  let flaskType = 'apartment'
  let bhk = '2bhk'

  if (rawLower.includes('villa')) flaskType = 'villa'
  else if (rawLower.includes('plot') || rawLower.includes('land')) flaskType = 'plot'
  else if (rawLower.includes('commercial') || rawLower.includes('office') || rawLower.includes('shop')) flaskType = 'commercial'

  const bhkMatch = rawLower.match(/(\d)\s*bhk/)
  if (bhkMatch) {
    const n = parseInt(bhkMatch[1])
    if (n === 1) bhk = '1bhk'
    else if (n === 2) bhk = '2bhk'
    else if (n >= 3) bhk = '3bhk'
  }

  const mockUrl = `${flaskApiUrl}/api/mock/${flaskType}/${['villa', 'plot', 'commercial'].includes(flaskType) ? '' : bhk}`.replace(/\/$/, '')

  try {
    const response = await fetch(mockUrl)
    if (!response.ok) throw new Error(`Flask returned ${response.status}`)

    const flaskData = await response.json()
    const listing: GeneratedListing = {
      title: flaskData.title,
      description: flaskData.description,
      address: flaskData.address,
      city: flaskData.city,
      price: flaskData.price,
      priceLabel: flaskData.priceLabel,
      bedrooms: flaskData.bedrooms ?? undefined,
      bathrooms: flaskData.bathrooms ?? undefined,
      areaSqft: flaskData.areaSqft,
      type: flaskData.type,
      features: flaskData.features,
      amenities: flaskData.amenities,
    }

    return {
      listing,
      mockDataUrl: mockUrl,
      level: 'flask-mock'
    }
  } catch (error) {
    console.error('[generateListing] Level 3 failed:', (error as any)?.message)
    return {
      listing: {
        title: `Property in ${extractCity(raw || '')}`,
        description: `A well-maintained property located in a prime area of ${extractCity(raw || '')}. Features modern interiors and excellent connectivity.`,
        address: `Prime Location, ${extractCity(raw || '')}`,
        city: extractCity(raw || ''),
        price: 8500000,
        priceLabel: '₹85 L',
        bedrooms: 2,
        bathrooms: 2,
        areaSqft: 850,
        type: 'APARTMENT',
        features: ['Modular Kitchen', 'Car Parking', 'Power Backup'],
        amenities: ['Near Metro', 'Shopping Nearby'],
      },
      level: 'flask-mock'
    }
  }
}

/** Extract city name from raw message text. */
function extractCity(raw: string): string {
  const match = raw.toLowerCase().match(/\b(mumbai|delhi|bangalore|bengaluru|pune|hyderabad|chennai|kolkata|jaipur|ahmedabad|surat|lucknow|noida|gurgaon|gurugram)\b/i)
  return match ? match[1].charAt(0).toUpperCase() + match[1].slice(1) : 'Mumbai'
}

/** Level 2 fallback — regex-based extraction from raw message text. */
function mockGenerateListing(input: ListingGenerationInput): GeneratedListing {
  const raw = input.rawMessage.toLowerCase()

  const isVilla = raw.includes('villa')
  const isPlot = raw.includes('plot') || raw.includes('land')
  const isCommercial = raw.includes('commercial') || raw.includes('office') || raw.includes('shop')
  const isHouse = raw.includes('house') || raw.includes('bungalow')
  const type = isVilla ? 'VILLA' : isPlot ? 'PLOT' : isCommercial ? 'COMMERCIAL' : isHouse ? 'HOUSE' : 'APARTMENT'

  const bhkMatch = raw.match(/(\d)\s*bhk/)
  const bedrooms = bhkMatch ? parseInt(bhkMatch[1]) : 3

  const priceMatch = raw.match(/(\d+(\.\d+)?)\s*(cr|crore|l|lakh|lac)/i)
  let price = 8500000
  let priceLabel = '₹85 L'
  if (priceMatch) {
    const num = parseFloat(priceMatch[1])
    const unit = priceMatch[3].toLowerCase()
    if (unit.startsWith('c')) { price = num * 10000000; priceLabel = `₹${num} Cr` }
    else { price = num * 100000; priceLabel = `₹${num} L` }
  }

  const cityMatch = raw.match(/\b(mumbai|delhi|bangalore|bengaluru|pune|hyderabad|chennai|kolkata|jaipur|ahmedabad|surat|lucknow|noida|gurgaon|gurugram)\b/i)
  const city = cityMatch ? cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1) : 'Mumbai'

  return {
    title: `Spacious ${bedrooms} BHK ${type.charAt(0) + type.slice(1).toLowerCase()} in ${city}`,
    description: `This well-maintained ${bedrooms}-bedroom property is located in a prime area of ${city}. It features modern interiors, ample natural light, and excellent connectivity to major landmarks. Ideal for families looking for comfort and convenience in a vibrant neighbourhood.`,
    address: `Prime Location, ${city}`,
    city,
    price,
    priceLabel,
    bedrooms: isPlot ? undefined : bedrooms,
    bathrooms: isPlot ? undefined : Math.max(1, bedrooms - 1),
    areaSqft: isPlot ? 2400 : bedrooms * 400,
    type,
    features: ['Modular Kitchen', 'Car Parking', 'Power Backup', '24/7 Security', 'Lift Available'],
    amenities: ['Near Metro Station', 'Shopping Mall Nearby', 'Schools & Hospitals Close', 'Easy Highway Access'],
  }
}