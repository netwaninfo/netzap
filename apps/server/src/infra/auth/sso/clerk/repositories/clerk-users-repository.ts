import type { User as RawClerkUser } from '@clerk/backend'
import { Injectable } from '@nestjs/common'

import {
  UsersRepository,
  type UsersRepositoryFindUniqueBySSOParams,
} from '@/domain/auth/application/repositories/users-repository.js'
import { User } from '@/domain/auth/enterprise/entities/user.js'
import { ClerkService } from '../clerk.service.js'
import { ClerkUserMapper } from '../mappers/clerk-user-mapper.js'
import { type ClerkUser, clerkUserSchema } from '../types/clerk-user.js'

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
