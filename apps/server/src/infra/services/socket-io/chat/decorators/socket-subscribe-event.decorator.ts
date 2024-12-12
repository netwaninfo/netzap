import { WebSocketClerkAuthGuard } from '@/infra/auth/guards/websocket-clerk-auth.guard'
import { UseGuards, applyDecorators } from '@nestjs/common'
import { SubscribeMessage } from '@nestjs/websockets'

import { ClientEvents } from '@netzap/websocket/chat'

export function SocketSubscribeEvent(event: keyof ClientEvents) {
  return applyDecorators(
    UseGuards(WebSocketClerkAuthGuard),
    SubscribeMessage(event)
  )
}
