import type { z } from 'zod'

import { baseGroupDocumentMessageSchema } from '../base/group'
import { groupQuotedMessageSchema } from './quoted-message'

const schema = baseGroupDocumentMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

// TS7056
export interface GroupDocumentMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupDocumentMessageSchema: GroupDocumentMessageSchema = schema

export type GroupDocumentMessage = z.infer<typeof groupDocumentMessageSchema>
