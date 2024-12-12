import { Either, failure } from '@/core/either'
import {
  WhatsAppService,
  WhatsAppServiceGetChatByWAChatIdParams,
  WhatsAppServiceGetContactsFromInstanceParams,
  WhatsAppServiceGetMessagesFromInstanceParams,
  WhatsAppServiceSendChatSeenParams,
  WhatsAppServiceSendTextMessageParams,
} from '@/domain/chat/application/services/whats-app-service'
import { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact'
import { WAChat } from '@/domain/chat/enterprise/types/wa-chat'
import { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { ChunkProcessor } from '@/domain/shared/processors/chunk-processor'
import { Injectable } from '@nestjs/common'
import { RunSafely } from '../../shared/run-safely'
import { WWJSService } from '../wwjs.service'
import { WWJSPrivateContactMapper } from './mappers/private/wwjs-private-contact-mapper'
import { WWJSChatMapper } from './mappers/wwjs-chat-mapper'
import { WWJSMessageMapper } from './mappers/wwjs-message-mapper'
import { ChatUtils } from './utils/chat'
import { ContactUtils } from './utils/contact'
import { MessageUtils } from './utils/message'

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

      const chunksOfContacts = await ChunkProcessor.fromArray({
        array: contacts,
      }).processChunk(async chunk => {
        const waContacts: WAPrivateContact[] = []

        for (const contact of chunk) {
          const waContact = await this.contactMapper.toDomain({
            contact,
            client,
          })

          waContacts.push(waContact)
        }

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

      const chunksOfWaChats = await ChunkProcessor.fromArray({
        array: chats,
      }).processChunk(async chunk => {
        const waChats: WAChat[] = []

        for (const chat of chunk) {
          const waChat = await this.chatMapper.toDomain({ chat, client })
          waChats.push(waChat)
        }

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

      const chunksOfMessages = await ChunkProcessor.fromArray({
        array: chats,
      }).processChunk(async chunk => {
        const waMessages: WAMessage[] = []

        for (const chat of chunk) {
          const messages = await chat.fetchMessages({
            limit: 70,
          })

          const currentMessages = messages.filter(
            message => !MessageUtils.canIgnore(message.type)
          )

          const currentChunksOfMessages = await ChunkProcessor.fromArray({
            array: currentMessages,
          }).processChunk(async chunk => {
            const currentWAMessages: WAMessage[] = []

            for (const message of chunk) {
              currentWAMessages.push(
                await this.messageMapper.toDomain({ client, message })
              )
            }

            return currentWAMessages
          })

          waMessages.push(...currentChunksOfMessages.flat(1))
        }

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
