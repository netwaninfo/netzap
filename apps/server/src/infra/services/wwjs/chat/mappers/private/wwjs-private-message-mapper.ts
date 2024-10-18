import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import { Injectable } from '@nestjs/common'
import { WWJSMessage } from '../../../types/wwjs-entities'
import { WWJSClient } from '../../../wwjs-client'
import { MessageUtils } from '../../utils/message'
import { VCardUtils } from '../../utils/v-card'
import { WWJSMessageACKMapper } from '../wwjs-message-ack-mapper'
import { WWJSMessageMediaMapper } from '../wwjs-message-media-mapper'
import { WWJSMessageTypeMapper } from '../wwjs-message-type-mapper'
import { WWJSPrivateContactMapper } from './wwjs-private-contact-mapper'

interface WWJSPrivateMessageMapperToDomainParams {
  message: WWJSMessage
  client: WWJSClient
}

@Injectable()
export class WWJSPrivateMessageMapper {
  constructor(private contactMapper: WWJSPrivateContactMapper) {}

  async toDomain({
    message,
    client,
  }: WWJSPrivateMessageMapperToDomainParams): Promise<WAPrivateMessage> {
    const messageId = WAMessageID.createFromString(message.id._serialized)

    const [contacts, media, rawQuoted] = await Promise.all([
      MessageUtils.hasContacts(message) &&
        Promise.all(
          message.vCards
            .map(VCardUtils.getWAId)
            .map(contactId => client.raw.getContactById(contactId))
        ),
      message.hasMedia && message.downloadMedia(),
      message.hasQuotedMsg ? message.getQuotedMessage() : null,
    ])

    const quoted = !!rawQuoted?.timestamp && rawQuoted

    return WAPrivateMessage.create(
      {
        ack: WWJSMessageACKMapper.toDomain(message.ack),
        type: WWJSMessageTypeMapper.toDomain(message.type),
        body: message.body,
        instanceId: client.instanceId,
        isForwarded: message.isForwarded,
        isFromMe: message.fromMe,
        raw: JSON.parse(JSON.stringify(message)),
        timestamp: message.timestamp,
        waChatId: messageId.entityId,
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
      messageId
    )
  }
}
