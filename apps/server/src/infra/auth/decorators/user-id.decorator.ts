import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

export const UserId = createParamDecorator(
	(_: unknown, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest() as FastifyRequest

		return UniqueEntityID.create(request.userId)
	},
)
