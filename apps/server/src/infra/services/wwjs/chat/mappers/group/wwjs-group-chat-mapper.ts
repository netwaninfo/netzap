import { Injectable } from '@nestjs/common'

import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { WAGroupChat } from '@/domain/chat/enterprise/entities/wa/group/chat.js'
import { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact.js'
import { ChunkProcessor } from '@/domain/shared/processors/chunk-processor.js'
import { ParallelProcessor } from '@/domain/shared/processors/parallel-processor.js'
import type { WWJSGroupChat } from '../../../types/wwjs-entities.js'
import { WWJSClient } from '../../../wwjs-client.js'
import { MessageUtils } from '../../utils/message.js'
import { WWJSPrivateContactMapper } from '../private/wwjs-private-contact-mapper.js'
import { WWJSGroupContactMapper } from './wwjs-group-contact-mapper.js'
import { WWJSGroupMessageMapper } from './wwjs-group-message-mapper.js'

interface WWJSGroupChatMapperToDomainParams {
  chat: WWJSGroupChat
  client: WWJSClient
}

@Injectable()
export class WWJSGroupChatMapper {
  constructor(
    private contactMapper: WWJSGroupContactMapper,
    private messageMapper: WWJSGroupMessageMapper,
    private privateContactMapper: WWJSPrivateContactMapper
  ) {}

  async toDomain({
    chat,
    client,
  }: WWJSGroupChatMapperToDomainParams): Promise<WAGroupChat> {
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

    const chunksOfParticipants = await ChunkProcessor.fromAmount({
      array: chat.participants,
    }).processChunk(async chunk => {
      const waContacts: WAPrivateContact[] = []

      await ParallelProcessor.create({ items: chunk }).processItem(
        async participant => {
          const contact = await client.raw.getContactById(
            participant.id._serialized
          )

          const waContact = await this.privateContactMapper.toDomain({
            contact,
            client,
          })

          waContacts.push(waContact)
        }
      )

      return waContacts
    })

    const participants = chunksOfParticipants.flat(1)

    return WAGroupChat.create(
      {
        contact,
        name: contact.defaultName,
        instanceId: client.instanceId,
        timestamp: chat.timestamp,
        unreadCount: chat.unreadCount,
        imageUrl: contact.imageUrl,
        participants,
        ...(lastMessage && { lastMessage }),
      },
      WAEntityID.createFromString(chat.id._serialized)
    )
  }
}
