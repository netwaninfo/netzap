import { applyDecorators } from '@nestjs/common'
import { SubscribeMessage } from '@nestjs/websockets'

import type { ClientEvents } from '@netzap/websocket/chat'

export function SocketSubscribeEvent(event: keyof ClientEvents) {
  return applyDecorators(SubscribeMessage(event))
}
