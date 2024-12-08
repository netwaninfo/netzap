import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UsersRepository } from '@/domain/auth/application/repositories/users-repository'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { WsException } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { ClerkService } from '../sso/clerk/clerk.service'

@Injectable()
export class WebSocketClerkAuthGuard implements CanActivate {
  constructor(
    private clerk: ClerkService,
    private usersRepository: UsersRepository
  ) {}

  async canActivate(context: ExecutionContext) {
    const socket = context.switchToWs().getClient() as Socket

    const sessionToken = socket.handshake.auth.__session as string | undefined
    if (!sessionToken) throw new WsException('Unauthorized')

    try {
      const payload = await this.clerk.verifyToken(sessionToken)

      const user = await this.usersRepository.findUniqueBySSO({
        refId: UniqueEntityID.create(payload.sub),
      })

      if (!user) throw new WsException('Unauthorized')

      socket.userId = user.id.toString()
    } catch (error) {
      throw new WsException('Unauthorized')
    }

    return true
  }
}
