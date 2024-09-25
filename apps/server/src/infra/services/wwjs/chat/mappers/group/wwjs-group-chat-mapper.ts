import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAGroupChat } from '@/domain/chat/enterprise/entities/wa/group/chat'
import { Injectable } from '@nestjs/common'
import { WWJSGroupChat } from '../../../types/wwjs-entities'
import { WWJSClient } from '../../../wwjs-client'
import { WWJSPrivateContactMapper } from '../private/wwjs-private-contact-mapper'
import { WWJSGroupContactMapper } from './wwjs-group-contact-mapper'

interface WWJSGroupChatMapperToDomainParams {
  chat: WWJSGroupChat
  client: WWJSClient
}

@Injectable()
export class WWJSGroupChatMapper {
  constructor(
    private contactMapper: WWJSGroupContactMapper,
    private privateContactMapper: WWJSPrivateContactMapper
  ) {}

  async toDomain({
    chat,
    client,
  }: WWJSGroupChatMapperToDomainParams): Promise<WAGroupChat> {
    const contact = await this.contactMapper.toDomain({
      contact: await chat.getContact(),
      client,
    })

    const participants = await Promise.all(
      chat.participants.map(async participant =>
        this.privateContactMapper.toDomain({
          contact: await client.raw.getContactById(participant.id._serialized),
          client,
        })
      )
    )

    return WAGroupChat.create(
      {
        contact,
        name: contact.defaultName,
        instanceId: client.instanceId,
        timestamp: chat.timestamp,
        unreadCount: chat.unreadCount,
        imageUrl: contact.imageUrl,
        participants,
      },
      WAEntityID.createFromString(chat.id._serialized)
    )
  }
}
