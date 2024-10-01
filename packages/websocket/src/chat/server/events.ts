import { z } from 'zod'

export const chatEvents = z.enum(['chat:change', 'chat:create'])

export type ChatEvents = z.infer<typeof chatEvents>
