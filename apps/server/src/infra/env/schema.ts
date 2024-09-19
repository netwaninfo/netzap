import z from 'zod'

const nodeEnvSchema = z
  .enum(['development', 'testing', 'production'])
  .default('development')

export const envSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  PORT: z.coerce.number().optional().default(3333),

  // Prisma
  DATABASE_URL: z.string().url(),

  // Clerk (SSO)
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),

  // WWJS
  WWJS_EXECUTABLE_PATH: z.string(),
  WWJS_INSTANCE_DELAY_IN_MS: z.coerce.number().int().default(150),
})

export type Env = z.infer<typeof envSchema>
