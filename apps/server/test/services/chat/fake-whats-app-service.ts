import { Either, success } from '@/core/either'
import type {
  WhatsAppService,
  WhatsAppServiceGetChatByWAChatIdParams,
  WhatsAppServiceGetContactsFromInstanceParams,
  WhatsAppServiceGetMessagesFromInstanceParams,
  WhatsAppServiceSendTextMessageParams,
} from '@/domain/chat/application/services/whats-app-service'
import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAPrivateContact } from '@/domain/chat/enterprise/entities/wa/private/contact'
import { WAChat } from '@/domain/chat/enterprise/types/wa-chat'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'

interface WhatsAppServiceSendPrivateTextMessageParams
  extends WhatsAppServiceSendTextMessageParams {}

interface WhatsAppServiceSendGroupTextMessageParams
  extends WhatsAppServiceSendTextMessageParams {
  waAuthorId: WAEntityID
}

export class FakeWhatsAppService implements WhatsAppService {
  contacts: WAPrivateContact[] = []
  chats: WAChat[] = []
  messages: WAMessage[] = []

  async getChatByWAChatId({
    instanceId,
    waChatId,
  }: WhatsAppServiceGetChatByWAChatIdParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAChat>
  > {
    const waChat = this.chats.find(
      waChat =>
        waChat.instanceId.equals(instanceId) && waChat.id.equals(waChatId)
    )

    if (!waChat) {
      throw new Error('WAChat Not found')
    }

    return success(waChat)
  }

  async sendTextMessage(
    _: WhatsAppServiceSendTextMessageParams
  ): Promise<Either<UnhandledError | ServiceUnavailableError, WAMessage>> {
    throw new Error(
      `Override this method retuning the "sendGroupTextMessage" or "sendGroupTextMessage"`
    )
  }

  async sendPrivateTextMessage({
    body,
    instanceId,
    waChatId,
    quotedId,
  }: WhatsAppServiceSendPrivateTextMessageParams): Promise<WAMessage> {
    return makeWAPrivateMessage({
      body,
      instanceId,
      waChatId,
      ...(quotedId && {
        quoted: makeWAPrivateMessage({ instanceId, waChatId }, quotedId),
      }),
    })
  }

  async sendGroupTextMessage({
    body,
    instanceId,
    waChatId,
    quotedId,
    waAuthorId,
  }: WhatsAppServiceSendGroupTextMessageParams): Promise<WAMessage> {
    return makeWAGroupMessage({
      body,
      instanceId,
      waChatId,
      author: makeWAPrivateContact({}, waAuthorId),
      ...(quotedId && {
        quoted: makeWAGroupMessage({ instanceId, waChatId }, quotedId),
      }),
    })
  }

  async getContactsFromInstance({
    instanceId,
  }: WhatsAppServiceGetContactsFromInstanceParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAPrivateContact[]>
  > {
    return success(
      this.contacts.filter(contact => contact.instanceId.equals(instanceId))
    )
  }

  async getChatsFromInstance({
    instanceId,
  }: WhatsAppServiceGetContactsFromInstanceParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAChat[]>
  > {
    return success(
      this.chats.filter(chat => chat.instanceId.equals(instanceId))
    )
  }

  async getMessagesFromInstance({
    instanceId,
  }: WhatsAppServiceGetMessagesFromInstanceParams): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAMessage[]>
  > {
    return success(
      this.messages.filter(message => message.instanceId.equals(instanceId))
    )
  }
}
