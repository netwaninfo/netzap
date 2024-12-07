import { z } from 'zod'

import { chatTypeSchema } from '@/chat/enums'

import { contactSchema } from '../../contact'
import { baseMessageSchema } from '../message'

export const baseGroupMessageSchema = baseMessageSchema.extend({
  chatType: z.literal(chatTypeSchema.Values.group),
  author: contactSchema,
})
