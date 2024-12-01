import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import { Injectable } from '@nestjs/common'
import { WWJSContact, WWJSMessage } from '../../../types/wwjs-entities'
import { WWJSClient } from '../../../wwjs-client'
import { ContactUtils } from '../../utils/contact'
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

  private ensureValidAuthor(contact: WWJSContact): WWJSContact {
    const hasInvalidId =
      'device' in contact.id &&
      contact.id._serialized.includes(`:${contact.id.device}`)

    if (hasInvalidId) {
      contact.id._serialized = `${contact.id.user}@${contact.id.server}`
    }

    return contact
  }

  async toDomain({
    message,
    client,
  }: WWJSGroupMessageMapperToDomainParams): Promise<WAGroupMessage> {
    const messageId = WAMessageID.createFromString(message.id._serialized)

    const [rawAuthor, contacts, media, rawQuoted] = await Promise.all([
      message.getContact(),
      MessageUtils.hasContacts(message) &&
        (
          await Promise.all(
            message.vCards
              .map(VCardUtils.getWAId)
              .map(contactId => client.raw.getContactById(contactId))
          )
        ).filter(contact => ContactUtils.isValid(contact)),
      message.hasMedia && MessageUtils.getMediaOrNull(message),
      message.hasQuotedMsg ? message.getQuotedMessage() : null,
    ])

    const quoted = !!rawQuoted?.timestamp && rawQuoted
    const author = this.ensureValidAuthor(rawAuthor)

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
        waChatId: messageId.entityId,
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
      messageId
    )
  }
}
