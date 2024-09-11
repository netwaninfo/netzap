import z from 'zod'

export const searchableRequestQuerySchema = z.object({
  q: z.string().optional(),
})

export type SearchableRequestQuery = z.infer<
  typeof searchableRequestQuerySchema
>
