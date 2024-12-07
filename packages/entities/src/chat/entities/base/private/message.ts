import { z } from 'zod'

import { chatTypeSchema } from '@/chat/enums'

import { baseMessageSchema } from '../message'

export const basePrivateMessageSchema = baseMessageSchema.extend({
  chatType: z.literal(chatTypeSchema.Values.private),
})
