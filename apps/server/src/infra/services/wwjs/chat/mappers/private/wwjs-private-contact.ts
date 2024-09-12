import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { Contact as WWJSContact } from 'whatsapp-web.js'
import { WWJSClient } from '../../../wwjs-client'

interface WWJSPrivateContactMapperToDomainParams {
  contact: WWJSContact
  client: WWJSClient
}

@Injectable()
export class WWJSPrivateContactMapper {
  constructor(private prisma: PrismaService) {}

  async toDomain({
    client,
    contact,
  }: WWJSPrivateContactMapperToDomainParams): Promise<WAPrivateContact> {
    const [instance, imageUrl, formattedNumber] = await Promise.all([
      this.prisma.instance.findUnique({
        where: {
          phone: contact.number,
        },
        select: {
          id: true,
        },
      }),
      contact.getProfilePicUrl(),
      contact.getFormattedNumber(),
    ])

    return WAPrivateContact.create(
      {
        formattedNumber,
        instanceId: client.instanceId,
        isBusiness: contact.isBusiness,
        isEnterprise: contact.isEnterprise,
        isMyContact: contact.isMyContact,
        isWAContact: contact.isWAContact,
        number: contact.number,
        isInstance: !!instance,
        imageUrl: imageUrl ?? null,
        name: contact.name,
        pushName: contact.pushname,
        shortName: contact.shortName,
      },
      WAEntityID.createFromString(contact.id._serialized)
    )
  }
}
