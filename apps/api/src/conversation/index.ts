import { prisma } from '@brisvora/shared'

export type ConversationStateType = 
  | 'GREETING'
  | 'PROPERTY_TYPE'
  | 'LOCATION'
  | 'PRICE'
  | 'BEDROOMS'
  | 'AMENITIES'
  | 'CONFIRMATION'
  | 'GENERATING'

export interface ConversationContext {
  propertyType?: string
  location?: string
  price?: number
  bedrooms?: number
  amenities?: string[]
}

export async function getConversationState(userId: string) {
  return prisma.conversationState.findUnique({
    where: { userId },
  })
}

export async function setConversationState(
  userId: string,
  state: ConversationStateType,
  context: ConversationContext = {}
) {
  return prisma.conversationState.upsert({
    where: { userId },
    update: { state, context: context as any, lastMessageAt: new Date() },
    create: {
      userId,
      state,
      context: context as any,
      lastMessageAt: new Date(),
    },
  })
}

export async function clearConversationState(userId: string) {
  return prisma.conversationState.deleteMany({ where: { userId } })
}

export async function processConversationalMessage(
  userId: string,
  waId: string,
  message: string
): Promise<string> {
  const existing = await getConversationState(userId)
  const lower = message.toLowerCase().trim()

  if (!existing || existing.state === 'GREETING') {
    if (
      lower.includes('create') ||
      lower.includes('listing') ||
      lower.includes('property') ||
      lower.includes('sell') ||
      lower.includes('rent') ||
      lower.includes('flat') ||
      lower.includes('apartment')
    ) {
      await setConversationState(userId, 'PROPERTY_TYPE')
      return "Let's create a new listing! What type of property is this?\n\n1. Apartment\n2. House\n3. Villa\n4. Plot\n5. Commercial\n\nJust type the number or name."
    }
    await setConversationState(userId, 'GREETING')
    return "Hello! I'm Brisvora, your AI listing assistant. Send me property details like:\n\n\"3 BHK apartment in Mumbai for 85 lakh with parking\"\n\nOr say \"create listing\" to start a guided conversation."
  }

  switch (existing.state as ConversationStateType) {
    case 'PROPERTY_TYPE': {
      const typeMap: Record<string, string> = {
        apartment: 'APARTMENT',
        house: 'HOUSE',
        villa: 'VILLA',
        plot: 'PLOT',
        commercial: 'COMMERCIAL',
        '1': 'APARTMENT',
        '2': 'HOUSE',
        '3': 'VILLA',
        '4': 'PLOT',
        '5': 'COMMERCIAL',
      }
      const matched = typeMap[lower]
      if (!matched) {
        return "I didn't catch that. Please choose:\n1. Apartment\n2. House\n3. Villa\n4. Plot\n5. Commercial"
      }
      await setConversationState(userId, 'LOCATION', { ...existing.context as ConversationContext, propertyType: matched })
      return `Great, ${matched}. Which city or locality is the property in?`
    }

    case 'LOCATION': {
      if (!message.trim()) {
        return "Please enter the city or locality (e.g. \"Bandra West, Mumbai\")."
      }
      await setConversationState(userId, 'PRICE', { ...existing.context as ConversationContext, location: message.trim() })
      return "Got it. What is the expected price? (e.g. \"85 lakh\", \"1.2 Cr\", \"25000000\")"
    }

    case 'PRICE': {
      const price = extractPrice(message)
      if (!price) {
        return "I couldn't understand the price. Please send it like \"85 lakh\", \"1.2 Cr\", or \"25000000\"."
      }
      await setConversationState(userId, 'BEDROOMS', { ...existing.context as ConversationContext, price })
      return "How many bedrooms? (e.g. \"2\", \"3 BHK\")"
    }

    case 'BEDROOMS': {
      const bhk = extractBhk(message)
      if (!bhk && !message.trim().match(/^(0|1|2|3|4|5)$/)) {
        return "Please enter a number like 1, 2, 3, or 4."
      }
      const bedrooms = (bhk ?? parseInt(message.trim())) || 3
      await setConversationState(userId, 'AMENITIES', { ...existing.context as ConversationContext, bedrooms })
      return "Any key features or amenities? (e.g. \"modular kitchen, parking, near metro, 24/7 security\")\nType \"skip\" if none."
    }

    case 'AMENITIES': {
      const amenities = lower === 'skip' ? [] : message.split(',').map((s) => s.trim()).filter(Boolean)
      await setConversationState(userId, 'CONFIRMATION', { ...existing.context as ConversationContext, amenities })
      const ctx = existing.context as ConversationContext
      return summarizeAndConfirm(ctx, amenities)
    }

    case 'CONFIRMATION': {
      if (lower.includes('yes') || lower.includes('correct') || lower.includes('create') || lower === '1') {
        await setConversationState(userId, 'GENERATING', existing.context as ConversationContext)
        return 'GENERATING'
      }
      if (lower.includes('no') || lower.includes('change')) {
        await setConversationState(userId, 'LOCATION', existing.context as ConversationContext)
        return 'No problem. Let me know the correct city or locality.'
      }
      return 'Please reply with "yes" to confirm or "no" to make changes.'
    }

    case 'GENERATING': {
      return 'GENERATING'
    }

    default:
      await setConversationState(userId, 'GREETING')
      return "Let's start fresh. Send me property details or say \"create listing\" to begin."
  }
}

function extractPrice(text: string): number | null {
  const normalized = text.toLowerCase().replace(/,/g, '').trim()
  const croreMatch = normalized.match(/(\d+(\.\d+)?)\s*(crore|cr)/)
  if (croreMatch) return parseFloat(croreMatch[1]) * 10000000

  const lakhMatch = normalized.match(/(\d+(\.\d+)?)\s*(lakh|lac|l)/)
  if (lakhMatch) return parseFloat(lakhMatch[1]) * 100000

  const digitsOnly = normalized.replace(/[^0-9]/g, '')
  if (digitsOnly.length >= 5) return parseInt(digitsOnly)
  return null
}

function extractBhk(text: string): number | null {
  const m = text.toLowerCase().match(/(\d)\s*bhk/)
  return m ? parseInt(m[1]) : null
}

function summarizeAndConfirm(ctx: ConversationContext, amenities: string[]): string {
  const lines = [
    'Here is what I have:',
    `Type: ${ctx.propertyType}`,
    `Location: ${ctx.location}`,
    `Price: ₹${ctx.price?.toLocaleString('en-IN')}`,
    `Bedrooms: ${ctx.bedrooms} BHK`,
    `Amenities: ${amenities.length ? amenities.join(', ') : 'None'}`,
    '',
    'Reply "yes" to confirm and create the listing, or "no" to make changes.',
  ]
  return lines.join('\n')
}
