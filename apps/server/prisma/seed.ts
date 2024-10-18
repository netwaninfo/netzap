import 'dotenv/config'

import crypto from 'node:crypto'
import { faker } from '@/test/lib/faker'
import { createClerkClient } from '@clerk/backend'
import { PrismaClient } from '@prisma/client'
import merge from 'lodash.merge'
import { z } from 'zod'

const envSchema = z.object({
  CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
})

const env = envSchema.parse(process.env)

const prisma = new PrismaClient()

const clerk = createClerkClient({
  publishableKey: env.CLERK_PUBLISHABLE_KEY,
  secretKey: env.CLERK_SECRET_KEY,
})

async function seed() {
  const email = 'estevao.biondi@gmail.com'
  const name = 'Estevão'

  const { data } = await clerk.users.getUserList({ emailAddress: [email] })
  let user = data[0]

  if (!user) {
    user = await clerk.users.createUser({
      firstName: name,
      emailAddress: [email],
      password: crypto.randomBytes(16).toString('hex'),
      publicMetadata: {
        applications: {
          netzap: {},
        },
      },
    })
  }

  await Promise.all([
    prisma.instance.deleteMany(),
    prisma.attendant.deleteMany(),
  ])

  const instance = await prisma.instance.create({
    data: {
      name: faker.company.name(),
      phone: '5511975513068',
    },
    select: {
      id: true,
    },
  })

  const attendant = await prisma.attendant.create({
    data: {
      displayName: user.firstName ?? faker.person.firstName(),
      ssoId: user.id,
      instanceIds: [instance.id],
    },
    select: {
      id: true,
    },
  })

  await clerk.users.updateUserMetadata(user.id, {
    publicMetadata: merge(user.publicMetadata, {
      applications: {
        netzap: {
          id: attendant.id,
        },
      },
    }),
  })
}

seed()
  .catch(async error => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
