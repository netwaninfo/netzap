import { contactSchema } from '../contact'
import { baseMessageSchema } from '../message'

export const baseGroupMessage = baseMessageSchema.extend({
	author: contactSchema,
})
