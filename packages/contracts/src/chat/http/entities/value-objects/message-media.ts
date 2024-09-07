import { z } from 'zod'

export const MessageMediaSchema = z.object({
	url: z.string(),
	key: z.string(),
	mimeType: z.string(),
})

export type MessageMedia = z.infer<typeof MessageMediaSchema>
