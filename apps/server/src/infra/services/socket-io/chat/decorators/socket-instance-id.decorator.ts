import { type ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Socket } from 'socket.io'

export const SocketInstanceId = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const socket = context.switchToWs().getClient() as Socket

    return socket.instanceId
  }
)
