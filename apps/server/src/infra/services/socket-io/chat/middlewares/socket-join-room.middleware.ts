import { WsException } from '@nestjs/websockets'
import { type Socket } from 'socket.io'
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

import { Middleware } from '../../decorators/middleware.decorator'
import { SocketMiddleware, SocketMiddlewareNext } from '../../types/middleware'

const querySchema = z.object({
  instanceId: z.string(),
})

@Middleware()
export class SocketJoinRoomMiddleware implements SocketMiddleware {
  execute(socket: Socket, next: SocketMiddlewareNext) {
    const rawQuery = socket.handshake.query
    const parsed = querySchema.safeParse(rawQuery)

    if (!parsed.success) {
      throw new WsException(fromZodError(parsed.error))
    }

    const query = parsed.data
    const roomId = query.instanceId

    socket.join(roomId)
    socket.handshake.query = Object.assign(rawQuery, query)

    return next()
  }
}
