import type { z } from 'zod'

import { basePrivateTextMessageSchema } from '../base/private'
import { privateQuotedMessageSchema } from './quoted-message'

const schema = basePrivateTextMessageSchema.extend({
  quoted: privateQuotedMessageSchema.nullable(),
})

// TS7056
export interface PrivateTextMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateTextMessageSchema: PrivateTextMessageSchema = schema

export type PrivateTextMessage = z.infer<typeof privateTextMessageSchema>
