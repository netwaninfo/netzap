import {
  UsersRepositories,
  UsersRepositoriesFindUniqueByUserIdParams,
} from '@/domain/auth/application/repositories/users-repositories'
import { User } from '@/domain/auth/enterprise/entities/user'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { User as RawClerkUser } from '@clerk/clerk-sdk-node'
import { Injectable } from '@nestjs/common'
import { ClerkService } from '../clerk.service'
import { ClerkUserMapper } from '../mappers/clerk-user-mapper'
import { ClerkUser, ClerkUserPublicMetadata } from '../types/clerk-user'

@Injectable()
export class ClerkUsersRepository implements UsersRepositories {
  constructor(private clerk: ClerkService) {}

  private checkIsValidClerkUser(user: RawClerkUser): ClerkUser {
    const email = user.primaryEmailAddress?.emailAddress
    const name = user.firstName || user.lastName || user.fullName

    const publicMetadata =
      user.publicMetadata as unknown as ClerkUserPublicMetadata
    const internalId = publicMetadata.applications.netzap?.id

    if (!email || !name || !internalId) {
      throw new InvalidResourceFormatError({ id: user.id })
    }

    return {
      id: user.id,
      email,
      name,
      internalId,
    }
  }

  async findUniqueByUserId({
    userId,
  }: UsersRepositoriesFindUniqueByUserIdParams): Promise<User | null> {
    try {
      const raw = await this.clerk.client.users.getUser(userId.toString())

      return ClerkUserMapper.toDomain(this.checkIsValidClerkUser(raw))
    } catch {
      return null
    }
  }
}
