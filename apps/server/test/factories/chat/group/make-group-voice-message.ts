import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  GroupVoiceMessage,
  type GroupVoiceMessageProps,
} from '@/domain/chat/enterprise/entities/group/voice-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeContact } from '../make-contact'
import { makeMessageMedia } from '../make-message-media'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

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
