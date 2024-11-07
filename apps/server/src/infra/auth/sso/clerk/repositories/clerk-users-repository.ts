import {
  UsersRepository,
  UsersRepositoryFindUniqueBySSOParams,
} from '@/domain/auth/application/repositories/users-repository'
import { User } from '@/domain/auth/enterprise/entities/user'
import { User as RawClerkUser } from '@clerk/backend'
import { Injectable } from '@nestjs/common'
import { ClerkService } from '../clerk.service'
import { ClerkUserMapper } from '../mappers/clerk-user-mapper'
import { ClerkUser, clerkUserSchema } from '../types/clerk-user'

@Injectable()
export class ClerkUsersRepository implements UsersRepository {
  constructor(private clerk: ClerkService) {}

  private checkIsValidClerkUser(raw: RawClerkUser): ClerkUser {
    return clerkUserSchema.parse(raw)
  }

  async findUniqueBySSO({
    refId,
  }: UsersRepositoryFindUniqueBySSOParams): Promise<User | null> {
    try {
      const raw = await this.clerk.client.users.getUser(refId.toString())

      return ClerkUserMapper.toDomain(this.checkIsValidClerkUser(raw))
    } catch {
      return null
    }
  }
}
