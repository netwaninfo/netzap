import { z } from 'zod'

export const contactSchema = z.object({
  id: z.string(),
  waContactId: z.string(),
  instanceId: z.string(),
  name: z.string(),
  phone: z.string(),
  imageUrl: z.string().url().nullable(),
  isInstance: z.boolean(),
  isMe: z.boolean(),
  isMyContact: z.boolean(),
})

export type Contact = z.infer<typeof contactSchema>
