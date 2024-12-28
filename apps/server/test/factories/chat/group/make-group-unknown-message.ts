import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  GroupUnknownMessage,
  type GroupUnknownMessageProps,
} from '@/domain/chat/enterprise/entities/group/unknown-message.js'
import { makeUniqueEntityID } from '../../make-unique-entity-id.js'
import { makeContact } from '../make-contact.js'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '../value-objects/make-wa-message-id.js'

export function makeGroupUnknownMessage(
  override: Partial<GroupUnknownMessageProps> = {},
  id?: UniqueEntityID
) {
  return GroupUnknownMessage.create(
    {
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      author: makeContact(),
      payload: {},
      ...override,
    },
    id
  )
}
