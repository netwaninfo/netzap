import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { messageMediaSchema } from '../../message-media'
import { basePrivateMessageSchema } from './message'

const schema = basePrivateMessageSchema.extend({
  type: z.literal(messageTypeSchema.Values.voice),
  media: messageMediaSchema.nullable(),
})

// TS7056
export interface BasePrivateVoiceMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const basePrivateVoiceMessageSchema: BasePrivateVoiceMessageSchema =
  schema