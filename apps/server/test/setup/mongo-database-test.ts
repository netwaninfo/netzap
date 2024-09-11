import { exec } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { promisify } from 'node:util'
import { envSchema } from '@/infra/env/schema'
import { config } from 'dotenv'
import { MongoClient } from 'mongodb'

const execAsync = promisify(exec)

config({ path: '.env', override: true })
config({ path: '.env.test', override: true })

const env = envSchema.parse(process.env)

let mongod: MongoClient

function generateUniqueDatabaseURL(databaseId: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provider a DATABASE_URL environment variable')
  }

  const url = new URL(env.DATABASE_URL)

  url.pathname = `/${databaseId}`

  return url.toString()
}

const databaseId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(databaseId)
  process.env.DATABASE_URL = databaseURL

  await execAsync('pnpm prisma db push')

  mongod = new MongoClient(databaseURL)
  await mongod.connect()
})

afterAll(async () => {
  await mongod.db(databaseId).dropDatabase()
  await mongod.close()
})
