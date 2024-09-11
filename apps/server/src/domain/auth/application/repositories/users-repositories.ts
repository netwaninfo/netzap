import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '../../enterprise/entities/user'

export interface UsersRepositoriesFindUniqueByUserIdParams {
  userId: UniqueEntityID
}

export abstract class UsersRepositories {
  abstract findUniqueByUserId(
    params: UsersRepositoriesFindUniqueByUserIdParams
  ): Promise<User | null>
}
