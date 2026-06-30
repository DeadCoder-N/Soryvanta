import { prisma } from '@brisvora/shared'

export type ConversationStateType = 'GREETING' | 'ACCUMULATING' | 'GENERATING'

export interface ConversationContext {
  accumulatedText: string
  imageUrls: string[]
}

export async function getConversationState(userId: string) {
  return prisma.conversationState.findUnique({ where: { userId } })
}

export async function setConversationState(
  userId: string,
  state: ConversationStateType,
  context: ConversationContext = { accumulatedText: '', imageUrls: [] }
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
  message: string,
  newImageUrls: string[] = []
): Promise<string> {
  const existing = await getConversationState(userId)
  const lower = message.toLowerCase().trim()

  let context: ConversationContext = (existing?.context as unknown as ConversationContext) ?? { accumulatedText: '', imageUrls: [] }

  if (newImageUrls.length > 0) {
    context = { ...context, imageUrls: [...(context.imageUrls ?? []), ...newImageUrls] }
  }

  // If no state yet, or state is GREETING → start accumulating
  if (!existing || existing.state === 'GREETING') {
    const isKeyword = lower.includes('create') || lower.includes('listing') || lower.includes('property') || lower.includes('sell') || lower.includes('rent')

    if (isKeyword) {
      const reply = "Please share all property details and photos here.\n\nSend everything in one go or in multiple messages — I'll collect it all.\n\nWhen you're done, just send: done"
      await setConversationState(userId, 'ACCUMULATING', { accumulatedText: '', imageUrls: [] })
      return reply
    }

    // Even if no keyword, just start accumulating (they might send details directly)
    await setConversationState(userId, 'ACCUMULATING', { accumulatedText: message, imageUrls: context.imageUrls })
    return "Got it. Send more details or photos. When you're done, send: done"
  }

  // If currently accumulating
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
      return `Got ${newImageUrls.length} photo${newImageUrls.length > 1 ? 's' : ''}. Send more details or photos. When done, send: done`
    }
    return 'Got it. Send more details or photos. When done, send: done'
  }

  // If generating, stay in generating state (webhook handles it)
  if (existing.state === 'GENERATING') {
    return 'GENERATING'
  }

  // Fallback
  await setConversationState(userId, 'GREETING', { accumulatedText: '', imageUrls: [] })
  return "Let's start fresh. Send me property details or photos, and say done when finished."
}
