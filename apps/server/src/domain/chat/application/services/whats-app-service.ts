import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
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
  ): Promise<WAChat | null>

  abstract sendTextMessage(
    params: WhatsAppServiceSendTextMessageParams
  ): Promise<WAMessage>
}
