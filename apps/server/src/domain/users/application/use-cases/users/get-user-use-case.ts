import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { User } from '@/domain/users/enterprise/entities/user.js'
import { UsersRepository } from '../../repositories/users-repository.js'

interface GetUserUseCaseRequest {
  userId: UniqueEntityID
}

type GetUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

@Injectable()
export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    request: GetUserUseCaseRequest
  ): Promise<GetUserUseCaseResponse> {
    const { userId } = request

    const user = await this.usersRepository.findUniqueByUserId({ userId })

    if (!user) {
      return failure(new ResourceNotFoundError({ id: userId.toString() }))
    }

    return success({ user })
  }
}
