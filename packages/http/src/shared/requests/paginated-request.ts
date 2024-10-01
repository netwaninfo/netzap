import { z } from 'zod'

export const paginatedRequestQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).optional(),
})

export type PaginatedRequestQuery = z.infer<typeof paginatedRequestQuerySchema>
