import { z } from 'zod'

export const clerkUserSchema = z
  .object({
    id: z.string(),
    email: z.object({ emailAddress: z.string().email() }),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    fullName: z.string().nullable(),
    publicMetadata: z.object({
      applications: z.object({
        netzap: z.object({
          id: z.string(),
        }),
      }),
    }),
  })
  .refine(raw => raw.firstName || raw.lastName || raw.fullName)
  .transform(raw => ({
    id: raw.id,
    email: raw.email.emailAddress,
    name: String(raw.firstName || raw.lastName || raw.fullName),
    refId: raw.publicMetadata.applications.netzap.id,
  }))

export type ClerkUser = z.output<typeof clerkUserSchema>
