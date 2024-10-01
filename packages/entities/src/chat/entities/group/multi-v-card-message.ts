import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupMultiVCardMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.multi_vcard),
  contacts: z.array(contactSchema),
})

const schema = baseGroupMultiVCardMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupMultiVCardMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupMultiVCardMessageSchema: GroupMultiVCardMessageSchema = schema

export type GroupMultiVCardMessage = z.infer<
  typeof groupMultiVCardMessageSchema
>
