import { z } from 'zod'

export const clerkUserSchema = z
  .object({
    id: z.string(),
    primaryEmailAddress: z.object({ emailAddress: z.string().email() }),
    imageUrl: z.string().url(),
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
    email: raw.primaryEmailAddress.emailAddress,
    name: String(raw.firstName || raw.lastName || raw.fullName),
    imageUrl: raw.imageUrl,
    refId: raw.publicMetadata.applications.netzap.id,
  }))

export type ClerkUser = z.output<typeof clerkUserSchema>
