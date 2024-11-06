import fastifyCookie from '@fastify/cookie'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module'
import { EnvService } from './env/env.service'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  app.enableShutdownHooks()

  // @ts-ignore
  await app.register(fastifyCookie)

  const envService = app.get<EnvService>(EnvService)
  const port = envService.get('PORT')

  await app.listen(port)
}

bootstrap()
