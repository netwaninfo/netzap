import {
  ContactsRepository,
  ContactsRepositoryCountByInstanceIdParams,
  ContactsRepositoryFindManyByWAContactIdsAndInstanceIdParams,
  ContactsRepositoryFindManyPaginatedByInstanceIdParams,
  ContactsRepositoryFindUniqueByWAContactIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/contacts-repository'
import { Contact } from '@/domain/chat/enterprise/entities/contact'
import { Pagination } from '@/domain/shared/entities/pagination'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { PrismaContactInstanceMapper } from '../mappers/prisma-contact-instance-mapper'
import { PrismaContactMapper } from '../mappers/prisma-contact-mapper'

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
        contact: {
          OR: [
            {
              name: {
                contains: query,
              },
            },
            {
              phone: {
                contains: query,
              },
            },
          ],
        },
      },
    })

    return rows
  }

  async create(contact: Contact): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.contact.create({
        data: PrismaContactMapper.toPrismaCreate(contact),
      }),
    ])
  }

  async createMany(contacts: Contact[]): Promise<void> {
    await this.prisma.$transaction(
      contacts.map(contact =>
        this.prisma.contact.create({
          data: PrismaContactMapper.toPrismaCreate(contact),
        })
      )
    )
  }
}
