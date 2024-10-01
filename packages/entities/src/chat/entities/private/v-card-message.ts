import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateVCardMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.vcard),
  contact: contactSchema,
})

const schema = basePrivateVCardMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateVCardMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateVCardMessageSchema: PrivateVCardMessageSchema = schema

export type PrivateVCardMessage = z.infer<typeof privateVCardMessageSchema>
