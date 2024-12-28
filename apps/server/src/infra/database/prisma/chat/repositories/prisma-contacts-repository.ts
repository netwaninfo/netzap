import { Injectable } from '@nestjs/common'

import type {
  ContactsRepository,
  ContactsRepositoryCountByInstanceIdParams,
  ContactsRepositoryFindManyByWAContactIdsAndInstanceIdParams,
  ContactsRepositoryFindManyPaginatedByInstanceIdParams,
  ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/contacts-repository.js'
import { Contact } from '@/domain/chat/enterprise/entities/contact.js'
import { Pagination } from '@/domain/shared/entities/pagination.js'
import { PrismaService } from '../../prisma.service.js'
import { PrismaContactInstanceMapper } from '../mappers/prisma-contact-instance-mapper.js'

@Injectable()
export class PrismaContactsRepository implements ContactsRepository {
  constructor(private prisma: PrismaService) {}

  async findUniqueByWAContactIdAndInstanceId({
    instanceId,
    waContactId,
  }: ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams): Promise<Contact | null> {
    const raw = await this.prisma.contactInstance.findFirst({
      where: {
        instanceId: instanceId.toString(),
        contact: {
          waContactId: waContactId.toString(),
        },
      },
      include: {
        contact: true,
      },
    })

    if (!raw) return null

    return PrismaContactInstanceMapper.toDomain(raw)
  }

  async findManyByWAContactIdsAndInstanceId({
    instanceId,
    waContactIds,
  }: ContactsRepositoryFindManyByWAContactIdsAndInstanceIdParams): Promise<
    Contact[]
  > {
    const raw = await this.prisma.contactInstance.findMany({
      where: {
        instanceId: instanceId.toString(),
        contact: {
          waContactId: {
            in: waContactIds.map(id => id.toString()),
          },
        },
      },
      include: {
        contact: true,
      },
    })

    return raw.map(PrismaContactInstanceMapper.toDomain)
  }

  async findManyPaginatedByInstanceId({
    instanceId,
    page,
    take,
    query,
  }: ContactsRepositoryFindManyPaginatedByInstanceIdParams): Promise<
    Contact[]
  > {
    const raw = await this.prisma.contactInstance.findMany({
      where: {
        instanceId: instanceId.toString(),
        isMyContact: true,
        contact: {
          waContactId: {
            endsWith: '@c.us',
          },
          ...(query && {
            OR: [
              {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                phone: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          }),
        },
      },
      include: {
        contact: true,
      },
      take,
      skip: Pagination.skip({ limit: take, page }),
      orderBy: [
        { contact: { name: 'asc' } },
        { contact: { formattedPhone: 'asc' } },
      ],
    })

    return raw.map(PrismaContactInstanceMapper.toDomain)
  }

  async countByInstanceId({
    instanceId,
    query,
  }: ContactsRepositoryCountByInstanceIdParams): Promise<number> {
    const rows = await this.prisma.contactInstance.count({
      where: {
        instanceId: instanceId.toString(),
        isMyContact: true,
        contact: {
          waContactId: {
            endsWith: '@c.us',
          },
          ...(query && {
            OR: [
              {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                phone: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ],
          }),
        },
      },
    })

    return rows
  }

  async create(contact: Contact): Promise<void> {
    try {
      await this.prisma.$transaction([
        this.prisma.contactInstance.create({
          data: PrismaContactInstanceMapper.toPrismaCreate(contact),
        }),
      ])
    } catch (error) {}
  }

  async createMany(contacts: Contact[]): Promise<void> {
    try {
      await this.prisma.$transaction(
        contacts.map(contact =>
          this.prisma.contactInstance.create({
            data: PrismaContactInstanceMapper.toPrismaCreate(contact),
          })
        )
      )
    } catch (error) {}
  }
}
