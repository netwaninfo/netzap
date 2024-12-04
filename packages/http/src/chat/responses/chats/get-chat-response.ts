import { chatSchema } from '@netzap/entities/chat'
import { z } from 'zod'

export const getChatResponseBodySchema = z.object({
  data: chatSchema,
})

export type GetChatResponseBody = z.infer<typeof getChatResponseBodySchema>
