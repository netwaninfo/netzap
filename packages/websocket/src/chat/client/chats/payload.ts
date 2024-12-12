import { z } from 'zod'

export const chatClientEventPayloadSchema = z.object({
  waChatId: z.string(),
})

export type ChatClientEventPayloadSchema = z.infer<
  typeof chatClientEventPayloadSchema
>
