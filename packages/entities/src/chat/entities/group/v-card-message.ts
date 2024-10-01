import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupVCardMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.vcard),
  contact: contactSchema,
})

const schema = baseGroupVCardMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupVCardMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupVCardMessageSchema: GroupVCardMessageSchema = schema

export type GroupVCardMessage = z.infer<typeof groupVCardMessageSchema>
