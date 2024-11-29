import { z } from 'zod'

import { chatTypeSchema } from '@/chat/enums'
import { baseChatSchema } from '../base'
import { contactSchema } from '../contact'
import { privateMessageSchema } from './message'

const schema = baseChatSchema.extend({
  contact: contactSchema,
  type: z.literal(chatTypeSchema.Values.private),
  lastMessage: privateMessageSchema.nullable(),
})

// TS7056
export interface PrivateChatSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateChatSchema: PrivateChatSchema = schema

export type PrivateChat = z.infer<typeof privateChatSchema>
