import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { User } from '../../enterprise/entities/user.js'

export interface UsersRepositoryFindUniqueBySSOParams {
  refId: UniqueEntityID
}

export abstract class UsersRepository {
  abstract findUniqueBySSO(
    params: UsersRepositoryFindUniqueBySSOParams
  ): Promise<User | null>
}
