import { Injectable } from '@nestjs/common'

import { type Either, failure } from '@/core/either.js'
import type {
  WhatsAppService,
  WhatsAppServiceGetChatByWAChatIdParams,
  WhatsAppServiceGetContactsFromInstanceParams,
  WhatsAppServiceGetMessagesFromInstanceParams,
  WhatsAppServiceSendChatSeenParams,
  WhatsAppServiceSendTextMessageParams,
} from '@/domain/chat/application/services/whats-app-service.js'
import { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact.js'
import type { WAChat } from '@/domain/chat/enterprise/types/wa-chat.js'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import { ChunkProcessor } from '@/domain/shared/processors/chunk-processor.js'
import { ParallelProcessor } from '@/domain/shared/processors/parallel-processor.js'
import { RunSafely } from '../../shared/run-safely.js'
import { WWJSService } from '../wwjs.service.js'
import { WWJSPrivateContactMapper } from './mappers/private/wwjs-private-contact-mapper.js'
import { WWJSChatMapper } from './mappers/wwjs-chat-mapper.js'
import { WWJSMessageMapper } from './mappers/wwjs-message-mapper.js'
import { ChatUtils } from './utils/chat.js'
import { ContactUtils } from './utils/contact.js'
import { MessageUtils } from './utils/message.js'

@Injectable()
export class WWJSChatService extends RunSafely implements WhatsAppService {
  constructor(
    private wwjsService: WWJSService,
    private chatMapper: WWJSChatMapper,
    private messageMapper: WWJSMessageMapper,
    private contactMapper: WWJSPrivateContactMapper
  ) {
    super()
  }

  async getChatByWAChatId({
    instanceId,
    waChatId,
  }: WhatsAppServiceGetChatByWAChatIdParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAChat>
  > {
    const client = this.wwjsService.getAvailableClient(instanceId)

    if (!client) {
      return failure(
        new ServiceUnavailableError({ name: WWJSChatService.name })
      )
    }

    if (ChatUtils.canIgnoreByServer(waChatId.node)) {
      return failure(
        new ServiceUnavailableError({ name: WWJSChatService.name })
      )
    }

    return this.runSafely(async () => {
      const chat = await client.raw.getChatById(waChatId.toString())

      return this.chatMapper.toDomain({ chat, client })
    })
  }

  async sendTextMessage({
    instanceId,
    waChatId,
    body,
    quotedId,
  }: WhatsAppServiceSendTextMessageParams): Promise<
    Either<UnhandledError, WAMessage>
  > {
    const client = this.wwjsService.getAvailableClient(instanceId)

    if (!client) {
      return failure(
        new ServiceUnavailableError({ name: WWJSChatService.name })
      )
    }

    return this.runSafely(async () => {
      const message = await client.raw.sendMessage(waChatId.toString(), body, {
        quotedMessageId: quotedId?.toString(),
      })

      return this.messageMapper.toDomain({ message, client })
    })
  }

  async getContactsFromInstance({
    instanceId,
  }: WhatsAppServiceGetContactsFromInstanceParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAPrivateContact[]>
  > {
    const client = this.wwjsService.getAvailableClient(instanceId)

    if (!client) {
      return failure(
        new ServiceUnavailableError({ name: WWJSChatService.name })
      )
    }

    return this.runSafely(async () => {
      const allContacts = await client.raw.getContacts()

      const contacts = allContacts.filter(contact =>
        ContactUtils.isMyContact(contact)
      )

      const chunksOfContacts = await ChunkProcessor.fromAmount({
        array: contacts,
      }).processChunk(async chunk => {
        const waContacts: WAPrivateContact[] = []

        await ParallelProcessor.create({ items: chunk }).processItem(
          async contact => {
            const waContact = await this.contactMapper.toDomain({
              contact,
              client,
            })

            waContacts.push(waContact)
          }
        )

        return waContacts
      })

      return chunksOfContacts.flat(1)
    })
  }

  async getChatsFromInstance({
    instanceId,
  }: WhatsAppServiceGetContactsFromInstanceParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAChat[]>
  > {
    const client = this.wwjsService.getAvailableClient(instanceId)

    if (!client) {
      return failure(
        new ServiceUnavailableError({ name: WWJSChatService.name })
      )
    }

    return this.runSafely(async () => {
      const allChats = await client.raw.getChats()
      const chats = allChats.filter(chat => !ChatUtils.canIgnore(chat))

      const chunksOfWaChats = await ChunkProcessor.fromAmount({
        array: chats,
      }).processChunk(async chunk => {
        const waChats: WAChat[] = []

        await ParallelProcessor.create({ items: chunk }).processItem(
          async chat => {
            const waChat = await this.chatMapper.toDomain({ chat, client })
            waChats.push(waChat)
          }
        )

        return waChats
      })

      return chunksOfWaChats.flat(1)
    })
  }

  async getMessagesFromInstance({
    instanceId,
  }: WhatsAppServiceGetMessagesFromInstanceParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAMessage[]>
  > {
    const client = this.wwjsService.getAvailableClient(instanceId)

    if (!client) {
      return failure(
        new ServiceUnavailableError({ name: WWJSChatService.name })
      )
    }

    return this.runSafely(async () => {
      const allChats = await client.raw.getChats()
      const chats = allChats.filter(chat => !ChatUtils.canIgnore(chat))

      const chunksOfMessages = await ChunkProcessor.fromAmount({
        array: chats,
      }).processChunk(async chunk => {
        const waMessages: WAMessage[] = []

        await ParallelProcessor.create({ items: chunk }).processItem(
          async chat => {
            const messages = await chat.fetchMessages({
              limit: 70,
            })

            const currentMessages = messages.filter(
              message => !MessageUtils.canIgnore(message.type)
            )

            const currentChunksOfMessages = await ChunkProcessor.fromAmount({
              array: currentMessages,
            }).processChunk(async chunk => {
              const currentWAMessages: WAMessage[] = []

              await ParallelProcessor.create({ items: chunk }).processItem(
                async message => {
                  const waMessage = await this.messageMapper.toDomain({
                    client,
                    message,
                  })

                  currentWAMessages.push(waMessage)
                }
              )

              return currentWAMessages
            })

            waMessages.push(...currentChunksOfMessages.flat(1))
          }
        )

        return waMessages
      })

      return chunksOfMessages.flat(1)
    })
  }

  async sendChatSeen({
    instanceId,
    waChatId,
  }: WhatsAppServiceSendChatSeenParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, boolean>
  > {
    const client = this.wwjsService.getAvailableClient(instanceId)

    if (!client) {
      return failure(
        new ServiceUnavailableError({ name: WWJSChatService.name })
      )
    }

    return this.runSafely(() => client.raw.sendSeen(waChatId.toString()))
  }
}
