import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact'
import { WWJSContact } from '../../../types/wwjs-entities'
import { WWJSClient } from '../../../wwjs-client'

interface WWJSPrivateContactMapperToDomainParams {
  contact: WWJSContact
  client: WWJSClient
}

export class WWJSPrivateContactMapper {
  async toDomain({
    client,
    contact,
  }: WWJSPrivateContactMapperToDomainParams): Promise<WAPrivateContact> {
    const [imageUrl, formattedNumber] = await Promise.all([
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
        isInstance: contact.isMe,
        imageUrl: imageUrl ?? null,
        name: contact.name,
        pushName: contact.pushname,
        shortName: contact.shortName,
        isMe: contact.isMe,
      },
      WAEntityID.createFromString(contact.id._serialized)
    )
  }
}
