import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { UsersRepository } from '@/domain/auth/application/repositories/users-repository.js'
import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import type { FastifyRequest } from 'fastify'
import { ClerkService } from '../sso/clerk/clerk.service.js'

@Injectable()
export class HttpClerkAuthGuard implements CanActivate {
  constructor(
    private clerk: ClerkService,
    private usersRepository: UsersRepository
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as FastifyRequest

    const sessionToken = request.cookies.__session
    if (!sessionToken) throw new UnauthorizedException()

    try {
      const payload = await this.clerk.verifyToken(sessionToken)

      const user = await this.usersRepository.findUniqueBySSO({
        refId: UniqueEntityID.create(payload.sub),
      })

      if (!user) throw new UnauthorizedException()

      request.userId = user.id.toString()
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true
  }
}
