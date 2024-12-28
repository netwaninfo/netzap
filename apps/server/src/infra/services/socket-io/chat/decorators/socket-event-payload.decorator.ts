import { MessageBody } from '@nestjs/websockets'
import { ZodSchema } from 'zod'

import { ZodWebSocketValidationPipe } from '@/infra/http/pipes/zod-websocket-validation.pipe.js'

export function SocketEventPayload(schema: ZodSchema) {
  return MessageBody(new ZodWebSocketValidationPipe(schema))
}
