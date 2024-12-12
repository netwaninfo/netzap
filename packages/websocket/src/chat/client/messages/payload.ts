import { z } from 'zod'

export const messageClientEventPayloadSchema = z.object({
  waChatId: z.string(),
  quotedId: z.string().optional(),
})

export type MessageClientEventPayloadSchema = z.infer<
  typeof messageClientEventPayloadSchema
>
