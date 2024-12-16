import { OnGatewayInit } from '@nestjs/websockets'
import { type Server } from 'socket.io'

import { DiscoveryService } from '../../utilities/nestjs/discovery.service'
import { SOCKET_MIDDLEWARE_KEY } from '../constants'
import { SocketMiddleware } from '../types/middleware'
import { SocketGateway } from './decorators/socket-gateway.decorator'

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
