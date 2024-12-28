import { Injectable } from '@nestjs/common'

import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { WAGroupContact } from '@/domain/chat/enterprise/entities/wa/group/contact.js'
import type { WWJSContact } from '../../../types/wwjs-entities.js'
import { WWJSClient } from '../../../wwjs-client.js'
import { ContactUtils } from '../../utils/contact.js'

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
      ContactUtils.getProfilePicUrlOrNull(contact),
      contact.getFormattedNumber(),
    ])

    return WAGroupContact.create(
      {
        formattedNumber,
        instanceId: client.instanceId,
        number: contact.number,
        imageUrl,
        name: contact.name,
        pushName: contact.pushname,
        shortName: contact.shortName,
      },
      WAEntityID.createFromString(contact.id._serialized)
    )
  }
}
