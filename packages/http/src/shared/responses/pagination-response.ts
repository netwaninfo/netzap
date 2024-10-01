import { z } from 'zod'

export const paginationResponseSchema = z.object({
  current: z.number(),
  pages: z.number(),
  next: z.number(),
  prev: z.number(),
})

export type PaginationResponse = z.infer<typeof paginationResponseSchema>
