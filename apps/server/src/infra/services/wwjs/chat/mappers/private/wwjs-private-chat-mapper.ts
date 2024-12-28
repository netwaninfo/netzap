import { Injectable } from '@nestjs/common'

import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { WAPrivateChat } from '@/domain/chat/enterprise/entities/wa/private/chat.js'
import type { WWJSChat } from '../../../types/wwjs-entities.js'
import { WWJSClient } from '../../../wwjs-client.js'
import { MessageUtils } from '../../utils/message.js'
import { WWJSPrivateContactMapper } from './wwjs-private-contact-mapper.js'
import { WWJSPrivateMessageMapper } from './wwjs-private-message-mapper.js'

interface WWJSPrivateChatMapperToDomainParams {
  chat: WWJSChat
  client: WWJSClient
}

@Injectable()
export class WWJSPrivateChatMapper {
  constructor(
    private contactMapper: WWJSPrivateContactMapper,
    private messageMapper: WWJSPrivateMessageMapper
  ) {}

  async toDomain({
    chat,
    client,
  }: WWJSPrivateChatMapperToDomainParams): Promise<WAPrivateChat> {
    const [contact, lastMessage] = await Promise.all([
      this.contactMapper.toDomain({
        contact: await chat.getContact(),
        client,
      }),
      !!chat.lastMessage?.timestamp &&
        !MessageUtils.canIgnore(chat.lastMessage.type) &&
        this.messageMapper.toDomain({
          client,
          message: chat.lastMessage,
        }),
    ])

    return WAPrivateChat.create(
      {
        contact,
        name: contact.defaultName,
        instanceId: client.instanceId,
        timestamp: chat.timestamp,
        unreadCount: chat.unreadCount,
        imageUrl: contact.imageUrl,
        ...(lastMessage && { lastMessage }),
      },
      WAEntityID.createFromString(chat.id._serialized)
    )
  }
}
