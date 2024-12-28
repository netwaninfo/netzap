import {
  BadRequestException,
  Controller,
  Get,
  UnauthorizedException,
} from '@nestjs/common'
import type { GetMeResponseBody } from '@netzap/http/users'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { GetUserUseCase } from '@/domain/users/application/use-cases/users/get-user-use-case.js'
import { HttpUserId } from '@/infra/auth/decorators/http-user-id.decorator.js'
import { UserPresenter } from '@/infra/presenters/users/user-presenter.js'

@Controller('/users/me')
export class GetMeController {
  constructor(private getUser: GetUserUseCase) {}

  @Get()
  async handle(@HttpUserId() userId: string): Promise<GetMeResponseBody> {
    const response = await this.getUser.execute({
      userId: UniqueEntityID.create(userId),
    })

    if (response.isFailure()) {
      const error = response.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new UnauthorizedException()
        default:
          throw new BadRequestException()
      }
    }

    const { user } = response.value

    return {
      data: UserPresenter.toOutput(user),
    }
  }
}
