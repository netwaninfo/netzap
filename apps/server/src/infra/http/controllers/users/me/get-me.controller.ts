import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { GetUserUseCase } from '@/domain/users/application/use-cases/users/get-user-use-case'
import { UserId } from '@/infra/auth/decorators/user-id.decorator'
import { UserPresenter } from '@/infra/presenters/users/user-presenter'
import {
  BadRequestException,
  Controller,
  Get,
  UnauthorizedException,
} from '@nestjs/common'

import { GetMeResponseBody } from '@netzap/http/users'

@Controller('/me')
export class GetMeController {
  constructor(private getUser: GetUserUseCase) {}

  @Get()
  async handle(@UserId() userId: string): Promise<GetMeResponseBody> {
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
