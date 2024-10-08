import { z } from 'zod'

import { messageSchema } from '@netzap/entities/chat'

export const messageServerEventPayloadSchema = z.object({
  message: messageSchema,
})

export type MessageServerEventPayload = z.infer<
  typeof messageServerEventPayloadSchema
>
