import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAPrivateChat } from '@/domain/chat/enterprise/entities/wa/private/chat'
import { Injectable } from '@nestjs/common'
import { Chat as WWJSChat } from 'whatsapp-web.js'
import { WWJSClient } from '../../../wwjs-client'
import { WWJSPrivateContactMapper } from './wwjs-private-contact'

interface WWJSPrivateChatMapperToDomainParams {
  chat: WWJSChat
  client: WWJSClient
}

@Injectable()
export class WWJSPrivateChatMapper {
  constructor(private contactMapper: WWJSPrivateContactMapper) {}

  async toDomain({
    chat,
    client,
  }: WWJSPrivateChatMapperToDomainParams): Promise<WAPrivateChat> {
    const contact = await this.contactMapper.toDomain({
      contact: await chat.getContact(),
      client,
    })

    return WAPrivateChat.create(
      {
        contact,
        name: contact.defaultName,
        instanceId: client.instanceId,
        timestamp: chat.timestamp,
        unreadCount: chat.unreadCount,
        imageUrl: contact.imageUrl,
      },
      WAEntityID.createFromString(chat.id._serialized)
    )
  }
}
