import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import { Injectable } from '@nestjs/common'
import { WWJSMessage } from '../../../types/wwjs-entities'
import { WWJSClient } from '../../../wwjs-client'
import { MessageUtils } from '../../utils/message'
import { VCardUtils } from '../../utils/v-card'
import { WWJSPrivateContactMapper } from '../private/wwjs-private-contact-mapper'
import { WWJSMessageACKMapper } from '../wwjs-message-ack-mapper'
import { WWJSMessageMediaMapper } from '../wwjs-message-media-mapper'
import { WWJSMessageTypeMapper } from '../wwjs-message-type-mapper'

interface WWJSGroupMessageMapperToDomainParams {
  message: WWJSMessage
  client: WWJSClient
}

@Injectable()
export class WWJSGroupMessageMapper {
  constructor(private contactMapper: WWJSPrivateContactMapper) {}

  async toDomain({
    message,
    client,
  }: WWJSGroupMessageMapperToDomainParams): Promise<WAGroupMessage> {
    const author = await message.getContact()

    const media = message.hasMedia && (await message.downloadMedia())

    const contacts =
      MessageUtils.hasContacts(message) &&
      (await Promise.all(
        message.vCards
          .map(VCardUtils.getWAId)
          .map(contactId => client.raw.getContactById(contactId))
      ))

    const quoted = message.hasQuotedMsg && (await message.getQuotedMessage())

    return WAGroupMessage.create(
      {
        ack: WWJSMessageACKMapper.toDomain(message.ack),
        type: WWJSMessageTypeMapper.toDomain(message.type),
        body: message.body,
        instanceId: client.instanceId,
        isForwarded: message.isForwarded,
        isFromMe: message.fromMe,
        raw: JSON.parse(JSON.stringify(message)),
        timestamp: message.timestamp,
        waChatId: WAEntityID.createFromString(message.to),
        author: await this.contactMapper.toDomain({ contact: author, client }),
        ...(media && {
          media: WWJSMessageMediaMapper.toDomain(media),
        }),
        ...(contacts && {
          contacts: await Promise.all(
            contacts.map(contact =>
              this.contactMapper.toDomain({ contact, client })
            )
          ),
        }),
        ...(quoted && {
          quoted: await this.toDomain({ client, message: quoted }),
        }),
      },
      WAMessageID.createFromString(message.id._serialized)
    )
  }
}
