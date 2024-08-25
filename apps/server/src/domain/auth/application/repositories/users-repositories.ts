import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '../../enterprise/entities/user'

export interface UsersRepositoriesFindUniqueByIdParams {
	userId: UniqueEntityID
}

export interface UsersRepositoriesFindManyByIdsParams {
	userIds: UniqueEntityID[]
}

export abstract class UsersRepositories {
	abstract findUniqueById(
		params: UsersRepositoriesFindUniqueByIdParams,
	): Promise<User | null>

	abstract findManyByIds(
		params: UsersRepositoriesFindManyByIdsParams,
	): Promise<User[]>
}
