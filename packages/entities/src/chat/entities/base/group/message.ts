import { contactSchema } from '../../contact'
import { baseMessageSchema } from '../message'

export const baseGroupMessageSchema = baseMessageSchema.extend({
  author: contactSchema,
})
