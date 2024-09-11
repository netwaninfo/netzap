import { faker } from '@/test/lib/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.instance.deleteMany()

  await prisma.instance.create({
    data: {
      name: faker.company.name(),
      phone: '5511975513068',
    },
  })
}

seed()
  .catch(async error => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
