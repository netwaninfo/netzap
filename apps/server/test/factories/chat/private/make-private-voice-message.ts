import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  PrivateVoiceMessage,
  type PrivateVoiceMessageProps,
} from '@/domain/chat/enterprise/entities/private/voice-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeMessageMedia } from '../make-message-media'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

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
