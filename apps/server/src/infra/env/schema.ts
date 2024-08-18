import { z } from 'zod'

const nodeEnvSchema = z
	.enum(['development', 'testing', 'production'])
	.default('development')

export const envSchema = z.object({
	NODE_ENV: nodeEnvSchema,
	PORT: z.coerce.number().optional().default(3333),
})

export type Env = z.infer<typeof envSchema>
