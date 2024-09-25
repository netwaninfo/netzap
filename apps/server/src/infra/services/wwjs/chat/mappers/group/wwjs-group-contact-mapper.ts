import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAGroupContact } from '@/domain/chat/enterprise/entities/wa/group/contact'
import { Injectable } from '@nestjs/common'
import { WWJSContact } from '../../../types/wwjs-entities'
import { WWJSClient } from '../../../wwjs-client'

interface WWJSGroupContactMapperToDomainParams {
  contact: WWJSContact
  client: WWJSClient
}

@Injectable()
export class WWJSGroupContactMapper {
  async toDomain({
    client,
    contact,
  }: WWJSGroupContactMapperToDomainParams): Promise<WAGroupContact> {
    const [imageUrl, formattedNumber] = await Promise.all([
      contact.getProfilePicUrl(),
      contact.getFormattedNumber(),
    ])

    return WAGroupContact.create(
      {
        formattedNumber,
        instanceId: client.instanceId,
        number: contact.number,
        imageUrl: imageUrl ?? null,
        name: contact.name,
        pushName: contact.pushname,
        shortName: contact.shortName,
      },
      WAEntityID.createFromString(contact.id._serialized)
    )
  }
}
