import { z } from 'zod'

export const messageClientEventsNamesSchema = z.enum(['message:send:text'])

export type MessageClientEventsNames = z.infer<
  typeof messageClientEventsNamesSchema
>
