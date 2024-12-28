import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { UsersRepository as AuthUsersRepository } from '@/domain/auth/application/repositories/users-repository.js'
import type {
  UsersRepository,
  UsersRepositoryFindUniqueByUserIdParams,
} from '@/domain/users/application/repositories/users-repository.js'
import { User } from '@/domain/users/enterprise/entities/user.js'
import { PrismaService } from '../../prisma.service.js'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper.js'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(
    private prisma: PrismaService,
    private clerkUsersRepository: AuthUsersRepository
  ) {}

  async findUniqueByUserId({
    userId,
  }: UsersRepositoryFindUniqueByUserIdParams): Promise<User | null> {
    const raw = await this.prisma.attendant.findUnique({
      where: {
        id: userId.toString(),
      },
    })

    if (!raw) return null

    const user = await this.clerkUsersRepository.findUniqueBySSO({
      refId: UniqueEntityID.create(raw.refId),
    })

    if (!user) return null

    return PrismaUserMapper.toDomain({
      ...raw,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
    })
  }
}
