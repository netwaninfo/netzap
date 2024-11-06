import {
  UsersRepository,
  UsersRepositoryFindUniqueByUserIdParams,
} from '@/domain/users/application/repositories/users-repository'
import { User } from '@/domain/users/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  items: User[] = []

  async findUniqueByUserId({
    userId,
  }: UsersRepositoryFindUniqueByUserIdParams): Promise<User | null> {
    const user = this.items.find(user => user.id.equals(userId))

    return user ?? null
  }
}
