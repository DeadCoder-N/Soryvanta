import { z } from 'zod'

// Property types
export interface ListingGenerationInput {
  rawMessage: string
  imageUrls?: string[]
}

export interface GeneratedListing {
  title: string
  description: string
  address: string
  city: string
  price: number
  priceLabel: string
  bedrooms?: number
  bathrooms?: number
  areaSqft?: number
  type: 'APARTMENT' | 'HOUSE' | 'VILLA' | 'PLOT' | 'COMMERCIAL' | 'OTHER'
  features: string[]
  amenities: string[]
}

// WhatsApp types
export interface WhatsAppInboundMessage {
  from: string
  waId: string
  body: string
  contactId?: string
  mediaUrls?: string[]
  timestamp: string
}

export interface WhatsAppOutboundMessage {
  to: string
  contactId?: string
  body: string
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

// Analytics types
export interface PropertyAnalytics {
  propertyId: string
  viewCount: number
  inquiryCount: number
  lastViewed?: Date
}

// Conversation types
export const ConversationContextSchema = z.object({
  accumulatedText: z.string(),
  imageUrls: z.array(z.string()).default([]),
})

export type ConversationContext = z.infer<typeof ConversationContextSchema>

export const ConversationStateTypeSchema = z.enum(['GREETING', 'ACCUMULATING', 'GENERATING'])
export type ConversationStateType = z.infer<typeof ConversationStateTypeSchema>

