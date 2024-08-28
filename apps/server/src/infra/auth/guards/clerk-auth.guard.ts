import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { UsersRepositories } from '@/domain/auth/application/repositories/users-repositories'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { ClerkService } from '../sso/clerk/clerk.service'

@Injectable()
export class ClerkAuthGuard implements CanActivate {
	constructor(
		private clerk: ClerkService,
		private usersRepository: UsersRepositories,
	) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest() as FastifyRequest

		const sessionToken = request.cookies.__session
		if (!sessionToken) return false

		try {
			const payload = await this.clerk.client.verifyToken(sessionToken)

			const user = await this.usersRepository.findUniqueByUserId({
				userId: UniqueEntityID.create(payload.sub),
			})
			if (!user) return false

			request.userId = user.internalId.toString()
		} catch (error) {
			return false
		}

		return true
	}
}
