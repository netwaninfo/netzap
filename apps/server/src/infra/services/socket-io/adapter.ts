import { EnvService } from '@/infra/env/env.service'
import { INestApplicationContext } from '@nestjs/common'
import { IoAdapter } from '@nestjs/platform-socket.io'
import { ServerOptions } from 'socket.io'

export class SocketIOAdapter extends IoAdapter {
  constructor(
    app: INestApplicationContext,
    private envService: EnvService
  ) {
    super(app)
  }

  override createIOServer(port: number, options?: ServerOptions) {
    const currentOptions = Object.assign(options ?? {}, {
      cors: {
        origin: [this.envService.get('NETZAP_DOMAIN_URL')],
      },
    } as ServerOptions)

    const server = super.createIOServer(port, currentOptions)

    return server
  }
}
