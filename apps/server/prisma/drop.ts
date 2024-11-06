import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function drop() {
  await Promise.all([
    prisma.$runCommandRaw({
      delete: 'messages',
      deletes: [
        {
          q: {},
          limit: 0,
        },
      ],
    }),
    prisma.$runCommandRaw({
      delete: 'contacts_instances',
      deletes: [
        {
          q: {},
          limit: 0,
        },
      ],
    }),
    prisma.$runCommandRaw({
      delete: 'contacts',
      deletes: [
        {
          q: {},
          limit: 0,
        },
      ],
    }),
    prisma.$runCommandRaw({
      delete: 'chats',
      deletes: [
        {
          q: {},
          limit: 0,
        },
      ],
    }),
    prisma.$runCommandRaw({
      delete: 'groups',
      deletes: [
        {
          q: {},
          limit: 0,
        },
      ],
    }),
  ])
}

drop()
  .catch(async error => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
