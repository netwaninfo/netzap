import { z } from 'zod'

export const chatTypeSchema = z.enum(['private', 'group'])

export type ChatType = z.infer<typeof chatTypeSchema>
