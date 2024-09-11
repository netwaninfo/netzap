import z from 'zod'

import { groupQuotedMessageSchema } from './quoted-message.js'
import { groupQuotedMultiVCardMessageSchema } from './quoted-multi-v-card-message.js'

export const groupMultiVCardMessageSchema =
  groupQuotedMultiVCardMessageSchema.extend({
    quoted: groupQuotedMessageSchema.nullable(),
  })

export type GroupMultiVCardMessage = z.infer<
  typeof groupMultiVCardMessageSchema
>
