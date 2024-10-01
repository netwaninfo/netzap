import { type Socket } from 'socket.io'
import { z } from 'zod'

import { Middleware } from '../../decorators/middleware.decorator'
import { SocketMiddleware, SocketMiddlewareNext } from '../../types/middleware'

const querySchema = z.object({
  instanceId: z.string(),
})

@Middleware()
export class SocketJoinRoomMiddleware implements SocketMiddleware {
  execute(socket: Socket, next: SocketMiddlewareNext) {
    const rawQuery = socket.handshake.query
    const query = querySchema.parse(rawQuery)

    const roomId = query.instanceId
    socket.join(roomId)

    socket.handshake.query = Object.assign(rawQuery, query)

    return next()
  }
}
