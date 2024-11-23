import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { contactSchema } from '../../contact'
import { basePrivateMessageSchema } from './message'

const schema = basePrivateMessageSchema.extend({
  type: z.literal(messageTypeSchema.Values.multi_vcard),
  contacts: z.array(contactSchema),
})

// TS7056
export interface BasePrivateMultiVCardMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const basePrivateMultiVCardMessageSchema: BasePrivateMultiVCardMessageSchema =
  schema
