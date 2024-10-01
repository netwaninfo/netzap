import { z } from 'zod'

import { chatSchema } from '@netzap/entities/chat'

export const chatServerEventPayloadSchema = z.object({
  chat: chatSchema,
})

export type ChatServerEventPayloadSchema = z.infer<
  typeof chatServerEventPayloadSchema
>
