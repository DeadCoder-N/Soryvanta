import Anthropic from '@anthropic-ai/sdk'
import type { GeneratedListing, ListingGenerationInput } from '@brisvora/shared'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export async function generateListing(input: ListingGenerationInput): Promise<GeneratedListing> {
  const raw = input.rawMessage

  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('ANTHROPIC_API_KEY not set. Falling back to mock generator.')
    return mockGenerateListing(input)
  }

  try {
    const msg = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: `You are an expert luxury real estate copywriter and data extractor. Your task is to extract information from messy, informal text messages from brokers and generate a highly polished, professional property listing.
Output ONLY the requested JSON data using the provided tool.
If some information is missing (like bedrooms, bathrooms, exact price, or area), make a highly educated guess based on the context, city, or standard real estate configurations.
Keep the description elegant, highlighting luxury, comfort, and premium lifestyle. Use correct spelling and grammar regardless of the input.`,
      messages: [{ role: 'user', content: raw }],
      tools: [{
        name: 'extract_property_details',
        description: 'Extract and format the property details into a structured listing.',
        input_schema: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Catchy, elegant title (e.g., "Spacious 3 BHK Apartment in Bandra West")' },
            description: { type: 'string', description: '2-3 paragraphs of polished, luxury-focused description. Make it sound appealing.' },
            address: { type: 'string', description: 'Specific neighborhood, locality, or address extracted from text' },
            city: { type: 'string', description: 'The city name. Capitalized.' },
            price: { type: 'number', description: 'Exact numeric price in INR (e.g., 18000000 for 1.8 Cr)' },
            priceLabel: { type: 'string', description: 'Human readable short price (e.g., "₹1.8 Cr", "₹85 L")' },
            bedrooms: { type: 'number', description: 'Number of bedrooms (null if plot/commercial)' },
            bathrooms: { type: 'number', description: 'Number of bathrooms' },
            areaSqft: { type: 'number', description: 'Area in square feet' },
            type: { type: 'string', enum: ['APARTMENT', 'HOUSE', 'VILLA', 'PLOT', 'COMMERCIAL', 'OTHER'] },
            features: { type: 'array', items: { type: 'string' }, description: '5-8 specific features (e.g., "Modular Kitchen", "Sea View", "Vastu Compliant")' },
            amenities: { type: 'array', items: { type: 'string' }, description: '3-6 nearby amenities (e.g., "Near Metro", "Shopping Mall", "Schools")' }
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
        ...data,
        bedrooms: data.bedrooms ?? undefined,
        bathrooms: data.bathrooms ?? undefined,
        areaSqft: data.areaSqft ?? undefined,
      } as GeneratedListing
    }
    
    throw new Error('Claude did not return tool usage.')
  } catch (error) {
    console.error('Anthropic API Error:', error)
    console.warn('Falling back to mock generator.')
    return mockGenerateListing(input)
  }
}

// Fallback regex logic in case API fails
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
