import { z } from 'zod'

import { groupMessageSchema } from './group'
import { privateMessageSchema } from './private'

export const messageSchema = z.union([privateMessageSchema, groupMessageSchema])

export type Message = z.infer<typeof messageSchema>
