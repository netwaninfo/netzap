import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '../../enterprise/entities/user'

export interface UsersRepositoryFindUniqueBySSOParams {
  refId: UniqueEntityID
}

export abstract class UsersRepository {
  abstract findUniqueBySSO(
    params: UsersRepositoryFindUniqueBySSOParams
  ): Promise<User | null>
}
