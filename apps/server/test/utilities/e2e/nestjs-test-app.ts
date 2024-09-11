import fastifyCookie from '@fastify/cookie'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { RawServerDefault } from 'fastify'

export class NestTestApp {
  constructor(private app: NestFastifyApplication<RawServerDefault>) {}

  private async useDefaults() {
    await this.app.register(fastifyCookie)
  }

  async init() {
    await this.useDefaults()
    await this.app.init()
    await this.app.getHttpAdapter().getInstance().ready()
  }

  getAddress(app: NestFastifyApplication<RawServerDefault>) {
    const { port } = app.getHttpAdapter().getHttpServer().listen().address()
    return `http://localhost:${port}`
  }
}
