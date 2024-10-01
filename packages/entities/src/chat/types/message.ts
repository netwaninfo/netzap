import { z } from 'zod'

import { groupMessageSchema } from './group-message.js'
import { privateMessageSchema } from './private-message.js'

export const messageSchema = z.union([privateMessageSchema, groupMessageSchema])

export type Message = z.infer<typeof messageSchema>
