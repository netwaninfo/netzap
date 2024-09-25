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

  // Cloudflare - R2
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
  CLOUDFLARE_BUCKET_NAME: z.string(),
  CLOUDFLARE_PUBLIC_BUCKET_URL: z
    .string()
    .url()
    .transform(value =>
      value.endsWith('/') ? value.replace(/\/$/, '') : value
    ),
  CLOUDFLARE_BUCKET_MEDIA_PATH: z
    .string()
    .transform(value => (value.startsWith('/') ? value : `/${value}`)),
})

export type Env = z.infer<typeof envSchema>
