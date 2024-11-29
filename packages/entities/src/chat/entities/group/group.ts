import { z } from 'zod'

export const groupSchema = z.object({
  id: z.string(),
  waGroupId: z.string(),
  instanceId: z.string(),
  name: z.string(),
  imageUrl: z.string().url().nullable(),
})

export type Group = z.infer<typeof groupSchema>
