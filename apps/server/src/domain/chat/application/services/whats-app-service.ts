import { Either } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { WAMessageID } from '../../enterprise/entities/value-objects/wa-message-id'
import { WAPrivateContact } from '../../enterprise/entities/wa/private/contact'
import { WAChat } from '../../enterprise/types/wa-chat'
import type { WAMessage } from '../../enterprise/types/wa-message'

export interface WhatsAppServiceSendTextMessageParams {
  body: string
  instanceId: UniqueEntityID
  waChatId: WAEntityID
  quotedId?: WAMessageID
}

export interface WhatsAppServiceGetChatByWAChatIdParams {
  instanceId: UniqueEntityID
  waChatId: WAEntityID
}

export interface WhatsAppServiceGetContactsFromInstanceParams {
  instanceId: UniqueEntityID
}

export interface WhatsAppServiceGetChatsFromInstanceParams {
  instanceId: UniqueEntityID
}

export interface WhatsAppServiceGetMessagesFromInstanceParams {
  instanceId: UniqueEntityID
}

export interface WhatsAppServiceSendChatSeenParams {
  instanceId: UniqueEntityID
  waChatId: WAEntityID
}

export abstract class WhatsAppService {
  abstract getChatByWAChatId(
    params: WhatsAppServiceGetChatByWAChatIdParams
  ): Promise<Either<UnhandledError | ServiceUnavailableError, WAChat>>

  abstract sendTextMessage(
    params: WhatsAppServiceSendTextMessageParams
  ): Promise<Either<UnhandledError | ServiceUnavailableError, WAMessage>>

  abstract getContactsFromInstance(
    params: WhatsAppServiceGetContactsFromInstanceParams
  ): Promise<
    Either<UnhandledError | ServiceUnavailableError, WAPrivateContact[]>
  >

  abstract getChatsFromInstance(
    params: WhatsAppServiceGetContactsFromInstanceParams
  ): Promise<Either<UnhandledError | ServiceUnavailableError, WAChat[]>>

  abstract getMessagesFromInstance(
    params: WhatsAppServiceGetMessagesFromInstanceParams
  ): Promise<Either<UnhandledError | ServiceUnavailableError, WAMessage[]>>

  abstract sendChatSeen(
    params: WhatsAppServiceSendChatSeenParams
  ): Promise<Either<UnhandledError | ServiceUnavailableError, boolean>>
}
