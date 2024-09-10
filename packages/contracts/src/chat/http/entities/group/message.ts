import { contactSchema } from '../contact.js'
import { baseMessageSchema } from '../message.js'

export const baseGroupMessage = baseMessageSchema.extend({
	author: contactSchema,
})
