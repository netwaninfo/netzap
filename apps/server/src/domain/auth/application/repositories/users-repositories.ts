import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '../../enterprise/entities/user'

export interface UsersRepositoriesFindUniqueByIdParams {
	userId: UniqueEntityID
}

export abstract class UsersRepositories {
	abstract findUniqueById(
		params: UsersRepositoriesFindUniqueByIdParams,
	): Promise<User | null>
}
