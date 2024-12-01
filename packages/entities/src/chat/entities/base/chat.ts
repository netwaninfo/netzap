import { z } from 'zod'

export const baseChatSchema = z.object({
  id: z.string(),
  waChatId: z.string(),
  instanceId: z.string(),
  unreadCount: z.number(),
  lastInteractionAt: z.coerce.date(),
})
