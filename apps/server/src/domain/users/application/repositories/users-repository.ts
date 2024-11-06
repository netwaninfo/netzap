import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '../../enterprise/entities/user'

export interface UsersRepositoryFindUniqueByUserIdParams {
  userId: UniqueEntityID
}

export abstract class UsersRepository {
  abstract findUniqueByUserId(
    params: UsersRepositoryFindUniqueByUserIdParams
  ): Promise<User | null>
}
