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
		new FastifyAdapter(),
	)

	const envService = app.get<EnvService>(EnvService)
	const port = envService.get('PORT')

	await app.listen(port)
}

bootstrap()
