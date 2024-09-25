import { Either } from '@/core/either'
import type {
  WhatsAppService,
  WhatsAppServiceGetChatByWAChatId,
  WhatsAppServiceSendTextMessageParams,
} from '@/domain/chat/application/services/whats-app-service'
import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAChat } from '@/domain/chat/enterprise/types/wa-chat'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { makeWAGroupChat } from '@/test/factories/chat/wa/make-wa-group-chat'
import { makeWAGroupContact } from '@/test/factories/chat/wa/make-wa-group-contact'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message'
import { makeWAPrivateChat } from '@/test/factories/chat/wa/make-wa-private-chat'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message'

interface WhatsAppServiceSendPrivateTextMessageParams
  extends WhatsAppServiceSendTextMessageParams {}

interface WhatsAppServiceSendGroupTextMessageParams
  extends WhatsAppServiceSendTextMessageParams {
  waAuthorId: WAEntityID
}

export class FakeWhatsAppService implements WhatsAppService {
  async getChatByWAChatId(
    _: WhatsAppServiceGetChatByWAChatId
  ): Promise<Either<UnhandledError | ServiceUnavailableError, WAChat>> {
    throw new Error(
      `Override this method retuning the "sendGroupTextMessage" or "sendGroupTextMessage"`
    )
  }

  async getPrivateChatByWAChatId({
    instanceId,
    waChatId,
  }: WhatsAppServiceGetChatByWAChatId): Promise<WAChat> {
    return makeWAPrivateChat(
      {
        instanceId,
        contact: makeWAPrivateContact({ instanceId }, waChatId),
      },
      waChatId
    )
  }

  async getGroupChatByWAChatId({
    instanceId,
    waChatId,
  }: WhatsAppServiceGetChatByWAChatId): Promise<WAChat> {
    return makeWAGroupChat(
      {
        instanceId,
        contact: makeWAGroupContact({ instanceId }, waChatId),
      },
      waChatId
    )
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
}
