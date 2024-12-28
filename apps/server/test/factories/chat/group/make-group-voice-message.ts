import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  GroupVoiceMessage,
  type GroupVoiceMessageProps,
} from '@/domain/chat/enterprise/entities/group/voice-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeContact } from '../make-contact.js'
import { makeMessageMedia } from '../make-message-media.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makeGroupVoiceMessage(
  override: Partial<GroupVoiceMessageProps> = {},
  id?: UniqueEntityID
) {
  return GroupVoiceMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      media: makeMessageMedia(),
      author: makeContact(),
      ...override,
    },
    id
  )
}
