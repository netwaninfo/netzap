import type { OnGatewayInit } from '@nestjs/websockets'
import { type Server } from 'socket.io'

import { DiscoveryService } from '../../utilities/nestjs/discovery.service.js'
import { SOCKET_MIDDLEWARE_KEY } from '../constants.js'
import type { SocketMiddleware } from '../types/middleware.js'
import { SocketGateway } from './decorators/socket-gateway.decorator.js'

@SocketGateway()
export class SocketChatGateway implements OnGatewayInit {
  constructor(private discoveryService: DiscoveryService) {}

  async afterInit(io: Server) {
    const middlewares =
      await this.discoveryService.getInstancesProviders<SocketMiddleware>({
        metadataKey: SOCKET_MIDDLEWARE_KEY,
      })

    for (const middleware of middlewares) {
      io.use(middleware.execute.bind(middleware))
    }
  }
}
