import { Either } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { WAMessageID } from '../../enterprise/entities/value-objects/wa-message-id'
import { WAChat } from '../../enterprise/types/wa-chat'
import type { WAMessage } from '../../enterprise/types/wa-message'

export interface WhatsAppServiceSendTextMessageParams {
  body: string
  instanceId: UniqueEntityID
  waChatId: WAEntityID
  quotedId?: WAMessageID
}

export interface WhatsAppServiceGetChatByWAChatId {
  instanceId: UniqueEntityID
  waChatId: WAEntityID
}

export abstract class WhatsAppService {
  abstract getChatByWAChatId(
    params: WhatsAppServiceGetChatByWAChatId
  ): Promise<Either<UnhandledError | ServiceUnavailableError, WAChat>>

  abstract sendTextMessage(
    params: WhatsAppServiceSendTextMessageParams
  ): Promise<Either<UnhandledError | ServiceUnavailableError, WAMessage>>
}
