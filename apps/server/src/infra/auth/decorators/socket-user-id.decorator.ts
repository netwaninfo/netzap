import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Socket } from 'socket.io'

export const SocketUserId = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const socket = context.switchToWs().getClient() as Socket

    return socket.userId
  }
)
