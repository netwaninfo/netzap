import { ZodSchema } from 'zod'

import { ZodWebSocketValidationPipe } from '@/infra/http/pipes/zod-websocket-validation.pipe'
import { MessageBody } from '@nestjs/websockets'

export function SocketEventPayload(schema: ZodSchema) {
  return MessageBody(new ZodWebSocketValidationPipe(schema))
}
