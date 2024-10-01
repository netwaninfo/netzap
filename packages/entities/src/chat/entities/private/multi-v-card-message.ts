import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateMultiVCardMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.multi_vcard),
  contacts: z.array(contactSchema),
})

const schema = basePrivateMultiVCardMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateMultiVCardMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateMultiVCardMessageSchema: PrivateMultiVCardMessageSchema =
  schema

export type PrivateMultiVCardMessage = z.infer<
  typeof privateMultiVCardMessageSchema
>
