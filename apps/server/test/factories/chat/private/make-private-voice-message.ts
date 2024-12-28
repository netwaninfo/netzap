import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  PrivateVoiceMessage,
  type PrivateVoiceMessageProps,
} from '@/domain/chat/enterprise/entities/private/voice-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeMessageMedia } from '../make-message-media.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makePrivateVoiceMessage(
  override: Partial<PrivateVoiceMessageProps> = {},
  id?: UniqueEntityID
) {
  return PrivateVoiceMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      media: makeMessageMedia(),
      ...override,
    },
    id
  )
}
