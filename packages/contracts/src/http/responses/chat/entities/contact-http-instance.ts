import { z } from 'zod'

export const chatHttpContactSchema = z.object({
	id: z.string(),
	waContactId: z.string(),
	instanceId: z.string(),
	name: z.string(),
	phone: z.string(),
	imageUrl: z.string().nullable(),
	isInstance: z.boolean(),
	isMe: z.boolean(),
	isMyContact: z.boolean(),
})

export type ChatHttpContact = z.infer<typeof chatHttpContactSchema>
