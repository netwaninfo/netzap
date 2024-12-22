import type { z } from 'zod'

import { basePrivateVoiceMessageSchema } from '../base/private'
import { privateQuotedMessageSchema } from './quoted-message'

const schema = basePrivateVoiceMessageSchema.extend({
  quoted: privateQuotedMessageSchema.nullable(),
})

// TS7056
export interface PrivateVoiceMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateVoiceMessageSchema: PrivateVoiceMessageSchema = schema

export type PrivateVoiceMessage = z.infer<typeof privateVoiceMessageSchema>
