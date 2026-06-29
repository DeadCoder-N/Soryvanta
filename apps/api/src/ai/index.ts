import type { GeneratedListing, ListingGenerationInput } from '@brisvora/shared'

export async function generateListing(input: ListingGenerationInput): Promise<GeneratedListing> {
  const raw = input.rawMessage.toLowerCase()

  // Extract basic hints from the raw message for slightly dynamic mock data
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
