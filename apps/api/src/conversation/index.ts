import { prisma } from '@brisvora/shared'
import { ConversationContextSchema, ConversationStateTypeSchema } from '@brisvora/shared'

export type ConversationStateType = 'GREETING' | 'ACCUMULATING' | 'GENERATING'

export type ConversationContext = ReturnType<typeof ConversationContextSchema.parse>

function safeContext(input: unknown): ConversationContext {
  try {
    return ConversationContextSchema.parse(input)
  } catch {
    return { accumulatedText: '', imageUrls: [] }
  }
}

export async function getConversationState(userId: string) {
  return prisma.conversationState.findUnique({ where: { userId } })
}

export async function setConversationState(
  userId: string,
  state: ConversationStateType,
  context: ConversationContext = { accumulatedText: '', imageUrls: [] }
) {
  const validated = ConversationContextSchema.parse(context)
  return prisma.conversationState.upsert({
    where: { userId },
    update: { state, context: validated as any, lastMessageAt: new Date() },
    create: {
      userId,
      state,
      context: validated as any,
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
  message: string,
  newImageUrls: string[] = []
): Promise<string> {
  const existing = await getConversationState(userId)
  const lower = message.toLowerCase().trim()

  let context: ConversationContext = safeContext(existing?.context)

  if (newImageUrls.length > 0) {
    context = { ...context, imageUrls: [...(context.imageUrls ?? []), ...newImageUrls] }
  }

  if (!existing || existing.state === 'GREETING') {
    const isKeyword = lower.includes('create') || lower.includes('listing') || lower.includes('property') || lower.includes('sell') || lower.includes('rent')

    if (isKeyword) {
      const reply = "Please share all property details and photos here.\n\nSend everything in one go or in multiple messages — I'll collect it all.\n\nWhen you're done, just send: done"
      await setConversationState(userId, 'ACCUMULATING', { accumulatedText: '', imageUrls: [] })
      return reply
    }

    await setConversationState(userId, 'ACCUMULATING', { accumulatedText: message, imageUrls: context.imageUrls })
    return "Hi, this is the *Brisvora team*.\n\nSend your property details in one or more messages. Include the property type, BHK, price, location, built-up area, amenities, furnishing, parking, availability, and any other relevant information. Upload clear property photos as well.\n\nOnce you've shared everything, simply send *done*. We'll generate your property listing and share the live link."
  }

  if (existing.state === 'ACCUMULATING') {
    if (lower === 'done' || lower === 'done.') {
      if (!context.accumulatedText && context.imageUrls.length === 0) {
        return "I don't have any details yet. Please send property details or photos first, then send done."
      }
      await setConversationState(userId, 'GENERATING', context)
      return 'GENERATING'
    }

    const updatedText = context.accumulatedText ? `${context.accumulatedText}\n${message}` : message
    await setConversationState(userId, 'ACCUMULATING', { accumulatedText: updatedText, imageUrls: context.imageUrls })

    if (newImageUrls.length > 0) {
      return `${newImageUrls.length} photo${newImageUrls.length > 1 ? 's' : ''} received. Add more or send details. Once done, send *done*.`
    }
    return 'Details noted. Keep adding — price, location, size, photos. Send *done* when ready.'
  }

  if (existing.state === 'GENERATING') {
    return 'GENERATING'
  }

  await setConversationState(userId, 'GREETING', { accumulatedText: '', imageUrls: [] })
  return "Let's start fresh. Send me property details or photos, and say done when finished."
}
