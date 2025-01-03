import { z } from 'zod'

export const messageMediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  key: z.string(),
  mimeType: z.string(),
})

export type MessageMedia = z.infer<typeof messageMediaSchema>
