import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { User } from '../../enterprise/entities/user.js'

export interface UsersRepositoryFindUniqueByUserIdParams {
  userId: UniqueEntityID
}

export abstract class UsersRepository {
  abstract findUniqueByUserId(
    params: UsersRepositoryFindUniqueByUserIdParams
  ): Promise<User | null>
}
