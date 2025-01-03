import path from 'node:path'

import fastifyCookie from '@fastify/cookie'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify'

import { AppModule } from './app.module.js'
import { EnvService } from './env/env.service.js'
import { SocketIOAdapter } from './services/socket-io/adapter.js'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  const envService = app.get<EnvService>(EnvService)

  app.enableCors({
    origin: [envService.get('NETZAP_DOMAIN_URL')],
    credentials: true,
  })

  app.useStaticAssets({
    root: path.resolve(process.cwd(), 'tmp'),
    prefix: envService.get('MEDIA_PUBLIC_PATH'),
  })

  app.useWebSocketAdapter(new SocketIOAdapter(app, envService))

  app.enableShutdownHooks()
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  await app.register(fastifyCookie as any)

  const port = envService.get('PORT')
  await app.listen(port, '0.0.0.0')
}

bootstrap()
