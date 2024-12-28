import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  GroupVideoMessage,
  type GroupVideoMessageProps,
} from '@/domain/chat/enterprise/entities/group/video-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeContact } from '../make-contact.js'
import { makeMessageMedia } from '../make-message-media.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makeGroupVideoMessage(
  override: Partial<GroupVideoMessageProps> = {},
  id?: UniqueEntityID
) {
  return GroupVideoMessage.create(
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
