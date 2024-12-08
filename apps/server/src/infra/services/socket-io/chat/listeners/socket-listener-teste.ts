import { WebSocketClerkAuthGuard } from '@/infra/auth/guards/websocket-clerk-auth.guard'
import { UseGuards } from '@nestjs/common'
import { MessageBody, SubscribeMessage } from '@nestjs/websockets'
import { SocketGateway } from '../decorators/socket-gateway.decorator'

@SocketGateway()
export class SocketListenerTest {
  @UseGuards(WebSocketClerkAuthGuard)
  @SubscribeMessage('teste')
  async handle(@MessageBody() data: unknown): Promise<void> {
    console.log(data, 'Server')
  }
}
