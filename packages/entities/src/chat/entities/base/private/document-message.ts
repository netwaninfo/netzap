import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { messageMediaSchema } from '../../message-media'
import { basePrivateMessageSchema } from './message'

const schema = basePrivateMessageSchema.extend({
  type: z.literal(messageTypeSchema.Values.document),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

// TS7056
export interface BasePrivateDocumentMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const basePrivateDocumentMessageSchema: BasePrivateDocumentMessageSchema =
  schema