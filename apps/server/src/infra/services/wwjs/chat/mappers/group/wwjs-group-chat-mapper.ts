import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAGroupChat } from '@/domain/chat/enterprise/entities/wa/group/chat'
import { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact'
import { ChunkProcessor } from '@/domain/shared/processors/chunk-processor'
import { ParallelProcessor } from '@/domain/shared/processors/parallel-processor'
import { Injectable } from '@nestjs/common'
import { WWJSGroupChat } from '../../../types/wwjs-entities'
import { WWJSClient } from '../../../wwjs-client'
import { MessageUtils } from '../../utils/message'
import { WWJSPrivateContactMapper } from '../private/wwjs-private-contact-mapper'
import { WWJSGroupContactMapper } from './wwjs-group-contact-mapper'
import { WWJSGroupMessageMapper } from './wwjs-group-message-mapper'

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
