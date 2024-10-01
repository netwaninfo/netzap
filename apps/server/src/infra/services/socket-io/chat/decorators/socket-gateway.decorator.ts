import { applyDecorators } from '@nestjs/common'
import { WebSocketGateway } from '@nestjs/websockets'
import { CHAT_NAMESPACE } from '../constants'

export function SocketGateway() {
  return applyDecorators(WebSocketGateway({ namespace: CHAT_NAMESPACE }))
}
