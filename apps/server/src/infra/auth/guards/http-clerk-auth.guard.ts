import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UsersRepositories } from '@/domain/auth/application/repositories/users-repositories'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { ClerkService } from '../sso/clerk/clerk.service'

@Injectable()
export class HttpClerkAuthGuard implements CanActivate {
  constructor(
    private clerk: ClerkService,
    private usersRepository: UsersRepositories
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as FastifyRequest

    const sessionToken = request.cookies.__session
    if (!sessionToken) throw new UnauthorizedException()

    try {
      const payload = await this.clerk.verifyToken(sessionToken)

      const user = await this.usersRepository.findUniqueByUserId({
        userId: UniqueEntityID.create(payload.sub),
      })

      if (!user) throw new UnauthorizedException()

      request.userId = user.internalId.toString()
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true
  }
}
