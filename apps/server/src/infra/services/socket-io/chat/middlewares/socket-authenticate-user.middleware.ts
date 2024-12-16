import { WsException } from '@nestjs/websockets'
import { type Socket } from 'socket.io'
import { z } from 'zod'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UsersRepository } from '@/domain/auth/application/repositories/users-repository'
import { ClerkService } from '@/infra/auth/sso/clerk/clerk.service'
import { Middleware } from '../../decorators/middleware.decorator'
import { SocketMiddleware, SocketMiddlewareNext } from '../../types/middleware'

const authSchema = z.object({
  __session: z.string().min(1),
})

@Middleware()
export class SocketAuthenticateUserMiddleware implements SocketMiddleware {
  constructor(
    private clerk: ClerkService,
    private usersRepository: UsersRepository
  ) {}

  async execute(socket: Socket, next: SocketMiddlewareNext) {
    const parsed = authSchema.safeParse(socket.handshake.auth)

    if (!parsed.success) {
      return next(new WsException('Unauthorized'))
    }

    const auth = parsed.data
    const sessionToken = auth.__session

    try {
      const payload = await this.clerk.verifyToken(sessionToken)

      const user = await this.usersRepository.findUniqueBySSO({
        refId: UniqueEntityID.create(payload.sub),
      })

      if (!user) return next(new WsException('Unauthorized'))

      socket.userId = user.id.toString()
      return next()
    } catch (error) {
      return next(new WsException('Unauthorized'))
    }
  }
}
