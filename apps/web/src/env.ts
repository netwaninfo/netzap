import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // Clerk
    CLERK_SECRET_KEY: z.string(),
  },

  client: {
    // NetZap
    NEXT_PUBLIC_NETZAP_API_URL: z.string().url(),
    NEXT_PUBLIC_NETZAP_SOCKET_URL: z.string().url(),

    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  },

  runtimeEnv: {
    // NetZap
    NEXT_PUBLIC_NETZAP_API_URL: process.env.NEXT_PUBLIC_NETZAP_API_URL,
    NEXT_PUBLIC_NETZAP_SOCKET_URL: process.env.NEXT_PUBLIC_NETZAP_SOCKET_URL,

    // Clerk
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  },
})
