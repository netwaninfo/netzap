import { type ExecutionContext, createParamDecorator } from '@nestjs/common'
import { type FastifyRequest } from 'fastify'

export const HttpUserId = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as FastifyRequest

    return request.userId
  }
)
